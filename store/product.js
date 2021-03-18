// import axios from "axios";

import Http  from "@/common/Http.js";
import {serializeQuery} from "@/common/Helpers.js";
// import i18n from "@/i18n.js";
const state = {
  errors: null,
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
};

const actions = {
  get({commit}, payload) {
    commit("setLoading", true);
    // commit(mutations.setLoading, true);
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
};

const mutations = {
  setErr(state, error) {
    state.errors = error;
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
