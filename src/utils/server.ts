import fastify from "fastify";
import cors from "@fastify/cors";
import swagger, { SwaggerOptions } from "@fastify/swagger";
import apiReference, {
    FastifyApiReferenceOptions,
} from "@scalar/fastify-api-reference";
import { Framework, Adapter } from "classes";
import { JsonSchemaToTsProvider } from "@fastify/type-provider-json-schema-to-ts";

// We use an OpenAPI schema for every endpoint. This is a type provider that allows us to use the schema to validate the request body and access the schema in the request object.
const server = fastify().withTypeProvider<JsonSchemaToTsProvider>();

// Register middleware
server.register(cors);

// Configure Swagger documentation
const swaggerConfig: SwaggerOptions = {
    openapi: {
        openapi: "3.0.0",
        info: {
            title: "Chatbot AI Engine",
            description: "API documentation for the Chatbot AI Engine",
            version: "1.0.0",
        },
        tags: [
            {
                name: "conversation",
                description: "Conversation related endpoints",
            },
            {
                name: "debug",
            },
        ],
        components: {
            securitySchemes: {
                endpointAuth: {
                    type: "apiKey",
                    in: "header",
                    name: "Authorization",
                    description: "Endpoint API key",
                },
            },
        },
    },
};

server.register(swagger, swaggerConfig);

const apiReferenceConfig: FastifyApiReferenceOptions = {
    routePrefix: "/reference",
    configuration: {
        authentication: {
            preferredSecurityScheme: "endpointAuth",
            apiKey: {
                token:
                    process.env.ENVIRONMENT === "development"
                        ? process.env.ENDPOINT_API_KEY!
                        : "",
            },
        },
    },
};

server.register(apiReference, apiReferenceConfig);

// Augment type definition to inject framework and adapter
declare module "fastify" {
    interface FastifyRequest {
        framework: Framework<any>;
        adapter: Adapter;
    }
}

export type Server = typeof server;
export default server;
