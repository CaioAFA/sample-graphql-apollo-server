<template>
  <v-row>
    <UsersFilterAction
      :setUserFilterId="(event) => userId = event.target.value"
      :setUserFilterLogin="(event) => userLogin = event.target.value"
      :buttonClickHandler="getUserByFilter"
      :disabled="!(userId || userLogin)"
      buttonText="Buscar Usuários"
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
        v-show="user != null"
      >
        <b>ID: </b> {{ user && user.id }}
        <br/>
        <b>Login: </b> {{ user && user.login }}
        <br/>
        <b>Administrador: </b> {{ user && user.is_admin ? 'Sim' : 'Não' }}
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
      userId: '',
      userLogin: '',
      errorMessage: '',
      user: null
    };
  },
  methods: {
    async getUserByFilter(){
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
        "id": parseInt(this.userId),
        "login": this.userLogin
      }

      try{
        const result = await this.$graphql.default.request(query, { filter });
        const { user } = result

        if(!user){
          this.user = null
          return this.errorMessage = "Nenhum usuário encontrado"
        }

        this.user = user
        this.errorMessage = ""
      }
      catch(e){
        this.errorMessage = getErrorFromRawMessage(e.message)
        this.user = null
      }
    }
  }
}
</script>

<style>

</style>