import http from "../common/Http.js";
export const state = () => ({
    loading: false,
    err : null
});

export const getters = {
    loading(state){
        return state.loading
    },
    err(state){
        return state.err
    },
};


export const mutations = {
    setLoading(state , payload){
        state.loading = payload
    },
    setErr(state , payload){
        state.err = payload
    },

};

export const actions = {
    login({commit},payload) {
        commit('setLoading' , true)
        commit('setErr' , null)
        payload.auth.loginWith('local', { data: payload.form })
        .then(d => {
            commit('setLoading' , false)
            const snackbar = {
                active : true,
                text: 'logged in successfully'
            }
            commit('ui/setSnackbar' , snackbar , { root: true })
        })
        .catch(e => {
            commit('setErr' , e.response.data)
            commit('setLoading' , false)
        })
    },
    me({commit} , payload){
        commit('setLoading' , true)
        return new Promise((resolve, reject) => {
            http
            .get("user")
            .then(res => {
                payload.setUser(res.data)
                commit('setLoading' , false)
                resolve(res.data);
            })
            .catch(e => {
                payload.logout();
                commit('setLoading' , false)
                reject(e.response.data);
            })
          })
    },
   
};
