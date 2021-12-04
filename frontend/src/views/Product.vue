<template>
  <div ref="formContainer">
    <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
      <!-- Card stats -->
      <div class="row">
        <div class="col-xl-3 col-lg-6">
          <stats-card
            title="Total traffic"
            type="gradient-red"
            sub-title="350,897"
            icon="ni ni-active-40"
            class="mb-4 mb-xl-0"
          >
            <template v-slot:footer>
              <span class="text-success mr-2"
                ><i class="fa fa-arrow-up"></i> 3.48%</span
              >
              <span class="text-nowrap">Since last month</span>
            </template>
          </stats-card>
        </div>
        <div class="col-xl-3 col-lg-6">
          <stats-card
            title="Total traffic"
            type="gradient-orange"
            sub-title="2,356"
            icon="ni ni-chart-pie-35"
            class="mb-4 mb-xl-0"
          >
            <template v-slot:footer>
              <span class="text-success mr-2"
                ><i class="fa fa-arrow-up"></i> 12.18%</span
              >
              <span class="text-nowrap">Since last month</span>
            </template>
          </stats-card>
        </div>
        <div class="col-xl-3 col-lg-6">
          <stats-card
            title="Sales"
            type="gradient-green"
            sub-title="924"
            icon="ni ni-money-coins"
            class="mb-4 mb-xl-0"
          >
            <template v-slot:footer>
              <span class="text-danger mr-2"
                ><i class="fa fa-arrow-down"></i> 5.72%</span
              >
              <span class="text-nowrap">Since last month</span>
            </template>
          </stats-card>
        </div>
        <div class="col-xl-3 col-lg-6">
          <stats-card
            title="Performance"
            type="gradient-info"
            sub-title="49,65%"
            icon="ni ni-chart-bar-32"
            class="mb-4 mb-xl-0"
          >
            <template v-slot:footer>
              <span class="text-success mr-2"
                ><i class="fa fa-arrow-up"></i> 54.8%</span
              >
              <span class="text-nowrap">Since last month</span>
            </template>
          </stats-card>
        </div>
      </div>
    </base-header>

    <div class="container-fluid mt--7">
      <div class="row">
        <div class="col">
          <projects-table
            title="Products"
            addText="Add Product"
            :tableData="products"
            @add="addProduct"
            @edit="editProduct($event)"
            @remove="deleteProduct($event)"
            @view="viewProduct($event)"
          ></projects-table>
        </div>
      </div>
      <div
        class="card-footer d-flex justify-content-end"
        :class="type === 'dark' ? 'bg-transparent' : ''"
      >
        <base-pagination
          total="30"
          :pageCount="totalPage"
          @input="pageNumber = $event"
          :value="pageNumber"
        ></base-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import ProjectsTable from './Tables/ProductTable';
import { mapState } from 'vuex';

export default {
  name: 'tables',
  components: {
    ProjectsTable,
  },
  data() {
    return {
      pageNumber: 1,
      totalData: 0,
      limit: 5,
    };
  },
  computed: {
    ...mapState('products', ['products']),
    totalPage: function () {
      return Math.ceil(this.totalData / this.limit);
    },
  },
  methods: {
    async addProduct() {
      this.$router.push({
        name: 'product-detail',
        query: {
          mode: 'create',
        },
      });
    },

    editProduct(id) {
      this.$router.push({
        name: 'product-detail',
        query: {
          mode: 'update',
          id,
        },
      });
    },
    viewProduct(id) {
      this.$router.push({
        name: 'product-detail',
        query: {
          mode: 'view',
          id,
        },
      });
    },
    async deleteProduct() {},
    async getAllProducts(limit = this.limit, page = this.pageNumber) {
      let loader = this.$loading.show({
        container: this.$refs.formContainer,
      });

      const params = `?page=${page}&limit=${limit}`;
      await this.$store
        .dispatch('products/getAllProducts', params)
        .then((res) => {
          loader.hide();

          this.$notify({
            title: 'Info',
            text: 'Fetched Products',
            type: 'success',
          });

          this.totalData = res.data.total_items;
          console.log(res);
        })
        .catch((err) => {
          loader.hide();
          this.$notify({
            title: 'Error',
            text: 'Products cannot be fetched',
            type: 'danger',
          });
          console.log(err);
        });
    },
  },
  async mounted() {
    await this.getAllProducts();
  },
  watch: {
    pageNumber(val) {
      this.getAllProducts(this.limit, val);
    },
    limit(val) {
      this.getAllProducts(val, this.pageNumber);
    },
  },
};
</script>
<style></style>
