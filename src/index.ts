import http from "node:http";
import { graphql } from "graphql";

import schema from "./schema";

const server = http.createServer();

server.on("request", async (req, res) => {
  res.statusCode = 200;
  res.setHeader("content-type", "application/json");

  // const responce = JSON.stringify({
  //   foo: "ok",
  // });

  // res.write(responce);

  const d = /* GraphQl */ `
    query Test ($name: String! $userId: ID!) {
      hello(word: $name) 
      user (userId: $userId) {
        id
        name
        age
      }
  }
  `;

  const a = await graphql({
    schema,
    source: d,
    variableValues: { name: "Ivan", userId: 123 },
    contextValue: {foo: 'bar'}
  });
  console.log(a);

  res.write(JSON.stringify({ foo: "bar" }));
  res.end();
});

server.listen(8080, "localhost", () => {
  console.log("Server started at http://localhost:8080");
});
