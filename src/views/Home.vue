<template>
  <div>
    <v-container>
      <pokemon-table path="/pokemon" />
    </v-container>
  </div>
</template>

<script>
import PokemonTable from "@/components/PokemonTable";
export default {
  name: "home",
components: { PokemonTable },
};
</script>
