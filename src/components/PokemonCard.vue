<template>
  <div id="pokemon-cards">
    <v-row v-if="!isLoading">
      <v-col
        v-for="(pokemon, index) in pokemons"
        :key="index"
        col="12"
        xs="12"
        sm="6"
        md="4"
        xl="3"
        lg="3"
      >
        <v-card @click="redirectTo()">
          <v-img max-height="300" min-height="150" :src="images[pokemon.name] || ''" />
          <v-card-title class="text-xl-center">
            <p class="text-capitalize" v-html="pokemon.name"></p>
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>
    <Loading :is-loading="isLoading" />
  </div>
</template>
<script>
import Loading from "@/components/Loading";
export default {
  name: "pokemon-card",
  components: { Loading },
  props: {
    pokemons: {
      type: Array,
      required: true,
      deafult: () => [{ name: "", url: "" }],
    },
  },
  data: () => ({
    isLoading: false,
  }),
  methods: {
    redirectTo(url) {
      let images = this.images;
      this.images = [];
      this.images = images;
    },
    async getImage(url) {
      await this.$http.get(url).then((response) => {
        this.images[response.data.name] = response.data.sprites.front_default;
        setTimeout(() => {
          this.isLoading = false;
        }, 1500);
      });
    },
  },
  watch: {
    images() {
      if (this.images.length != this.pokemons.length) {
        this.isLoading = true;
      }
    },
  },
  computed: {
    images() {
      let images = [];
      this.pokemons.forEach((elements, index) => {
        let urlPath = "";
        urlPath = "/api" + elements.url.replace(this.$api, "");
        if (urlPath != "/api") {
          this.getImage(urlPath);
        }
      });
      return images;
    },
    cardWidth() {
      let width = "";
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          width = "100%";
          break;
        case "sm":
          width = "49%";
          break;
        case "md":
          width = "30%";
          break;
        default:
          width = "20%";
          break;
      }
      return width;
    },
  },
};
</script>
