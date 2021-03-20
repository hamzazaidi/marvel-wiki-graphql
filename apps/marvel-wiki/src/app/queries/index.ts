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


export {
    GET_CHARACTERS
}