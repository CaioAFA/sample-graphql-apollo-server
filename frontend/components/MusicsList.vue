<template>
  <v-col cols="12">
    <v-row>
      <v-spacer />

      <v-btn
        color="primary"
        raised
        id="list-musics-button"
        @click="listMusics"
      >Listar Músicas</v-btn>
    </v-row>

    <v-row>
      <v-alert
        id="errorAlert"
        dense
        elevation="2"
        type="error"
        :value="errorMessage != ''"
        transition="scale-transition"
      >{{ errorMessage }}</v-alert>
    </v-row>

    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">
              ID
            </th>
            <th class="text-left">
              Nome
            </th>
            <th>
              Cantor / Banda
            </th>
            <th>
              Ano
            </th>
            <th>
              Gênero
            </th>
            <th>
              Autores
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="m in musics"
            :key="m.id"
          >
            <td>{{ m.id }}</td>
            <td>{{ m.name }}</td>
            <td>{{ m.singer }}</td>
            <td>{{ m.year }}</td>
            <td>{{ m.genre }}</td>
            <td>{{ formatAuthors(m.authors) }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-col>
</template>

<script>
import { gql } from "nuxt-graphql-request"
import { getErrorFromRawMessage } from '../helpers/graphQlErrorHandler'

export default {
  data(){
    return {
      musics: [],
      errorMessage: ""
    };
  },
  methods: {
    async listMusics(){
      const query = gql`
        query{
          musics {
            genre
            id
            name
            singer
            year
            authors {
              name
            }
          }
        }
      `;

      try{
        const req = await this.$graphql.default.request(query);
        const { musics } = req
        this.musics = musics
        this.errorMessage = ""
      }
      catch(e){
        this.errorMessage = getErrorFromRawMessage(e)
        console.log(e)
      }
    },
    formatAuthors(authors){
      const truncateSize = 50

      const text = authors.map(m => m.name).join(', ')

      if(text.length > truncateSize){
        return text.substring(0, truncateSize - 1) + '...'
      }

      return text
    }
  }
}
</script>

<style scoped>
#list-users-button{
  margin-right: 20px;
}
</style>