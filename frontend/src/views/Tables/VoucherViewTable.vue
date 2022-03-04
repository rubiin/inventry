<template>
  <div class="card shadow" :class="type === 'dark' ? 'bg-default' : ''">
    <div
      class="card-header border-0"
      :class="type === 'dark' ? 'bg-transparent' : ''"
    >
      <div class="row flex justify-between px-2">
        <div>
          <p class="text-sm font-semibold">
            Customer name: {{ tableData.clientName }}
          </p>
          <p class="text-sm font-semibold">
            Customer address: {{ tableData.clientAddress }}
          </p>
        </div>

        <div>
          <p class="text-sm font-bold">
            Voucher date: {{ formatDate(tableData.createdAt) }}
          </p>
        </div>
      </div>
    </div>

    <div class="table-responsive">
      <table class="myTable">
        <tr>
          <th>S.N.</th>
          <th>Product</th>
          <th>Rate</th>
          <th>Per</th>
          <th>Vat</th>
          <th>Discount</th>
          <th>Amount</th>
        </tr>

        <tr v-for="(item, index) in tableData.bills" :key="index">
          <td>{{ item.id }}</td>

          <td>{{ item.productDetail.name }}</td>
          <td>{{ item.productDetail.price }}</td>
          <td>{{ item.ratePer }}</td>
          <td>{{ item.vat }}</td>
          <td>{{ item.discount }}</td>
          <td>{{ item.amount }}</td>
        </tr>
      </table>
      <div class="flex justify-end w-11/12 my-5">
        <ul class="vouceher-details">
          <li class="text-base font-bold">Total: {{ tableData.total }}</li>
          <li class="text-base font-bold">
            Cash received: {{ tableData.cashReceived }}
          </li>
          <li class="text-base font-bold">
            Cash returned: {{ tableData.cashReturned }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import moment from 'moment';
export default {
  name: 'stock-table',
  props: {
    type: {
      type: String,
      default: 'light',
    },
    tableData: {
      type: Array,
    },
  },
  data() {
    return {
      IMAGE_URL: 'http://localhost:8000/',
    };
  },
  methods: {
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
    errorHandler() {
      return true;
    },
  },
};
</script>
<style>
table.myTable {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 97%;
  margin: 0 auto;
}

td,
th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}
</style>
