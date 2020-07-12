import axios from "@/axios.js";
export default {
  fetchCategories({ commit }) {
    return new Promise((resolve, reject) => {
      axios
        .get("/catalog/categories")
        .then(response => {
          console.log(response);
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
          console.log(response);
          commit("SET_ITEMS", response.data);
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  addCategory({ commit }, category) {
    console.log("addCategory called");
    console.trace();
    return new Promise((resolve, reject) => {
      axios
        .post("/catalog/categories", category)
        .then(response => {
          console.log(response);
          commit("ADD_CATEGORY", category);
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  editCategory({ commit }, category) {
    console.log("editCategory called");
    return new Promise((resolve, reject) => {
      axios
        .put("/catalog/categories", category)
        .then(response => {
          console.log(response);
          commit("EDIT_CATEGORY", category);
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  removeCategory({ commit }, category) {
    console.log("removeCategory called");

    return new Promise((resolve, reject) => {
      axios
        .delete("/catalog/categories", { data: category })
        .then(response => {
          commit("REMOVE_CATEGORY", category);
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  addItem({ commit }, item) {
    console.log("addItem called");
    return new Promise((resolve, reject) => {
      axios
        .post("/catalog/items", item)
        .then(response => {
          commit("ADD_ITEM", item);
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  editItem({ commit }, item) {
    console.log("editItem called");
    return new Promise((resolve, reject) => {
      axios
        .put("/catalog/items", item)
        .then(response => {
          commit("EDIT_ITEM", item);
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  removeItem({ commit }, item) {
    return new Promise((resolve, reject) => {
      axios
        .delete("/catalog/items", { data: item })
        .then(response => {
          commit("REMOVE_ITEM", item);
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
};
