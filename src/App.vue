<template>
  <v-app>
    <v-main>
      <v-app-bar class="flex-grow-0" color="primary">
        <v-toolbar-title>Pokemon</v-toolbar-title>
        <v-text-field
          class="mx-3"
          prepend-inner-icon="search"
          v-model="searchText"
          solo
          hide-details
          single-line
        ></v-text-field>
        <v-spacer></v-spacer>
        <v-btn icon @click="toggleTheme">
          <v-icon>mdi-brightness-6</v-icon>
        </v-btn>
      </v-app-bar>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data: () => ({
    isLoading: false,
    searchText: "",
    drawer: true,
  }),
  methods: {
    toggleTheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
      if (this.$vuetify.theme.dark) {
        this.$store.dispatch("setToDarkTheme");
      } else {
        this.$store.dispatch("setToLightTheme");
      }
    },
  },
  computed: {
    isDarkTheme: function () {
      return this.$store.getters.isDarkTheme;
    },
  },
  mounted() {
    const theme = this.$store.getters.isDarkTheme;
    if (theme) {
      this.$vuetify.theme.dark = true;
    } else {
      this.$vuetify.theme.dark = false;
    }
  },
};
</script>
