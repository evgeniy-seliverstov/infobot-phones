import Vue from 'vue';
import Vuex from 'vuex';
import router from '../router';
import { vuexfireMutations, firestoreAction } from 'vuexfire';
import { db } from '@/main';
import { collection } from '@/constants';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    phones: [],
    editablePhone: null
  },
  mutations: {
    ...vuexfireMutations,
    setEditablePhone(state, phone) {
      state.editablePhone = phone;
    }
  },
  getters: {
    phones: state => {
      return state.phones;
    }
  },
  actions: {
    bindPhones: firestoreAction(({ bindFirestoreRef }) => {
      return bindFirestoreRef('phones', db.collection(collection))
    }),
    unbindPhones: firestoreAction(({ unbindFirestoreRef }) => {
      unbindFirestoreRef('phones')
    }),
    addPhone({state}, phone) {
      db.collection(collection).add({name: phone})
        .then(() => {
          Vue.noty.success("Номер успешно добавлен");
          router.push("/stoplist");
        })
        .catch(() => {
          Vue.noty.success("Ошибка! Номер не добавлен. Попробуйте позже");
        })
    },
    deletePhone({state}, phone) {
      db.collection(collection).doc(phone.id).delete()
        .then(() => {
          Vue.noty.success("Номер успешно удален");
        })
        .catch(() => {
          Vue.noty.success("Ошибка! Номер не удален. Попробуйте позже");
        })
    },
    getPhoneById({commit}, id) {
      db.collection(collection).doc(id).get()
        .then(doc => {
          if (doc.data())
            commit("setEditablePhone", { id: doc.id, name: doc.data().name});
          else
            router.push("/");
        });
    },
    updatePhone({state}, phone) {
      db.collection(collection).doc(phone.id).update({name: phone.name})
        .then(() => {
          Vue.noty.success("Номер успешно изменен");
          router.go(-1);
        })
        .catch(() => {
          Vue.noty.success("Ошибка! Номер не изменен. Попробуйте позже");
        })
    }
  }
})
