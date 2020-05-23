<template>
  <v-container>

    <stoplist-header />

    <v-row>
      <v-col class="pt-0">

        <v-data-table
          :headers="columns"
          :items="phones"
          :items-per-page="itemsPerPage"
          :loading="loading"
          loadingText="Получение данных..."
          :footer-props="{
            disableItemsPerPage: true,
            itemsPerPageOptions: [itemsPerPage, -1]
          }"
          :page="page"
          @pagination="changePage"
        >
          <template v-slot:item.actions="{ item }">
            <v-icon size="18" class="mr-4" color="black" @click="editItem(item)">
              mdi-pencil
            </v-icon>
            <v-icon size="18" color="red" @click="clickOnTrash(item)">mdi-delete</v-icon>
          </template>
        </v-data-table>

        <v-dialog v-model="dialog" max-width="400">
          <v-card>
            <v-card-title class="headline">Удалить выбранный телефон?</v-card-title>

            <v-card-actions class="d-flex justify-center">
              <v-btn color="green darken-1" class="white--text" @click="deletePhone" >
                Да
              </v-btn>
              <v-btn color="red darken-1" class="white--text" @click="dialog = false" >
                Нет
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import StoplistHeader from "@/components/Stoplist/StoplistHeader";

export default {
  name: "Stoplist",
  data() {
    return {
      columns: [
        { text: "Телефон", value: "name", sortable: false},
        { text: 'Действия', align: 'right', value: 'actions', sortable: false }
      ],
      itemsPerPage: require("@/constants").itemsPerPage,
      loading: true,

      dialog: false,
      deletedPhone: null,

      page: 1,
      oldPage: 1
    }
  },
  computed: {
    phones() {
      return this.$store.getters.phones;
    }
  },
  watch: {
    phones() {
      if (this.phones && this.phones.length != 0) {
        this.loading = false;

        let page = this.$route.params.page;
        if (page && page == +page && page > 0 && page <= Math.ceil(this.phones.length / this.itemsPerPage)) {
          this.page = +page;
        } else {
          if (this.$route.path != "/stoplist") this.$router.replace("/stoplist");
        }
      }
    }
  },
  methods: {
    clickOnTrash(phone) {
      this.dialog = true;
      this.deletedPhone = phone;
    },
    deletePhone() {
      if (this.deletedPhone) {
        this.$store.dispatch("deletePhone", this.deletedPhone);
        this.dialog = false;
      }
    },
    editItem(phone) {
      this.$router.push(`/stoplist/edit/${phone.id}`)
    },
    changePage({page}) {
      this.oldPage = this.page;
      this.page = page;
      const href = `/stoplist/page/${page}`;

      if (page > 1 || page == 1 && this.oldPage == 2) {
        if (this.$route.path != href) 
          this.$router.replace(href)
      }  
    }
  },
  created() {
    this.$store.dispatch("bindPhones");
  },
  destroyed() {
    this.$store.dispatch("unbindPhones");
  },
  components: {
    StoplistHeader
  }
}
</script>