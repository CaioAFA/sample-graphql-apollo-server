<template>
  <v-row no-gutters>
    <h3>&nbsp;&nbsp;Filtro: </h3>
    <UsersFilterAction
      :setUserFilterId="(event) => filterUserId = event.target.value"
      :setUserFilterLogin="(event) => filterUserLogin = event.target.value"
    />

    <h3>&nbsp;&nbsp;Dados para atualizar: </h3>
    <v-col cols="12">
      <v-row  justify="center" no-gutters>
        
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
                <v-btn
                  color="primary"
                  raised
                  @click="updateUserByFilter"
                  :disabled="!canSubmit"
                >Atualizar</v-btn>
              </v-container>
            </v-col>
          </v-row>
        </v-col>

      </v-row>
    </v-col>

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
    </v-row>

    <v-row justify="center">
      <v-col cols="11"
        v-show="user != null"
      >
        <h3>USUÁRIO ATUALIZADO</h3>
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
      filterUserId: '',
      filterUserLogin: '',
      login: '',
      password: '',
      isAdmin: false,
      errorMessage: '',
      user: null
    };
  },
  computed: {
    canSubmit(){
      return this.filterUserId != '' || this.filterUserLogin != ''
    }
  },
  methods: {
    async updateUserByFilter(){
      const query = gql`
        mutation($filter: UserFilter!, $data: UpdateUserInput!){
          updateUser(filter: $filter, data: $data) {
            id
            is_admin
            login
          }
        }
      `;

      const filter = {
        "id": parseInt(this.filterUserId),
        "login": this.filterUserLogin
      }

      const data = {}
      if(this.isAdmin) data['is_admin'] = this.isAdmin
      if(this.login) data['login'] = this.login
      if(this.password) data['password'] = this.password

      try{
        const result = await this.$graphql.default.request(query, { filter, data });
        console.log(result)
        const user = result.updateUser

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