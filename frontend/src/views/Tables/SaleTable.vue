<template>
  <div class="card shadow" :class="type === 'dark' ? 'bg-default' : ''">
    <div
      class="card-header border-0"
      :class="type === 'dark' ? 'bg-transparent' : ''"
    >
      <div class="row align-items-center">
        <div class="col">
          <h3 class="mb-0" :class="type === 'dark' ? 'text-white' : ''">
            {{ title }}
          </h3>
        </div>
        <div class="col text-right">
          <base-button type="primary" size="sm" @clicked="addData">{{
            addText
          }}</base-button>
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
          <th>S.N.</th>
          <th>Customer Name</th>
          <th>Voucher Id</th>
          <th>Total</th>
          <th>Created</th>
          <th></th>
        </template>

        <template v-slot:default="row">
          <td>{{ row.item.id }}</td>

          <td>{{ row.item.clientName }}</td>
          <td>{{ row.item.id }}</td>
          <td>{{ row.item.total }}</td>

          <td>
            {{ formatDate(row.item.createdAt) }}
          </td>

          <td class="text-right">
            <base-dropdown class="dropdown" position="right">
              <template v-slot:title>
                <a
                  class="btn btn-sm btn-icon-only text-light"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i class="fas fa-ellipsis-v"></i>
                </a>
              </template>
              <a class="dropdown-item" href="#" @click="viewData(row.item.id)"
                >View</a
              >
            </base-dropdown>
          </td>
        </template>
      </base-table>
    </div>
  </div>
</template>
<script>
import moment from 'moment';

export default {
  name: 'sale-table',
  props: {
    type: {
      type: String,
      default: 'light',
    },
    addText: {
      type: String,
    },
    tableData: {
      type: Array,
    },
    title: String,
  },
  data() {
    return {
      IMAGE_URL: 'http://localhost:8000/',
    };
  },
  methods: {
    getId(val) {
      console.log(val);
      return val;
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
};
</script>
<style></style>
