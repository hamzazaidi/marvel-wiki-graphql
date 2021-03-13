import { GraphQLObjectType, GraphQLID, GraphQLString } from "graphql";
import { ComicSummary } from "../comic";
import { Avatar } from "../shared";

export const Story = new GraphQLObjectType({
    name: 'Story',
    fields: () => ({
      id: { type: GraphQLID },
      title: { type: GraphQLString },
      description: { type: GraphQLString },
      resourceURI: { type: GraphQLString },
      type: { type: GraphQLString },
      modified: { type: GraphQLString },
      thumbnail: { type: Avatar },
      originalissue: { type: ComicSummary }
    })
  })
  
  