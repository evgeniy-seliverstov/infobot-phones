<template>
  <v-app>
    <v-container class="pb-0">
      <v-row>
        <v-col>
          <h1 class="title">{{title}}</h1>
          <v-breadcrumbs :items="breadcrumbs" class="px-0 pb-0"></v-breadcrumbs>
        </v-col>
      </v-row>
    </v-container>
    <v-container class="pt-0">
      <v-row>
        <v-col class="grey lighten-5 pa-0">
          <v-content>
            <router-view />
          </v-content>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      title: "",
      breadcrumbList: [],
    }
  },
  computed: {
    breadcrumbs() {
      return this.breadcrumbList.map(v => ({text: v.name, to: v.link}));
    }
  },
  watch: {
    $route() {
      this.breadcrumbList = this.$route.meta.breadcrumb;
      this.title = this.$route.meta.title;
    }
  }
};
</script>
