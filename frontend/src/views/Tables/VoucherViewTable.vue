<template>
  <div class="card shadow" :class="type === 'dark' ? 'bg-default' : ''">
    <div
      class="card-header border-0"
      :class="type === 'dark' ? 'bg-transparent' : ''"
    >
      <div class="row flex justify-between px-4">
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
      <base-table
        class="table align-items-center table-flush"
        :class="type === 'dark' ? 'table-dark' : ''"
        :thead-classes="type === 'dark' ? 'thead-dark' : 'thead-light'"
        tbody-classes="list"
        :data="tableData.bills"
      >
        <template v-slot:columns>
          <th>S.N.</th>
          <th>Product</th>
          <th>Rate</th>
          <th>Per</th>
          <th>Vat</th>
          <th>Discount</th>
          <th>Amount</th>
          <th></th>
        </template>

        <template v-slot:default="row">
          <td>{{ row.item.id }}</td>

          <td>{{ row.item.productDetail.name }}</td>
          <td>{{ row.item.productDetail.price }}</td>
          <td>{{ row.item.ratePer }}</td>
          <td>{{ row.item.vat }}</td>
          <td>{{ row.item.discount }}</td>
          <td>{{ row.item.amount }}</td>

          <!-- <td>{{ row.item.clientName }}</td>
          <td>{{ row.item.id }}</td>
          <td>{{ row.item.total }}</td> -->
        </template>
      </base-table>
      <div class="flex justify-end w-11/12 mt-5">
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
</style>
