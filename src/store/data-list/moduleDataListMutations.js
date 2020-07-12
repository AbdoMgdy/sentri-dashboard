
export default {
  ADD_ITEM(state, item) {
    item.time = new Date(item.time);
    state.products.unshift(item);
  },
  SET_PRODUCTS(state, products) {
    const productsMap = products.map(el => {
      let current = new Date(el.time);
      el.time = new Date(current);
      el.time.setHours(current.getHours() + 2);
      return el;
    });
    state.products = productsMap.filter(el => el.is_confirmed == true);
    state.products.sort((a, b) => b.time - a.time);
  },
  SET_USERS(state, users) {
    const usersMap = users.map(el => {
      let current = new Date(el.created_time);
      el.created_time = new Date(current);
      el.created_time.setHours(current.getHours() + 2);
      return el;
    });
    state.users = usersMap;
  },
  // SET_LABELS(state, labels) {
  //   state.eventLabels = labels
  // },
  UPDATE_PRODUCT(state, product) {
    const productIndex = state.products.findIndex(
      p => p.number == product.number
    );
    state.products[productIndex].status = product.status;
  },
  REMOVE_ITEM(state, itemId) {
    const ItemIndex = state.products.findIndex(p => p.id == itemId);
    state.products.splice(ItemIndex, 1);
  }
};
