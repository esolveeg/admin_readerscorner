// import axios from "axios";

import Http  from "@/common/Http.js";
// import i18n from "@/i18n.js";
const state = {
    errors: null,
    deleteItem:{},
    branches: [],
    languages: [],
    categories: [],
    ages: [],
    authorLoading: false,
    authors : [],
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
  ages(state) {
    return state.ages;
  },
  categories(state) {
    return state.categories;
  },
  authorLoading(state) {
    return state.authorLoading;
  },
  authors(state) {
    return state.authors;
  },
};

const actions = {
  getBranches({commit} , payload){
    commit("setBranchesLoading", true);
    return new Promise((resolve, reject) => {
        Http.get(`branches`)
        .then(res => {
          commit("setBranchesLoading", false)
          if(payload){
            res.data = []
          }
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
          commit("setAges", res.data)
          resolve(res.data)
        })
        .catch((res) => {
          commit("setAgeLoading", false)
          reject(res);
        });
    });
  },
  getAuthors({commit}){
    commit("setAuthorLoading", true);
    return new Promise((resolve, reject) => {
        Http.get(`authors`)
        .then(res => {
          commit("setAuthorLoading", false)
          commit("setAuthors", res.data)
          resolve(res.data)
        })
        .catch((res) => {
          commit("setAuthorLoading", false)
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
        Http.get(`categories/tree`)
        .then(res => {
          commit("setCategoryLoading", false)
          commit("setCategories", res.data)

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
          // ctx.dispatch(`${ctx.state.deleteAcion.action}` , ctx.state.deleteAcion.payload , {root:true})
          const snackbar = {
            active : true,
            text: 'item deleted successfully'
          }
          ctx.commit('ui/setSnackbar' , snackbar , { root: true })
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
  setAges(state, payload) {
    state.ages = payload;
  },
  setAuthorLoading(state, payload) {
    state.authorLoading = payload;
  },
  setAuthors(state, payload) {
    state.authors = payload;
  },
  setCategories(state, payload) {
    state.categories = payload;
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
