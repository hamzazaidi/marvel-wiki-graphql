import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
} from "graphql";
import { Avatar, TextObject, Url } from "../shared";

export const ComicSummary = new GraphQLObjectType({
  name: "ComicSummary",
  fields: () => ({
    resourceURI: { type: GraphQLString },
    name: { type: GraphQLString },
  }),
});

export const ComicPrice = new GraphQLObjectType({
  name: "ComicPrice",
  fields: () => ({
    type: { type: GraphQLString },
    price: { type: GraphQLString },
  }),
});

export const Comic = new GraphQLObjectType({
  name: "Comic",
  fields: () => ({
    id: { type: GraphQLID },
    digitalId: { type: GraphQLInt },
    title: { type: GraphQLString },
    variantDescription: { type: GraphQLString },
    description: { type: GraphQLString },
    modified: { type: GraphQLString },
    isbn: { type: GraphQLString },
    upc: { type: GraphQLString },
    diamondCode: { type: GraphQLString },
    ean: { type: GraphQLString },
    issn: { type: GraphQLString },
    format: { type: GraphQLString },
    pageCount: { type: GraphQLString },
    textObjects: { type: new GraphQLList(TextObject) },
    resourceURI: { type: GraphQLString },
    urls: { type: new GraphQLList(Url) },
    variants: { type: new GraphQLList(ComicSummary) },
    collections: { type: new GraphQLList(ComicSummary) },
    collectedIssues: { type: new GraphQLList(ComicSummary) },
    prices: { type: new GraphQLList(ComicPrice) },
    thumbnail: { type: Avatar },
    images: { type: new GraphQLList(Avatar) },
  }),
});
