<template>
  <v-row>
    <UsersFilterAction
      :setUserFilterId="(event) => userId = event.target.value"
      :setUserFilterLogin="(event) => userLogin = event.target.value"
      :buttonClickHandler="deleteUserByFilter"
      :disabled="!(userId || userLogin)"
      buttonText="Deletar Usuário"
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
        <h3>USUÁRIO DELETADO</h3>
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
    async deleteUserByFilter(){
      const query = gql`
        mutation($filter: UserFilter!){
          deleteUser(filter: $filter) {
            id
            is_admin
            login
          }
        }
      `;

      const filter = {
        "id": parseInt(this.userId),
        "login": this.userLogin
      }

      try{
        const result = await this.$graphql.default.request(query, { filter });
        const user = result.deleteUser

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