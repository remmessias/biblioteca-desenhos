<template>
  <v-container>
    <v-row>
      <template v-for="(canal, i) in canais">
        <v-col :key="i" class="mt-2" cols="12">
          <strong>{{ canal }}</strong>
        </v-col>

        <v-col v-for="(desenho, j) in desenhos[i]" :key="`${i}${j}`" cols="6" md="2">
          <v-card>
            <v-img
              :src="desenho.urlImagem"
              class="grey darken-4"
            ></v-img>
            <v-card-title class="text-h6">
              {{desenho.nome}}
            </v-card-title>
          </v-card>
        </v-col>
      </template>
    </v-row>
  </v-container>
</template>

<script>
import * as database from "firebase/database";

export default {
  name: "DesenhoDashboard",
  data() {
    return { 
      desenhos: [],
      canais: []
    }
  },
  async created() {
    const db = database.getDatabase();
    const starCountRef = database.ref(db, 'desenhos');
    let self= this;
    await database.onValue(starCountRef, (snapshot) => {
      self.criarArrayDesenhos(snapshot.val())
    });
  },
  computed: {
    desenhosCadastrados() {
      return this.$store.getters.recuperaDesenhos;
    },
  },
  methods: {
    criarArrayDesenhos(desenhos) {
      let desenhosCanaisArray = []
      let desenhosImagensArray = []

      Object.keys(desenhos).forEach((desenho) => {
        const index = desenhosCanaisArray.indexOf(desenhos[desenho].canal); 
        if (index >= 0) {
          desenhosImagensArray[index].push(desenhos[desenho]);
        }
        else {
          desenhosCanaisArray.push(desenhos[desenho].canal);
          desenhosImagensArray.push([desenhos[desenho]])
        }
      });

      this.canais = desenhosCanaisArray;
      this.desenhos = desenhosImagensArray;
    }
  }
};
</script>
