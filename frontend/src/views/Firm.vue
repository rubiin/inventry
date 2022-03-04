<template>
  <div ref="formContainer">
    <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
      <!-- Card stats -->
      <stats />
    </base-header>

    <div class="container-fluid mt--7">
      <div class="row">
        <div class="col">
          <projects-table
            title="Firms"
            addText="Add Firm"
            :tableData="firms"
            @add="addFirm"
            @edit="editFirm($event)"
            @remove="handleDelete($event)"
            @view="viewFirm($event)"
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
import ProjectsTable from './Tables/FirmTable';
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
    ...mapState('firm', ['firms']),
    totalPage: function () {
      return Math.ceil(this.totalData / this.limit);
    },
  },
  methods: {
    async addFirm() {
      this.$router.push({
        name: 'firm-detail',
        query: {
          mode: 'create',
        },
      });
    },

    editFirm(id) {
      this.$router.push({
        name: 'firm-detail',
        query: {
          mode: 'update',
          id,
        },
      });
    },
    viewFirm(id) {
      this.$router.push({
        name: 'firm-detail',
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
          await this.deleteFirm(id);
        }
      });
    },
    async deleteFirm(id) {
      let loader = this.$loading.show({
        container: this.$refs.formContainer,
      });

      await this.$store
        .dispatch('firm/deleteFirm', id)
        .then(async (res) => {
          loader.hide();

          this.$notify({
            position: 'bottom-right',
            title: 'Info',
            message: 'Deleted firm',
            type: 'success',
          });

          await this.getAllFirm();
        })
        .catch((err) => {
          loader.hide();
          this.$notify({
            title: 'Error',
            message: 'Cannot delete firm',
            type: 'error',
          });
        });
    },
    async getAllFirm(limit = this.limit, page = this.pageNumber) {
      let loader = this.$loading.show({
        container: this.$refs.formContainer,
      });

      const params = `?page=${page}&limit=${limit}`;
      await this.$store
        .dispatch('firm/getAllFirms', params)
        .then((res) => {
          loader.hide();

          this.totalData = res.data.total_items;
          console.log(res);
        })
        .catch((err) => {
          loader.hide();
          this.$notify({
            title: 'Error',
            message: 'Firms cannot be fetched',
            type: 'danger',
          });
          console.log(err);
        });
    },
  },
  async mounted() {
    await this.$store
        .dispatch('sales/getStats')
    await this.getAllFirm();
  },
  watch: {
    pageNumber(val) {
      this.getAllFirm(this.limit, val);
    },
    limit(val) {
      this.getAllFirm(val, this.pageNumber);
    },
  },
};
</script>
<style></style>
