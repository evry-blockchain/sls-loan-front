var user;
import beforeRemote from '../utils/cc-before-remote-init';
import prepareListData from '../utils/prepare-list-data';

module.exports = LoanInvitation => {
  LoanInvitation.beforeRemote('*', (context, unused, next) => {
    beforeRemote(context, (userInstance) => {
      user = userInstance;
      if (!user) {
        context.res.status(401).json({"error": "Login failed! Either ou provided wrong credentials, or your access token is expired."});
      } else {
        next();
      }
    });
  });

  LoanInvitation.getList = (filter, cb) => {
    user.cc.query.getLoanInvitationsList([], user.username, (err, data) => {
      cb(err, prepareListData(data, filter));
    }, ['bankid']);
  };

  LoanInvitation.count = cb => {
    user.cc.query.getLoanInvitationsQuantity([], user.username, (err, data) => {
      cb(err, JSON.parse(data));
    }, ['bankid']);
  };

  LoanInvitation.add = (loanInvitation, cb)=> {
    user.cc.invoke.addLoanInvitation([
      loanInvitation.borrowerID,
      loanInvitation.arrangerBankID,
      loanInvitation.loanSharesAmount,
      loanInvitation.projectRevenue,
      loanInvitation.projectName,
      loanInvitation.projectInformation,
      loanInvitation.company,
      loanInvitation.website,
      loanInvitation.contactPersonName,
      loanInvitation.contactPersonSurname,
      loanInvitation.requestDate,
      loanInvitation.status
    ], user.username, (err, data) => {
      cb(err, data);
    }, ['bankid']);

  };LoanInvitation.add = (loanInvitation, cb)=> {
    user.cc.invoke.addLoanInvitation([
      loanInvitation.loanInvitationID,
      loanInvitation.borrowerID,
      loanInvitation.arrangerBankID,
      loanInvitation.loanSharesAmount,
      loanInvitation.projectRevenue,
      loanInvitation.projectName,
      loanInvitation.projectInformation,
      loanInvitation.company,
      loanInvitation.website,
      loanInvitation.contactPersonName,
      loanInvitation.contactPersonSurname,
      loanInvitation.requestDate,
      loanInvitation.status
    ], user.username, (err, data) => {
      cb(err, data);
    }, ['bankid']);

  };

  LoanInvitation.remoteMethod('getList', {
    http: {
      path: '/',
      verb: 'get'
    },
    accepts: {arg: 'filter', type: 'object'},
    returns: {type: 'LoanInvitation', root: true}
  });

  LoanInvitation.remoteMethod('count', {
    http: {
      path: '/count',
      verb: 'get'
    },
    returns: {arg: 'count', type: 'int'}
  });

  LoanInvitation.remoteMethod('add', {
    http: {
      path: '/',
      verb: 'post'
    },
    accepts: {
      arg: 'data',
      type: 'LoanInvitation',
      http: {source: 'body'}
    },
    returns: {type: 'object', root: true}
  });

  LoanInvitation.remoteMethod('update', {
    http: {
      path: '/',
      verb: 'put'
    },
    accepts: {
      arg: 'data',
      type: 'LoanInvitation',
      http: {source: 'body'}
    },
    returns: {type: 'object', root: true}
  });

};
