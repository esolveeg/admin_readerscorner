// import axios from "axios";

import Http  from "@/common/Http.js";
import {serializeQuery} from "@/common/Helpers.js";
// import i18n from "@/i18n.js";
const state = {
  createError: [],
  datatable: {
    search: '',
    calories: '',
    total:null,
    headers : [
        { text: 'isbn', value: 'isbn' , align: "center" },
        { text: 'title', value: 'title' , align: "center" },
        { text: 'price', value: 'price' , align: "center" },
        { text: 'thumbnail', value: 'thumbnail' , align: "center" },
        { text: 'actions', value: 'actions' , align: "center"},
    ],
    data : [],
    loading: false,
  },
  createLoading : false,
};

const getters = {
  datatable(state) {
    return state.datatable;
  },
  createError(state) {
    return state.createError;
  },
  createLoading(state) {
    return state.createLoading;
  },
};

const actions = {
  create({commit} , payload) {
    commit("createLoading", true);
    // commit(mutations.setLoading, true);
    return new Promise((resolve, reject) => {
        Http.post(`authors`, payload)
        .then(res => {
          commit("createLoading", false);
          resolve(res.data);
        })
        .catch((err) => {
          commit("createLoading", false);
          console.log(err.response.data)
          commit("createError" , err.response.data)
          reject(err);
        });
    });
  }
};

const mutations = {
  createLoading(state, payload) {
    state.createLoading = payload;
  },
  createError(state, payload) {
    state.createError = payload;
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
