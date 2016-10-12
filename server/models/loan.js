var user;
import beforeRemote from '../utils/cc-before-remote-init';
import prepareListData from '../utils/prepare-list-data';

module.exports = Loan => {
  Loan.beforeRemote('*', (context, unused, next) => {
    beforeRemote(context, (userInstance) => {
      user = userInstance;
      if (!user) {
        context.res.status(401).json({"error": "Login failed! Either ou provided wrong credentials, or your access token is expired."});
      } else {
        next();
      }
    });
  });

  Loan.getList = cb => {
    user.cc.query.getLoansList([], user.username, (err, data) => {
      cb(err, prepareListData(data));
    });
  };

  Loan.count = cb => {
    user.cc.query.getLoansQuantity([], user.username, (err, data) => {
      cb(err, JSON.parse(data));
    });
  };

  Loan.add = (loan, cb)=> {
    user.cc.invoke.addLoan([
      loan.arrangerBank,
      loan.borrowerID,
      loan.amount,
      loan.interestRate,
      loan.interestTerm,
      loan.fee,
      loan.agreementDate,
      loan.negotiationStatus
    ], user.username, (err, data) => {
      cb(err, data);
    });
  };

  Loan.remoteMethod('getList', {
    http: {
      path: '/',
      verb: 'get'
    },
    returns: {type: 'Loan', root: true}
  });

  Loan.remoteMethod('count', {
    http: {
      path: '/count',
      verb: 'get'
    },
    returns: {arg: 'count', type: 'int'}
  });

  Loan.remoteMethod('add', {
    http: {
      path: '/',
      verb: 'post'
    },
    accepts: {arg: 'data', type: 'Loan', http: {source: 'body'}},
    returns: {type: 'object', root: true}
  });
};
