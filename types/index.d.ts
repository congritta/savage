/// <reference types="node" />
import http from "http";
import Response from "./entities/Response";
import {Handler, HttpMethod, Middleware} from "./types";
import corsMW from "./utils/corsMW";

export default class Savage {
  server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>;
  port: number;
  host: string;
  handlers: Map<string, Handler>;
  middlewares: Middleware[];
  private respond;

  constructor(port: number, host?: string);

  use(fn: Middleware): void;

  on(method: HttpMethod, path: string, handler: Handler): void;

  start(): Promise<void>;
}
export {Response, corsMW};
