let user;
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

  LoanTermProposal.proposalsByProject = (projectID, cb) => {
    user.cc.query.getLoanTermList([], user.username, (err, terms) => {
      let projectTermIDs;
      try {
        projectTermIDs = JSON.parse(terms).filter(item => item.LoanRequestID == projectID).map(item => item.LoanTermID);
      } catch(e) {
        cb(err, []);
        return;
      }

      user.cc.query.getLoanTermProposalList([], user.username, (err, comments) => {
        let proposalsParsed;

        try {
          proposalsParsed = JSON.parse(comments);
        } catch(e) {
          proposalsParsed = [];
        }
        cb(err, prepareListData(JSON.stringify(proposalsParsed.filter(item => projectTermIDs.indexOf(item.LoanTermID) !== -1))));
      }, ['bankid']);
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

  LoanTermProposal.remoteMethod('proposalsByProject', {
    http: {
      path: '/proposalsByProject/:projectID',
      verb: 'get'
    },
    accepts: {arg: 'projectID', type: 'string', required: true},
    returns: {type: 'LoanTermProposal', root: true}
  });
};
