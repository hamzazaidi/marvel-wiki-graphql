import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
} from "graphql";
import { Avatar, Url } from "../shared";

export const SeriesSummary = new GraphQLObjectType({
  name: "SeriesSummary",
  fields: () => ({
    resourceURI: { type: GraphQLString },
    name: { type: GraphQLString },
  }),
});

export const Series = new GraphQLObjectType({
  name: "Series",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    resourceURI: { type: GraphQLString },
    urls: { type: new GraphQLList(Url) },
    startYear: { type: GraphQLInt },
    endYear: { type: GraphQLInt },
    rating: { type: new GraphQLList(Url) },
    modified: { type: new GraphQLList(Url) },
    thumbnail: { type: Avatar },
    next: { type: SeriesSummary },
    previous: { type: SeriesSummary },
  }),
});
