<template>
  <v-row>
    <MusicsFilterAction
      :setMusicFilterId="(event) => musicId = event.target.value"
      :buttonClickHandler="deleteMusicByFilter"
      :disabled="!(musicId)"
      buttonText="Deletar Música"
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
    async deleteMusicByFilter(){
      const query = gql`
        mutation($filter: MusicFilter!){
          deleteMusic(filter: $filter) {
            id
            name
            singer
            year
            genre
          }
        }
      `;

      const filter = {
        "id": parseInt(this.musicId),
      }

      try{
        const result = await this.$graphql.default.request(query, { filter });
        const music = result.deleteMusic

        if(!music){
          this.music = null
          return this.errorMessage = "Nenhuma música encontrada"
        }

        this.music = music
        this.errorMessage = ""
      }
      catch(e){
        this.errorMessage = getErrorFromRawMessage(e.message)
        this.music = null
      }
    }
  }
}
</script>
