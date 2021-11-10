<template>
  <div>
    <v-alert type="success" v-if="mostraAlertaSucesso">
        Desenho adicionado
    </v-alert>
    <v-alert type="error" v-if="mostraAlertaFalha">
      Ocorreu um problema ao adiconar o desenho. Tente novamente.
    </v-alert>
    <Form />
  </div>
</template>

<script>
  import Form from '../components/Form'

  export default {
    name: 'AdicionarDesenho',
    components: {
      Form,
    },
    computed: {
      mostraAlertaSucesso() {
        return this.$store.getters.mostraAlertaSucesso
      },
      mostraAlertaFalha() {
        return this.$store.getters.mostraAlertaFalha
      }
    }
  }
</script>
