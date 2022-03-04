import axios from '../../../axios/axios';

export default {
  getAllProductDetails({ commit }, params) {
    return new Promise((resolve, reject) => {
      axios
        .get('/product-detail' + params)
        .then((res) => {
          commit('SET_PRODUCT_DETAILS', res.data.items);
          return resolve(res);
        })
        .catch((err) => {
          return reject(err.response);
        });
    });
  },

  updateProductDetail({ commit }, data) {
    return new Promise((resolve, reject) => {
      axios
        .patch('/product-detail/' + data.id, data.data)
        .then((res) => {
          commit('UPDATE_PRODUCT_DETAILS', res.data);
          return resolve(res);
        })
        .catch((err) => {
          return reject(err.response);
        });
    });
  },

  createProductDetail({ commit }, data) {
    return new Promise((resolve, reject) => {
      axios
        .post('/product-detail/', data)
        .then((res) => {
          commit('ADD_PRODUCT_DETAILS', res.data);
          return resolve(res);
        })
        .catch((err) => {
          return reject(err.response);
        });
    });
  },

  deleteProductDetail({ commit }, id) {
    return new Promise((resolve, reject) => {
      axios
        .delete('/product-detail/' + id)
        .then((res) => {
          return resolve(res);
        })
        .catch((err) => {
          return reject(err.response);
        });
    });
  },
};
