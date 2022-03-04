import axios from '../../../axios/axios';

export default {
  getAllDamages({ commit }, params) {
    return new Promise((resolve, reject) => {
      axios
        .get('damaged-product' + params)
        .then((res) => {
          commit('SET_DAMAGES', res.data.items);
          return resolve(res);
        })
        .catch((err) => {
          return reject(err.response);
        });
    });
  },

  createDamage({ commit }, data) {
    return new Promise((resolve, reject) => {
      axios
        .post('damaged-product', data)
        .then((res) => {
          commit('ADD_DAMAGES', res.data);
          return resolve(res);
        })
        .catch((err) => {
          return reject(err.response);
        });
    });
  },

  deleteDamage({ commit }, id) {
    return new Promise((resolve, reject) => {
      axios
        .delete('damaged-product/' + id)
        .then((res) => {
          return resolve(res);
        })
        .catch((err) => {
          return reject(err.response);
        });
    });
  },
};
