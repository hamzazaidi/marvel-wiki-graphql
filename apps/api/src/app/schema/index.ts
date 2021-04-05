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

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    character: {
      type: Character,
      args: {
        id: { type: GraphQLID },
      },
      async resolve(parent, args) {
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
          console.log('Args ===>', args) 
          const params = pruneParams({
            ...args
          })
          console.log('Params ==>', params)
          const url = getUrl("characters", { ...params });
          const result = await axios.get<MarvelApiResponse>(url);
          const { results, ...metaData } = result.data.data;
          context.res.set('meta-data', JSON.stringify(metaData));
          return results;
        } catch (error) {
          console.log("🚀 ~ file: index.ts ~ line 37 ~ resolve ~ error", error);
        }
      },
    },
  },
});

export const schema = new GraphQLSchema({
  query: RootQuery,
});
