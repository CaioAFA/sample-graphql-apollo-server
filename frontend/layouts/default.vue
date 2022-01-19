<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
          v-show="!item.needAuth || (item.needAuth && isLogged)"
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
    >
      <v-btn
        icon
        @click.stop="miniVariant = !miniVariant"
      >
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>

      <v-toolbar-title v-text="title" />
    </v-app-bar>

    <v-main>
      <v-container>
        <LoggedUserData />
        <Nuxt />
      </v-container>
    </v-main>

    <v-footer
      :absolute="false"
      app
    >
      <span>Caio Arrabal &copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  computed: {
    isLogged(){
      return this.$store.state.user.data != null
    }
  },
  data () {
    return {
      clipped: false,
      drawer: false,
      miniVariant: false,
      right: true,
      title: 'GraphQL Samples',
      items: [
        {
          icon: 'mdi-lock',
          title: 'Login',
          to: '/login',
          needAuth: false
        },
        {
          icon: 'mdi-account',
          title: 'Usuários',
          to: '/users',
          needAuth: true
        },
        {
          icon: 'mdi-lead-pencil',
          title: 'Autores',
          to: '/authors',
          needAuth: true
        },
        {
          icon: 'mdi-music-box-multiple',
          title: 'Músicas',
          to: '/musics',
          needAuth: true
        }
      ]
    }
  }
}
</script>
