<template>
  <div>

    <h3>&nbsp;&nbsp;Filtro: </h3>
    <AuthorsFilterAction
      :setAuthorFilterId="(event) => filterId = event.target.value"
      :setAuthorFilterName="(event) => filterName = event.target.value"
      id="noPaddingTop"
    />

    <h3>&nbsp;&nbsp;Dados para atualizar: </h3>
    <form autocomplete="off">

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

            <v-col cols="2" id="updateButtonWrapper">
                <v-btn
                  color="primary"
                  raised
                  @click="updateAuthor"
                  :disabled="!canSubmit"
                >Atualizar</v-btn>
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
              v-show="updatedAuthor != null"
            >
              <h3>AUTOR ATUALIZADO</h3>
              <b>ID: </b> {{ updatedAuthor && updatedAuthor.id }}
              <br/>
              <b>Nome: </b> {{ updatedAuthor && updatedAuthor.name }}
              <br/>
              <b>País de Origem: </b> {{ updatedAuthor && updatedAuthor.born_country }}
              <br/>
              <b>Músicas: </b> {{ updatedAuthor && updatedAuthor.musics.map(m => m.name).join(", ") }}
              <br/>
              <br/>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </form>
  </div>
</template>

<script>
import { gql } from "nuxt-graphql-request"
import { getErrorFromRawMessage } from '../helpers/graphQlErrorHandler'
import { getAllCountriesList, compareCountryNames } from '../helpers/countries'
import { getAllMusicIdsAndNames } from '../helpers/musics'

export default {
  data() {
    return {
      filterId: "",
      filterName: "",
      name: "",
      bornCountry: "",
      selectedMusics: [],
      errorMessage: "",
      countriesList: getAllCountriesList(),
      updatedAuthor: null,
      musicList: []
    };
  },
  computed: {
    canSubmit(){
      return this.name && this.bornCountry && (this.filterId || this.filterName)
    }
  },
  methods: {
    async updateAuthor(){
      const mutation = gql`
        mutation($filter: AuthorFilter!, $data: UpdateAuthorInput!){
          updateAuthor(filter: $filter, data: $data) {
            born_country
            id
            name
            musics {
              id
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

      const filter = {
        id: parseInt(this.filterId),
        name: this.filterName
      }

      try{
        const result = await this.$graphql.default.request(mutation, { data, filter });
        const author = result.updateAuthor

        if(!author){
          this.updatedAuthor = null
          return this.errorMessage = "Nenhum usuário criado"
        }

        this.updatedAuthor = author
        this.name = "",
        this.bornCountry = ""
        this.errorMessage = ""
        this.filterId = ""
        this.filterName = ""
        this.selectedMusics = []
      }
      catch(e){
        this.errorMessage = getErrorFromRawMessage(e.message)
        this.updatedAuthor = null
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
#updateButtonWrapper{
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

#noPaddingTop{
  padding-top: 0;
}
</style>