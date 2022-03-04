<template>
  <div ref="formContainer">
    <base-header type="gradient-success" class="pb-8 pt-5 pt-md-8">
      <stats />
    </base-header>

    <div class="container-fluid mt--7">
      <div class="row">
        <div class="col">
          <projects-table
            title="product detail"
            addText="Add product detail"
            :tableData="productDetails"
            @add="addProductDetail"
            @remove="handleDelete($event)"
            @view="viewProductDetail($event)"
            @edit="editProductDetail($event)"
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
import ProjectsTable from './Tables/ProductDetailTable';
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
    ...mapState('productDetail', ['productDetails']),
    totalPage: function () {
      return Math.ceil(this.totalData / this.limit);
    },
  },
  methods: {
    async addProductDetail() {
      this.$router.push({
        name: 'product-detail',
        query: {
          mode: 'create',
        },
      });
    },

    editProductDetail(id) {
      this.$router.push({
        name: 'product-detail',
        query: {
          mode: 'update',
          id,
        },
      });
    },
    viewProductDetail(id) {
      this.$router.push({
        name: 'product-detail',
        query: {
          mode: 'view',
          id,
        },
      });
    },
    async handleDelete(id) {
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
          await this.deleteProductDetail(id);
        }
      });
    },
    async deleteProductDetail(id) {
      let loader = this.$loading.show({
        container: this.$refs.formContainer,
      });

      await this.$store
        .dispatch('productDetail/deleteProductDetail', id)
        .then(async (res) => {
          loader.hide();

          this.$notify({
            position: 'bottom-right',
            title: 'Info',
            message: 'Deleted product detail',
            type: 'success',
          });

          await this.getAllproductDetail();
        })
        .catch((err) => {
          loader.hide();
          this.$notify({
            position: 'bottom-right',
            title: 'Error',
            message: 'Cannot delete product detail',
            type: 'error',
          });
        });
    },
    async getAllproductDetail(limit = this.limit, page = this.pageNumber) {
      let loader = this.$loading.show({
        container: this.$refs.formContainer,
      });

      const params = `?page=${page}&limit=${limit}`;
      await this.$store
        .dispatch('productDetail/getAllProductDetails', params)
        .then((res) => {
          loader.hide();

          this.$notify({
            position: 'bottom-right',
            title: 'Info',
            message: 'Fetched product detail',
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
            message: 'Damaged  products cannot be fetched',
            type: 'danger',
          });
          console.log(err);
        });
    },
  },
  async mounted() {
    await this.$store
        .dispatch('sales/getStats')
    await this.getAllproductDetail();
  },
  watch: {
    pageNumber(val) {
      this.getAllproductDetail(this.limit, val);
    },
    limit(val) {
      this.getAllDamages(val, this.pageNumber);
    },
  },
};
</script>
<style></style>
