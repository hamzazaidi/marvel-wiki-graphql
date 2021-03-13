import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
} from 'graphql';
import axios from 'axios';
import { getUrlById } from '../helper/url';
import { MarvelApiResponse } from '@marvel-wiki/api-interfaces';

const TextObject = new GraphQLObjectType({
  name: 'TextObject',
  fields: () => ({
    type: { type: GraphQLString },
    language: { type: GraphQLString },
    text: { type: GraphQLString },
  })
})

const Url = new GraphQLObjectType({
  name: 'Url',
  fields: () => ({
    type: { type: GraphQLString },
    url: { type: GraphQLString },
  })
})

const ComicSummary = new GraphQLObjectType({
  name: 'ComicSummary',
  fields: () => ({
    resourceURI: { type: GraphQLString },
    name: { type: GraphQLString },
  })
})

const ComicPrice = new GraphQLObjectType({
  name: 'ComicPrice',
  fields:() => ({
    type: { type: GraphQLString },
    price: { type: GraphQLString },
  })
})

const Comics = new GraphQLObjectType({
  name: 'Comics',
  fields: () => ({
    id: { type: GraphQLID },
    digitalId: {type: GraphQLInt },
    title: { type: GraphQLString },
    variantDescription: { type: GraphQLString },
    description: { type: GraphQLString },
    modified:{ type: GraphQLString },
    isbn:{ type: GraphQLString },
    upc:{ type: GraphQLString },
    diamondCode:{ type: GraphQLString },
    ean:{ type: GraphQLString },
    issn:{ type: GraphQLString },
    format:{ type: GraphQLString },
    pageCount:{ type: GraphQLString },
    textObjects: { type: new GraphQLList(TextObject) },
    resourceURI: { type: GraphQLString },
    urls: { type: new GraphQLList(Url) },
    variants: { type: new GraphQLList(ComicSummary) },
    collections: { type: new GraphQLList(ComicSummary) },
    collectedIssues: { type: new GraphQLList(ComicSummary) },
    prices: { type: new GraphQLList(ComicPrice) },
    thumbnail: { type: Avatar },
    images: { type: new GraphQLList(Avatar) }
  }),
});

const Avatar = new GraphQLObjectType({
  name: 'Avatar',
  fields: () => ({
    path: { type: GraphQLString },
    extension: { type: GraphQLString },
  }),
});

const Character = new GraphQLObjectType({
  name: 'Character',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    modified: { type: GraphQLString },
    thumbnail: { type: Avatar },
    resourceURI: { type: GraphQLString },
    comics: {
      type: new GraphQLList(Comics),
      async resolve(parent, args) {
        try {
          const url = getUrlById(`characters/${parent.id}/comics`);
          const result = await axios.get<MarvelApiResponse>(url);
          return result.data.data.results;
        } catch (error) {
          console.log('🚀 ~ file: index.ts ~ line 39 ~ resolve ~ error', error);
        }
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    character: {
      type: Character,
      args: {
        id: { type: GraphQLID },
      },
      async resolve(parent, args) {
        try {
          const url = getUrlById(`characters/${args.id}`);
          const result = await axios.get<MarvelApiResponse>(url);
          return result.data.data.results[0];
        } catch (error) {
          console.log('🚀 ~ file: index.ts ~ line 39 ~ resolve ~ error', error);
        }
      },
    },
  },
});

export const schema = new GraphQLSchema({
  query: RootQuery,
});
