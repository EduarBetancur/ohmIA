const http = require("node:http");
const { buildResponse } = require("./calculator");

const PORT = Number(process.env.PORT || 8080);

function readJsonBody(request) {
  return new Promise((resolve, reject) => {
    let body = "";

    request.on("data", (chunk) => {
      body += chunk;

      if (body.length > 1_000_000) {
        request.destroy();
        reject(new Error("Request body too large"));
      }
    });

    request.on("end", () => {
      if (!body) {
        resolve({});
        return;
      }

      try {
        resolve(JSON.parse(body));
      } catch (error) {
        reject(error);
      }
    });

    request.on("error", reject);
  });
}

function dialogflowResponse(text) {
  return {
    fulfillmentText: text,
    fulfillmentMessages: [
      {
        text: {
          text: [text],
        },
      },
    ],
  };
}

function sendJson(response, statusCode, payload) {
  response.writeHead(statusCode, {
    "content-type": "application/json; charset=utf-8",
  });
  response.end(JSON.stringify(payload));
}

const server = http.createServer(async (request, response) => {
  if (request.method === "GET" && request.url === "/health") {
    sendJson(response, 200, { ok: true, service: "ohmia-webhook" });
    return;
  }

  if (request.method !== "POST" || request.url !== "/webhook") {
    sendJson(response, 404, { error: "Not found" });
    return;
  }

  try {
    const payload = await readJsonBody(request);
    const queryText = payload.queryResult?.queryText || "";
    const action = payload.queryResult?.action || "";
    const answer = buildResponse(queryText, action);

    sendJson(response, 200, dialogflowResponse(answer));
  } catch (error) {
    sendJson(response, 400, dialogflowResponse("No pude leer la solicitud del webhook. Revisa que Dialogflow envie JSON valido."));
  }
});

if (require.main === module) {
  server.listen(PORT, () => {
    console.log(`ohmIA webhook listening on http://localhost:${PORT}`);
  });
}

module.exports = {
  server,
  dialogflowResponse,
};
