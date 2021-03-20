import { gql, useQuery } from "@apollo/client";
import React from "react";

const GET_USERS = gql`
{
  characters {
    id
  }
}
`
const Test = () => {

  const { loading, error, data } = useQuery(GET_USERS);


    return (
        <div>
            { JSON.stringify(data) }
        </div>
    );
}
 
export default Test;