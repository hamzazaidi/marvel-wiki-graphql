import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLSchema,
  GraphQLID,
} from "graphql";
import axios from "axios";
import { getUrl } from "../helper/url";
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
          console.log("🚀 ~ file: index.ts ~ line 39 ~ resolve ~ error", error);
        }
      },
    },
    characters: {
      type: new GraphQLList(Character),
      async resolve(parent, args) {
        try {
          const url = getUrl("characters");
          const result = await axios.get<MarvelApiResponse>(url);
          return result.data.data.results;
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
