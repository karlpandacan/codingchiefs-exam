<template>
  <div id="pokemon-view">
    <v-row class="mx-4 my-4">
      <v-col cols="12" xs="12" sm="12" md="12" lg="3" xl="2">
        <v-row>
          <v-col cols="12" xs="6" sm="6" md="6" lg="12" xl="12">
            <PokemonDetails :pokemon="pokemonDetails" />
          </v-col>
          <v-col cols="12" xs="6" sm="6" md="6" lg="12" xl="12">
            <EvolutionDetails :species="species" />
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" xs="12" sm="12" md="12" lg="9" xl="10">
        <About :species="species" />
      </v-col>
      <v-col cols="12" xs="12" sm="12" md="12" lg="12" xl="12">
        <Stats :pokemon="pokemonDetails" :species="species" />
      </v-col>
      <v-col cols="12" xs="12" sm="12" md="12" lg="12" xl="12">
        <StrengthAndWeakness :pokemon="pokemonDetails" />
      </v-col>
      <v-col cols="12" xs="12" sm="12" md="12" lg="12" xl="12">
        <Moves :pokemon="pokemonDetails" />
      </v-col>
    </v-row>
    <v-btn
      :to="{ name: 'home', query: { page: page } }"
      color="primary"
      fab
      class="v-btn--back"
    >
      <v-icon>mdi-arrow-left</v-icon>
    </v-btn>
    <loading :is-loading="isLoading" />
    <alert-box :show="alert.show" :title="alert.title" :message="alert.message" />
  </div>
</template>

<script>
import Loading from "@/components/Loading";
import AlertBox from "@/components/AlertBox";
import PokemonDetails from "@/components/PokemonView/Details";
import EvolutionDetails from "@/components/PokemonView/EvolutionDetails";
import About from "@/components/PokemonView/About";
import Stats from "@/components/PokemonView/Stats";
import StrengthAndWeakness from "@/components/PokemonView/StrengthAndWeakness/Index";
import Moves from "@/components/PokemonView/Moves";
export default {
  name: "pokemon-view",
  components: {
    Loading,
    AlertBox,
    PokemonDetails,
    EvolutionDetails,
    About,
    Stats,
    StrengthAndWeakness,
    Moves,
  },
  data: () => ({
    isLoading: false,
    showPassword: false,
    pokemonDetails: {},
    species: {},
    alert: {
      show: false,
      title: "Notification",
      message: "Pokemon Not Found.",
    },
  }),
  methods: {
    getPokemon() {
      this.isLoading = true;
      this.$http
        .get("/api/pokemon/" + this.pokemon)
        .then((response) => {
          this.pokemonDetails = response.data;
          this.getSpecies(response.data.id);
        })
        .catch((error) => {
          this.alert.show = true;
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    getSpecies() {
      this.$http.get("/api/pokemon-species/" + this.pokemon).then((response) => {
        this.species = response.data;
      });
    },
  },
  mounted() {
    this.getPokemon();
  },
  watch: {
    pokemon() {
      this.getPokemon();
    },
  },
  computed: {
    page() {
      if (this.$route.query.page !== undefined) {
        return this.$route.query.page;
      } else {
        return 1;
      }
    },
    pokemon() {
      return this.$route.params.pokemon;
    },
  },
};
</script>
<style>
.v-btn--back {
  bottom: 0;
  position: absolute;
  margin: 0 0 16px 16px;
}
</style>
