import chaincode from '../connectors/chaincode';

module.exports  = Participant => {
  Participant.getList = cb => {
    chaincode(cc => {
      cc.query.getParticipantsList([], 'WebAppAdmin', (err, data) => {
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
  })
};
