<template>
  <div class="row">
    <div class="col-xl-3 col-lg-6">
      <stats-card
        title="Total sales"
        type="gradient-orange"
        :sub-title="stats.saleCount"
        icon="ni ni-chart-pie-35"
        class="mb-4 mb-xl-0"
      >
        <template v-slot:footer>
          <span class="text-nowrap"> Since last month</span>
        </template>
      </stats-card>
    </div>
    <div class="col-xl-3 col-lg-6">
      <stats-card
        title="Stocks"
        type="gradient-green"
        :sub-title="stats.productCount"
        icon="ni ni-money-coins"
        class="mb-4 mb-xl-0"
      >
        <template v-slot:footer>
          <span class="text-nowrap"> Since last month</span>
        </template>
      </stats-card>
    </div>
  </div>
</template>

<script>
import StatsCard from './StatsCard.vue';
import { mapGetters } from 'vuex';
export default {
  name: 'Stats',

  components: {
    StatsCard,
  },

  data() {
    return {
      stats: {},
    };
  },

  computed: {
    ...mapGetters('sales', ['getStats']),
  },

  mounted() {
    this.stats = this.getStats;
  },
};
</script>
