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
          <base-button type="primary" size="sm">See all</base-button>
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
          <th>Description</th>
          <th>Price</th>
          <th>Qunatity</th>
          <th>Updated</th>
          <th></th>
        </template>

        <template v-slot:default="row">
          <th scope="row">
            <div class="media align-items-center">
              <a href="#" class="avatar rounded-circle mr-3">
                <img alt="Image placeholder" :src="IMAGE_URL+row.item.image" />
              </a>
              <div class="media-body">
                <span class="name mb-0 text-sm">{{ row.item.name }}</span>
              </div>
            </div>
          </th>

            <td>
             {{ row.item.description }}
          </td>
          <td class="budget">
            {{ row.item.price }}
          </td>
        

          <td>
            <badge class="badge-dot mr-4" :type="completed">
              <span class="status">{{ row.item.quantity }}</span>
            </badge>
          </td>

        
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

              <template>
                <a class="dropdown-item" href="#">Action</a>
                <a class="dropdown-item" href="#">Another action</a>
                <a class="dropdown-item" href="#">Something else here</a>
              </template>
            </base-dropdown>
          </td>
        </template>
      </base-table>
    </div>

    <div
      class="card-footer d-flex justify-content-end"
      :class="type === 'dark' ? 'bg-transparent' : ''"
    >
      <base-pagination total="30"></base-pagination>
    </div>
  </div>
</template>
<script>
import moment from 'moment';
export default {
  name: 'projects-table',
  props: {
    type: {
      type: String,
    },
    title: String,
  },
  data() {
    return {
      IMAGE_URL: 'http://localhost:8000/',
      tableData: [
        {
          id: 3,
          createdAt: '2021-12-02T14:11:19.000Z',
          name: 'danio fish',
          description: 'hello',
          image: 'danio-1638454279080.jpg',
          quantity: 5,
          price: 100,
          sales: {
            initialized: true,
            dirty: false,
          },
        },
        {
          id: 4,
          createdAt: '2021-12-02T14:12:17.000Z',
          name: 'polar fish',
          description: 'hello',
          image: 'polar-1638454337121.jpg',
          quantity: 5,
          price: 100,
          sales: {
            initialized: true,
            dirty: false,
          },
        },
        {
          id: 5,
          createdAt: '2021-12-03T04:38:31.000Z',
          name: 'mos fish',
          description: 'hello',
          image: 'mos-1638506310770.jpg',
          quantity: 5,
          price: 56,
          sales: {
            initialized: true,
            dirty: false,
          },
        },
        {
          id: 6,
          createdAt: '2021-12-03T04:38:44.000Z',
          name: 'parrot fish',
          description: 'hello',
          image: 'parrot-1638506323968.jpg',
          quantity: 5,
          price: 56,
          sales: {
            initialized: true,
            dirty: false,
          },
        },
      ],
    };
  },
   methods: {
    formatDate(date) {
      return moment(date).format('DD-MMM-YYYY');
    },
  },
};
</script>
<style></style>
