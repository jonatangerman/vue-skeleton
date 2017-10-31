import Vue from 'vue';
import Vuex from 'vuex';
import Router from './../src/router/routes';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        routes: {
            nonAuthenticated: ['login', 'signup', 'vehicles-print', '404'],
            redirecTo: '',
        },
        user: {
            auth: {
                token: null,
            },
        },
        general: {
            isLoading: false,
        },
    },
    getters: {
        isAnAuthenticatedRoute(state) {
            return !state.routes.nonAuthenticated.includes(Router.app.$route.name);
        },
        confirmAuthenticatedRoute: (state, getters) => (routeName) => {
            return !state.routes.nonAuthenticated.includes(routeName);
        },
        userToken(state) {
            return state.user.auth.token;
        },
        isUserAuthenticated(state, getters) {
            return getters.userToken;
        },
        isLoading(state) {
            return state.general.isLoading;
        },
    },
    mutations: {
        setUserToken(state, payload) {
            state.user.auth.token = `${payload}`;
        },
        clearUserData(state, payload) {
            state.user.auth.token = null;
            Cookies.remove('userToken');            
        },
        setRedirectURL(state, payload) {
            state.routes.redirecTo = payload.redirectURL;
        },
        setLoader(state, status) {
            state.general.isLoading = status;
        },
    },
    actions: {
        logOut(context) {
            context.commit('clearUserData');
            Router.push({name: 'login'});
        },
    },
});

export default store;
