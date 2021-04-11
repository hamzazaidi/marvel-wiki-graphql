import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLSchema,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
} from "graphql";
import axios from "axios";
import { getUrl, pruneParams } from "../helper/url";
import { MarvelApiResponse } from "@marvel-wiki/api-interfaces";
import { Character } from "./character";
import { Comic } from "./comic";
import { Event } from "./event";

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    character: {
      type: Character,
      args: {
        id: { type: GraphQLID },
      },
      async resolve(parent, args, context) {
        try {
          const url = getUrl(`characters/${args.id}`);
          const result = await axios.get<MarvelApiResponse>(url);
          return result.data.data.results[0];
        } catch (error) {
          console.log("🚀 ~ file: index.ts ~ line 39 ~ resolve ~ error");
        }
      },
    },
    characters: {
      type: new GraphQLList(Character),
      args: {
        nameStartsWith: { type: GraphQLString },
        limit: { type: GraphQLInt },
        offset: { type: GraphQLInt },
      },
      async resolve(parent, args, context) {
        try {
          const params = pruneParams({
            ...args
          })
          const url = getUrl("characters", { ...params });
          const result = await axios.get<MarvelApiResponse>(url);
          const { results, ...metaData } = result.data.data;
          context.res.set('meta-data', JSON.stringify({ ...metaData }));
          return results;
        } catch (error) {
          console.log("🚀 ~ file: index.ts ~ line 37 ~ resolve ~ error", error);
        }
      },
    },
    comics: {
      type: new GraphQLList(Comic),
      args: {
        id: { type: GraphQLInt },
        limit: { type: GraphQLInt },
        offset: { type: GraphQLInt },
      },
      async resolve(parent, args, context) {
        try {
          const params = pruneParams({
            ...args
          }, ['id'])
          const urlString = `characters/${args.id}/comics`
          const url = getUrl(urlString, { ...params });
          const result = await axios.get<MarvelApiResponse>(url);
          const { results, ...metaData } = result.data.data;
          context.res.set('meta-data-comics', JSON.stringify({ ...metaData }));
          return results;
        } catch (error) {
          console.log("🚀 ~ file: index.ts ~ line 37 ~ resolve ~ error", error.message);
        }
      }
    },
    events: {
      type: new GraphQLList(Event),
      args: {
        id: { type: GraphQLInt },
        limit: { type: GraphQLInt },
        offset: { type: GraphQLInt },
      },
      async resolve(parent, args, context) {
        try {
          const params = pruneParams({
            ...args
          }, ['id'])
          const urlString = `characters/${args.id}/events`
          const url = getUrl(urlString, { ...params });
          console.log('url ===>', url)
          const result = await axios.get<MarvelApiResponse>(url);
          const { results, ...metaData } = result.data.data;
          context.res.set('meta-data-events', JSON.stringify({ ...metaData }));
          return results;
        } catch (error) {
          console.log("🚀 ~ file: index.ts ~ line 37 ~ resolve ~ error", error.message);
        }
      }
    },
    comic: {
      type: Comic,
      args: {
        id: { type: GraphQLID },
      },
      async resolve(parent, args, context) {
        try {
          const url = getUrl(`comics/${args.id}`);
          const result = await axios.get<MarvelApiResponse>(url);
          return result.data.data.results[0];
        } catch (error) {
          console.log("🚀 ~ file: index.ts ~ line 39 ~ resolve ~ error");
        }
      },
    },
    event: {
      type: Event,
      args: {
        id: { type: GraphQLID },
      },
      async resolve(parent, args, context) {
        try {
          const url = getUrl(`events/${args.id}`);
          const result = await axios.get<MarvelApiResponse>(url);
          return result.data.data.results[0];
        } catch (error) {
          console.log("🚀 ~ file: index.ts ~ line 39 ~ resolve ~ error");
        }
      },
    },
  },
});

export const schema = new GraphQLSchema({
  query: RootQuery,
});
