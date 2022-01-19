<template>
  <form autocomplete="off">
    <br>
    <v-row justify="center">
      <v-col cols="11">
        <v-row>
          <v-col cols="6">
            <v-text-field
              v-model="name"
              label="Nome"
            ></v-text-field>
          </v-col>

          <v-col cols="6">
            <v-autocomplete
              :items="countriesList"
              :filter="customCountryFilter"
              auto-select-first
              v-model="bornCountry"
              label="País de Origem"
            ></v-autocomplete>
          </v-col>

        </v-row>

        <v-row>
          <v-col
            @click="(event) => getMusicList()"
            cols="10"
          >
            <v-autocomplete
              :items="musicList"
              v-model="selectedMusics"
              label="Músicas"
              chips
              deletable-chips
              auto-select-first
              multiple
            ></v-autocomplete>
          </v-col>

          <v-col cols="2" id="createButtonWrapper">
              <v-btn
                color="primary"
                raised
                @click="createAuthor"
                :disabled="!canSubmit"
              >Criar</v-btn>
          </v-col>
        </v-row>

        <v-row
          justify="center"
        >
          <v-col
            cols="12"
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

          <v-col cols="12"
            v-show="createdAuthor != null"
          >
            <h3>AUTOR CRIADO</h3>
            <b>ID: </b> {{ createdAuthor && createdAuthor.id }}
            <br/>
            <b>Nome: </b> {{ createdAuthor && createdAuthor.name }}
            <br/>
            <b>País de Origem: </b> {{ createdAuthor && createdAuthor.born_country }}
            <br/>
            <b>Músicas: </b> {{ createdAuthor && createdAuthor.musics.map(m => m.name).join(", ") }}
            <br/>
            <br/>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </form>
</template>

<script>
import { gql } from "nuxt-graphql-request"
import { getErrorFromRawMessage } from '../helpers/graphQlErrorHandler'
import { getAllCountriesList, compareCountryNames } from '../helpers/countries'
import { getAllMusicIdsAndNames } from '../helpers/musics'

export default {
  data() {
    return {
      name: "",
      bornCountry: "",
      selectedMusics: [],
      errorMessage: "",
      countriesList: getAllCountriesList(),
      createdAuthor: null,
      musicList: []
    };
  },
  computed: {
    canSubmit(){
      return this.name && this.bornCountry
    }
  },
  methods: {
    async createAuthor(){
      const mutation = gql`
        mutation($data: CreateAuthorInput!){
          createAuthor(data: $data) {
            id
            born_country
            name
            musics {
              name
            }

          }
        }
      `;

      const data = {
        name: this.name,
        born_country: this.bornCountry,
        musics_ids: this.selectedMusics
      }

      try{
        const result = await this.$graphql.default.request(mutation, { data });
        const author = result.createAuthor

        if(!author){
          this.createdAuthor = null
          return this.errorMessage = "Nenhum autor criado"
        }

        this.createdAuthor = author
        this.name = ""
        this.bornCountry = ""
        this.errorMessage = ""
        this.selectedMusics = []
      }
      catch(e){
        this.errorMessage = getErrorFromRawMessage(e.message)
        this.createdAuthor = null
      }
    },
    customCountryFilter (item, queryText, itemText) {
      return compareCountryNames(queryText, item)
    },
    async getMusicList(){
      if(this.musicList.length) return
      const musics = await getAllMusicIdsAndNames(this)
      this.musicList = musics.map(m => {return {text: m.name, value: m.id}})
    }
  }
};
</script>

<style>
#createButtonWrapper{
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
</style>