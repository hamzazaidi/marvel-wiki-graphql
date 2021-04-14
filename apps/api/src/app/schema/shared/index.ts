import { GraphQLList, GraphQLObjectType, GraphQLString } from "graphql";

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

export const Creator = new GraphQLObjectType({
  name: "Creator",
  fields: () => ({
    name: { type: GraphQLString },
    role: { type: GraphQLString }
  })
})

export const Creators = new GraphQLObjectType({
  name: "Creators",
  fields: () => ({
    available: { type: GraphQLString },
    items: { type: new GraphQLList(Creator) }
  })
})

export const EntityCharacter = new GraphQLObjectType({
  name: "EntityCharacter",
  fields: () => ({
    resourceURI: { type: GraphQLString },
    name: { type: GraphQLString }
  })
})

export const EntityCharacters = new GraphQLObjectType({
  name: "EntityCharacters",
  fields: () => ({
    available: { type: GraphQLString },
    items: { type: new GraphQLList(EntityCharacter) }
  })
})