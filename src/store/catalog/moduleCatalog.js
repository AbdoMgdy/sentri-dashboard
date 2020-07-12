import state from "./moduleCatalogState.js";
import mutations from "./moduleCatalogMutations.js";
import actions from "./moduleCatalogActions.js";

export default {
  isRegistered: false,
  namespaced: true,
  state: state,
  mutations: mutations,
  actions: actions
};
