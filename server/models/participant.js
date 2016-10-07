import chaincode from '../connectors/chaincode';

module.exports = Participant => {
  Participant.getList = cb => {
    chaincode(cc => {
      cc.query.getParticipantsList([], 'WebAppAdmin', (err, data) => {
        cb(err, JSON.parse(data));
      });
    });
  };

  Participant.count = cb => {
    chaincode(cc => {
      cc.query.getParticipantsQuantity([], 'WebAppAdmin', (err, data) => {
        cb(err, JSON.parse(data));
      });
    });
  };

  Participant.add = (participant, cb)=> {
    chaincode(cc => {
      cc.invoke.addParticipant([participant.ParticipantName, participant.ParticipantType], 'WebAppAdmin', (err, data) => {
        cb(err, data);
      });
    });
  };

  Participant.getByType = (type, cb) => {
    chaincode(cc => {
      cc.query.getParticipantsByType(type, 'WebAppAdmin', (err, data) => {
        cb(err, JSON.parse(data));
      });
    });
  };

  Participant.remoteMethod('getList', {
    http: {
      path: '/',
      verb: 'get'
    },
    returns: {type: 'Participant', root: true}
  });

  Participant.remoteMethod('count', {
    http: {
      path: '/count',
      verb: 'get'
    },
    returns: {arg: 'count', type: 'int'}
  });

  Participant.remoteMethod('add', {
    http: {
      path: '/',
      verb: 'post'
    },
    accepts: {arg: 'data', type: 'Participant', http: {source: 'body'}},
    returns: {type: 'object', root: true}
  });

  Participant.remoteMethod('getByType', {
    http: {
      path: '/getByType',
      verb: 'get'
    },
    accepts: {arg: 'type', type: 'string'},
    returns: {type: 'Participant', root: true}
  });
};
