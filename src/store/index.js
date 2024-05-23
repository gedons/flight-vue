// src/store/index.js
import { createStore } from 'vuex';

const store = createStore({
  state() {
    return {
      isAuthenticated: false,
      userRole: null,
      user: null,
    };
  },
  mutations: {
    setUser(state, payload) {
      state.isAuthenticated = true;
      state.userRole = payload.role;
      state.user = payload.user;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.userRole = null;
      state.user = null;
    },
  },
  actions: {
    async login({ commit }, { email, password, isAdmin }) {
      const endpoint = isAdmin ? '/api/admin/login' : '/api/auth/login';
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        commit('setUser', { user: data.user, role: isAdmin ? 'admin' : 'user' });
      } else {
        throw new Error('Login failed');
      }
    },
    logout({ commit }) {
      commit('logout');
    },
  },
});

export default store;
