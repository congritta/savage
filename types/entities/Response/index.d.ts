/// <reference types="node" />
/// <reference types="node" />
/// <reference types="node" />
import http from "http";
import stream from "stream";
import {HttpStatusCode} from "../../types";

type ResponseData = Buffer | stream.Readable | string | number | object | boolean | null;
export default class Response {
  dataStream: stream.Readable;
  statusCode: HttpStatusCode;
  headers: http.OutgoingHttpHeaders;
  private contentType;

  constructor(statusCode: HttpStatusCode, data: ResponseData, headers?: http.OutgoingHttpHeaders);
}
export {};
