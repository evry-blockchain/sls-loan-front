var user;
import beforeRemote from '../utils/cc-before-remote-init';

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
      cb(err, JSON.parse(data));
    });
  };

  Loan.count = cb => {
    user.cc.query.getLoansQuantity([], user.username, (err, data) => {
      cb(err, JSON.parse(data));
    });
  };

  Loan.add = (loan, cb)=> {
    user.cc.invoke.addLoan([
      loan.ArrangerBank,
      loan.BorrowerID,
      loan.Amount,
      loan.InterestRate,
      loan.InterestTerm,
      loan.Fee,
      loan.AgreementDate,
      loan.NegotiationStatus
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
