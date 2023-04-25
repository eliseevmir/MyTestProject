import http from "node:http";
import url from "url";
import { graphql } from "graphql";
import schema from "./schema";

const graphqlHTTP = async (
  req: http.IncomingMessage,
  res: http.ServerResponse
) => {
  const params = url.parse(req.url || "", true);

  const query = params.query.q;

  const result: any = {
    errors: [],
    data: null,
    extensions: null,
  };

  if (typeof query === "string") {
    const { errors, data, extensions } = await graphql({
      schema,
      source: query,
    });

    result.errors = errors;
    result.data = data;
    result.extensions = extensions;
  }

  return result;
};

const bootstrap = async () => {
  const server = http.createServer();

  server.on("request", async (req, res) => {
    const { errors, data, extensions } = await graphqlHTTP(req, res);

    res.statusCode = 200;
    res.setHeader("content-type", "application/json");
    res.write(JSON.stringify({ errors, data, extensions }));

    return res.end();
  });

  server.listen(8080, "localhost", () => console.log("start"));
};

bootstrap();
