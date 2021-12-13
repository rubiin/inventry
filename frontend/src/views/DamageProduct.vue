<template>
  <div ref="formContainer">
    <base-header type="gradient-success" class="pb-8 pt-5 pt-md-8">
      <stats />
    </base-header>

    <div class="container-fluid mt--7">
      <div class="row">
        <div class="col">
          <projects-table
            title="Damaged products"
            addText="Add damage product"
            :tableData="damaged"
            @add="addDamage"
            @remove="handleDelete($event)"
            @view="viewDamage($event)"
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
import ProjectsTable from './Tables/DamageProductTable';
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
    ...mapState('damages', ['damaged']),
    totalPage: function () {
      return Math.ceil(this.totalData / this.limit);
    },
  },
  methods: {
    async addDamage() {
      this.$router.push({
        name: 'damage-detail',
        query: {
          mode: 'create',
        },
      });
    },

    editDamage(id) {
      this.$router.push({
        name: 'damage-detail',
        query: {
          mode: 'update',
          id,
        },
      });
    },
    viewDamage(id) {
      this.$router.push({
        name: 'damage-detail',
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
          await this.deleteDamage(id);
        }
      });
    },
    async deleteDamage(id) {
      let loader = this.$loading.show({
        container: this.$refs.formContainer,
      });

      await this.$store
        .dispatch('damages/deleteDamage', id)
        .then(async (res) => {
          loader.hide();

          this.$notify({
            position: 'bottom-right',
            title: 'Info',
            message: 'Deleted damaged products',
            type: 'success',
          });

          await this.getAllDamages();
        })
        .catch((err) => {
          loader.hide();
          this.$notify({
            position: 'bottom-right',
            title: 'Error',
            message: 'Cannot delete damaged products',
            type: 'error',
          });
        });
    },
    async getAllDamages(limit = this.limit, page = this.pageNumber) {
      let loader = this.$loading.show({
        container: this.$refs.formContainer,
      });

      const params = `?page=${page}&limit=${limit}`;
      await this.$store
        .dispatch('damages/getAllDamages', params)
        .then((res) => {
          loader.hide();

          this.$notify({
            position: 'bottom-right',
            title: 'Info',
            message: 'Fetched damaged products',
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
    await this.getAllDamages();
  },
  watch: {
    pageNumber(val) {
      this.getAllDamages(this.limit, val);
    },
    limit(val) {
      this.getAllDamages(val, this.pageNumber);
    },
  },
};
</script>
<style></style>
