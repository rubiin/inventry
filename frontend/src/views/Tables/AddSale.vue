<template>
  <div class="card shadow" :class="type === 'dark' ? 'bg-default' : ''">
    <div
      class="card-header border-0"
      :class="type === 'dark' ? 'bg-transparent' : ''"
    >
      <div class="pl-lg-4">
        <div class="w-full grid grid-cols-2">
          <div>
            <base-input
              alternative=""
              placeholder="Client name"
              input-classes="form-control-alternative"
              v-model="model.clientName"
              class="w-6/12"
            />
            <base-input
              alternative=""
              placeholder="Client address"
              input-classes="form-control-alternative"
              v-model="model.clientAddress"
              class="w-6/12"
            />
          </div>
          <div class="flex justify-end text-white">
            <h2>Date: {{ Date.now() }}</h2>
          </div>
        </div>
      </div>
      <div class="row align-items-center">
        <div class="col">
          <h3 class="mb-0" :class="type === 'dark' ? 'text-white' : ''"></h3>
        </div>
      </div>
    </div>

    <div class="table-responsive">
      <base-table
        class="table align-items-center table-flush"
        :class="type === 'dark' ? 'table-dark' : ''"
        :thead-classes="type === 'dark' ? 'thead-dark' : 'thead-light'"
        tbody-classes="list"
        :data="tableData"
      >
        <template v-slot:columns>
          <th>Product</th>
          <th>Quantity</th>
          <th>Rate</th>
          <th>Per</th>
          <th>13% VAT</th>
          <th>Discount</th>
          <th>Amount</th>
          <th></th>
        </template>

        <template v-slot:default="row" class="flex items-center">
          <td class="pt-0">
            <el-autocomplete
              v-model="row.item.product"
              :fetch-suggestions="getAllProducts"
              placeholder="Please input product id"
              class="autocomplete"
              @select="handleSelect(row.item)"
              maxlength="20"
              show-word-limit
            />
          </td>
          <td>
            <base-input
              alternative=""
              placeholder="quantity"
              input-classes="form-control-alternative"
              v-model="row.item.quantity"
              @blurred="calculateRowValues(row.item)"
            />
          </td>
          <td>
            <span>{{ row.item.price }}</span>
          </td>
          <td>
            <base-input
              alternative=""
              placeholder="Per"
              input-classes="form-control-alternative"
              v-model="row.item.ratePer"
            />
          </td>
          <td class="flex">
            <span>{{ row.item.vat }}</span>
          </td>
          <td>
            <base-input
              alternative=""
              placeholder="Discount"
              input-classes="form-control-alternative"
              v-model="row.item.discount"
              @blurred="calculateRowValues(row.item)"
            />
          </td>

          <td>
            <span>{{ row.item.amount }}</span>
          </td>
        </template>
      </base-table>

      <div class="col text-left mb-3 pl-4">
        <base-button
          type="primary"
          icon="ni ni-bag-17"
          size="sm"
          @clicked="addEntry"
          >Add Item</base-button
        >
      </div>
      <div class="w-full flex justify-between p-4">
        <div>
          <h5 class="font-bold">Total: {{ total }}</h5>
        </div>
        <div>
          <base-button
            type="success"
            icon="ni ni-check-bold"
            size="lg"
            @clicked="addVoucher"
            >Save</base-button
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import moment from 'moment';
export default {
  name: 'Add-sale-table',
  props: {
    type: {
      type: String,
      default: 'light',
    },
  },
  data() {
    return {
      tableData: [],
      products: [],
      model: {
        clientName: '',
        clientAddress: '',
        total: '',
        cashReceived: 0,
        cashReturned: 0,
      },
      IMAGE_URL: 'http://localhost:8000/',
    };
  },
  methods: {
    async addVoucher() {
      let loader = this.$loading.show({
        container: this.$refs.formContainer,
      });

      // alert(JSON.stringify(this.tableData))
      const items = this.tableData.map((el) => {
        el.product = el.id;

        return el;
      });

      const payload = {
        clientName: this.model.clientName,
        clientAddress: this.model.clientAddress,
        total: this.total,
        cashReceived: this.model.cashReceived,
        cashReturned: this.model.cashReturned,
        items,
      };

      await this.$store
        .dispatch('sales/createSales', payload)
        .then((res) => {
          loader.hide();

          this.$notify({
            position: 'bottom-right',
            title: 'Info',
            message: 'Added sale',
            type: 'success',
          });

          this.$router.push('/sales');
        })
        .catch((err) => {
          loader.hide();
          this.$notify({
            position: 'bottom-right',
            title: 'Error',
            message: 'Sales cannot be added',
            type: 'danger',
          });
          console.log(err);
        });
    },
    handleSelect(currentRow) {
      const currentProduct = this.products.find(
        (el) => el.name == currentRow.product,
      );
      currentRow.price = currentProduct.price;
    },
    calculateRowValues(currentRow) {
      const currentProduct = this.products.find(
        (el) => el.name == currentRow.product,
      );
      currentRow.price = currentProduct.price;
      currentRow.vat = currentProduct.price * 0.13;
      currentRow.amount =
        currentProduct.price * parseFloat(currentRow.quantity) +
        currentRow.vat -
        parseFloat(currentRow.discount);
      currentRow.id = currentProduct.id;
    },
    addEntry() {
      this.tableData.push({
        id: '',
        discount: 0,
        vat: '',
        product: '',
        quantity: '',
        price: '',
        ratePer: '',
        amount: '',
      });
    },
    async getAllProducts(query, cb) {
      const params = `?page=1&limit=10&search=${query}`;
      await this.$store
        .dispatch('productDetail/getAllProductDetails', params)
        .then((res) => {
          this.loading = false;

          this.products = res.data.items;

          const stocks = res.data.items.map((item) => {
            return { value: item.name, link: item.id };
          });
          return cb(stocks);
        })
        .catch((err) => {
          this.$notify({
            position: 'bottom-right',
            title: 'Error',
            message: 'Products cannot be fetched',
            type: 'danger',
          });
          console.log(err);
        });
    },
    formatDate(date) {
      return moment(date).format('DD-MMM-YYYY');
    },
    addData(val) {
      this.$emit('add', val);
    },

    viewData(val) {
      this.$emit('view', val);
    },
    removeData(val) {
      this.$emit('remove', val);
    },

    editData(val) {
      this.$emit('edit', val);
    },
  },
  mounted() {
    this.addEntry();
  },
  computed: {
    total() {
      const total = this.tableData.reduce((acc, curr) => {
        return acc + parseFloat(curr.amount);
      }, 0);
      return Number.isNaN(total) ? 0 : total;
    },
  },
};
</script>
<style lang="scss">
.autocomplete {
  box-shadow: 0 1px 3px rgba(50, 50, 93, 0.15), 0 1px 0 rgba(0, 0, 0, 0.02);
}
</style>
