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
              <h6 class="heading-small text-muted mb-4">Product information</h6>
              <div class="pl-lg-4">
                <div class="row">
                  <div class="col-lg-6 flex flex-col">
                    <label class="form-control-label"> Stock id </label>
                    <el-autocomplete
                      v-model="value"
                      :disabled="viewOnly"
                      :fetch-suggestions="getAllProducts"
                      placeholder="Please input stock id"
                      @select="handleSelect"
                      class="mt-1 autocomplete"
                      maxlength="4"
                      show-word-limit
                    />
                  </div>

                  <div class="col-lg-6">
                    <base-input
                      alternative=""
                      label="Product name"
                      :disabled="viewOnly"
                      placeholder="Product name"
                      input-classes="form-control-alternative"
                      v-model="model.name"
                    />
                  </div>
                </div>

                <div class="row">
                  <div class="col-lg-6">
                    <base-input
                      alternative=""
                      label="Price"
                      :disabled="viewOnly"
                      placeholder="Price"
                      input-classes="form-control-alternative"
                      v-model="model.price"
                    />
                  </div>
                </div>

                <div class="row flex justify-end">
                  <base-button
                    type="primary"
                    v-if="!viewOnly"
                    @clicked="mode === 'create' ? addProductDetail():updateProductDetail() "
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
  name: 'sale-detail',
  components: {},
  data() {
    return {
      model: {
        name: '',
        price: '',
        product: '',
      },
      mode: 'view',
      value: '',
      viewOnly: false,
    };
  },
  methods: {
    handleSelect(item) {
      this.model.product = item.value;
    },
    async getAllProducts(query, cb) {
      const params = `?page=1&limit=10&search=${query}`;
      await this.$store
        .dispatch('products/getAllProducts', params)
        .then((res) => {
          this.loading = false;

          this.stocks = res.data.items.map((item) => {
            return { value: item.id, link: item.id };
          });
          return cb(this.stocks);
        })
        .catch((err) => {
          this.$notify({
            position: 'bottom-right',
            title: 'Error',
            message: 'Products cannot be fetched',
            type: 'danger',
          });
          console.log(err);
        });
    },
    async addProductDetail() {
      let loader = this.$loading.show({
        container: this.$refs.formContainer,
      });

    

      await this.$store
        .dispatch('productDetail/createProductDetail', this.model)
        .then((res) => {
          loader.hide();

          this.$notify({
            position: 'bottom-right',
            title: 'Info',
            message: 'Added product detail',
            type: 'success',
          });

          this.$router.push({
            name: 'products',
          });
        })
        .catch((err) => {
          loader.hide();
          this.$notify({
            position: 'bottom-right',
            title: 'Error',
             message: 'Cannot create product detail',
            type: 'error',
          });
        });
    },
     async updateProductDetail() {
      let loader = this.$loading.show({
        container: this.$refs.formContainer,
      });

      await this.$store
        .dispatch('productDetail/updateProductDetail', this.model)
        .then((res) => {
          loader.hide();

          this.$notify({
            position: 'bottom-right',
            title: 'Info',
            message: 'Updated product detail',
            type: 'success',
          });

          this.$router.push({
            name: 'products',
          });
        })
        .catch((err) => {
          loader.hide();
          this.$notify({
            position: 'bottom-right',
            title: 'Error',
             message: 'Cannot update product detail',
            type: 'error',
          });
        });
    },
  },
  computed: {
    ...mapGetters('productDetail', ['getproductDetailsById']),
  },
  async beforeMount() {
    this.mode = this.$route.query.mode;

    if (this.$route.query.id) {
      this.model = await this.getproductDetailsById(this.$route.query.id);
      this.value = this.model.product.id;
    }
    if (this.mode) {
      this.viewOnly = this.mode === 'view' ? true : false;
    }
  },
};
</script>
<style lang="scss">
.autocomplete {
  box-shadow: 0 1px 3px rgba(50, 50, 93, 0.15), 0 1px 0 rgba(0, 0, 0, 0.02);
}
</style>
