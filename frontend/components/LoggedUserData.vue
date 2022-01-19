<template>
  <v-card
    color="rgba(255, 255, 255, 0.6)"
    id="user-data-card"
    v-show="userData"
  >
    <div>
      <h2>Usuário Logado</h2>
      <h3>
        ID: {{ userData && userData.id }}
        <br>
        Login: {{ userData && userData.login }}
        <br>
        Admin? {{ userData && userData.is_admin ? 'Sim' : 'Não' }}
      </h3>

      <v-btn
        id="logout-button"
        color="danger"
        raised
        @click="doLogout"
      >Logout</v-btn>
    </div>
  </v-card>
</template>

<script>
export default {
  computed: {
    userData () {
      return this.$store.state.user.data
    }
  },
  methods: {
    doLogout(){
      this.$store.commit('user/setData', null)
      localStorage.removeItem('loggedUser')
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
#user-data-card{
  margin-bottom: 10px;
}

div{
  color: black;
  padding: 5px;
}

h2{
  /* margin-bottom: unset; */
  text-align: center;
}
</style>