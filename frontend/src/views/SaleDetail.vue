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
        <div class="col">
          <projects-table :tableData="sales"></projects-table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ProjectsTable from './Tables/AddSale';
export default {
  name: 'sale-detail',
  components: {
    ProjectsTable,
  },
  data() {
    return {
      model: {
        vat: 0,
        discount: 0,
        price: 0,
        quantity: 0,
        product: '',
      },
      products: [],
      sales: [],
      mode: 'view',
      value: 1,
      viewOnly: false,
    };
  },
  methods: {
    async getAllProducts() {
      let loader = this.$loading.show({
        container: this.$refs.formContainer,
      });

      const params = `?page=1&limit=10000`;
      await this.$store
        .dispatch('products/getAllProducts', params)
        .then((res) => {
          loader.hide();

          this.products = res.data.items.map((item) => {
            return item.id;
          });

          this.product = Object.values(this.products);
        })
        .catch((err) => {
          loader.hide();
          this.$notify({
            position: 'bottom-right',
            title: 'Error',
            message: 'Products cannot be fetched',
            type: 'danger',
          });
          console.log(err);
        });
    },
    async addSale() {
      let loader = this.$loading.show({
        container: this.$refs.formContainer,
      });

      await this.$store
        .dispatch('sales/createSales', this.model)
        .then((res) => {
          loader.hide();

          this.$notify({
            position: 'bottom-right',
            title: 'Info',
            message: 'Added sale',
            type: 'success',
          });

          this.$router.push({
            name: 'sales',
          });
        })
        .catch((err) => {
          loader.hide();
          this.$notify({
            position: 'bottom-right',
            title: 'Error',
            message: 'Cannot create sale',
            type: 'error',
          });
        });
    },
    async getSale(id) {
      await this.$store
        .dispatch('sales/getSales', id)
        .then((res) => {
          this.model = res.data.data;

          this.model.product = this.model.product.id;

          this.$notify({
            position: 'bottom-right',
            title: 'Info',
            message: 'Fetched sale',
            type: 'success',
          });
        })
        .catch((err) => {
          this.$notify({
            position: 'bottom-right',
            title: 'Error',
            message: 'Cannot create sale',
            type: 'error',
          });
        });
    },
    async updateSale() {
      let loader = this.$loading.show({
        container: this.$refs.formContainer,
      });
      await this.$store
        .dispatch('sales/updateSales', {
          data: this.model,
          id: this.$route.query.id,
        })
        .then((res) => {
          loader.hide();

          console.log(this.model);

          this.$notify({
            position: 'bottom-right',
            title: 'Info',
            message: 'Updated sale',
            type: 'success',
          });

          this.$router.push({
            name: 'sales',
          });
        })
        .catch((err) => {
          loader.hide();
          this.$notify({
            position: 'bottom-right',
            title: 'Error',
            message: 'Sale cannot be updated',
            type: 'danger',
          });
          console.log(err);
        });
    },
  },
  computed: {},
  async beforeMount() {},
};
</script>
<style lang="scss">
.custom-select {
  box-shadow: 0 1px 3px rgba(50, 50, 93, 0.15), 0 1px 0 rgba(0, 0, 0, 0.02);
}
</style>
