<template>
  <div>
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
              <h6 class="heading-small text-muted mb-4">
                Product information
              </h6>
              <div class="pl-lg-4">
                <div class="row">
                  <div class="col-lg-6">
                    <base-input
                      alternative=""
                      label="Product name"
                      placeholder="Product name"
                      input-classes="form-control-alternative"
                      v-model="model.name"
                    />
                  </div>
                  <div class="col-lg-6">
                    <base-input
                      alternative=""
                      label="Price"
                      placeholder="100"
                      input-classes="form-control-alternative"
                      v-model="model.price"
                    />
                  </div>
                </div>
                <div class="row">
                  <div class="col-lg-6">
                    <base-input
                      alternative=""
                      label="Quantity"
                      placeholder="Quantity"
                      input-classes="form-control-alternative"
                      v-model="model.quantity"
                    />
                  </div>
                  <div class="col-lg-6">
                    <div class="form-group">
                      <base-input alternative="" label="About Me">
                        <textarea
                          rows="4"
                          v-model="model.description"
                          class="form-control form-control-alternative"
                          placeholder="A few words about the item ..."
                        ></textarea>
                      </base-input>
                    </div>
                  </div>
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
import {mapGetters} from 'vuex'
export default {
  name: 'user-profile',
  data() {
    return {
      model: {
       name: '',
       description: '',
       price: 0,
       quantity: 0,
      },
    };
  },
  computed: {
    ...mapGetters('products',['getProductById']),
  },
  mounted () {
    this.model = this.getProductById(this.$route.params.id);
  },
};
</script>
<style></style>
