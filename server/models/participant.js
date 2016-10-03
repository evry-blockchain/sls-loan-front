var chaincode = require('../connectors/chaincode');

module.exports = function (Participant) {
  Participant.getList = function (cb) {
    chaincode(function (cc) {
      cc.query.getParticipantsList([], 'WebAppAdmin', function (err, data) {
        cb(null, JSON.parse(data));
      });
    });
  };

  Participant.remoteMethod('getList', {
    http: {
      path: '/',
      verb: 'get'
    },
    returns: {type: 'array', root: true}
  })
};
