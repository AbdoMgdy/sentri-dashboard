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
        ITEM
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
          name="item-titletitle"
          v-validate="'required'"
        />
        <span class="text-danger text-sm" v-show="errors.has('item-title')">{{
          errors.first("item-title")
        }}</span>

        <!-- Subtitle -->
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
        <!-- Price -->
        <vs-input
          label="Price"
          v-model="dataPrice"
          class="mt-5 w-full"
          name="item-price"
          v-validate="'required'"
        />
        <span class="text-danger text-sm" v-show="errors.has('item-price')">{{
          errors.first("item-price")
        }}</span>

        <!-- Category -->
        <vs-select
          v-model="dataCategory"
          label="Category"
          class="mt-5 w-full"
          name="item-category"
          v-validate="'required'"
        >
          <vs-select-item
            :key="category.id"
            :value="category.id"
            :text="category.title"
            v-for="category in categories"
          />
        </vs-select>
        <span
          class="text-danger text-sm"
          v-show="errors.has('item-category')"
          >{{ errors.first("item-category") }}</span
        >
        <!-- In Stock -->
        <div class="mt-5">
          <span class="mb-5 float-left mr-10">In Stock</span>
          <vs-switch v-model="dataInStock">
            In Stock
          </vs-switch>
        </div>
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
      <vs-button
        class="mr-6"
        @click="submitData"
        :disabled="!isFormValid || !isImageUploaded"
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
    },
    categories: {
      type: Array,
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
        let { category_id, id, img, title, subtitle, price } = JSON.parse(
          JSON.stringify(this.data)
        );
        this.dataId = id;
        this.dataCategory = category_id;
        this.dataImg = img;
        this.dataTitle = title;
        this.dataSubtitle = subtitle;
        this.dataPrice = price;
        this.initValues();
      }
      // Object.entries(this.data).length === 0 ? this.initValues() : { this.dataId, this.dataName, this.dataCategory, this.dataOrder_status, this.dataPrice } = JSON.parse(JSON.stringify(this.data))
    }
  },
  data() {
    return {
      dataId: null,
      dataTitle: "",
      dataInStock: true,
      dataSubtitle: "",
      dataCategory: null,
      dataImg: null,
      dataImgUrl: "",
      dataPrice: 0,
      isImageUploaded: true,
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
        this.dataSubtitle &&
        this.dataTitle &&
        this.dataPrice > 0
      );
    }
  },
  methods: {
    initValues() {
      if (this.data.id) return;
      this.dataId = Math.floor(Math.random() * Math.floor(9999)).toString();
      this.dataTitle = "";
      this.dataSubtitle = "";
      this.dataCategory = null;
      this.dataPrice = 0;
      this.dataImg = null;
      this.dataInStock = true;
    },
    submitData() {
      this.$validator.validateAll().then(result => {
        if (result) {
          const obj = {
            id: this.dataId.toString(),
            title: this.dataTitle,
            subtitle: this.dataSubtitle,
            img: this.dataImgUrl,
            category: this.dataCategory,
            category_id: this.dataCategory,
            category_title: this.$store.state.catalog.categories[
              this.dataCategory
            ].title,
            in_stock: this.dataInStock,
            price: this.dataPrice
          };
          console.log(this.$props.categories);
          if (Object.entries(this.data).length !== 0) {
            this.$store.dispatch("catalog/editItem", obj).catch(err => {
              console.error(err);
            });
          } else {
            this.$store.dispatch("catalog/addItem", obj).catch(err => {
              console.error(err);
            });
          }
          this.$store.dispatch("catalog/fetchItems");
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
          this.isImageUploaded = false;
        };
        reader.readAsDataURL(input.target.files[0]);
        this.dataImgUrl = null;
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
              this.isImageUploaded = true;
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
