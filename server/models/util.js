var user;
import beforeRemote from '../utils/cc-before-remote-init';
import prepareListData from '../utils/prepare-list-data';
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

  Util.getProjectsForBank = (id, cb) => {
    var requests, negotiations, invitations;
    var result = [];
    user.cc.query.getLoanRequestsList([], user.username, (err, data) => {
      requests = JSON.parse(data);

      user.cc.query.getLoanNegotiationsList([], user.username, (err, data) => {
        negotiations = JSON.parse(data);

        user.cc.query.getLoanInvitationsList([], user.username, (err, data) => {
          invitations = JSON.parse(data);

          var bankNegotiations = negotiations.filter(item => {
            return item.ParticipantBankID == id;
          });

          var bankInvitations = [];

          bankNegotiations.forEach(item => {
            bankInvitations.push(invitations.filter(invitation => {
              return invitation.LoanInvitationID == item.LoanInvitationID;
            })[0]);
          });

          //where invited
          bankInvitations.forEach(item => {
            requests.forEach(request => {
              if(request.LoanRequestID == item.LoanRequestID) {
                result.push(request);
              }
            });
          });

          //where arranger
          requests.forEach(item => {
            if(item.ArrangerBankID == id) {
              result.push(item);
            }
          });

          var cbData = prepareListData(JSON.stringify(result));
          cb(null, cbData);

        }, ['bankid']);
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
  })
};
