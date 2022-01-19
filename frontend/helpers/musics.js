import { gql } from "nuxt-graphql-request"

export const getAllMusicIdsAndNames = async (self) => {
  const query = gql`
    query{
      musics {
        id
        name
      }
    }
  `;

  try{
    const result = await self.$graphql.default.request(query);
    const musics = result.musics
    return musics
  }
  catch(e){
    console.log(e)
    return []
  }
}