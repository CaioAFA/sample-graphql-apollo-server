<template>
  <v-row justify="center">
    <v-col cols="11">
      <v-row>
        <v-col cols="4">
          <v-text-field
            v-model="login"
            label="Login"
          ></v-text-field>
        </v-col>

        <v-col cols="4">
          <v-text-field
            v-model="password"
            label="Senha"
          ></v-text-field>
        </v-col>

        <v-col cols="2">
          <v-checkbox
            v-model="isAdmin"
            :label="isAdmin ? 'Admin' : 'Usuario'"
          ></v-checkbox>
        </v-col>

        <v-col cols="2" justify="center" align="center">
          <v-container justify="center" align="center">
            <v-btn color="primary" raised @click="createUser">Criar</v-btn>
          </v-container>
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
          v-show="createdUser != null"
        >
          <h3>USUÁRIO CRIADO</h3>
          <b>ID: </b> {{ createdUser && createdUser.id }}
          <br/>
          <b>Login: </b> {{ createdUser && createdUser.login }}
          <br/>
          <b>Administrador: </b> {{ createdUser && createdUser.is_admin ? 'Sim' : 'Não' }}
          <br/>
          <br/>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import { gql } from "nuxt-graphql-request"
import { getErrorFromRawMessage } from '../helpers/graphQlErrorHandler'

export default {
  data() {
    return {
      login: "",
      password: "",
      isAdmin: false,
      errorMessage: "",
      createdUser: null
    };
  },
  methods: {
    async createUser(){
      const mutation = gql`
        mutation($data: CreateUserInput!){
          createUser(data: $data) {
            id
            is_admin
            login
          }
        }
      `;

      const data = {
        is_admin: this.isAdmin,
        login: this.login,
        password: this.password
      }

      try{
        const result = await this.$graphql.default.request(mutation, { data });
        const user = result.createUser

        if(!user){
          this.createUser = null
          return this.errorMessage = "Nenhum usuário criado"
        }

        this.createdUser = user
        this.is_admin = false
        this.login = "",
        this.password = ""
        this.errorMessage = ""
      }
      catch(e){
        this.errorMessage = getErrorFromRawMessage(e.message)
        this.createdUser = null
      }
    }
  }
};
</script>

<style>
</style>