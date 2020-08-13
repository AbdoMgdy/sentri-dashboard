import axios from "@/axios.js";
import router from "../../router";

export default {
  addItem({ commit }, item) {
    commit("ADD_ITEM", item);
  },
  fetchDataListItems({ commit }) {
    return new Promise((resolve, reject) => {
      axios
        .get("vendor")
        .then(response => {
          console.log(response);
          if (response.status != 200) {
            // fix error when flask jwt token gives error 422
            router.push("/login");
            return;
          }

          commit("SET_PRODUCTS", response.data.orders);
          commit("SET_USERS", response.data.customers);
          resolve(response);
        })
        .catch(error => {
          router.push("/login");
          reject(error);
        });
    });
  },
  fetchUsers({ commit }) {
    return new Promise((resolve, reject) => {
      axios
        .get("customers")
        .then(response => {
          commit("SET_USERS", response.data.customers);
          resolve(response);
        })
        .catch(error => {
          console.log(error);
          reject(error);
        });
    });
  },
  updateItem({ commit }, item) {
    commit("UPDATE_PRODUCT", item);
    let bodyFormData = new FormData();
    bodyFormData.set("order_status", item.status);
    return new Promise((resolve, reject) => {
      axios({
        method: "put",
        url: `https://cors-anywhere.herokuapp.com/https://rest-bot-dev.herokuapp.com/order/${item.number}`,
        data: bodyFormData,
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  removeItem({ commit }, itemId) {
    commit("REMOVE_ITEM", itemId);
    return new Promise((resolve, reject) => {
      axios
        .delete(`/api/data-list/products/${itemId}`)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
};
