<template>
  <v-app id="inspire">
    <v-app-bar color="#fcb69f" dark src="./assets/bg-menu.jpg" app prominent>
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(19,84,122,.5), rgba(128,208,199,.8)"
        ></v-img>
      </template>

      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Biblioteca de Desenhos</v-toolbar-title>

      <v-spacer></v-spacer>

    </v-app-bar>

    <v-navigation-drawer v-model="drawer" fixed temporary>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6"
            >Biblioteca de Desenhos</v-list-item-title
          >
          <v-list-item-subtitle
            >Meus desenhos favoritos de quando era criança</v-list-item-subtitle
          >
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense nav>
        <v-list-item v-for="item in items" :key="item.title" :to="item.to" link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main class="grey lighten-2">
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    drawer: null,
    items: [
      { 
        title: "Meus desenhos", 
        icon: "mdi-view-dashboard", 
        to: "/" 
      },
      {
        title: "Adicionar desenho",
        icon: "mdi-plus-box",
        to: "/adicionar-desenho",
      },
      { 
        title: "Sobre", 
        icon: "mdi-help-box", 
        to: "/sobre" 
      },
    ],
  }),
};
</script>