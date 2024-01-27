"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const stream_1 = __importDefault(require("stream"));
class Response {
    /* Define Response vars */
    dataStream = new stream_1.default.Readable();
    statusCode = 200;
    headers = {};
    contentType = 'application/octet-stream';
    /* Define Response */
    constructor(statusCode, data, headers) {
        if (Buffer.isBuffer(data)
            || data instanceof stream_1.default.Readable) {
            this.dataStream = stream_1.default.Readable.from(data);
        }
        else if (typeof data === 'string') {
            this.dataStream = stream_1.default.Readable.from(String(data));
            this.contentType = 'text/plain';
        }
        else if (['number', 'boolean'].includes(typeof data)) {
            this.dataStream = stream_1.default.Readable.from(String(data));
            this.contentType = 'application/json';
        }
        else if (typeof data === 'object' || data === null) {
            this.dataStream = stream_1.default.Readable.from(JSON.stringify(data));
            this.contentType = 'application/json';
        }
        /* Set Response vars */
        this.statusCode = statusCode;
        this.headers['Content-Type'] = headers?.['Content-Type'] ?? this.contentType;
        if (headers)
            this.headers = {
                ...this.headers,
                ...headers
            };
    }
}
exports.default = Response;
//# sourceMappingURL=index.js.map