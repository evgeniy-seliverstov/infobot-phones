<template>
  <v-row>
    <v-col cols="12" md="6" lg="8" class="pb-0">
      <div class="d-flex">
        <div class="mr-2 d-none d-sm-block">
          <v-icon>mdi-magnify</v-icon>
        </div>
        <v-text-field v-model="searchText" label="Искать" class="pa-0 ma-0 mr-5 search-button"></v-text-field>
        <div>
          <v-btn color="#02738e" class="elevation-4 pa-0 px-sm-4 mr-4 white--text search-button">
            <span class="d-none d-sm-block" @click="search">Найти</span>
            <v-icon class="d-inline d-sm-none" size="16">mdi-magnify</v-icon>
          </v-btn>
          <v-btn color="red" class="elevation-4 pa-0 close-button" @click="clearSearch">
            <v-icon color="white" size="16">mdi-close-circle</v-icon>
          </v-btn>
        </div>
      </div>
    </v-col>
    <v-col cols="12" md="6" lg="4">
      <div class="d-flex justify-md-end">
        <v-btn class="elevation-4 mr-3 success add-button" @click="addPhone">Добавить</v-btn>
        <v-btn class="elevation-4 pa-0 mr-3 blue import-button">
          <v-icon color="white" size="16">mdi-import</v-icon>
        </v-btn>
        <v-btn class="elevation-4 pa-0 indigo  export-button">
          <v-icon color="white" size="16">mdi-export</v-icon>
        </v-btn>
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "StoplistHeader",
  data() {
    return {
      searchText: ""
    }
  },
  methods: {
    clearSearch() {
      this.searchText = "";
    },
    addPhone() {
      this.$router.push("/stoplist/add");
    },
    search() {
      this.$emit("search", this.searchText);
    }
  }
}
</script>

<style lang="scss" scoped>
.v-btn {
  &.close-button, &.search-button, &.import-button, &.export-button, &.add-button {
    border-radius: 30px;
    min-width: 36px;
  }
}
</style>