import { gql } from '@apollo/client';
const GET_CHARACTERS = gql`
query Characters($nameStartsWith: String, $offset: Int, $limit: Int) {    
    characters(nameStartsWith: $nameStartsWith, offset: $offset, limit: $limit)  {
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
        creators {
          items {
            name
            role
          }
        },
        characters {
          available
          items {
            resourceURI
            name
          }
        }
      }
    }
  }
`

const GET_COMICS = gql`
  query Comics($id: Int, $offset: Int, $limit: Int) {
    comics(id: $id, offset: $offset, limit: $limit)  {
      id
      title
      thumbnail {
        path
        extension
      }
    }
  }
`

const GET_EVENTS = gql`
  query Events($id: Int, $offset: Int, $limit: Int) {
    events(id: $id, offset: $offset, limit: $limit)  {
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
    }
  }
`

const GET_COMIC_BY_ID = gql`
query Comic($id: ID) {
  comic(id: $id) {
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
    creators {
      items {
        name
        role
      }
    },
    characters {
      available
      items {
        resourceURI
        name
      }
    }
  }
}
`

const GET_EVENT_BY_ID = gql`
query Event($id: ID) {
  event(id: $id) {
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
}
`


export {
  GET_CHARACTERS,
  GET_CHARACTER,
  GET_COMICS,
  GET_EVENTS,
  GET_COMIC_BY_ID,
  GET_EVENT_BY_ID
}