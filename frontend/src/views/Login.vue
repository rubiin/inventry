<template>
  <div class="row justify-content-center" ref="formContainer">
    <div class="col-lg-5 col-md-7">
      <div class="card bg-custom shadow border-0">
        <div class="card-body px-lg-5 py-lg-5">
          <div class="text-center text-muted mb-4">
            <small>Sign in with credentials</small>
          </div>
          <form role="form">
            <base-input
              formClasses="input-group-alternative mb-3"
              placeholder="Email"
              addon-left-icon="ni ni-email-83"
              v-model="model.email"
            >
            </base-input>

            <base-input
              formClasses="input-group-alternative mb-3"
              placeholder="Password"
              type="password"
              addon-left-icon="ni ni-lock-circle-open"
              v-model="model.password"
            >
            </base-input>

            <base-checkbox class="custom-control-alternative">
              <span class="text-muted">Remember me</span>
            </base-checkbox>
            <div class="text-center">
              <base-button type="primary" class="my-4" @clicked="loginUser"
                >Sign in</base-button
              >
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'login',
  data() {
    return {
      model: {
        email: 'admin@gmail.com',
        password: 'Test@123',
      },
    };
  },
  methods: {
    async loginUser() {
      let loader = this.$loading.show({
        container: this.$refs.formContainer,
      });
      await this.$store
        .dispatch('user/login', this.model)
        .then((res) => {
          loader.hide();
          this.$notify({
            position: 'bottom-right',
            title: 'Info',
            message: 'Logged in',
            type: 'success',
          });
          this.$router.push({ name: 'dashboard' });
        })
        .catch((err) => {
          loader.hide();
          console.log(err);

          this.$notify({
            position: 'bottom-right',
            title: 'Info',
            message: 'Cannot login, check your credentials',
            type: 'danger',
          });
        });
    },
  },
};
</script>
<style></style>
