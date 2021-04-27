// import axios from "axios";

import Http  from "@/common/Http.js";
import {serializeQuery} from "@/common/Helpers.js";
// import i18n from "@/i18n.js";
const state = {
  errors: null,
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
  get({commit}, payload) {
    commit("loading", true);
    // commit(mutations.loading, true);
    return new Promise((resolve, reject) => {
        Http.get(`products?${serializeQuery(payload)}`)
        .then((res) => {
          commit("setItems", []);
          const data = res.data.items.map((item) => {
            let thumbnail = item.thumbnail ||  'no-image'
            return {
              isbn: item.isbn,
              title: item.title,
              price: `${item.price.toFixed(2)}EGP`,
              thumbnail,
            };
          });
          commit("setItems", data);
          commit("setTotal", res.data.total);
          commit("loading", false);

          resolve(data);
        })
        .catch((res) => {
          commit("loading", false);
          reject(res);
        });
    });
  },
  create({commit} , payload) {
    commit("createLoading", true);
    // commit(mutations.loading, true);
    return new Promise((resolve, reject) => {
        Http.post(`products`, payload)
        .then((res) => {
          commit("createLoading", false);

          resolve(datres.data);
        })
        .catch((err) => {
          commit("createLoading", false);
          commit("createError" , err.response.data.errors)
          reject(err.response.data);
        });
    });
  }
};

const mutations = {
  setErr(state, error) {
    state.errors = error;
  },
  createError(state, error){
    state.createError = error;
  },
  createLoading(state, payload){
    state.createLoading = payload;
  },
  loading(state, payload) {
    state.datatable.loading = payload;
  },
  setItems(state, payload) {
    payload = payload == null ? [] : payload;
    state.datatable.data = payload;
  },
  setTotal(state, payload) {
    state.datatable.total = payload;
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
