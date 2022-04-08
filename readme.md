# Node.JS 16.13.0 Zip Deploy Repro

## Setup

1. Create a new Azure Function App from the Azure Portal
1. Install Node.JS `v16.13.0` (nvm recommended for easy Node.JS version switching)
   1. Use `v14.18.1` for verifying expected bahavior
2. Run `npm install`
3. Fill out `credentials.example.ts` and rename it to `credentials.ts`.
   1. Get your authentication header from the [Azure REST API Try It Feature](https://docs.microsoft.com/en-us/rest/api/appservice/list-skus/list-skus?source=docs#code-try-0). Sign in, then copy the authorization header from the Request Preview section.
4. Run `npm run compile`
5. Run `npm run start`

### Node.JS `v14.18.1` - working

```
Node.JS version: v14.18.1
HEAD response: { status: 200, statusText: 'OK' }
Sending post request...
POST response:  { status: 202, statusText: 'Accepted' }
Script duration: 4.318s
```

### Node.JS `v16.13.0` - broken

```
Node.JS version: v16.13.0
HEAD response: { status: 200, statusText: 'OK' }
Sending post request...
POST request failed.
FetchError: request to https://<REDACTED>.scm.azurewebsites.net/api/zipdeploy?isAsync=true&author=VS%20Code failed, reason: read ECONNRESET
    at ClientRequest.<anonymous> (/Users/alex/temp/zipdeploy-repro/node_modules/node-fetch/lib/index.js:1491:11)
    at ClientRequest.emit (node:events:402:35)
    at TLSSocket.socketErrorListener (node:_http_client:447:9)
    at TLSSocket.emit (node:events:390:28)
    at emitErrorNT (node:internal/streams/destroy:157:8)
    at emitErrorCloseNT (node:internal/streams/destroy:122:3)
    at processTicksAndRejections (node:internal/process/task_queues:83:21) {
  type: 'system',
  errno: 'ECONNRESET',
  code: 'ECONNRESET'
}
Script duration: 2:10.132 (m:ss.mmm)
```