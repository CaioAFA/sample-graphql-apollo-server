<template>
  <v-row justify="center" align="center">
    <v-col cols="12">
      <v-card>
        <v-card-title class="headline"> Músicas </v-card-title>

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
                <MusicsList />
              </div>

              <div v-show="item == 'Buscar'">
                <MusicsGet />
              </div>

              <div v-show="item == 'Criar'">
                <MusicsCreate />
              </div>

              <div v-show="item == 'Deletar'">
                <MusicsDelete />
              </div>

              <div v-show="item == 'Atualizar'">
                <MusicsUpdate />
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
  name: "MusicsPage",
  data() {
    return {
      tab: null,
      items: ["Listar", "Buscar", "Criar", "Deletar", "Atualizar"]
    };
  },
};
</script>
