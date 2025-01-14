import { Server } from "@utils/server";

export default async function (app: Server) {
    app.post(
        "/send",
        {
            schema: {
                description: "Send a message from a player to a conversation.",
                summary: "send",
                tags: ["conversation"],
                security: [{ endpointAuth: [] }],
                body: {
                    type: "object",
                    required: ["secret", "message", "playerId"],
                    properties: {
                        secret: { type: "string" },
                        message: { type: "string" },
                        playerId: { type: "number" },
                        context: {
                            type: "array",
                            items: {
                                type: "object",
                                required: ["key", "value"],
                                properties: {
                                    key: { type: "string" },
                                    value: { type: "string" },
                                },
                            },
                        },
                    },
                },
                response: {
                    200: {
                        description: "Message sent successfully",
                        type: "object",
                        properties: {
                            flagged: { type: "boolean" },
                            cancelled: { type: "boolean" },
                            content: { type: "string" },
                            calls: {
                                type: "array",
                                items: {
                                    type: "object",
                                    properties: {
                                        name: { type: "string" },
                                        message: { type: "string" },
                                        parameters: {
                                            type: "object",
                                            additionalProperties: {
                                                type: "string",
                                            },
                                        },
                                    },
                                    required: ["name", "parameters"],
                                },
                            },
                        },
                    },
                    403: {
                        description: "Invalid API key or conversation secret",
                        type: "object",
                        properties: {
                            message: { type: "string" },
                        },
                    },
                    404: {
                        description: "Conversation not found",
                        type: "object",
                        properties: {
                            message: { type: "string" },
                        },
                    },
                    422: {
                        description:
                            "Content moderated or error in Provider API",
                        type: "object",
                        properties: {
                            message: { type: "string" },
                        },
                    },
                    429: {
                        description: "Conversation is busy",
                        type: "object",
                        properties: {
                            message: { type: "string" },
                        },
                    },
                },
            },
        },
        async (request, reply) => {
            const { secret, message, playerId, context } = request.body;

            const conversation = await request.framework.getConversationBy({
                secret,
            });

            if (!conversation) {
                return reply.status(404).send({
                    message: "Conversation not found",
                });
            }

            const response = await request.framework.sendToConversation(
                conversation,
                message,
                playerId,
                context || [],
            );

            if (typeof response === "object" && "status" in response) {
                return reply.status(response.status).send({
                    message: response.message,
                });
            }

            return response;
        },
    );
}
