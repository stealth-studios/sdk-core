import logger from "@utils/logger";
import { Server } from "@utils/server";
import { User } from "classes";

export default async function (app: Server) {
    app.post(
        "/update",
        {
            schema: {
                description: "Update a conversation",
                summary: "update",
                tags: ["conversation"],
                security: [{ endpointAuth: [] }],
                body: {
                    type: "object",
                    required: ["secret"],
                    properties: {
                        secret: { type: "string" },
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
                        character: {
                            type: "object",
                        },
                    },
                },
                response: {
                    200: {
                        description: "Conversation updated",
                        type: "object",
                        properties: {},
                    },
                    404: {
                        description: "Conversation not found",
                        type: "object",
                        properties: {
                            message: { type: "string" },
                        },
                    },
                },
            },
        },
        async (request, reply) => {
            const { secret, users, character: characterData } = request.body;

            const conversation = await request.framework.getConversationBy({
                secret,
            });

            if (!conversation) {
                return reply.status(404).send({
                    message: "Conversation not found",
                });
            }

            if (!users && !characterData) {
                return reply.status(400).send({
                    message: "No data provided",
                });
            }

            if (users) {
                await request.framework.setConversationUsers(
                    conversation,
                    users.map((user) => new User(user.name, user.id)),
                );
            }

            if (characterData) {
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
                        `Character ${character.name} (${character.hash}) not found during update, loading into framework..`,
                    );
                    await request.framework.loadCharacter(character);
                }

                await request.framework.setConversationCharacter(
                    conversation,
                    character,
                );
            }

            return {
                message: "Conversation updated",
            };
        },
    );
}
