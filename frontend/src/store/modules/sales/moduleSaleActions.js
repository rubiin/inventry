import axios from '../../../axios/axios';

export default {
  getAllSales({ commit }, params) {
    return new Promise((resolve, reject) => {
      axios
        .get('/sales' + params)
        .then((res) => {
          commit('SET_SALES', res.data.items);
          return resolve(res);
        })
        .catch((err) => {
          return reject(err.response);
        });
    });
  },

  getSale({ commit }, params) {
    return new Promise((resolve, reject) => {
      axios
        .get('/sales/' + params)
        .then((res) => {
          return resolve(res);
        })
        .catch((err) => {
          return reject(err.response);
        });
    });
  },

  updateSales({ commit }, data) {
    return new Promise((resolve, reject) => {
      axios
        .patch('/sales/' + data.id, data.data)
        .then((res) => {
          commit('UPDATE_SALES', res.data);
          return resolve(res);
        })
        .catch((err) => {
          return reject(err.response);
        });
    });
  },

  createSales({ commit }, data) {
    return new Promise((resolve, reject) => {
      axios
        .post('/sales/', data)
        .then((res) => {
          commit('ADD_SALES', res.data);
          return resolve(res);
        })
        .catch((err) => {
          return reject(err.response);
        });
    });
  },

  deleteSales({ commit }, id) {
    return new Promise((resolve, reject) => {
      axios
        .delete('/sales/' + id)
        .then((res) => {
          return resolve(res);
        })
        .catch((err) => {
          return reject(err.response);
        });
    });
  },
};
