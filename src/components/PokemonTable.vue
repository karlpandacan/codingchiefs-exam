<template>
  <div>
    <pokemon-card :pokemons="rows" />
    <v-row class="justify-center align-center">
      <v-col>
        <v-pagination
          v-model="pagination.current_page"
          :length="pagination.last_page"
          @input="onPageChange"
        ></v-pagination>
      </v-col>
      <v-col sm="2"> </v-col>
      <v-spacer></v-spacer>
      <v-col sm="3" class="text-right float-center">
        {{ pagination.first_item }}
        to {{ pagination.last_item }} of
        {{ pagination.total }}
      </v-col>
    </v-row>
    <alert-box
      :show="alert.show"
      :title="alert.title"
      :message="alert.message"
      @close="alert.show = false"
    />
  </div>
</template>

<script>
import PokemonCard from "./PokemonCard.vue";
import AlertBox from "./AlertBox.vue";
export default {
  name: "pokemon-table",
  components: { AlertBox, PokemonCard },
  props: {
    path: {
      type: String,
      required: true,
      default: "/",
    },
  },
  data: () => ({
    dialog: false,
    pagination: {
      current_page: 1,
      total: 0,
    },
    perPage: 20,
    headers: [],
    rows: [{ name: "", url: "" }],
    parameters: [],
    isLoading: false,
    alert: {
      show: false,
      title: "Notification",
      message: "Error Loading Data",
    },
  }),
  methods: {
    async getImage(url) {
      await this.$http.get(url).then((response) => {
        this.images[response.data.name] = response.data.sprites.front_default;
      });
    },
    async generate() {
      this.isLoading = true;
      this.rows = [];
      let offset = (this.pagination.current_page - 1) * this.perPage;
      var requestUrl = "/api" + this.path;
      if (this.path.includes("?")) {
        requestUrl += "&offset=" + offset + "&limit=" + this.perPage;
      } else {
        requestUrl += "?offset=" + offset + "&limit=" + this.perPage;
      }
      this.$http
        .get(requestUrl)
        .then((response) => {
          this.rows = response.data.results;
          let pageDetails = {
            total: response.data.count,
          };
          let pagination = {
            total: response.data.count,
            last_page: Math.ceil(response.data.count / this.perPage),
            first_item: offset + 1,
            last_item: offset + this.perPage,
            current_page: this.pagination.current_page,
          };
          this.pagination = pagination;
        })
        .catch((error) => {
          this.alert.show = true;
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    onPageChange() {
      this.generate();
    },
  },
  mounted() {
    this.generate();
  },
};
</script>
