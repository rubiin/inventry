<template>
  <div ref="formContainer">
    <base-header
      class="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
      style="
        min-height: 200px;
        background-image: url(img/theme/profile-cover.jpg);
        background-size: cover;
        background-position: center top;
      "
    >
      <!-- Mask -->
      <span class="mask bg-gradient-success opacity-8"></span>
      <!-- Header container -->
    </base-header>

    <div class="container-fluid mt--7">
      <div class="row">
        <div class="col-xl-8 order-xl-1">
          <card shadow type="secondary">
            <template v-slot:header>
              <div class="bg-white border-0">
                <div class="row align-items-center"></div>
              </div>
            </template>

            <form>
              <h6 class="heading-small text-muted mb-4">Stock information</h6>
              <div class="pl-lg-4">
                <div class="row">
                  <div class="image-wrapper">
                    <div class="personal-image">
                      <label class="label">
                        <input
                          type="file"
                          @change="uploadFile($event)"
                          :disabled="viewOnly"
                        />
                        <figure class="personal-figure">
                          <img
                            :src="
                              model.image === ''
                                ? 'https://raw.githubusercontent.com/ThiagoLuizNunes/angular-boilerplate/master/src/assets/imgs/camera-white.png'
                                :  model.image
                            "
                            class="personal-avatar"
                            alt="avatar"
                          />
                          <figcaption class="personal-figcaption">
                            <img
                              src="https://raw.githubusercontent.com/ThiagoLuizNunes/angular-boilerplate/master/src/assets/imgs/camera-white.png"
                            />
                          </figcaption>
                        </figure>
                      </label>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-lg-6">
                    <base-input
                      alternative=""
                      label="Product name"
                      placeholder="Product name"
                      :disabled="viewOnly"
                      input-classes="form-control-alternative"
                      v-model="model.name"
                    />
                  </div>
                  <div class="col-lg-6">
                    <base-input
                      alternative=""
                      label="Price"
                      :disabled="viewOnly"
                      placeholder="100"
                      input-classes="form-control-alternative"
                      v-model="model.price"
                    />
                  </div>
                </div>
                <div class="row">
                  <div class="col-lg-6">
                    <base-input
                      alternative=""
                      label="Quantity"
                      placeholder="Quantity"
                      :disabled="viewOnly"
                      input-classes="form-control-alternative"
                      v-model="model.quantity"
                    />
                  </div>
                </div>

                <div class="row flex justify-end">
                  <base-button
                    type="primary"
                    v-if="!viewOnly"
                    @clicked="
                      mode === 'create' ? addProduct() : updateProduct()
                    "
                    >{{ mode === 'create' ? 'Create' : 'Update' }}</base-button
                  >
                </div>
              </div>
            </form>
          </card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
  name: 'user-profile',
  data() {
    return {
      model: {
        name: '',
        price: 0,
        quantity: 0,
        image: '',
      },
      mode: 'view',
      image: null,
      viewOnly: false,
      IMAGE_URL: 'http://localhost:8000/',
    };
  },
  methods: {
    async addProduct() {
      let loader = this.$loading.show({
        container: this.$refs.formContainer,
      });
      let formData = new FormData();
      formData.append('image', this.image);
      formData.append('name', this.model.name);
      formData.append('price', this.model.price);
      formData.append('quantity', this.model.quantity);

      const payload = {
        config: {
          header: {
            'Content-Type': 'multipart/form-data',
          },
        },
        data: formData,
      };

      await this.$store
        .dispatch('products/createProduct', payload)
        .then((res) => {
          loader.hide();

          this.$notify({
            position: 'bottom-right',
            title: 'Info',
            message: 'Added stock',
            type: 'success',
          });

          this.$router.push({
            name: 'stocks',
          });
        })
        .catch((err) => {
          loader.hide();
          this.$notify({
            position: 'bottom-right',
            title: 'Error',
            message: 'Cannot create stock',
            type: 'error',
          });
        });
    },
    async updateProduct() {
      let loader = this.$loading.show({
        container: this.$refs.formContainer,
      });
      let formData = new FormData();
      formData.append('image', this.image);
      formData.append('name', this.model.name);
      formData.append('price', this.model.price);
      formData.append('quantity', this.model.quantity);

      const payload = {
        config: {
          header: {
            'Content-Type': 'multipart/form-data',
          },
        },
        data: formData,
        id: this.$route.query.id,
      };

      await this.$store
        .dispatch('products/updateAProduct', payload)
        .then((res) => {
          loader.hide();

          this.$notify({
            position: 'bottom-right',
            title: 'Info',
            message: 'Updated stock',
            type: 'success',
          });

          this.$router.push({
            name: 'stocks',
          });
        })
        .catch((err) => {
          loader.hide();
          this.$notify({
            position: 'bottom-right',
            title: 'Error',
            message: 'Stock cannot be updated',
            type: 'danger',
          });
          console.log(err);
        });
    },
    uploadFile(event) {
      this.image = event.target.files[0];
      this.model.image = URL.createObjectURL(this.image);
    },
  },
  computed: {
    ...mapGetters('products', ['getProductById']),
  },
  mounted() {
    this.mode = this.$route.query.mode;

    if (this.$route.query.id) {
      this.model = this.getProductById(this.$route.query.id);
      this.image = this.model.image;
      this.model.image = this.IMAGE_URL + this.model.image;
    }
    if (this.mode) {
      this.viewOnly = this.mode === 'view' ? true : false;
    }
  },
};
</script>
<style>
.personal-image {
  text-align: center;
}
.personal-image input[type='file'] {
  display: none;
}
.personal-figure {
  position: relative;
  width: 120px;
  height: 120px;
}
.personal-avatar {
  cursor: pointer;
  width: 120px;
  height: 120px;
  box-sizing: border-box;
  border-radius: 100%;
  border: 2px solid transparent;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.2);
  transition: all ease-in-out 0.3s;
}
.personal-avatar:hover {
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.5);
}
.personal-figcaption {
  cursor: pointer;
  position: absolute;
  top: 0px;
  width: inherit;
  height: inherit;
  border-radius: 100%;
  opacity: 0;
  background-color: rgba(0, 0, 0, 0);
  transition: all ease-in-out 0.3s;
}
.personal-figcaption:hover {
  opacity: 1;
  background-color: rgba(0, 0, 0, 0.5);
}
.personal-figcaption > img {
  width: inherit;
  height: inherit;
  transform: scale(0.29);
}

.image-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
}
</style>
