var user;
import beforeRemote from '../utils/cc-before-remote-init';
import prepareListData from '../utils/prepare-list-data';
import prepareSingleData from '../utils/prepare-single-data';

module.exports = Util => {
  Util.beforeRemote('*', (context, unused, next) => {
    beforeRemote(context, (userInstance) => {
      user = userInstance;
      if (!user) {
        context.res.status(401).json({"error": "Login failed! Either ou provided wrong credentials, or your access token is expired."});
      } else {
        next();
      }
    });
  });

  Util.getBankId = cb => {
    user.cc.query.getBankId([], user.username, (err, data) => {
      cb(err, data);
    }, ['bankid']);
  };

  Util.getNegotiationByBankAndProject = (bankId, projectId, cb) => {
    let negotiations;

    user.cc.query.getLoanNegotiationsList([], user.username, (err, data) => {
      negotiations = JSON.parse(data);

      negotiations = negotiations.filter(negotiation => {
        return negotiation.LoanRequestID == projectId && negotiation.ParticipantBankID == bankId
      });

      cb(null, prepareSingleData(JSON.stringify([negotiations[0] ? negotiations[0] : {}])));
    }, ['bankid']);
  };

  Util.getNegotiationsByProject = (projectId, cb) => {
    let negotiations;

    user.cc.query.getLoanNegotiationsList([], user.username, (err, data) => {
      negotiations = JSON.parse(data);

      negotiations = negotiations.filter(negotiation => negotiation.LoanRequestID == projectId);

      cb(null, prepareListData(JSON.stringify(negotiations)));
    }, ['bankid']);
  };

  Util.getProjectsForBank = (id, cb) => {
    let requests, negotiations;
    let result = [];
    user.cc.query.getLoanRequestsList([], user.username, (err, data) => {
      requests = JSON.parse(data);

      user.cc.query.getLoanNegotiationsList([], user.username, (err, data) => {
        negotiations = JSON.parse(data);

        let bankNegotiations = negotiations.filter(item => {
            return item.ParticipantBankID == id;
          });

          //where invited
          bankNegotiations.forEach(item => {
            requests.forEach(request => {
              if (request.LoanRequestID == item.LoanRequestID && result.indexOf(request) == -1) {
                result.push(request);
              }
            });
          });

          //where arranger
          requests.forEach(item => {
            if (item.ArrangerBankID == id && result.indexOf(item) == -1) {
              result.push(item);
            }
          });

          let cbData = prepareListData(JSON.stringify(result));
          console.log(cbData);
          cb(null, cbData);

      }, ['bankid']);
    }, ['bankid']);

  };

  Util.remoteMethod('getBankId', {
    http: {
      path: '/bankId',
      verb: 'get'
    },
    returns: {type: 'number', root: true}
  });

  Util.remoteMethod('getProjectsForBank', {
    http: {
      path: '/projectsForBank/:id',
      verb: 'get'
    },
    accepts: {arg: 'id', type: 'string', required: true},
    returns: {type: 'object', root: true}
  });

  Util.remoteMethod('getNegotiationByBankAndProject', {
    http: {
      path: '/negotiationByBankAndProject/:bankId/:projectId',
      verb: 'get'
    },
    accepts: [{arg: 'bankId', type: 'string', required: true}, {arg: 'projectId', type: 'string', required: true}],
    returns: {type: 'object', root: true}
  });

  Util.remoteMethod('getNegotiationsByProject', {
    http: {
      path: '/negotiationsByProject/:projectId',
      verb: 'get'
    },
    accepts: [{arg: 'projectId', type: 'string', required: true}],
    returns: {type: 'object', root: true}
  });
};
