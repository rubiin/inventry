<template>
  <div ref="formContainer">
    <base-header type="gradient-success" class="pb-8 pt-5 pt-md-8">
      <stats />
    </base-header>

    <div class="container-fluid mt--7">
      <div class="row">
        <div class="col">
          <projects-table
            title="Stocks"
            addText="Add Product"
            :tableData="products"
            @add="addProduct"
            @edit="editProduct($event)"
            @remove="handleProduct($event)"
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
import ProjectsTable from './Tables/StockTable';
import { mapState } from 'vuex';
import Swal from 'sweetalert2';
import Stats from '@/components/Stats';

export default {
  name: 'tables',
  components: {
    ProjectsTable,
    Stats,
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
        name: 'stock-detail',
        query: {
          mode: 'create',
        },
      });
    },

    editProduct(id) {
      this.$router.push({
        name: 'stock-detail',
        query: {
          mode: 'update',
          id,
        },
      });
    },
    viewProduct(id) {
      this.$router.push({
        name: 'stock-detail',
        query: {
          mode: 'view',
          id,
        },
      });
    },

    async deleteProduct(id) {
      let loader = this.$loading.show({
        container: this.$refs.formContainer,
      });

      await this.$store
        .dispatch('products/deleteProduct', id)
        .then(async (res) => {
          loader.hide();

          this.$notify({
            position: 'bottom-right',
            title: 'Info',
            message: 'Deleted stock',
            type: 'success',
          });

          await this.getAllProducts();
        })
        .catch((err) => {
          loader.hide();
          this.$notify({
            position: 'bottom-right',
            title: 'Error',
            message: 'Cannot delete stock',
            type: 'error',
          });
        });
    },
    async handleProduct(id) {
      Swal.fire({
        title: 'Are you sure?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#5e72e4',
        cancelButtonColor: '#d33',
        confirmButtonmessage: 'Delete',
        cancelButtonmessage: 'No',
      }).then(async (result) => {
        if (result.value) {
          await this.deleteProduct(id);
        }
      });
    },
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
            position: 'bottom-right',
            title: 'Info',
            message: 'Fetched Products',
            type: 'success',
          });

          this.totalData = res.data.total_items;
          console.log(res);
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
  },
  async mounted() {
    await this.$store
        .dispatch('sales/getStats')
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
