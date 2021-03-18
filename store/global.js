// import axios from "axios";

import Http  from "@/common/Http.js";
// import i18n from "@/i18n.js";
const state = {
    errors: null,
    deleteItem:{},
    branches: [],
    languages: [],
    deleteAcion:{},
    productLoading: false,
    categoryLoading: false,
    branchesLoading: false,
    ageLoading: false,
    languageLoading: false,
    loading: false,
};

const getters = {
  loading(state) {
    return state.loading;
  },
  ageLoading(state) {
    return state.ageLoading;
  },
  categoryLoading(state) {
    return state.categoryLoading
  },
  languages(state) {
    return state.languages;
  },
  languageLoading(state) {
    return state.languageLoading
  },
  branches(state) {
    return state.branches;
  },
  productLoading(state) {
    return state.productLoading;
  },
  branchesLoading(state) {
    return state.branchesLoading;
  },
};

const actions = {
  getBranches({commit}){
    commit("setBranchesLoading", true);
    return new Promise((resolve, reject) => {
        Http.get(`branches`)
        .then(res => {
          commit("setBranchesLoading", false)
          commit("setBranches", res.data)
          resolve(res.data)
        })
        .catch((res) => {
          commit("setBranchesLoading", false)
          reject(res);
        });
    });
  },
  getAges({commit}){
    commit("setAgeLoading", true);
    return new Promise((resolve, reject) => {
        Http.get(`ages`)
        .then(res => {
          commit("setAgeLoading", false)
          resolve(res.data)
        })
        .catch((res) => {
          commit("setAgeLoading", false)
          reject(res);
        });
    });
  },
  getLanguages({commit}){
    commit("setLanguageLoading", true);
    return new Promise((resolve, reject) => {
        Http.get(`languages`)
        .then(res => {
          commit("setLanguageLoading", false)
          commit("setLanguages", res.data)
          resolve(res.data)
        })
        .catch((res) => {
          commit("setLanguageLoading", false)
          reject(res);
        });
    });
  },
  getCategories({commit}){
    commit("setCategoryLoading", true);
    return new Promise((resolve, reject) => {
        Http.get(`categories`)
        .then(res => {
          commit("setCategoryLoading", false)
          // commit("setLanguages", res.data)
          resolve(res.data)
        })
        .catch((res) => {
          commit("setLanguageLoading", false)
          reject(res);
        });
    });
  },
  getProduct({commit} , isbn){
    commit("setProductLoading", true);
    return new Promise((resolve, reject) => {
        Http.get(`product/${isbn}`)
        .then(res => {
          commit("setProductLoading", false)
          resolve(res.data)
        })
        .catch((res) => {
          commit("setProductLoading", false)
          console.log(res)
          const snackbar = {
              active : true,
              text: 'no product found'
          }
        commit('ui/setSnackbar' , snackbar , { root: true })
          reject(res.data);
        });
    });
  },
  remove(ctx) {
    ctx.commit("setLoading", true);
    return new Promise((resolve, reject) => {
        Http.delete(`delete/${ctx.state.deleteItem.table}/${ctx.state.deleteItem.id}`)
        .then((res)=> {
          ctx.commit("setLoading", false)
          ctx.commit("ui/setDeleteModal", false , {root:true})
          ctx.dispatch(`${ctx.state.deleteAcion.action}` , ctx.state.deleteAcion.payload , {root:true})
          resolve(res.data)
        })
        .catch((e) => {
          ctx.commit("setLoading", false)
          reject(e);
        });
    });
  },
};

const mutations = {
  setErr(state, error) {
    state.errors = error;
  },
  setCategoryLoading(state, payload) {
    state.categoryLoading = payload;
  },
  setAgeLoading(state, payload) {
    state.ageLoading = payload;
  },
  setLanguages(state, payload) {
    state.languages = payload;
  },
  setLanguageLoading(state, payload) {
    state.languageLoading = payload;
  },
  setLoading(state, payload) {
    state.loading = payload;
  },
  setBranchesLoading(state, payload) {
    state.branchesLoading= payload;
  },
  setBranches(state, payload) {
    state.branches= payload;
  },
  setProductLoading(state, payload) {
    state.productLoading= payload;
  },
  setDeleteAction(state, payload) {
    state.deleteAcion= payload;
  },
  setItems(state, payload) {
    payload = payload == null ? [] : payload;
    state.datatable.data = payload;
  },
  setDeleteItem(state, payload) {
    state.deleteItem= payload;
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
