let user;
import beforeRemote from '../utils/cc-before-remote-init';
import prepareListData from '../utils/prepare-list-data';

module.exports = LoanTermVote => {

  LoanTermVote.beforeRemote('*', (context, unused, next) => {
    beforeRemote(context, (userInstance) => {
      user = userInstance;
      if (!user) {
        context.res.status(401).json({"error": "Login failed! Either ou provided wrong credentials, or your access token is expired."});
      } else {
        next();
      }
    });
  });

  LoanTermVote.getList = (filter, cb) => {
    user.cc.query.getLoanTermVotesList([], user.username, (err, data) => {
      cb(err, prepareListData(data, filter));
    }, ['bankid']);
  };

  LoanTermVote.count = cb => {
    user.cc.query.getLoanTermVotesQuantity([], user.username, (err, data) => {
      cb(err, JSON.parse(data));
    }, ['bankid']);
  };

  LoanTermVote.votesForProposal = (proposalID, cb) => {
    let filter = {
        loanTermProposalID: proposalID
    };
    user.cc.query.getLoanTermVotesList([], user.username, (err, data) => {
      cb(err, prepareListData(data, filter));
    }, ['bankid']);
  };

  LoanTermVote.add = (loanTermVote, cb) => {
    if (loanTermVote.loanTermVoteID) {
      user.cc.invoke.updateLoanTermVote([
        loanTermVote.loanTermVoteID,
        loanTermVote.loanTermProposalID,
        loanTermVote.bankID,
        loanTermVote.loanTermVoteStatus
      ], user.username, (err, data) => {
        cb(err, data);
      }, ['bankid']);
    } else {
      user.cc.invoke.addLoanTermVote([
        loanTermVote.loanTermProposalID,
        loanTermVote.bankID,
        loanTermVote.loanTermVoteStatus
      ], user.username, (err, data) => {
        cb(err, data);
      }, ['bankid']);
    }
  };

  LoanTermVote.update = (loanShare, cb) => {
    user.cc.invoke.updateLoanTermVote([
      loanTermVote.loanTermVoteID,
      loanTermVote.loanTermProposalID,
      loanTermVote.bankID,
      loanTermVote.loanTermVoteStatus
    ], user.username, (err, data) => {
      cb(err, data);
    }, ['bankid']);
  };

  LoanTermVote.remoteMethod('getList', {
    http: {
      path: '/',
      verb: 'get'
    },
    accepts: {arg: 'filter', type: 'object'},
    returns: {type: 'LoanTermVote', root: true}
  });

  LoanTermVote.remoteMethod('count', {
    http: {
      path: '/count',
      verb: 'get'
    },
    returns: {arg: 'count', type: 'int'}
  });

  LoanTermVote.remoteMethod('add', {
    http: {
      path: '/',
      verb: 'post'
    },
    accepts: {arg: 'data', type: 'LoanTermVote', http: {source: 'body'}},
    returns: {type: 'object', root: true}
  });

  LoanTermVote.remoteMethod('votesForProposal', {
    http: {
      path: '/votesForProposal/:proposalID',
      verb: 'get'
    },
    accepts: {arg: 'proposalID', type: 'string', required: true},
    returns: {type: 'LoanTermVote', root: true}
  });
};
