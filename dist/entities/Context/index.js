"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const stream_1 = __importDefault(require("stream"));
const url_1 = __importDefault(require("url"));
class Context {
    /* Define Context vars */
    request;
    responseHeaders = {};
    /* Define Context */
    constructor(request) {
        /* Set Context vars */
        this.request = request;
        /* Basic validation of request */
        if (!request.method) {
            throw new Error('No request method');
        }
    }
    /* Parse request body function */
    async parseBody() {
        if (['POST', 'PUT'].includes(this.request.method)) {
            const bodyBuffer = await new Promise((resolve, reject) => {
                const bodyBuffer = [];
                this.request.on('data', (chunk) => bodyBuffer.push(chunk));
                this.request.on('end', () => resolve(Buffer.concat(bodyBuffer)));
            });
            /* If request body is JSON */
            if (this.request.headers['content-type'] === 'application/json') {
                return JSON.parse(bodyBuffer.toString());
            }
            /* Otherwise, return stream */
            return stream_1.default.Readable.from(bodyBuffer);
        }
        else if (['GET', 'DELETE'].includes(this.request.method)) {
            const params = new url_1.default.URLSearchParams(this.request.url.replaceAll(/^.*\?/g, ''));
            const paramsObject = {};
            for (const [key, value] of params.entries()) {
                paramsObject[key] = value;
            }
            return paramsObject;
        }
        else {
            throw new Error('Unrecognized HTTP method. This is Savage Framework error');
        }
    }
    /* Define "get/set response headers" method */
    setResponseHeaders(headers) {
        this.responseHeaders = headers;
    }
    getResponseHeaders() {
        return this.responseHeaders;
    }
}
exports.default = Context;
//# sourceMappingURL=index.js.map