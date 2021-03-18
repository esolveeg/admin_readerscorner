// import axios from "axios";

import Http from "@/common/Http.js";
// import i18n from "@/i18n.js";
const state = {
  errors: null,
  statusLoading: false,
  datatable: {
    search: '',
    calories: '',
    total: null,
    headers : [
        { text: 'id', value: 'id' , align: "center" },
        { text: 'status', value: 'status' , align: "center" },
        { text: 'name', value: 'name' , align: "center" },
        { text: 'gateway', value: 'gateway' , align: "center" },
        { text: 'discount', value: 'discount' , align: "center" },
        { text: 'total', value: 'total' , align: "center" },
        { text: 'Actions', value: 'actions' , align : "center" },
      ],
    data : [],
    loading: false,
  },
};

const getters = {
  datatable(state) {
    return state.datatable;
  },
  statusLoading(state) {
    return state.statusLoading;
  },
};

const actions = {
  get({commit}, payload) {
    commit("setLoading", true);
    // commit(mutations.setLoading, true);
    return new Promise((resolve, reject) => {
        Http.get("orders", payload)
        .then((res) => {
          commit("setItems", []);
          const data = res.data.items.map((item) => {
            console.log(item)
            let discount = item.discount_value 
            return {
              id: item.id,
              status: item.status,
              name: item.name,
              gateway: item.gateway,
              discount,
              total: parseFloat(item.total).toFixed(2),
            };
          });
          console.log(data)
          commit("setItems", data);
          commit("setTotal", res.data.total);
          commit("setLoading", false);

          resolve(data);
        })
        .catch((res) => {
          commit("setLoading", false);
          reject(res);
        });
    });
  },
  updateStatus({commit , dispatch}, payload) {
    commit("setStatusLoading", true);
    // commit(mutations.setLoading, true);
    return new Promise((resolve, reject) => {
        Http.put(`orders/update-status/${payload.id}`, {status : payload.status})
        .then((res) => {
          commit("setStatusLoading", false);
          const payload = {
            show : 10,
            page: 1,
          }
          dispatch("get" , payload)
          resolve(res.data);
        })
        .catch((res) => {
          commit("setStatusLoading", false);
          reject(res);
        });
    });
  },

  
};

const mutations = {
  setErr(state, error) {
    state.errors = error;
  },
  setStatusLoading(state, payload) {
    state.statusLoading = payload;
  },
  setLoading(state, payload) {
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
