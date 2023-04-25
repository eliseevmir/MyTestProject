import {
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from "graphql";

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "Query",
    fields: () => ({
      sayHello: {
        type: new GraphQLNonNull(GraphQLString),
        resolve: () => "hello",
      },
    }),
  }),
});

export default schema;