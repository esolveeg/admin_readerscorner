// import axios from "axios";

import Http from "@/common/Http.js";
// import i18n from "@/i18n.js";
const state = {
  errors: null,
  deleteModal: false,
  createModal: false,
  loading: false,
  snackbar : {
    active: false,
    text: '',
  },
};

const getters = {
    deleteModal(state) {
        return state.deleteModal;
    },
    snackbar(state){
      return state.snackbar
    },
    createModal(state){
      return state.createModal
    },
    loading(state) {
        return state.loading;
    },
};

const actions = {
};

const mutations = {
  setLoading(state, payload) {
    state.loading = payload;
  },
  setDeleteModal(state, payload) {
    state.deleteModal = payload;
  },
  setCreateModal(state, payload) {
    state.createModal = payload;
  },
  setSnackbar(state , payload){
    state.snackbar = payload
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
