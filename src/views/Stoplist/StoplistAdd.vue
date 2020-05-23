<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12" md="6" sm="8">
          <v-form ref="form" v-model="valid" class="d-flex" lazy-validation @submit.prevent="addPhone">
            <v-text-field
              type="number"
              v-model="inputText"
              label="Телефон"
              class="pa-0 ma-0 mr-5"
              required
              :rules="phoneRules"
              :counter="11"
              clearable
            />
            <v-btn :disabled="!valid" color="blue" class="elevation-4 px-0 white--text add-button" @click.prevent="addPhone">
              <v-icon size="16">mdi-check</v-icon>
            </v-btn >
          </v-form>

          <v-btn class="back-button" @click="back">Назад</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "StoplistAdd",
  data() {
    return {
      valid: false,
      inputText: "",
      phoneRules: [
        v => !!v || "Поле не может быть пустым",
        v => v != null && v.length == 11 || "Номер должен состоять из 11 чисел",
      ]
    }
  },
  methods: {
    addPhone() {
      if (this.$refs.form.validate()) {
        this.$store.dispatch("checkVariants", this.inputText)
          .then(res => {
            if (res.empty)
              this.$store.dispatch("addPhone", this.inputText);
            else 
              this.$noty.error("Ошибка! Номер уже занят");
          }).catch(() => {
              this.$noty.error("Ошибка! Номер не добавлен. Попробуйте позже");
          });
      }
    },
    back() {
      this.$router.go(-1);
    }
  }
}
</script>

<style lang="scss" scoped>
.v-btn.add-button {
  min-width: 36px;
}
.back-button, .add-button {
  border-radius: 30px;
}
</style>