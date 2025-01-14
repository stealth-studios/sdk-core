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
                                    id: { type: "number" },
                                },
                            },
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
            const { secret, users } = request.body;

            const conversation = await request.framework.getConversationBy({
                secret,
            });

            if (!conversation) {
                return reply.status(404).send({
                    message: "Conversation not found",
                });
            }

            if (!users) {
                return reply.status(400).send({
                    message: "No users provided",
                });
            }

            await request.framework.setConversationUsers(
                conversation,
                users.map((user) => new User(user.name, user.id)),
            );

            return {
                message: "Conversation updated",
            };
        },
    );
}
