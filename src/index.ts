import http from "node:http";
import { graphqlHTTPFactory } from "@via-profit-services/core";
import schema from './schema'

const server = http.createServer();

const httplistener = graphqlHTTPFactory({
  schema,
  
});

server.on("request", async (req, res) => {
  res.statusCode = 200;
  res.setHeader("content-type", "application/json");

  // const responce = JSON.stringify({
  //   foo: "ok",
  // });

  // res.write(responce);
  const { data, errors, extensions } = await httplistener(req, res);
  res.write(JSON.stringify({ data, errors, extensions }));
  res.end()
});

server.listen(8080, "localhost", () => {
  console.log("Server started at http://localhost:8080");
});
