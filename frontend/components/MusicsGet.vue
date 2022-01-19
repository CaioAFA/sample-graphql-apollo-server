<template>
  <v-row>
    <MusicsFilterAction
      :setMusicFilterId="(event) => musicId = event.target.value"
      :buttonClickHandler="getMusicByFilter"
      :disabled="!(musicId)"
      buttonText="Buscar Música"
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
        v-show="music != null"
      >
        <b>ID: </b> {{ music && music.id }}
        <br/>
        <b>Nome: </b> {{ music && music.name }}
        <br/>
        <b>Cantor / Banda: </b> {{ music && music.singer }}
        <br/>
        <b>Gênero: </b> {{ music && music.genre }}
        <br/>
        <b>Ano: </b> {{ music && music.year }}
        <br/>
        <b>Autores: </b> {{ music && music.authors.map(a => a.name).join(", ") }}
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
      musicId: '',
      errorMessage: '',
      music: null
    };
  },
  methods: {
    async getMusicByFilter(){
      const query = gql`
        query($filter: MusicFilter!){
          music(filter: $filter) {
            id
            name
            singer
            year
            genre
            authors {
              name
            }
          }
        }
      `;

      const filter = {
        "id": parseInt(this.musicId)
      }

      try{
        const result = await this.$graphql.default.request(query, { filter });
        const { music } = result

        if(!music){
          this.music = null
          return this.errorMessage = "Nenhuma música encontrada"
        }

        this.music = music
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