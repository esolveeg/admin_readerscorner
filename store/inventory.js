// import axios from "axios";

import Http from "@/common/Http.js";
import {serializeQuery} from "@/common/Helpers.js";
// import i18n from "@/i18n.js";
const state = {
  errors: null,
  qtyLoading: false,
  createLoading: false,
  findItemsLoading:false,
  closeLoading:false,
  insertLoading:false,
  items:[],
  documentsDatatable: {
    search: '',
    headers : [
        { text: 'id', value: 'id' , align: "center" },
        { text: 'created by', value: 'created_by' , align: "center" },
        { text: 'branch name', value: 'branch_name' , align: "center" },
        { text: 'created at', value: 'created_at' , align: "center" },
        { text: 'updated at', value: 'updated_at' , align: "center" },
        { text: 'Actions', value: 'actions' , align : "center" },
      ],
    data : [],
    loading: false,
  },
  datatable: {
    search: '',
    headers : [
        { text: 'title', value: 'title' , align: "center" },
        { text: 'isbn', value: 'isbn' , align: "center" },
        { text: 'qty', value: 'qty' , align: "center" },
        { text: 'real qty', value: 'real_qty' , align: "center" },
        { text: 'difference', value: 'difference' , align: "center" },
        { text: 'Actions', value: 'actions' , align : "center" },
      ],
    data : [],
    total:null,
    loading: false,
  },
};

const getters = {
  datatable(state) {
    return state.datatable;
  },
  closeLoading(state) { 
    return state.closeLoading
  },
  qtyLoading(state) {
    return state.qtyLoading;
  },
  documentsDatatable(state) {
    return state.documentsDatatable;
  },
  insertLoading(state) {
    return state.insertLoading;
  },
  findItemsLoading(state) {
    return state.findItemsLoading;
  },
  createLoading(state) {
    return state.createLoading
  },
  items(state) {
    return state.items
  },
  
};

const actions = {
  //todo : create doc
  create({commit}, payload) {
    commit("setCreateLoading", true);
    // commit(mutations.setLoading, true);
    return new Promise((resolve, reject) => {
        Http.post("inventories", payload)
        .then(res => {
          const snackbar = {
              active : true,
              text: 'Inventory document created successfully'
          }
          commit('ui/setSnackbar' , snackbar , { root: true })
          commit("setCreateLoading", false);

          resolve(res.data);
        })
        .catch((res) => {
          commit("setCreateLoading", false);
          reject(res);
        });
    });
  },

  //update qty
  updateQty({commit , dispatch}, payload) {
    commit("setQtyLoading", true);
    // commit(mutations.setLoading, true);
    return new Promise((resolve, reject) => {
        Http.put(`inventories/qty/${payload.id}`, {qty :payload.qty})
        .then(res => {
          const snackbar = {
              active : true,
              text: 'quantity updated successfully'
          }
          dispatch("findItems" ,  {doc : res.data ,show: 10,page: 1,})
          commit('ui/setSnackbar' , snackbar , { root: true })
          commit("setQtyLoading", false);

          resolve(res.data);
        })
        .catch((res) => {
          commit("setQtyLoading", false);
          reject(res);
        });
    });
  },

  //get docs
  get({commit}, payload) {
      // commit("setDocumentsItems", res.data);
      commit("setDocumentsLoading", true);
    // commit(mutations.setLoading, true);
    return new Promise((resolve, reject) => {
        Http.get(`inventories?${serializeQuery(payload)}` )
        .then(res => {
          commit("setDocumentsLoading", false);
          commit("setDocumentsItems", res.data);
          resolve(res.data);
        })
        .catch((res) => {
          commit("setDocumentsLoading", false);
          reject(res);
        });
    });
  },

  //find items
  findItems({commit}, payload) {
    commit("setLoading", true);
    // commit(mutations.setLoading, true);
    return new Promise((resolve, reject) => {
        Http.get(`inventories/items/get?${serializeQuery(payload)}` ,)
        .then(res => {
          commit("setLoading", false);
          commit("setItems", res.data.items);
          commit("setItemsTotal", res.data.total);
          resolve(res.data);
        })
        .catch((res) => {
          commit("setLoading", false);
          reject(res);
        });
    });
  },
  //insert item
  insertItem({commit , dispatch}, payload) {
    commit("setInsertLoading", true);
    // commit(mutations.setLoading, true);
    return new Promise((resolve, reject) => {
        Http.post("inventories/add", payload)
        .then(res => {
          dispatch("findItems" , { doc : payload.doc , show: 10,page: 1,})
          commit("setInsertLoading", false);
          resolve(res.data);
        })
        .catch((res) => {
          commit("setInsertLoading", false);
          reject(res);
        });
    });
  },
  //close
  close({commit}, payload) {
    commit("setCloseLoading", true);
    // commit(mutations.setLoading, true);
    return new Promise((resolve, reject) => {
        Http.put(`inventories/close/${payload}`)
        .then(res => {
          const snackbar = {
              active : true,
              text: 'Inventory document closed successfully and stock updated'
          }
          commit('ui/setSnackbar' , snackbar , { root: true })
          commit("setCloseLoading", false);

          resolve(res.data);
        })
        .catch((res) => {
          commit("setCloseLoading", false);
          reject(res);
        });
    });
  },
};

const mutations = {
  setErr(state, error) {
    state.errors = error;
  },
  setItems(state, payload) {
    state.items = payload;
  },
  setItemsTotal(state, payload) {
    state.datatable.total = payload;
  },
  setInsertLoading(state, payload) {
    state.insertLoading = payload;
  },
  setFindItemsLoading(state, payload) {
    state.findItemsLoading = payload;
  },
  setQtyLoading(state, payload){
    state.qtyLoading  = payload
  },
  setCloseLoading(state, payload){
    state.closeLoading  = payload
  },
  setCreateLoading(state, payload) {
    state.createLoading = payload;
  },
  setLoading(state, payload) {
    state.datatable.loading = payload;
  },
  setItems(state, payload) {
    payload = payload == null ? [] : payload;
    state.datatable.data = payload;
  },
  setDocumentsLoading(state, payload) {
    state.documentsDatatable.loading = payload;
  },
  setDocumentsItems(state, payload) {
    payload = payload == null ? [] : payload;
    state.documentsDatatable.data = payload;
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
