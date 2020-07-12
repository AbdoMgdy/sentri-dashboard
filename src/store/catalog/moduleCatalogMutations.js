export default {
  ADD_ITEM(state, item) {
    state.items[item.id] = item;
  },
  EDIT_ITEM(state, item) {
    state.items[item.id] = item;
  },
  ADD_CATEGORY(state, category) {
    state.categories[category.id] = category;
  },
  EDIT_CATEGORY(state, category) {
    state.categories[category.id] = category;
  },
  REMOVE_ITEM(state, item) {
    delete state.items[item.id];
  },
  REMOVE_CATEGORY(state, category) {
    delete state.categories[category.id];
  },
  SET_CATEGORIES(state, categories) {
    state.categories = categories;
  },
  SET_ITEMS(state, items) {
    state.items = items;
  }
};
