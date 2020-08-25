<template>
  <div>
    <div class="vx-col w-full sm:w md:w lg:w xl:w mb-base">
      <vx-card title="Connected Facebook Page">
        <ul>
          <li v-for="page in pages" :key="page.id">
            <div class="vx-row mb-4">
              <div class="vx-col">
                <img
                  :key="page.id"
                  :src="page.picture.data.url"
                  class="rounded-full"
                />
              </div>
              <div class="vx-col w-1/2 sm:w md:w lg:w xl:w mb-base py-2">
                <p class="text-xl">{{ page.name }}</p>
              </div>
              <div class="vx-col">
                <vs-button
                  :id="`p${page.id}`"
                  @click="disconnectPage(page)"
                  class="vs-con-loading__container"
                  v-if="page.is_webhooks_subscribed"
                  color="danger"
                  type="filled"
                  >Disconnect</vs-button
                >
                <vs-button
                  :id="`p${page.id}`"
                  class="vs-con-loading__container"
                  @click="connectPage(page)"
                  v-else
                  color="#00e600"
                  type="filled"
                  >Connect</vs-button
                >
              </div>
            </div>
          </li>
        </ul>
      </vx-card>
      <vx-card title="Working Hours" class="mt-5">
        {{ openingHours }}
        <vs-row>
          <vs-col vs-w="4">
            <span>Opening Hours: </span>
            <time-picker
              v-model="openingHours"
              auto-scroll
              close-on-complete
            ></time-picker>
          </vs-col>
          <vs-col vs-w="4">
            <span>Closing Hours: </span>
            <time-picker
              v-model="closingHours"
              auto-scroll
              close-on-complete
            ></time-picker>
          </vs-col>
          <vs-col vs-w="4">
            <vs-button
              id="workingHoursBtn"
              @click="setWorkingHours"
              class="vs-con-loading__container ml-10"
              color="primary"
              type="filled"
              >Set Working Hours</vs-button
            >
          </vs-col>
        </vs-row>
      </vx-card>
    </div>
  </div>
</template>

<script>
import timePicker from "vue2-timepicker";
import "vue2-timepicker/dist/VueTimepicker.css";
export default {
  components: {
    timePicker
  },
  data: () => ({
    isConnected: false,
    pages: [],
    openingHours: "",
    closingHours: ""
  }),
  methods: {
    checkWorkingHours() {
      if (this.openingHours && this.openingHours) {
        return true;
      } else {
        return false;
      }
    },
    fillPages(pages) {
      console.log(pages);
      const pagesMapper = pages.filter(
        page => page.is_webhooks_subscribed == true
      );
      console.log(pagesMapper);
      if (pagesMapper.length == 0) {
        this.pages = pages;
      } else {
        this.pages = pagesMapper;
      }
    },
    fethConnectedPages() {
      const uid = this.$store.getters.AppActiveUser.uid;
      const pageAccessToken = this.$store.getters.AppActiveUser.pageAccessToken;
      const url = `https://graph.facebook.com/${uid}/accounts?fields=is_webhooks_subscribed,name,access_token,picture&access_token=${pageAccessToken}`;
      this.$http
        .get(url)
        .then(res => {
          console.log(res.data.data);
          this.fillPages(res.data.data);
          this.$vs.loading.close();
        })
        .catch(err => {
          console.log(err);
        });
    },
    connectPage(page) {
      const uid = this.$store.getters.AppActiveUser.uid;
      this.$vs.loading({
        background: "#00e600",
        color: "#fff",
        container: `#p${page.id}`,
        scale: 0.45
      });
      this.$http.post("vendor/fb_page", { page, uid }).then(res => {
        console.log(res);
        this.fethConnectedPages();
        this.$vs.loading.close(`#p${page.id}>.con-vs-loading`);
      });
    },
    disconnectPage(page) {
      const uid = this.$store.getters.AppActiveUser.uid;
      this.$vs.loading({
        background: "danger",
        color: "#fff",
        container: `#p${page.id}`,
        scale: 0.45
      });
      this.$http
        .delete("vendor/fb_page", { data: { page: page, uid: uid } })
        .then(res => {
          console.log(res);
          this.fethConnectedPages();
          this.$vs.loading.close(`#p${page.id}>.con-vs-loading`);
        });
    },
    setWorkingHours() {
      if (!this.checkWorkingHours()) {
        this.$vs.notify({
          title: "Error",
          text: "Make Sure Working Hours aren't empty",
          color: "danger"
        });
        return;
      }
      this.$vs.loading({
        background: "primary",
        color: "#fff",
        container: "#workingHoursBtn",
        scale: 0.45
      });
      this.$http
        .put("vendor", {
          opening_hours: this.openingHours,
          closing_hours: this.closingHours
        })
        .then(res => {
          this.$vs.loading.close(`#workingHoursBtn>.con-vs-loading`);
          console.log(res);
          this;
          if (res.status == 200) {
            this.$vs.notify({
              title: "Success",
              text: "Working Hours Set",
              color: "success"
            });
          }
        });
    }
  },
  created() {
    this.$vs.loading();
  },
  async mounted() {
    await this.fethConnectedPages();
  }
};
</script>
