import { GraphQLObjectType, GraphQLString } from "graphql";

export const TextObject = new GraphQLObjectType({
  name: "TextObject",
  fields: () => ({
    type: { type: GraphQLString },
    language: { type: GraphQLString },
    text: { type: GraphQLString },
  }),
});

export const Url = new GraphQLObjectType({
  name: "Url",
  fields: () => ({
    type: { type: GraphQLString },
    url: { type: GraphQLString },
  }),
});

export const Avatar = new GraphQLObjectType({
  name: "Avatar",
  fields: () => ({
    path: { type: GraphQLString },
    extension: { type: GraphQLString },
  }),
});
