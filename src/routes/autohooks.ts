import { FastifyInstance } from "fastify";
import logger from "@utils/logger";

export default async function (app: FastifyInstance) {
    // Validate API key on each request
    app.addHook("onRequest", (request, reply, next) => {
        const isValidApiKey =
            request.headers.authorization === request.config.endpointAuth;

        if (!isValidApiKey) {
            return reply.status(403).send({ message: "Invalid API key" });
        }

        next();
    });

    // Log any errors that occur
    app.addHook("onError", (_, __, error, next) => {
        logger.error(error);
        next();
    });
}
