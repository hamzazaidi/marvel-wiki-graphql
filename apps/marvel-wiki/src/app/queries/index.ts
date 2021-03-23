import { gql } from '@apollo/client';
const GET_CHARACTERS = gql`
  {
    characters {
        id
        name
        thumbnail {
            path
            extension
        }
    }
  }
`

const GET_CHARACTER = gql`
  query Character($id: ID) {
    character(id: $id) {
      id
      name
      description
      thumbnail {
        path
        extension
      }
      comics {
        id
        title
        description
        thumbnail {
          path
          extension
        }
        images {
          path
          extension
        }
      }
    }
  }
`


export {
    GET_CHARACTERS,
    GET_CHARACTER
}