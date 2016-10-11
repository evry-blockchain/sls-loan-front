var user;
import beforeRemote from '../utils/cc-before-remote-init';

module.exports = LoanRequest => {

  LoanRequest.beforeRemote('*', (context, unused, next) => {
    beforeRemote(context, (userInstance) => {
      user = userInstance;
      if (!user) {
        context.res.status(401).json({"error": "Login failed! Either ou provided wrong credentials, or your access token is expired."});
      } else {
        next();
      }
    });
  });

  LoanRequest.getList = cb => {
    user.cc.query.getLoanRequestsList([], user.username, (err, data) => {
      cb(err, JSON.parse(data));
    });
  };

  LoanRequest.count = cb => {
    user.cc.query.getLoanRequestsQuantity([], user.username, (err, data) => {
      cb(err, JSON.parse(data));
    });
  };

  LoanRequest.add = (loanRequest, cb)=> {
    user.cc.invoke.addLoanRequest([
      loanRequest.BorrowerID,
      loanRequest.ArrangerBankID,
      loanRequest.LoanSharesAmount,
      loanRequest.ProjectRevenue,
      loanRequest.ProjectName,
      loanRequest.ProjectInformation,
      loanRequest.Company,
      loanRequest.Website,
      loanRequest.ContactPersonName,
      loanRequest.ContactPersonSurname,
      loanRequest.RequestDate,
      loanRequest.Status
    ], user.username, (err, data) => {
      cb(err, data);
    });
  };

  LoanRequest.remoteMethod('getList', {
    http: {
      path: '/',
      verb: 'get'
    },
    returns: {type: 'LoanRequest', root: true}
  });

  LoanRequest.remoteMethod('count', {
    http: {
      path: '/count',
      verb: 'get'
    },
    returns: {arg: 'count', type: 'int'}
  });

  LoanRequest.remoteMethod('add', {
    http: {
      path: '/',
      verb: 'post'
    },
    accepts: {
      arg: 'data',
      type: 'LoanRequest',
      http: {source: 'body'}
    },
    returns: {type: 'object', root: true}
  });

};
