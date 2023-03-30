import {
  GraphQLID,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from "graphql";

const User = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: {
      description: "user id",
      type: new GraphQLNonNull(GraphQLID),
    },
    name: {
      description: "user name",
      type: new GraphQLNonNull(GraphQLString),
      resolve: (parrent, arg, context)=> {
        console.log(context)

        return parrent.name
      }
    },
    age: {
      description: "user age",
      type: new GraphQLNonNull(GraphQLInt),
      resolve: () => 27,
    },
  }),
});

const users = [
  { id: "123", name: "Ivan" },
  { id: "456", name: "Oleg" },
];

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
        resolve: (_p, args) => {
          const { word } = args;

          return `hello ${word}`;
        },
      },
      user: {
        type: User,
        args: {
          userId: {
            type: new GraphQLNonNull(GraphQLID),
          },
        },
        // type: new GraphQLNonNull(User),
        resolve: (_p, args) => {
          const { userId } = args;
          const user = users.find(({ id }) => {
            return id === userId;
          });
          return user || null;
        },
      },
      // пользователь: {
      //   тип будет возвращен: '<User>',
      //   // возвращаемое значение: () => {
      //   //   return {
      //   //     id: '12',
      //   //     name: 'ivan'
      //   //   }
      //   // }
      // }
    }),
  }),
});

export default schema;
