import Vue from "vue";
export default {
  ADD_ITEM(state, item) {
    Vue.set(state.items, item.id, item);
  },
  EDIT_ITEM(state, item) {
    Vue.set(state.items, item.id, item);
  },
  ADD_CATEGORY(state, category) {
    Vue.set(state.categories, category.id, category);
  },
  EDIT_CATEGORY(state, category) {
    Vue.set(state.categories, category.id, category);
  },
  REMOVE_ITEM(state, item) {
    Vue.delete(state.items, item.id);
  },
  REMOVE_CATEGORY(state, category) {
    Vue.delete(state.categories, category.id);
  },
  SET_CATEGORIES(state, categories) {
    state.categories = categories;
  },
  SET_ITEMS(state, items) {
    state.items = items;
  }
};
