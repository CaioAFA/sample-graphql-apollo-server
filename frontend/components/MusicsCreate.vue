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
              @click="createMusic"
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
            v-show="createdMusic != null"
          >
            <b>ID: </b> {{ createdMusic && createdMusic.id }}
            <br/>
            <b>Nome: </b> {{ createdMusic && createdMusic.name }}
            <br/>
            <b>Cantor / Banda: </b> {{ createdMusic && createdMusic.singer }}
            <br/>
            <b>Gênero: </b> {{ createdMusic && createdMusic.genre }}
            <br/>
            <b>Ano: </b> {{ createdMusic && createdMusic.year }}
            <br/>
            <b>Autores: </b> {{ createdMusic && createdMusic.authors.map(m => m.name).join(", ") }}
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
      selectedAuthors: [],
      errorMessage: "",
      countriesList: [],
      createdMusic: null,
      authorList: []
    };
  },
  computed: {
    canSubmit(){
      return this.name && this.singer && this.year && this.genre
    }
  },
  methods: {
    async createMusic(){
      const mutation = gql`
        mutation($data: CreateMusicInput!){
          createMusic(data: $data) {
            id
            genre
            name
            singer
            year
            authors {
              id
              born_country
              name
            }
          }
        }
      `;

      const data = {
        name: this.name,
        genre: this.genre,
        singer: this.singer,
        year: `${this.year}`,
        authors_ids: this.selectedAuthors
      }

      try{
        const result = await this.$graphql.default.request(mutation, { data });
        const music = result.createMusic

        if(!music){
          this.createdMusic = null
          return this.errorMessage = "Nenhuma música criada"
        }

        this.createdMusic = music
        this.name = ""
        this.genre = ""
        this.singer = ""
        this.year = ""
        this.errorMessage = ""
        this.selectedAuthors = []
      }
      catch(e){
        this.errorMessage = getErrorFromRawMessage(e.message)
        this.createdMusic = null
      }
    },
    async getAuthorList(){
      if(this.authorList.length) return
      const authors = await getAllAuthorIdsAndNames(this)
      this.authorList = authors.map(a => {return {text: a.name, value: parseInt(a.id)}})
    }
  }
};
</script>

<style>
.buttonsWrapper{
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
</style>