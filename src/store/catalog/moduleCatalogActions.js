import axios from "@/axios.js";
export default {
  fetchCategories({ commit }) {
    return new Promise((resolve, reject) => {
      axios
        .get("/catalog/categories")
        .then(response => {
          commit("SET_CATEGORIES", response.data);
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  fetchItems({ commit }) {
    return new Promise((resolve, reject) => {
      axios
        .get("/catalog/items")
        .then(response => {
          commit("SET_ITEMS", response.data);
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  addCategory({ commit }, category) {
    commit("ADD_CATEGORY", category);
    return new Promise((resolve, reject) => {
      axios
        .post("/catalog/categories", category)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  editCategory({ commit }, category) {
    commit("EDIT_CATEGORY", category);
    return new Promise((resolve, reject) => {
      axios
        .put("/catalog/categories", category)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  removeCategory({ commit }, category) {
    commit("REMOVE_CATEGORY", category);
    return new Promise((resolve, reject) => {
      axios
        .delete("/catalog/categories", { data: category })
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  addItem({ commit }, item) {
    commit("ADD_ITEM", item);
    return new Promise((resolve, reject) => {
      axios
        .post("/catalog/items", item)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  editItem({ commit }, item) {
    commit("EDIT_ITEM", item);
    return new Promise((resolve, reject) => {
      axios
        .put("/catalog/items", item)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  removeItem({ commit }, item) {
    commit("REMOVE_ITEM", item);
    return new Promise((resolve, reject) => {
      axios
        .delete("/catalog/items", { data: item })
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
};
