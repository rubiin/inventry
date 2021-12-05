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
              <h6 class="heading-small text-muted mb-4">Expense information</h6>
              <div class="pl-lg-4">
                <div class="row">
                  <div class="col-lg-6">
                    <base-input
                      alternative=""
                      label="Expenditure"
                      placeholder="Expenditure"
                      :disabled="viewOnly"
                      input-classes="form-control-alternative"
                      v-model="model.type"
                    />
                  </div>
                  <div class="col-lg-6">
                    <base-input
                      alternative=""
                      label="Amount"
                      :disabled="viewOnly"
                      placeholder="Amount"
                      input-classes="form-control-alternative"
                      v-model="model.cost"
                    />
                  </div>
                </div>

                <div class="row flex justify-end">
                  <base-button
                    type="primary"
                    v-if="!viewOnly"
                    @clicked="mode === 'create' ? addFirm() : updateFirm()"
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
import { mapGetters } from 'vuex';
export default {
  name: 'firm-detail',
  components: {},
  data() {
    return {
      model: {
        type: '',
        cost: '',
      },
      mode: 'view',
      value: 1,
      viewOnly: false,
    };
  },
  methods: {
    async addFirm() {
      let loader = this.$loading.show({
        container: this.$refs.formContainer,
      });

      await this.$store
        .dispatch('expense/createExpense', this.model)
        .then((res) => {
          loader.hide();

          this.$notify({
            title: 'Info',
            text: 'Added expense',
            type: 'success',
          });

          this.$router.push({
            name: 'expense',
          });
        })
        .catch((err) => {
          loader.hide();
          this.$notify({
            title: 'Error',
            text: 'Cannot create expense',
            type: 'error',
          });
        });
    },
    async updateFirm() {
      let loader = this.$loading.show({
        container: this.$refs.formContainer,
      });
      await this.$store
        .dispatch('expense/updateExpense', {
          data: this.model,
          id: this.$route.query.id,
        })
        .then((res) => {
          loader.hide();

          console.log(this.model);

          this.$notify({
            title: 'Info',
            text: 'Updated expense',
            type: 'success',
          });

          this.$router.push({
            name: 'expense',
          });
        })
        .catch((err) => {
          loader.hide();
          this.$notify({
            title: 'Error',
            text: 'Expense cannot be updated',
            type: 'danger',
          });
          console.log(err);
        });
    },
  },
  computed: {
    ...mapGetters('expense', ['getExpenseById']),
  },
  async beforeMount() {
    this.mode = this.$route.query.mode;

    if (this.$route.query.id) {
      this.model = await this.getExpenseById(this.$route.query.id);
    }
    if (this.mode) {
      this.viewOnly = this.mode === 'view' ? true : false;
    }
  },
};
</script>
