import Vue from 'vue'
import VueRouter from 'vue-router'
import MeusDesenhos from '../views/MeusDesenhos'
import AdicionarDesenho from '../views/AdicionarDesenho'
import Sobre from '../views/Sobre'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Meus Desenhos',
    component: MeusDesenhos
  },
  {
    path: '/adicionar-desenho',
    name: 'Adicionar Desenhos',
    component: AdicionarDesenho
  },
  {
    path: '/sobre',
    name: 'Sobre',
    component: Sobre
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
