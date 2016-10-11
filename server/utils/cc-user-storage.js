var storage = {
  db: {},
  store: function (token, cc) {
    storage.db[token] = cc;
  },
  get: function(token) {
    return storage.db[token];
  }
};

module.exports = storage;
