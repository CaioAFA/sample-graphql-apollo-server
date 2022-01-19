import { gql } from "nuxt-graphql-request"

export const getAllAuthorIdsAndNames = async (self) => {
  const query = gql`
    query{
      authors {
        id
        name
      }
    }
  `;

  try{
    const result = await self.$graphql.default.request(query);
    const authors = result.authors
    return authors
  }
  catch(e){
    console.log(e)
    return []
  }
}