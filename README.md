# Savage Framework

__Savage__ is modern & minimal REST API framework for Node.JS. It has no any dependencies and written in clean Node.JS
std library. __Savage__ is one of fastest HTTP frameworks around the world cause it doen't transform any parts of
HTTP requests (like POST data). Except it, __Savage__ is stream based framework.

## Scaffold

```typescript
import Savage, {Response} from "@congritta/savage";

const HTTP_SERVER_PORT = 8000;
const HTTP_SERVER_HOST = '127.0.0.1';

const savageServer = new Savage(HTTP_SERVER_PORT, HTTP_SERVER_HOST);

/* Handle GET request */
savageServer.on('GET', '/', () => {
  return new Response(200, 'Hello World');
})

/* Handle POST request */
savageServer.on('POST', '/', async (ctx) => {

  /* Get POST data */
  const data = await ctx.parseBody()

  /* Show POST data */
  console.log(data);

  /* Respond with string */
  return new Response(200, 'Hello World');
});

savageServer.start().then(() => {
  console.log(`HTTP server started at http://${HTTP_SERVER_HOST}:${HTTP_SERVER_PORT}`);
});
```

## Features

- Stream & Promise based;
- Written in clean Node.JS 'http' module;
- Savage is fast and minimal so HTTP requests are not being transformed initially. Only a developer decides when Savage
  has to parse POST data;

## Docs

Official Savage docs are being written at now
