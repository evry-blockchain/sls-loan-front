var user;
import beforeRemote from '../utils/cc-before-remote-init';
import prepareListData from '../utils/prepare-list-data';
import prepareSingleData from '../utils/prepare-single-data';

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

  LoanRequest.getList = (filter, cb) => {
    user.cc.query.getLoanRequestsList([], user.username, (err, data) => {
      cb(err, prepareListData(data, filter));
    }, ['bankid']);
  };

  LoanRequest.get = (id, cb) => {
    user.cc.query.getLoanRequestByKey([id], user.username, (err, data) => {
      cb(err, prepareSingleData(data));
    }, ['bankid']);
  };

  LoanRequest.count = cb => {
    user.cc.query.getLoanRequestsQuantity([], user.username, (err, data) => {
      cb(err, JSON.parse(data));
    }, ['bankid']);
  };

  LoanRequest.add = (loanRequest, cb)=> {
    user.cc.invoke.addLoanRequest([
      loanRequest.borrowerID,
      loanRequest.arrangerBankID,
      loanRequest.loanSharesAmount,
      loanRequest.projectRevenue,
      loanRequest.projectName,
      loanRequest.projectInformation,
      loanRequest.company,
      loanRequest.website,
      loanRequest.contactPersonName,
      loanRequest.contactPersonSurname,
      loanRequest.requestDate,
      loanRequest.status = 'Draft',
      loanRequest.marketAndIndustry,
      loanRequest.loanTerm,
      loanRequest.assets,
      loanRequest.convenants,
      loanRequest.interestRate
    ], user.username, (err, data) => {
      cb(err, data);
    }, ['bankid']);
  };

  LoanRequest.update = (loanRequest, cb) => {
    user.cc.invoke.updateLoanRequest([
      loanRequest.loanRequestID,
      loanRequest.borrowerID,
      loanRequest.arrangerBankID,
      loanRequest.loanSharesAmount,
      loanRequest.projectRevenue,
      loanRequest.projectName,
      loanRequest.projectInformation,
      loanRequest.company,
      loanRequest.website,
      loanRequest.contactPersonName,
      loanRequest.contactPersonSurname,
      loanRequest.requestDate,
      loanRequest.status,
      loanRequest.marketAndIndustry,
      loanRequest.loanTerm,
      loanRequest.assets,
      loanRequest.convenants,
      loanRequest.interestRate
    ], user.username, (err, data) => {
      cb(err, data);
    }, ['bankid']);
  };

  LoanRequest.remoteMethod('getList', {
    http: {
      path: '/',
      verb: 'get'
    },
    accepts: {arg: 'filter', type: 'object'},
    returns: {type: 'LoanRequest', root: true}
  });

  LoanRequest.remoteMethod('get', {
    http: {
      path: '/:id',
      verb: 'get'
    },
    accepts: {arg: 'id', type: 'string', required: true},
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

  LoanRequest.remoteMethod('update', {
    http: {
      path: '/',
      verb: 'put'
    },
    accepts: [{
      arg: 'data',
      type: 'LoanRequest',
      http: {source: 'body'}
    }],
    returns: {type: 'object', root: true}
  });

  //TODO: add delete

};
