<template>
  <v-col cols="12">
    <v-row>
      <v-spacer />

      <v-btn
        color="primary"
        raised
        id="list-users-button"
        @click="listAuthors"
      >Listar Autores</v-btn>
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
            <th class="text-left">
              País de Origem
            </th>
            <th>
              Músicas
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="a in authors"
            :key="a.id"
          >
            <td>{{ a.id }}</td>
            <td>{{ a.name }}</td>
            <td>{{ a.born_country }}</td>
            <td>{{ formatMusics(a.musics) }}</td>
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
      authors: [],
      errorMessage: ""
    };
  },
  methods: {
    async listAuthors(){
      const query = gql`
        query{
          authors {
            id
            name
            born_country
            musics {
              name
            }
          }
        }
      `;

      try{
        const req = await this.$graphql.default.request(query);
        const { authors } = req
        this.authors = authors
        this.errorMessage = ""
      }
      catch(e){
        this.errorMessage = getErrorFromRawMessage(e)
        console.log(e)
      }
    },
    formatMusics(musics){
      const truncateSize = 50

      const text = musics.map(m => m.name).join(', ')

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