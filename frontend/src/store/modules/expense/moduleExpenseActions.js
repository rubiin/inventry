import axios from '../../../axios/axios';

export default {
  getAllExpenses({ commit }, params) {
    return new Promise((resolve, reject) => {
      axios
        .get('expense' + params)
        .then((res) => {
          commit('SET_EXPENSES', res.data.items);
          return resolve(res);
        })
        .catch((err) => {
          return reject(err.response);
        });
    });
  },

  updateExpense({ commit }, data) {
    return new Promise((resolve, reject) => {
      axios
        .patch('expense/' + data.id, data.data, data.config)
        .then((res) => {
          commit('UPDATE_Expenses', res.data);
          return resolve(res);
        })
        .catch((err) => {
          return reject(err.response);
        });
    });
  },

  createExpense({ commit }, data) {
    return new Promise((resolve, reject) => {
      axios
        .post('expense/', data)
        .then((res) => {
          commit('ADD_EXPENSES', res.data);
          return resolve(res);
        })
        .catch((err) => {
          return reject(err.response);
        });
    });
  },

  deleteExpense({ commit }, id) {
    return new Promise((resolve, reject) => {
      axios
        .delete('expense/' + id)
        .then((res) => {
          return resolve(res);
        })
        .catch((err) => {
          return reject(err.response);
        });
    });
  },
};
