import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
} from "graphql";
import { Avatar, Creators, EntityCharacters, Url } from "../shared";

export const EventSummary = new GraphQLObjectType({
  name: "EventSummary",
  fields: () => ({
    resourceURI: { type: GraphQLString },
    name: { type: GraphQLString },
  }),
});

export const Event = new GraphQLObjectType({
  name: "Event",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    resourceURI: { type: GraphQLString },
    urls: { type: new GraphQLList(Url) },
    modified: { type: GraphQLString },
    start: { type: GraphQLString },
    end: { type: GraphQLString },
    thumbnail: { type: Avatar },
    next: { type: EventSummary },
    previous: { type: EventSummary },
    creators: { type: Creators },
    characters: { type: EntityCharacters }
  }),
});
