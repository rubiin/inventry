<template>
  <div ref="formContainer">
    <base-header type="gradient-success" class="pb-8 pt-5 pt-md-8">
      <!-- Card stats -->
      <stats />
    </base-header>

    <div class="container-fluid mt--7">
      <div class="row">
        <div class="col">
          <projects-table
            title="Sales"
            addText="Add Sales"
            :tableData="sales"
            @add="addSale"
            @view="viewSale($event)"
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
import ProjectsTable from './Tables/SaleTable';
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
    ...mapState('sales', ['sales']),
    totalPage: function () {
      return Math.ceil(this.totalData / this.limit);
    },
  },
  methods: {
    async addSale() {
      this.$router.push({
        name: 'sale-detail',
        query: {
          mode: 'create',
        },
      });
    },

    editSale(id) {
      this.$router.push({
        name: 'sale-detail',
        query: {
          mode: 'update',
          id,
        },
      });
    },
    viewSale(id) {
      this.$router.push({
        name: 'voucher',
        params: {
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
          await this.deleteSale(id);
        }
      });
    },
    async deleteSale(id) {
      let loader = this.$loading.show({
        container: this.$refs.formContainer,
      });

      await this.$store
        .dispatch('products/deleteSales', id)
        .then(async (res) => {
          loader.hide();

          this.$notify({
            position: 'bottom-right',
            title: 'Info',
            message: 'Deleted sales',
            type: 'success',
          });

          await this.getAllSales();
        })
        .catch((err) => {
          loader.hide();
          this.$notify({
            position: 'bottom-right',
            title: 'Error',
            message: 'Cannot delete sales',
            type: 'error',
          });
        });
    },
    async getAllSales(limit = this.limit, page = this.pageNumber) {
      let loader = this.$loading.show({
        container: this.$refs.formContainer,
      });

      const params = `?page=${page}&limit=${limit}`;
      await this.$store
        .dispatch('sales/getAllSales', params)
        .then((res) => {
          loader.hide();

          this.$notify({
            position: 'bottom-right',
            title: 'Info',
            message: 'Fetched Sales',
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
            message: 'Sales cannot be fetched',
            type: 'danger',
          });
          console.log(err);
        });
    },
  },
  async mounted() {
    await this.$store.dispatch('sales/getStats');
    await this.getAllSales();
  },
  watch: {
    pageNumber(val) {
      this.getAllSales(this.limit, val);
    },
    limit(val) {
      this.getAllSales(val, this.pageNumber);
    },
  },
};
</script>
<style></style>
