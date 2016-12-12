var user;
import beforeRemote from '../utils/cc-before-remote-init';
import prepareListData from '../utils/prepare-list-data';

module.exports = LoanTermProposal => {

  LoanTermProposal.beforeRemote('*', (context, unused, next) => {
    beforeRemote(context, (userInstance) => {
      user = userInstance;
      if (!user) {
        context.res.status(401).json({"error": "Login failed! Either ou provided wrong credentials, or your access token is expired."});
      } else {
        next();
      }
    });
  });

  LoanTermProposal.getList = (filter, cb) => {
    user.cc.query.getLoanTermProposalsList([], user.username, (err, data) => {
      cb(err, prepareListData(data, filter));
    }, ['bankid']);
  };

  LoanTermProposal.count = cb => {
    user.cc.query.getLoanTermProposalsQuantity([], user.username, (err, data) => {
      cb(err, JSON.parse(data));
    }, ['bankid']);
  };

  LoanTermProposal.add = (loanTermProposal, cb) => {
    if (loanTermProposal.loanTermProposalID) {
      user.cc.invoke.updateLoanTermProposal([
        loanTermProposal.loanTermProposalID,
        loanTermProposal.loanTermID,
        loanTermProposal.loanTermProposalText,
        loanTermProposal.loanTermProposalExpTime
      ], user.username, (err, data) => {
        cb(err, data);
      }, ['bankid']);
    } else {
      user.cc.invoke.addLoanTermProposal([
        loanTermProposal.loanTermID,
        loanTermProposal.loanTermProposalText,
        loanTermProposal.loanTermProposalExpTime
      ], user.username, (err, data) => {
        cb(err, data);
      }, ['bankid']);
    }
  };

  LoanTermProposal.update = (loanShare, cb) => {
    user.cc.invoke.updateLoanTermProposal([
      loanTermProposal.loanTermProposalID,
      loanTermProposal.loanTermID,
      loanTermProposal.loanTermProposalText,
      loanTermProposal.loanTermProposalExpTime
    ], user.username, (err, data) => {
      cb(err, data);
    }, ['bankid']);
  };

  LoanTermProposal.remoteMethod('getList', {
    http: {
      path: '/',
      verb: 'get'
    },
    accepts: {arg: 'filter', type: 'object'},
    returns: {type: 'LoanTermProposal', root: true}
  });

  LoanTermProposal.remoteMethod('count', {
    http: {
      path: '/count',
      verb: 'get'
    },
    returns: {arg: 'count', type: 'int'}
  });

  LoanTermProposal.remoteMethod('add', {
    http: {
      path: '/',
      verb: 'post'
    },
    accepts: {arg: 'data', type: 'LoanTermProposal', http: {source: 'body'}},
    returns: {type: 'object', root: true}
  });
};
