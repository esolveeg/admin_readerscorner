import http from "../common/Http.js";
export const state = () => ({
    loading: false,
    errors : [],
    error : "",
});

export const getters = {
    loading(state){
        return state.loading
    },
    errors(state){
        return state.errors
    },
    error(state){
        return state.error
    },
};


export const mutations = {
    setLoading(state , payload){
        state.loading = payload
    },
    errors(state , payload){
        state.errors = payload
    },
    error(state , payload){
        state.error = payload
    },

};

export const actions = {
    login({commit},payload) {
        commit('setLoading' , true)
        commit('setErr' , [])
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
            console.log(e.response.data.errors)
            typeof e.response.data.errors !== 'undefined'
            ? commit('errors' , e.response.data.errors)
            : commit('error' , e.response.data)
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
