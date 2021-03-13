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

const Comic = new GraphQLObjectType({
  name: 'Comic',
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

const EventSummary = new GraphQLObjectType({
  name: 'EventSummary',
  fields: () => ({
    resourceURI: { type: GraphQLString },
    name: { type: GraphQLString },
  })
})

const Event = new GraphQLObjectType({
  name: 'Event',
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
  })
})

const SeriesSummary = new GraphQLObjectType({
  name: 'SeriesSummary',
  fields: () => ({
    resourceURI: { type: GraphQLString },
    name: { type: GraphQLString },
  })
})

const Series = new GraphQLObjectType({
  name: 'Series',
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
  })
})

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
      type: new GraphQLList(Comic),
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
    events: {
      type: new GraphQLList(Series),
      async resolve(parent, args) {
        try {
          const url = getUrlById(`characters/${parent.id}/series`);
          const result = await axios.get<MarvelApiResponse>(url);
          return result.data.data.results;
        } catch (error) {
          console.log('🚀 ~ file: index.ts ~ line 39 ~ resolve ~ error', error);
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
          console.log('🚀 ~ file: index.ts ~ line 39 ~ resolve ~ error', error);
        }
      },
    }
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
