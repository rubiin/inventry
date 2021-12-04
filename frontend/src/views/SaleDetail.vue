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
              <h6 class="heading-small text-muted mb-4">Sale information</h6>
              <div class="pl-lg-4">
                <div class="row">
                  <div class="col-lg-6">
                    <base-input
                      alternative=""
                      label="Price"
                      placeholder="Price"
                      :disabled="viewOnly"
                      input-classes="form-control-alternative"
                      v-model="model.price"
                    />
                  </div>
                  <div class="col-lg-6">
                    <base-input
                      alternative=""
                      label="Quantity"
                      :disabled="viewOnly"
                      placeholder="100"
                      input-classes="form-control-alternative"
                      v-model="model.quantity"
                    />
                  </div>
                </div>
                <div class="row">
                  <div class="col-lg-6">
                    <base-input
                      alternative=""
                      label="Vat"
                      placeholder="Vat"
                      :disabled="viewOnly"
                      input-classes="form-control-alternative"
                      v-model="model.vat"
                    />
                  </div>
                  <div class="col-lg-6">
                    <div class="form-group">
                      <base-input
                        alternative=""
                        label="Discount"
                        placeholder="Discount"
                        :disabled="viewOnly"
                        input-classes="form-control-alternative"
                        v-model="model.discount"
                      />
                    </div>
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
export default {
  name: 'sale-detail',
  data() {
    return {
      model: {
        vat: 0,
        discount: 0,
        price: 0,
        quantity: 0,
        product: '',
      },
      mode: 'view',
      image: null,
      viewOnly: false,
    };
  },
  methods: {
    async addSale() {
      let loader = this.$loading.show({
        container: this.$refs.formContainer,
      });

      await this.$store
        .dispatch('sales/createSales', this.model)
        .then((res) => {
          loader.hide();

          this.$notify({
            title: 'Info',
            text: 'Added sale',
            type: 'success',
          });

          this.$router.push({
            name: 'sales',
          });
        })
        .catch((err) => {
          loader.hide();
          this.$notify({
            title: 'Error',
            text: 'Cannot create sale',
            type: 'error',
          });
        });
    },
    async getSale(id) {
      let loader = this.$loading.show({
        container: this.$refs.formContainer,
      });

      await this.$store
        .dispatch('sales/getSales', id)
        .then((res) => {
          loader.hide();

          this.model = res.data.data;

          this.$notify({
            title: 'Info',
            text: 'Fetched sale',
            type: 'success',
          });
        })
        .catch((err) => {
          loader.hide();
          this.$notify({
            title: 'Error',
            text: 'Cannot create sale',
            type: 'error',
          });
        });
    },
    async updateSale() {
      let loader = this.$loading.show({
        container: this.$refs.formContainer,
      });

      await this.$store
        .dispatch('sales/updateSales', this.model)
        .then((res) => {
          loader.hide();

          this.$notify({
            title: 'Info',
            text: 'Updated sale',
            type: 'success',
          });

          this.$router.push({
            name: 'sales',
          });
        })
        .catch((err) => {
          loader.hide();
          this.$notify({
            title: 'Error',
            text: 'Sale cannot be updated',
            type: 'danger',
          });
          console.log(err);
        });
    },
  },
  computed: {},
  mounted() {
    this.mode = this.$route.query.mode;

    if (this.$route.query.id) {
      this.model = this.getSale(this.$route.query.id);
    }
    if (this.mode) {
      this.viewOnly = this.mode === 'view' ? true : false;
    }
  },
};
</script>
