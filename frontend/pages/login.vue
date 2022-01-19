<template>
  <v-row justify="center" align="center">
    <v-col cols="12">
      <v-card>
        <v-card-title class="headline">Login</v-card-title>

        <hr class="my-3" />

        <v-row>
          <v-spacer />

          <v-col cols="6">
            <v-text-field label="Login" v-model="login"></v-text-field>
            <v-text-field label="Senha" v-model="password" type="password"></v-text-field>

            <br />

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

            <v-row>
              <v-spacer />

              <v-btn color="primary" raised @click="doLogin">Login</v-btn>
            </v-row>

            <br />
          </v-col>

          <v-spacer />
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { gql } from "nuxt-graphql-request"
import { mapMutations } from 'vuex'

export default {
  name: "LoginPage",
  data() {
    return {
      login: "",
      password: "",
      errorMessage: ""
    };
  },
  methods: {
    async doLogin() {
      const query = gql`
        query($data: UserLoginInput!){
          login(data: $data) {
            id
            is_admin
            login
            token
          }
        }
      `;

      const data = {
        "login": this.login,
        "password": this.password
      }

      try{
        const result = await this.$graphql.default.request(query, { data });
        const user = result.login
        this.setUserData(user)
        localStorage.setItem('loggedUser', JSON.stringify(user))

        // Next requisitions will have "authorization" header
        this.$graphql.default.setHeaders({ authorization: `Bearer ${user.token}` });

        this.errorMessage = ""
      }
      catch(e){
        this.errorMessage = "Erro ao fazer login!"
        console.log(e)
      }
    },

    ...mapMutations({
      setUserData: 'user/setData'
    })
  },
};
</script>

<style scoped>
#errorAlert{
  flex: 1;
}
</style>