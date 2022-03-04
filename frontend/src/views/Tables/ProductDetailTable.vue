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
          <th>Product</th>
          <th>Price</th>
          <th>Stock Id</th>
          <th>Created</th>
          <th></th>
        </template>

        <template v-slot:default="row">
          <td>{{ row.item.id }}</td>
          <th scope="row">
              <div class="media-body">
                <span class="name mb-0 text-sm">{{ row.item.name }}</span>
              </div>
          </th>

          <td class="budget">
            {{ row.item.price }}
          </td>

          <td>{{ row.item.product.id }}</td>

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
              <a class="dropdown-item" href="#" @click="editData(row.item.id)"
                >Edit</a
              >
              <a class="dropdown-item" href="#" @click="removeData(row.item.id)"
                >Delete</a
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
  name: 'stock-table',
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
<style></style>
