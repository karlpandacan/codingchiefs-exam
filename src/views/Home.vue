<template>
  <div>
    <v-container>
      <pokemon-table path="/pokemon" />
      <loading :is-loading="isLoading" />
    </v-container>
  </div>
</template>

<script>
import Loading from "@/components/Loading";
import PokemonTable from "@/components/PokemonTable";
export default {
  name: "home",
  components: { PokemonTable },
};
</script>
