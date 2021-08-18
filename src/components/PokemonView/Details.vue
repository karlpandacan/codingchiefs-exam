<template>
  <v-card>
    <v-container v-if="pokemon.sprites !== undefined">
      <v-row align="center">
        <v-col col="250" align="center">
          <v-img max-height="250" :src="pokemon.sprites.front_default" />
          <v-card-title>
            <p class="text-capitalize">
              {{ pokemon.name }}
            </p>
          </v-card-title>
        </v-col>
      </v-row>
      <v-row align="center">
        <v-col cols="12">
          <b>Weight:</b>
          {{ pokemon.weight }}
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <b>Type:</b>
          <template v-for="(type, index) in pokemon.types">
            {{ type.type.name }}
            <template v-if="pokemon.types.length - 1 != index">, </template>
          </template>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <b>Abilities:</b>
          <template v-for="(ability, index) in pokemon.abilities">
            {{ ability.ability.name }}
            <template v-if="pokemon.abilities.length - 1 != index">, </template>
          </template>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>
<script>
export default {
  name: "pokemon-card",
  props: {
    pokemon: {
      type: Object,
      required: true,
      deafult: () => ({}),
    },
  },
};
</script>
