import { Adapter, Framework } from "classes";
import logger from "@utils/logger";
import chalk from "chalk";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import fastifyAutoload from "@fastify/autoload";
import server from "@utils/server";

export interface CoreOptions {
    adapter: Adapter;
    framework: Framework<any>;
    config: {
        host: string;
        port: number;
    };
}

export class Core {
    private readonly adapter: Adapter;
    private readonly framework: Framework<any>;
    private readonly options: CoreOptions;

    constructor(options: CoreOptions) {
        this.adapter = options.adapter;
        this.framework = options.framework;
        this.options = options;
    }

    async start() {
        const isDevelopment = process.env.NODE_ENV === "development";

        if (isDevelopment) {
            logger.warn(
                `Starting SDK Core in development mode. This is not recommended for production environments. ${chalk.red(
                    "API keys are exposed to the client!",
                )}`,
            );
        }

        logger.debug(
            `Starting SDK Core on ${this.options.config.host}:${this.options.config.port}`,
        );
        logger.debug("Initializing adapter..");
        await this.adapter.init();
        logger.debug("Starting server..");

        const __dirname = dirname(fileURLToPath(import.meta.url));
        const routesDir = join(__dirname, "routes");

        await server.register(fastifyAutoload, {
            dir: routesDir,
            autoHooks: true,
            cascadeHooks: true,
            options: {
                prefix: "/api",
            },
        });

        server.decorateRequest("framework");
        server.decorateRequest("adapter");

        server.addHook("onRequest", async (request) => {
            request.framework = this.framework;
            request.adapter = this.adapter;
        });

        await this.framework.start(this.adapter);

        await server.listen({
            host: this.options.config.host,
            port: this.options.config.port,
        });

        logger.info(
            `SDK Core started on ${this.options.config.host}:${this.options.config.port}`,
        );
    }
}
