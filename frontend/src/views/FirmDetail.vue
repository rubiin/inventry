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
              <h6 class="heading-small text-muted mb-4">Sale information</h6>
              <div class="pl-lg-4">
                <div class="row">
                  <div class="col-lg-6">
                    <base-input
                      alternative=""
                      label="Supplier name"
                      placeholder="Supplier name"
                      :disabled="viewOnly"
                      input-classes="form-control-alternative"
                      v-model="model.supplierName"
                    />
                  </div>
                  <div class="col-lg-6">
                    <base-input
                      alternative=""
                      label="Product name"
                      :disabled="viewOnly"
                      placeholder="Product name"
                      input-classes="form-control-alternative"
                      v-model="model.productName"
                    />
                  </div>
                </div>
                <div class="row">
                  <div class="col-lg-6">
                    <base-input
                      alternative=""
                      label="Address"
                      placeholder="Address"
                      :disabled="viewOnly"
                      input-classes="form-control-alternative"
                      v-model="model.address"
                    />
                  </div>
                  <div class="col-lg-6">
                    <div class="form-group">
                      <base-input
                        alternative=""
                        label="Mobile"
                        placeholder="Mobile"
                        :disabled="viewOnly"
                        input-classes="form-control-alternative"
                        v-model="model.phone"
                      />
                    </div>
                  </div>
                </div>
                <div class="pl-3">
                  <div class="row">
                    <div class="form-group">
                      <base-input
                        alternative=""
                        label="Email"
                        placeholder="Email"
                        :disabled="viewOnly"
                        input-classes="form-control-alternative"
                        v-model="model.email"
                      />
                    </div>
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
        productName: '',
        supplierName: '',
        phone: '',
        email: '',
        address: '',
      },
      mode: 'view',
      value: 1,
      viewOnly: false,
    };
  },
  methods: {
    async addFirm() {

      if (this.model.phone.length < 10) {
        return alert('Phone number should be 10 digits');

      }

      if (this.model.email !== '') {
        const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!regex.test(this.model.email)) {
          return alert('You have entered an invalid email address!');
        }
      }

      let loader = this.$loading.show({
        container: this.$refs.formContainer,
      });

      await this.$store
        .dispatch('firm/createFirm', this.model)
        .then((res) => {
          loader.hide();

          this.$notify({
            position: 'bottom-right',
            title: 'Info',
            message: 'Added firm',
            type: 'success',
          });

          this.$router.push({
            name: 'firm',
          });
        })
        .catch((err) => {
          loader.hide();
          this.$notify({
            position: 'bottom-right',
            title: 'Error',
            message: 'Cannot create firm',
            type: 'error',
          });
        });
    },
    async updateFirm() {
      let loader = this.$loading.show({
        container: this.$refs.formContainer,
      });
      await this.$store
        .dispatch('firm/updateFirm', {
          data: this.model,
          id: this.$route.query.id,
        })
        .then((res) => {
          loader.hide();

          console.log(this.model);

          this.$notify({
            position: 'bottom-right',
            title: 'Info',
            message: 'Updated firm',
            type: 'success',
          });

          this.$router.push({
            name: 'firm',
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
  computed: {
    ...mapGetters('firm', ['getFirmById']),
  },
  async beforeMount() {
    this.mode = this.$route.query.mode;

    if (this.$route.query.id) {
      this.model = await this.getFirmById(this.$route.query.id);
    }
    if (this.mode) {
      this.viewOnly = this.mode === 'view' ? true : false;
    }
  },
};
</script>
