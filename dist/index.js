"use strict";
// noinspection ExceptionCaughtLocallyJS,JSUnusedGlobalSymbols,HttpUrlsUsage
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsMW = exports.Response = void 0;
const http_1 = __importDefault(require("http"));
const url_1 = __importDefault(require("url"));
const Context_1 = __importDefault(require("./entities/Context"));
const Response_1 = __importDefault(require("./entities/Response"));
exports.Response = Response_1.default;
const corsMW_1 = __importDefault(require("./utils/corsMW"));
exports.corsMW = corsMW_1.default;
class Savage {
    /* Define global HTTP server */
    server;
    /* Define server vars */
    port;
    host;
    handlers = new Map();
    middlewares = [];
    /* Create an HTTP server instance */
    constructor(port, host = '127.0.0.1') {
        this.port = port;
        this.host = host;
        /* Call handler on HTTP request */
        this.server = http_1.default.createServer(async (request, response) => {
            try {
                /* Define request url */
                if (request.url === undefined) {
                    throw new Error('Cannot handle this request: Request URL is not provided');
                }
                /* Define request method */
                if (request.method === undefined) {
                    throw new Error('Cannot handle this request: Request method is missing');
                }
                /* Parse request path */
                const requestPath = new url_1.default.URL(`http://${this.host}:${this.port}${request.url}`);
                /* Create context */
                const context = new Context_1.default(request);
                /* Do all middlewares */
                for (const middleware of this.middlewares) {
                    const middleWareResult = await middleware(context);
                    if (middleWareResult instanceof Response_1.default) {
                        return this.respond(middleWareResult, response, context);
                    }
                }
                /* Define request handler */
                const handler = this.handlers.get(`${request.method.toUpperCase()}#${requestPath.pathname}`);
                if (!handler) {
                    response.statusCode = 404;
                    response.end('Cannot find handler for this request');
                    return;
                }
                /* Get handler Response instance */
                const $response = await handler(context);
                /* Respond with handler */
                this.respond($response, response, context);
            }
            catch (error) {
                console.error(error);
                response.statusCode = 500;
                response.end(error instanceof Error ? error.message : 'Unknown error');
            }
        });
    }
    /* Define middlewares */
    use(fn) {
        this.middlewares.push(fn);
    }
    /* Define REST API methods function */
    on(method, path, handler) {
        this.handlers.set(`${method}#${path}`, handler);
    }
    /* Define "respond" method */
    respond($response, response, $context) {
        /* Send response to HTTP client */
        for (const [header, value] of Object.entries($response.headers)) {
            if (!value)
                continue;
            response.setHeader(header, value);
        }
        for (const [header, value] of Object.entries($context.getResponseHeaders())) {
            if (!value)
                continue;
            response.setHeader(header, value);
        }
        response.statusCode = $response.statusCode;
        $response.dataStream.pipe(response);
    }
    /* Start HTTP server function */
    start() {
        return new Promise((done) => {
            this.server.listen(this.port, this.host, () => done());
        });
    }
}
exports.default = Savage;
//# sourceMappingURL=index.js.map