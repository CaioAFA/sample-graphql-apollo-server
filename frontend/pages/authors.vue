<template>
  <v-row justify="center" align="center">
    <v-col cols="12">
      <v-card>
        <v-card-title class="headline"> Autores </v-card-title>

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
                <AuthorsList />
              </div>

              <div v-show="item == 'Buscar'">
                <AuthorsGet />
              </div>

              <div v-show="item == 'Criar'">
                <AuthorsCreate />
              </div>

              <div v-show="item == 'Deletar'">
                <AuthorsDelete />
              </div>

              <div v-show="item == 'Atualizar'">
                <AuthorsUpdate />
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
  name: "AuthorsPage",
  data() {
    return {
      tab: null,
      items: ["Listar", "Buscar", "Criar", "Deletar", "Atualizar"]
    };
  },
};
</script>
