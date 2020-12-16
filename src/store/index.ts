import authService from "@/services/auth.service";
import userService from "@/services/user.service";
import Vue from "vue";
import Vuex from "vuex";
import UserModel from "./models/user.model";
import NotesModel from "./models/notes.model";
import Pagination from "./models/pagination.model";
import { NOTES_PER_PAGE } from "@/helpers/constants";

Vue.use(Vuex);

const initialState = {
  isRequestsProcessing: false,
  online: true,
  user: null,
  accessToken: "vasyakottoken",
  expiresIn: -1,
  notes: [] as NotesModel[],
  pagination: {
    perPage: NOTES_PER_PAGE,
    currentPage: 1,
    from: 1,
    to: NOTES_PER_PAGE,
  } as Pagination,
  modal: {
    isOpen: false,
    isEdit: false,
    noteId: 0,
    text: "",
  },
};

const { user, accessToken, expiresIn } = JSON.parse(
  localStorage.getItem("credentials") ?? "{}"
);

const state = {
  ...initialState,
  user: user ?? new UserModel(),
  accessToken,
  expiresIn,
};

export default new Vuex.Store({
  state,
  mutations: {
    startRequest: (store) => {
      store.isRequestsProcessing = true;
    },
    stopRequest: (store) => {
      store.isRequestsProcessing = false;
    },
    authSuccess: (store, { accessToken, expiresIn, user }) => {
      store.user = user;
      store.accessToken = accessToken;
      store.expiresIn = expiresIn;
    },
    authFailure: (store) => {
      store.user = new UserModel();
      store.accessToken = null;
      store.expiresIn = null;
    },
    logout: (store) => {
      store.user = new UserModel();
      store.accessToken = null;
      store.expiresIn = null;
    },
    setNotes: (store, notes) => {
      store.notes = notes;
    },
    setPagination: (store, pagination) => {
      store.pagination = pagination;
    },
    online: (store) => {
      store.online = true;
    },
    offline: (store) => {
      store.online = false;
    },
    switchModalState: (store, flag) => {
      store.modal = {
        ...store.modal,
        isOpen: flag,
      };
    },
    setEditFlag: (store, flag) => {
      store.modal = {
        ...store.modal,
        isEdit: flag,
      };
    },
    setEditingNote: (store, { noteId, text }) => {
      store.modal = {
        ...store.modal,
        noteId,
        text,
      };
    },
  },
  actions: {
    openModal: ({ commit }, edit = false) => {
      commit("setEditFlag", edit);
      commit("switchModalState", true);
    },
    closeModal: ({ commit }) => {
      commit("switchModalState", false);
    },
    fetchAllNotes: async (
      { commit, state },
      currentPage = 1
    ): Promise<void> => {
      commit("startRequest");
      try {
        const { perPage } = state.pagination;
        const response = await userService.getAllNotes({
          currentPage,
          perPage,
        });
        const { notes, pagination } = response.data ? response.data : response;
        commit("setPagination", pagination);
        commit("setNotes", notes);
      } catch (e) {
        console.log("Error fetchAllNotes: ", e);
      } finally {
        commit("stopRequest");
      }
    },
    logout: async ({ commit }): Promise<void> => {
      commit("startRequest");
      try {
        await authService.logout();
        localStorage.removeItem("credentials");
        commit("logout");
        return Promise.resolve();
      } catch (e) {
        return Promise.reject(e);
      } finally {
        commit("stopRequest");
      }
    },
    login: async ({ dispatch }, credentials): Promise<void> => {
      return dispatch("handleAuth", { isLogin: true, ...credentials });
    },
    register: async ({ dispatch }, credentials) => {
      return dispatch("handleAuth", { isLogin: false, ...credentials });
    },
    handleAuth: async ({ commit }, { isLogin, ...credentials }) => {
      commit("startRequest");
      const service = isLogin ? "login" : "register";
      try {
        const { login, password } = credentials;
        const response = await authService[service]({ login, password });
        const { accessToken, user } = response.data;
        if (accessToken && user) {
          localStorage.setItem("credentials", JSON.stringify(response.data));
          commit("authSuccess", response.data);
          return Promise.resolve(response.data);
        } else {
          localStorage.removeItem("credentials");
          commit("authFailure");
          return Promise.reject(response);
        }
      } catch (e) {
        localStorage.removeItem("credentials");
        commit("authFailure");
        return Promise.reject(e);
      } finally {
        commit("stopRequest");
      }
    },
    shareNote: async ({ commit, dispatch }, id) => {
      commit("startRequest");
      try {
        await userService.shareNote(id);
        await dispatch("fetchAllNotes");
      } catch (e) {
        return Promise.reject(e);
      } finally {
        commit("stopRequest");
      }
    },
    deleteSharedNote: async ({ commit, dispatch }, id) => {
      commit("startRequest");
      try {
        await userService.deleteSharedNote(id);
        await dispatch("fetchAllNotes");
      } catch (e) {
        return Promise.reject(e);
      } finally {
        commit("stopRequest");
      }
    },

    deleteNote: async ({ commit, dispatch }, id) => {
      commit("startRequest");
      try {
        await userService.deleteNote(id);
        await dispatch("fetchAllNotes");
      } catch (e) {
        return Promise.reject(e);
      } finally {
        commit("stopRequest");
      }
    },
    createNote: async ({ commit, dispatch }, text) => {
      commit("startRequest");
      try {
        await userService.createNote(text);
        await dispatch("fetchAllNotes");
        dispatch("closeModal");
      } catch (e) {
        return Promise.reject(e);
      } finally {
        commit("stopRequest");
      }
    },
    saveNote: async ({ commit, dispatch, state }, text) => {
      commit("startRequest");
      try {
        const id = state.modal.noteId + "";
        await userService.editNote({ id, text });
        await dispatch("fetchAllNotes");
        dispatch("closeModal");
      } catch (e) {
        return Promise.reject(e);
      } finally {
        commit("stopRequest");
      }
    },
    editNote: async ({ commit, dispatch, state }, id) => {
      const foundNote = state.notes.find((note) => note.id === id);
      if (foundNote) {
        commit("setEditingNote", { noteId: id, text: foundNote.text });
        dispatch("openModal", true);
      } else {
        console.log("note not found", id);
      }
    },
  },
  getters: {
    loggedIn: (state) => {
      return state.user.accessToken !== "";
    },
    isEditModal: (state) => {
      return state.modal.isEdit;
    },
    isModalOpen: (state) => {
      return state.modal.isOpen;
    },
    sortedNotes: (state) => {
      return state.notes.sort((a, b) => {
        return (
          new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
        );
      });
    },
    isOnline: (state) => {
      return navigator.onLine && state.online === true;
    },
    isOffline: (state, getters) => {
      return !getters.isOnline;
    },
  },
});
