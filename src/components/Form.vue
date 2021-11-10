<template>
  <section>
    <div class="form-container">
      <h2>Adicionar desenho</h2>
      <validation-observer ref="observer" v-slot="{ invalid }">
        <form @submit.prevent="adicionar">
          <validation-provider
            v-slot="{ errors }"
            name="Nome do desenho"
            rules="required|max:30"
          >
            <v-text-field
              v-model="nome"
              :counter="30"
              :error-messages="errors"
              label="Nome"
              required
            ></v-text-field>
          </validation-provider>
          <validation-provider
            v-slot="{ errors }"
            name="Transmissora"
            rules="required"
          >
            <v-select
              v-model="canal"
              :items="canais"
              :error-messages="errors"
              label="Emissora em que era transmitido"
              data-vv-name="select"
              required
            ></v-select>
          </validation-provider>
          <validation-provider v-slot="{ errors }" 
          name="Imagem do desenho" rules="required">
            <v-file-input
              :value="image"
              @change="setPicture"
              :error-messages="errors"
              accept="image/*"
              color="green"
              label="Imagem do desenho"
              prepend-icon="mdi-camera"
            ></v-file-input>
          </validation-provider>

          <v-btn class="mr-4" type="submit" 
          :disabled="invalid"
            >Adicionar</v-btn
          >
          <v-btn @click="limpar">Limpar</v-btn>
        </form>
      </validation-observer>
    </div>
  </section>
</template>

<script>
import { required, max } from "vee-validate/dist/rules";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from "vee-validate";

setInteractionMode("eager");

extend("required", {
  ...required,
  message: "{_field_} não pode ser vazio.",
});

extend("max", {
  ...max,
  message: "{_field_} não pode ter mais que {length} caracteres.",
});

export default {
  name: "Form",
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data: () => ({
    nome: "",
    canal: null,
    canais: [
      "TV Cultura",
      "Globo",
      "SBT",
      "Record",
      "Disney Channel",
      "Cartoon Network",
    ],
    image: null,
    imageUrl: '',
  }),
  methods: {
    adicionar() {
      this.$refs.observer.validate();
      this.$store.dispatch('adicionarDesenho', 
      {nome: this.nome, 
      canal: this.canal, image: this.image });
      this.limpar();
    },
    limpar() {
      this.nome = "";
      this.canal = null;
      this.image = null;
      this.imageUrl = "";
      this.$refs.observer.reset();
    },
    setPicture(file) {
        const files = event.target.files
        let filename = file.name
        if (filename.lastIndexOf('.') <= 0) {
          return alert('Please add a valid file!')
        }
        const fileReader = new FileReader()
        fileReader.addEventListener('load', () => {
          this.imageUrl = fileReader.result
        })
        fileReader.readAsDataURL(files[0])
        this.image = files[0]
    }
  },
};
</script>

<style lang="scss" scoped>
.form-container {
  width: 50vw;
  margin: 10vh 5vw;
}
</style>