<template>
  <div ref="formContainer">
    <base-header type="gradient-success" class="pb-8 pt-5 pt-md-8">
    </base-header>

    <div class="container-fluid mt--7">
      <div class="row">
        <div class="col">
          <projects-table
            title="Voucheer"
            :tableData="voucher"
          ></projects-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProjectsTable from './Tables/VoucherViewTable.vue';
export default {
  name: 'salevoucher',

  components: {
    ProjectsTable,
  },
  data() {
    return {
      voucher: {},
    };
  },

  methods: {
    async getVoucher() {
      let loader = this.$loading.show({
        container: this.$refs.formContainer,
      });

      await this.$store
        .dispatch('sales/getSale', this.$route.params.id)
        .then((res) => {
          loader.hide();

          this.voucher = res.data.data;

          this.$notify({
            position: 'bottom-right',
            title: 'Info',
            message: 'Fetched voucher',
            type: 'success',
          });
        })
        .catch((err) => {
          loader.hide();
          this.$notify({
            position: 'bottom-right',
            title: 'Error',
            message: 'Voucher cannot be fetched',
            type: 'danger',
          });
          console.log(err);
        });
    },
  },

  async beforeMount() {
    await this.getVoucher();
  },
};
</script>
