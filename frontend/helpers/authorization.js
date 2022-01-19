import { gql } from "nuxt-graphql-request"

export const getUser = async (id, login) => {
  const query = gql`
    query($filter: UserFilter!){
      user(filter: $filter) {
        id
        login
        is_admin
      }
    }
  `;

  const filter = {
    "id": parseInt(id),
    "login": login
  }

  const result = await $graphql.default.request(query, { filter });
  const { user } = result
  return user
}