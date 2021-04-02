import { gql } from '@apollo/client';
const GET_CHARACTERS = gql`
query Characters($nameStartsWith: String) {    
    characters(nameStartsWith: $nameStartsWith)  {
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
      events {
        id
        title
        description
        start
        end
        thumbnail {
          path
          extension
        }
        next {
          name
        }
        previous{
          name
        }
        creators {
          available
          items {
            name
            role
          }
        }
        characters {
          available
          items {
            resourceURI
            name
          }
        }
      }  
      comics {
        id
        title
        description
        pageCount
        textObjects{
          text
        }
        prices{
          type
          price
        }
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