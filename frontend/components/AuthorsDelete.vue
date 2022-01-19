<template>
  <v-row>
    <AuthorsFilterAction
      :setAuthorFilterId="(event) => authorId = event.target.value"
      :setAuthorFilterName="(event) => authorName = event.target.value"
      :buttonClickHandler="deleteAuthorByFilter"
      :disabled="!(authorId || authorName)"
      buttonText="Deletar Autor"
    />

    <v-row
      justify="center"
    >
      <v-col
        cols="11"
        v-show="errorMessage"
      >
        <v-alert
          dense
          elevation="2"
          type="error"
          :value="errorMessage != ''"
          transition="scale-transition"
        >{{ errorMessage }}</v-alert>
        <br/>
      </v-col>

      <v-col cols="11"
        v-show="author != null"
      >
        <b>ID: </b> {{ author && author.id }}
        <br/>
        <b>Nome: </b> {{ author && author.name }}
        <br/>
        <b>País de Origem: </b> {{ author && author.born_country }}
        <br/>
        <br/>
      </v-col>
    </v-row>
  </v-row>
</template>

<script>
import { gql } from "nuxt-graphql-request"
import { getErrorFromRawMessage } from '../helpers/graphQlErrorHandler'

export default {
  data(){
    return {
      authorId: '',
      authorName: '',
      errorMessage: '',
      author: null
    };
  },
  methods: {
    async deleteAuthorByFilter(){
      const query = gql`
        mutation($filter: AuthorFilter!){
          deleteAuthor(filter: $filter) {
            id
            born_country
            name
          }
        }
      `;

      const filter = {
        "id": parseInt(this.authorId),
        "name": this.authorName
      }

      try{
        const result = await this.$graphql.default.request(query, { filter });
        const author = result.deleteAuthor

        if(!author){
          this.author = null
          return this.errorMessage = "Nenhum autor encontrado"
        }

        this.author = author
        this.errorMessage = ""
      }
      catch(e){
        this.errorMessage = getErrorFromRawMessage(e.message)
        this.author = null
      }
    }
  }
}
</script>

<style>

</style>