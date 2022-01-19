<template>
  <div>

    <h3>&nbsp;&nbsp;Filtro: </h3>
    <MusicsFilterAction
      :setMusicFilterId="(event) => filterMusicId = event.target.value"
    />

    <h3>&nbsp;&nbsp;Dados para atualizar: </h3>
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
              <v-text-field
                v-model="singer"
                label="Cantor / Banda"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="6">
              <v-select
                :items="yearsList"
                v-model="year"
                label="Ano"
              ></v-select>
            </v-col>

            <v-col cols="6">
              <v-text-field
                v-model="genre"
                label="Gênero"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col
              cols="8"
            >
              <v-autocomplete
                :items="authorList"
                v-model="selectedAuthors"
                label="Autores"
                chips
                deletable-chips
                auto-select-first
                multiple
                no-data-text="Atualize a lista"
              ></v-autocomplete>
            </v-col>

            <v-col cols="2" class="buttonsWrapper">
              <v-btn
                color="primary"
                raised
                @click="getAuthorList"
              >
                {{ !this.authorList.length ? 'Listar' : 'Atualizar' }}
              </v-btn>
            </v-col>

            <v-col cols="2" class="buttonsWrapper">
              <v-btn
                color="primary"
                raised
                @click="updateMusic"
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
              v-show="updatedMusic != null"
            >
              <b>ID: </b> {{ updatedMusic && updatedMusic.id }}
              <br/>
              <b>Nome: </b> {{ updatedMusic && updatedMusic.name }}
              <br/>
              <b>Cantor / Banda: </b> {{ updatedMusic && updatedMusic.singer }}
              <br/>
              <b>Gênero: </b> {{ updatedMusic && updatedMusic.genre }}
              <br/>
              <b>Ano: </b> {{ updatedMusic && updatedMusic.year }}
              <br/>
              <b>Autores: </b> {{ updatedMusic && updatedMusic.authors.map(m => m.name).join(", ") }}
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
import { getAllAuthorIdsAndNames } from '../helpers/authors'

export default {
  data() {
    const now = new Date()
    const actualYear = now.getFullYear()
    const yearsList = []

    for(let i = 1700; i < actualYear; i++){
      yearsList.push({text: i, value: i})
    }

    return {
      name: "",
      singer: "",
      year: "",
      genre: "",
      yearsList,
      filterMusicId: "",
      selectedAuthors: [],
      errorMessage: "",
      countriesList: [],
      updatedMusic: null,
      authorList: []
    };
  },
  computed: {
    canSubmit(){
      return this.name && this.singer && this.year && this.genre && this.filterMusicId
    }
  },
  methods: {
    async updateMusic(){
      const mutation = gql`
        mutation($filter: MusicFilter!, $data: UpdateMusicInput!){
          updateMusic(filter: $filter, data: $data) {
            id
            name
            singer
            year
            genre
            authors {
              id
              name
              born_country
            }
          }
        }
      `;

      const data = {
        genre: this.genre,
        name: this.name,
        singer: this.singer,
        year: `${this.year}`,
        authors_ids: this.selectedAuthors
      }

      const filter = {
        id: parseInt(this.filterMusicId),
      }

      try{
        const result = await this.$graphql.default.request(mutation, { data, filter });
        const music = result.updateMusic

        if(!music){
          this.updatedMusic = null
          return this.errorMessage = "Nenhuma música atualizada"
        }

        this.updatedMusic = music
        this.genre = ""
        this.name = "",
        this.singer = ""
        this.year = ""
        this.filterMusicId = ""
        this.selectedAuthors = []
        this.errorMessage = ""
      }
      catch(e){
        this.errorMessage = getErrorFromRawMessage(e.message)
        this.updatedMusic = null
      }
    },
    async getAuthorList(){
      if(this.authorList.length) return
      const authors = await getAllAuthorIdsAndNames(this)
      this.authorList = authors.map(a => {return {text: a.name, value: a.id}})
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