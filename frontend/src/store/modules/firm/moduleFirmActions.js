import axios from '../../../axios/axios';

export default {
  getAllFirms({ commit }, params) {
    return new Promise((resolve, reject) => {
      axios
        .get('/firm' + params)
        .then((res) => {
          commit('SET_FIRMS', res.data.items);
          return resolve(res);
        })
        .catch((err) => {
          return reject(err.response);
        });
    });
  },

  updateFirm({ commit }, data) {
    return new Promise((resolve, reject) => {
      axios
        .patch('/firm/' + data.id, data.data, data.config)
        .then((res) => {
          commit('UPDATE_FIRMS', res.data);
          return resolve(res);
        })
        .catch((err) => {
          return reject(err.response);
        });
    });
  },

  createFirm({ commit }, data) {
    return new Promise((resolve, reject) => {
      axios
        .post('/firm/', data)
        .then((res) => {
          commit('ADD_FIRMS', res.data);
          return resolve(res);
        })
        .catch((err) => {
          return reject(err.response);
        });
    });
  },

  deleteFirm({ commit }, id) {
    return new Promise((resolve, reject) => {
      axios
        .delete('/firm/' + id)
        .then((res) => {
          return resolve(res);
        })
        .catch((err) => {
          return reject(err.response);
        });
    });
  },
};
