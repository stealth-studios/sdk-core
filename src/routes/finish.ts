import { Server } from "@utils/server";

export default async function (app: Server) {
    app.post(
        "/finish",
        {
            schema: {
                description:
                    "Finish a conversation. Do not call if conversation data should persist.",
                summary: "finish",
                tags: ["conversation"],
                security: [{ endpointAuth: [] }],
                body: {
                    type: "object",
                    required: ["secret"],
                    properties: {
                        secret: { type: "string" },
                    },
                },
                response: {
                    200: {
                        description: "Conversation finished successfully",
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
                    500: {
                        description: "Failed to end conversation",
                        type: "object",
                        properties: {
                            message: { type: "string" },
                        },
                    },
                },
            },
        },
        async (request, reply) => {
            const { secret } = request.body;
            const conversation = await request.framework.getConversationBy({
                secret,
            });

            if (!conversation) {
                return reply
                    .status(404)
                    .send({ message: "Conversation not found" });
            }

            await request.framework.finishConversation(conversation);

            return reply.status(200).send({});
        },
    );
}
