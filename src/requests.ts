import { RequestInit } from "node-fetch";
import { Readable } from 'stream';
import { authorization, kuduUrl } from "./credentials";

export const headUrl = kuduUrl;

export const headOpts: RequestInit = {
    body: undefined,
    headers: {
        "accept-language": "en",
        "x-ms-client-request-id": "5f12cca7-f4a1-4a27-9762-3943718d3ed9",
        "content-type": "application/json; charset=utf-8",
        authorization,
        "user-agent": "ms-rest-js/2.6.0 Node/v16.13.0 OS/(x64-Darwin-21.4.0) vscode-azurefunctions/1.6.2-alpha",
        "x-ms-correlation-request-id": "0dea9b95-59e0-4c46-affd-b2d3709a1006",
        cookie: "",
    },
    method: "HEAD",
    redirect: "manual",
};

export const postUrl = `${kuduUrl}/api/zipdeploy?isAsync=true&author=VS%20Code`;

export const postOpts = (body: Readable): RequestInit => ({
    body, // Readable
    headers: {
        "content-type": "application/octet-stream",
        authorization,
        "user-agent": "ms-rest-js/2.6.0 Node/v16.13.0 OS/(x64-Darwin-21.4.0) vscode-azurefunctions/1.6.2-alpha",
        cookie: "",
    },
    method: "POST",
    redirect: "manual",
});
