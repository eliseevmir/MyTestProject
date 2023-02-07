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
      hello: {
        type: new GraphQLNonNull(GraphQLString),
        args: {
          word: {
            type: new GraphQLNonNull(GraphQLString),
          },
        },
        resolve: (_p, args, context) => {
          const { word } = args;

          return `hello ${word}`;
        },
      },
    }),
  }),
});

export default schema;
