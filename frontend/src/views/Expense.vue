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
            title="Expenses"
            addText="Add Expense"
            :tableData="expenses"
            @add="addExpense"
            @edit="editExpense($event)"
            @remove="handleDelete($event)"
            @view="viewExpense($event)"
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
import ProjectsTable from './Tables/ExpenseTable';
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
    ...mapState('expense', ['expenses']),
    totalPage: function () {
      return Math.ceil(this.totalData / this.limit);
    },
  },
  methods: {
    async addExpense() {
      this.$router.push({
        name: 'expense-detail',
        query: {
          mode: 'create',
        },
      });
    },

    editExpense(id) {
      this.$router.push({
        name: 'expense-detail',
        query: {
          mode: 'update',
          id,
        },
      });
    },
    viewExpense(id) {
      this.$router.push({
        name: 'expense-detail',
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
          await this.deleteExpense(id);
        }
      });
    },
    async deleteExpense(id) {
      let loader = this.$loading.show({
        container: this.$refs.formContainer,
      });

      await this.$store
        .dispatch('expense/deleteExpense', id)
        .then(async (res) => {
          loader.hide();

          this.$notify({
            position: 'bottom-right',
            title: 'Info',
            message: 'Deleted expense',
            type: 'success',
          });

          await this.getAllExpense();
        })
        .catch((err) => {
          loader.hide();
          this.$notify({
            position: 'bottom-right',
            title: 'Error',
            message: 'Cannot delete expense',
            type: 'error',
          });
        });
    },
    async getAllExpense(limit = this.limit, page = this.pageNumber) {
      let loader = this.$loading.show({
        container: this.$refs.formContainer,
      });

      const params = `?page=${page}&limit=${limit}`;
      await this.$store
        .dispatch('expense/getAllExpenses', params)
        .then((res) => {
          loader.hide();

          this.$notify({
            position: 'bottom-right',
            title: 'Info',
            message: 'Fetched expense',
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
            message: 'Expense cannot be fetched',
            type: 'danger',
          });
          console.log(err);
        });
    },
  },
  async mounted() {
    await this.getAllExpense();
  },
  watch: {
    pageNumber(val) {
      this.getAllExpense(this.limit, val);
    },
    limit(val) {
      this.getAllExpense(val, this.pageNumber);
    },
  },
};
</script>
<style></style>
