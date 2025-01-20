import logger from "@utils/logger";
import { Server } from "@utils/server";

export default async function (app: Server) {
    app.post(
        "/create",
        {
            schema: {
                description:
                    "Create a new conversation with the given users. This method will also fetch a persistent conversation if the persistenceToken is provided and the conversation exists.",
                summary: "create",
                tags: ["conversation"],
                security: [{ endpointAuth: [] }],
                body: {
                    type: "object",
                    required: ["character", "users"],
                    properties: {
                        character: {
                            type: "object",
                        },
                        users: {
                            type: "array",
                            items: {
                                type: "object",
                                required: ["name", "id"],
                                properties: {
                                    name: { type: "string" },
                                    id: { type: "string" },
                                },
                            },
                        },
                        persistenceToken: { type: "string" },
                    },
                },
                response: {
                    200: {
                        description: "Conversation created successfully",
                        type: "object",
                        properties: {
                            id: { type: "string" },
                            secret: { type: "string" },
                        },
                    },
                    400: {
                        description: "Invalid request",
                        type: "object",
                        properties: {
                            message: { type: "string" },
                        },
                    },
                    403: {
                        description: "Invalid API key",
                        type: "object",
                        properties: {
                            message: { type: "string" },
                        },
                    },
                },
            },
        },
        async (request, reply) => {
            if (!request.body) {
                return reply.status(400).send({
                    message: "No body provided",
                });
            }

            const {
                character: characterData,
                users,
                persistenceToken,
            } = request.body;

            try {
                if (!request.framework.validateCharacter(characterData)) {
                    return reply.status(400).send({
                        message: "Invalid character",
                    });
                }
            } catch (error) {
                return reply.status(400).send({
                    message:
                        error instanceof Error
                            ? error.message
                            : "Unknown error",
                });
            }

            const character =
                await request.framework.getOrCreateCharacter(characterData);

            if (!character) {
                return reply.status(400).send({
                    message: "Character not found",
                });
            }

            if (!(await request.framework.containsCharacter(character))) {
                logger.debug(
                    `Character ${character.name} (${character.hash}) not found, loading into framework..`,
                );
                await request.framework.loadCharacter(character);
            }

            let conversation;

            if (persistenceToken) {
                conversation = await request.framework.getConversationBy({
                    persistenceToken,
                });

                const characterHash =
                    await request.framework.getCharacterHash(character);

                // Ensure that conversations do not get stuck in the previous version of the character
                if (conversation?.character.hash !== characterHash) {
                    conversation = undefined;
                }
            }

            if (!conversation) {
                conversation = await request.framework.createConversation({
                    character,
                    users,
                    persistenceToken,
                });

                if (!conversation) {
                    return reply.status(400).send({
                        message: "Failed to create conversation",
                    });
                }
            }

            return {
                id: conversation.id,
                secret: conversation.secret,
            };
        },
    );
}
