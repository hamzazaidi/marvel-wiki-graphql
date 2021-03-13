import { MarvelApiResponse } from "@marvel-wiki/api-interfaces";
import axios from "axios";
import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
} from "graphql";
import { getUrlById } from "../../helper/url";
import { Comic } from "../comic";
import { Series } from "../series";
import { Avatar } from "../shared";
import { Event } from "../event";
import { Story } from "../story";

export const Character = new GraphQLObjectType({
  name: "Character",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    modified: { type: GraphQLString },
    thumbnail: { type: Avatar },
    resourceURI: { type: GraphQLString },
    comics: {
      type: new GraphQLList(Comic),
      async resolve(parent, args) {
        try {
          const url = getUrlById(`characters/${parent.id}/comics`);
          const result = await axios.get<MarvelApiResponse>(url);
          return result.data.data.results;
        } catch (error) {
          console.log("🚀 ~ file: index.ts ~ line 39 ~ resolve ~ error", error);
        }
      },
    },
    events: {
      type: new GraphQLList(Series),
      async resolve(parent, args) {
        try {
          const url = getUrlById(`characters/${parent.id}/series`);
          const result = await axios.get<MarvelApiResponse>(url);
          return result.data.data.results;
        } catch (error) {
          console.log("🚀 ~ file: index.ts ~ line 39 ~ resolve ~ error", error);
        }
      },
    },
    series: {
      type: new GraphQLList(Event),
      async resolve(parent, args) {
        try {
          const url = getUrlById(`characters/${parent.id}/events`);
          const result = await axios.get<MarvelApiResponse>(url);
          return result.data.data.results;
        } catch (error) {
          console.log("🚀 ~ file: index.ts ~ line 39 ~ resolve ~ error", error);
        }
      },
    },
    stories: {
      type: new GraphQLList(Story),
      async resolve(parent, args) {
        try {
          const url = getUrlById(`characters/${parent.id}/stories`);
          const result = await axios.get<MarvelApiResponse>(url);
          return result.data.data.results;
        } catch (error) {
          console.log("🚀 ~ file: index.ts ~ line 39 ~ resolve ~ error", error);
        }
      },
    },
  }),
});
