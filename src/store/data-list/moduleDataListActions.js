
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
          console.log(response.data);
          commit("SET_USERS", response.data.customers);
          resolve(response);
        })
        .catch(error => {
          console.log(error);
          reject(error);
        });
    });
  },
  // fetchEventLabels({ commit }) {
  //   return new Promise((resolve, reject) => {
  //     axios.get("/api/apps/calendar/labels")
  //       .then((response) => {
  //         commit('SET_LABELS', response.data)
  //         resolve(response)
  //       })
  //       .catch((error) => { reject(error) })
  //   })
  // },
  updateItem({ commit }, item) {
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
          commit("UPDATE_PRODUCT", item);
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  removeItem({ commit }, itemId) {
    return new Promise((resolve, reject) => {
      axios
        .delete(`/api/data-list/products/${itemId}`)
        .then(response => {
          commit("REMOVE_ITEM", itemId);
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
  // eventDragged({ commit }, payload) {
  //   return new Promise((resolve, reject) => {
  //     axios.post(`/api/apps/calendar/event/dragged/${payload.event.id}`, {payload: payload})
  //       .then((response) => {

  //         // Convert Date String to Date Object
  //         let event = response.data
  //         event.startDate = new Date(event.startDate)
  //         event.endDate = new Date(event.endDate)

  //         commit('UPDATE_EVENT', event)
  //         resolve(response)
  //       })
  //       .catch((error) => { reject(error) })
  //   })
  // },
};
