import Vue from 'vue'
import Vuex from 'vuex'

import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

import * as database from "firebase/database";


// first, get a reference to the storage bucket for our app


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    desenhos: [],
    mensagemFalha: false,
    mensagemSucesso: false
  },
  mutations: {
    adicionarDesenho(state, payload) {
      state.desenhos.push(payload)
    },
    desenhosSalvos(state, payload) {
      state.desenhos = payload
    },
    mensagemSucesso(state, payload) {
      state.mensagemSucesso = payload;
    },
    mensagemFalha(state, payload) {
      state.mensagemFalha = payload;
    }
  },
  actions: {
    adicionarDesenho({commit}, payload) {
      const desenho = {
        nome: payload.nome,
        canal: payload.canal
      }
      let urlImagem
      let chave
      let usersCollection
      const db = database.getDatabase();


      database.push(database.ref(db, 'desenhos'), desenho).then((data) => {
        chave = data.key
        return chave
      })
      .then(chave => {
        const storage = getStorage();
        const filename = payload.image.name
        const ext = filename.slice(filename.lastIndexOf('.'))
        usersCollection = ref(storage, 'desenhos/' + chave + ext);
        return uploadBytes(usersCollection, payload.image);
      })
      .then(() => {
        return getDownloadURL(usersCollection);
      })
      .then(fileData => {
        return database.update(database.ref(db, 'desenhos/'+chave), {urlImagem: fileData}) 
      })
      .then(() => {
        commit('adicionarDesenho', {
          ...desenho,
          urlImagem: urlImagem,
          id: chave
        });
        commit('mensagemSucesso', true);
        setInterval(() => {
          commit('mensagemSucesso', false);
        }, 5000);
      })
      .catch((error) => {
        console.log(error);
        commit('mensagemFalha', true);

        setInterval(() => {
          commit('mensagemFalha', false);
        }, 5000);
      })
    },
    recuperaDesenhos({commit}) {
      const db = database.getDatabase();
      const starCountRef = database.ref(db, 'desenhos');
      database.onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
        commit('desenhosSalvos', data);
      });
    },
  },
  getters: {
    mostraAlertaSucesso(state) {
      return state.mensagemSucesso;
    },
    mostraAlertaFalha(state) {
      return state.mensagemFalha;
    },
    recuperaDesenhos(state) {
      return state.desenhos;
    }
  },
  modules: {

  }
})
