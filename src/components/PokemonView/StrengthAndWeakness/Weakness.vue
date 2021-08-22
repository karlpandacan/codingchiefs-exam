<template>
  <v-row v-if="this.types.length > 0">
    <v-col cols="12" xs="6" sm="6" md="6" lg="12" xl="12">
      <v-card>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="text-h5 text-center"> Weakness </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-tabs fixed-tabs v-model="tabs">
          <template v-for="(type, index) in types">
            <v-tab dark :key="index" :href="'#tab-' + index" class="text-capitalize">
              {{ type.name }}
            </v-tab>
          </template>
        </v-tabs>
        <v-tabs-items v-model="tabs">
          <template v-for="(type, index) in types">
            <v-tab-item
              :key="index"
              :value="'tab-' + index"
              class="text-capitalize mx-6 my-6"
            >
              <v-row>
                <v-col cols="12" xs="12" sm="12" md="4" lg="4" xl="4">
                  <v-list flat>
                    <v-subheader>Double Damage From</v-subheader>
                    <v-list-item
                      v-for="(doubleDamage, i) in weaknesses[type.name].doubleDamageFrom"
                      :key="i"
                    >
                      <v-list-item-content>
                        <v-list-item-title v-html="doubleDamage.name"></v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list>
                </v-col>
                <v-col cols="12" xs="12" sm="12" md="4" lg="4" xl="4">
                  <v-list>
                    <v-subheader>Half Damage To</v-subheader>
                    <v-list-item
                      v-for="(halfDamage, i) in weaknesses[type.name].halfDamageTo"
                      :key="i"
                    >
                      <v-list-item-content>
                        <v-list-item-title v-html="halfDamage.name"></v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list>
                </v-col>
                <v-col cols="12" xs="12" sm="12" md="4" lg="4" xl="4">
                  <v-list flat>
                    <v-subheader>No Damage To</v-subheader>
                    <v-list-item
                      v-for="(noDamage, i) in weaknesses[type.name].noDamageTo"
                      :key="i"
                    >
                      <v-list-item-content>
                        <v-list-item-title v-html="noDamage.name"></v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list>
                </v-col>
              </v-row>
            </v-tab-item>
          </template>
        </v-tabs-items>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
export default {
  name: "pokemon-view-about",
  props: {
    types: {
      type: Array,
      required: true,
      deafult: () => [],
    },
  },
  data: () => ({
    tabs: null,
    headers: [],
    weaknesses: {},
  }),
  watch: {
    types() {
      if (Object.keys(this.types).length > 0) {
        this.weaknesses = {};
        this.types.forEach((elements) => {
          this.weaknesses[elements.name] = {};

          this.weaknesses[elements.name].doubleDamageFrom =
            elements.damage_relations.double_damage_from;

          this.weaknesses[elements.name].halfDamageTo =
            elements.damage_relations.half_damage_to;

          this.weaknesses[elements.name].noDamageTo =
            elements.damage_relations.no_damage_to;
        });
      }
    },
  },
};
</script>
<style scoped>
.text-h5 {
  color: #00539c;
}
.text--primary {
  color: #00539c;
}
.v-tab--active {
  color: #00539c !important;
}
</style>
