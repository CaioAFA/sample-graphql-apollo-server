<template>
  <v-col cols="12">
    <v-row>
      <v-spacer />

      <v-btn
        color="primary"
        raised
        id="list-users-button"
        @click="listUsers"
      >Listar Usuários</v-btn>
    </v-row>

    <v-row>
      <v-alert
        id="errorAlert"
        dense
        elevation="2"
        type="error"
        :value="errorMessage != ''"
        transition="scale-transition"
      >{{ errorMessage }}</v-alert>
    </v-row>

    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">
              ID
            </th>
            <th class="text-left">
              Login
            </th>
            <th class="text-left">
              Administrador?
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="u in users"
            :key="u.name"
          >
            <td>{{ u.id }}</td>
            <td>{{ u.login }}</td>
            <td>{{ u.is_admin ? 'Sim' : 'Não' }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-col>
</template>

<script>
import { gql } from "nuxt-graphql-request"

export default {
  data(){
    return {
      users: [],
      errorMessage: ""
    };
  },
  methods: {
    async listUsers(){
      const query = gql`
        query{
          users {
            id
            login
            is_admin
          }
        }
      `;

      try{
        const req = await this.$graphql.default.request(query);
        const { users } = req
        this.users = users
        this.errorMessage = ""
      }
      catch(e){
        this.errorMessage = "Erro ao buscar usuários!"
        console.log(e)
      }
    }
  }
}
</script>

<style scoped>
#list-users-button{
  margin-right: 20px;
}
</style>