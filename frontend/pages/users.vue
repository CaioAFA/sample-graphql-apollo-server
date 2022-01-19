<template>
  <v-row justify="center" align="center">
    <v-col cols="12">
      <v-card>
        <v-card-title class="headline"> Usuários </v-card-title>

        <hr class="my-3" />

        <v-tabs
          v-model="tab"
          background-color="transparent"
          color="basil"
          grow
        >
          <v-tab
            v-for="item in items"
            :key="item"
          >
            {{ item }}
          </v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab">
          <v-tab-item v-for="item in items" :key="item">
            <v-card flat>
              <div v-show="item == 'Listar'">
                <UsersList />
              </div>

              <div v-show="item == 'Buscar'">
                <UsersGet />
              </div>

              <div v-show="item == 'Criar'">
                <UsersCreate />
              </div>

              <div v-show="item == 'Deletar'">
                <UsersDelete />
              </div>

              <div v-show="item == 'Atualizar'">
                <UsersUpdate />
              </div>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
        
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "UsersPage",
  data() {
    return {
      tab: null,
      items: ["Listar", "Buscar", "Criar", "Deletar", "Atualizar"]
    };
  },
};
</script>
