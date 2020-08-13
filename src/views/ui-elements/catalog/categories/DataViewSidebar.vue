<template>
  <vs-sidebar
    click-not-close
    position-right
    parent="body"
    default-index="1"
    color="primary"
    class="add-new-data-sidebar items-no-padding"
    spacer
    v-model="isSidebarActiveLocal"
  >
    <div class="mt-6 flex items-center justify-between px-6">
      <h4>
        {{ Object.entries(this.data).length === 0 ? "ADD NEW" : "EDIT" }}
        Category
      </h4>
      <feather-icon
        icon="XIcon"
        @click.stop="isSidebarActiveLocal = false"
        class="cursor-pointer"
      ></feather-icon>
    </div>
    <vs-divider class="mb-0"></vs-divider>

    <VuePerfectScrollbar
      class="scroll-area--data-list-add-new"
      :settings="settings"
      :key="$vs.rtl"
    >
      <div class="p-6">
        <!-- Product Image -->
        <template v-if="dataImg">
          <!-- Image Container -->
          <div
            class="img-container w-64 mx-auto flex items-center justify-center"
          >
            <img :src="dataImg" alt="img" class="responsive" />
          </div>

          <!-- Image upload Buttons -->
          <div class="modify-img flex justify-between mt-5">
            <input
              type="file"
              class="hidden"
              ref="updateImgInput"
              @change="updateCurrImg"
              accept="image/*"
            />
            <vs-button
              class="mr-4"
              type="flat"
              @click="$refs.updateImgInput.click()"
              >Update Image</vs-button
            >
            <vs-button type="flat" color="#999" @click="dataImg = null"
              >Remove Image</vs-button
            >
          </div>
        </template>

        <!-- Title -->
        <vs-input
          label="Title"
          v-model="dataTitle"
          class="mt-5 w-full"
          name="item-title"
          v-validate="'required'"
        />
        <span class="text-danger text-sm" v-show="errors.has('item-title')">{{
          errors.first("item-title")
        }}</span>
        <!-- NAME -->
        <vs-input
          label="Subtitle"
          v-model="dataSubtitle"
          class="mt-5 w-full"
          name="item-subtitle"
          v-validate="'required'"
        />
        <span
          class="text-danger text-sm"
          v-show="errors.has('item-subtitle')"
          >{{ errors.first("item-subtitle") }}</span
        >
        <!-- Upload -->
        <!-- <vs-upload text="Upload Image" class="img-upload" ref="fileUpload" /> -->

        <div class="upload-img mt-5" v-if="!dataImg">
          <input
            type="file"
            class="hidden"
            ref="uploadImgInput"
            @change="updateCurrImg"
            accept="image/*"
          />
          <vs-button @click="$refs.uploadImgInput.click()"
            >Upload Image</vs-button
          >
        </div>
      </div>
    </VuePerfectScrollbar>

    <div class="flex flex-wrap items-center p-6" slot="footer">
      <vs-button class="mr-6" @click="submitData" :disabled="!isFormValid"
        >Submit</vs-button
      >
      <vs-button
        type="border"
        color="danger"
        @click="isSidebarActiveLocal = false"
        >Cancel</vs-button
      >
    </div>
  </vs-sidebar>
</template>

<script>
import VuePerfectScrollbar from "vue-perfect-scrollbar";
import firebase from "../../../../firebase/firebaseConfig";
export default {
  props: {
    isSidebarActive: {
      type: Boolean,
      required: true
    },
    data: {
      type: Object,
      default: () => {}
    }
  },
  watch: {
    isSidebarActive(val) {
      if (!val) return;
      if (Object.entries(this.data).length === 0) {
        this.initValues();
        this.$validator.reset();
      } else {
        let { id, img, title, subtitle } = JSON.parse(
          JSON.stringify(this.data)
        );
        this.dataId = id;
        this.dataImg = img;
        this.dataTitle = title;
        this.dataSubtitle = subtitle;
        this.initValues();
      }
    }
  },
  data() {
    return {
      dataId: null,
      dataTitle: null,
      dataSubtitle: null,
      dataImg: null,
      dataImgUrl: "",
      uploadValue: 0,
      settings: {
        // perfectscrollbar settings
        maxScrollbarLength: 60,
        wheelSpeed: 0.6
      }
    };
  },
  computed: {
    isSidebarActiveLocal: {
      get() {
        return this.isSidebarActive;
      },
      set(val) {
        if (!val) {
          this.$emit("closeSidebar");
          // this.$validator.reset()
          // this.initValues()
        }
      }
    },
    isFormValid() {
      return (
        !this.errors.any() &&
        this.dataTitle &&
        this.dataSubtitle &&
        this.dataImg !== ""
      );
    }
  },
  methods: {
    initValues() {
      if (this.data.id) return;
      this.dataId = null;
      this.dataTitle = "";
      this.dataSubtitle = "";
      this.dataImg = null;
    },
    submitData() {
      this.$validator.validateAll().then(result => {
        if (result) {
          const obj = {
            id: this.dataId,
            title: this.dataTitle,
            subtitle: this.dataSubtitle,
            img: this.dataImgUrl
          };

          if (Object.entries(this.data).length != 0) {
            this.$store.dispatch("catalog/editCategory", obj).catch(err => {
              console.error(err);
            });
          } else {
            delete obj.id;
            this.$store.dispatch("catalog/addCategory", obj).catch(err => {
              console.error(err);
            });
          }

          this.$emit("closeSidebar");
          this.initValues();
        }
      });
    },
    updateCurrImg(input) {
      if (input.target.files && input.target.files[0]) {
        let img = input.target.files[0];
        var reader = new FileReader();
        reader.onload = e => {
          this.dataImg = e.target.result;
        };
        reader.readAsDataURL(input.target.files[0]);
        const storageRef = firebase
          .storage()
          .ref(`${img.name}`)
          .put(img);
        storageRef.on(
          `state_changed`,
          snapshot => {
            this.uploadValue =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          },
          error => {
            console.log(error.message);
          },
          () => {
            this.uploadValue = 100;
            storageRef.snapshot.ref.getDownloadURL().then(url => {
              this.dataImgUrl = url;
              console.log(url);
            });
          }
        );
      }
    }
  },
  components: {
    VuePerfectScrollbar
  }
};
</script>

<style lang="scss" scoped>
.add-new-data-sidebar {
  ::v-deep .vs-sidebar--background {
    z-index: 52010;
  }

  ::v-deep .vs-sidebar {
    z-index: 52010;
    width: 400px;
    max-width: 90vw;

    .img-upload {
      margin-top: 2rem;

      .con-img-upload {
        padding: 0;
      }

      .con-input-upload {
        width: 100%;
        margin: 0;
      }
    }
  }
}

.scroll-area--data-list-add-new {
  // height: calc(var(--vh, 1vh) * 100 - 4.3rem);
  height: calc(var(--vh, 1vh) * 100 - 16px - 45px - 82px);
}
</style>
