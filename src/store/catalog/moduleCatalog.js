import state from "./moduleCatalogState.js";
import mutations from "./moduleCatalogMutations.js";
import actions from "./moduleCatalogActions.js";
import getters from "./moduleCatalogGetters";

export default {
  isRegistered: false,
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
