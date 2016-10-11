var user;
import beforeRemote from '../utils/cc-before-remote-init';

module.exports = LoanSale => {

  LoanSale.beforeRemote('*', (context, unused, next) => {
    beforeRemote(context, (userInstance) => {
      user = userInstance;
      if (!user) {
        context.res.status(401).json({"error": "Login failed! Either ou provided wrong credentials, or your access token is expired."});
      } else {
        next();
      }
    });
  });

  LoanSale.getList = cb => {
      user.cc.query.getLoanSalesList([], user.username, (err, data) => {
        cb(err, JSON.parse(data));
      });
  };

  LoanSale.count = cb => {
      user.cc.query.getLoanSalesQuantity([], user.username, (err, data) => {
        cb(err, JSON.parse(data));
    });
  };

  LoanSale.add = (loanSale, cb)=> {
      user.cc.invoke.addLoanSale([
        loanSale.FromLoanSaleID,
        loanSale.ToParticipantID,
        loanSale.AmountSold
      ], user.username, (err, data) => {
        cb(err, data);
      });
  };

  LoanSale.remoteMethod('getList', {
    http: {
      path: '/',
      verb: 'get'
    },
    returns: {type: 'LoanSale', root: true}
  });

  LoanSale.remoteMethod('count', {
    http: {
      path: '/count',
      verb: 'get'
    },
    returns: {arg: 'count', type: 'int'}
  });

  LoanSale.remoteMethod('add', {
    http: {
      path: '/',
      verb: 'post'
    },
    accepts: {arg: 'data', type: 'LoanSale', http: {source: 'body'}},
    returns: {type: 'object', root: true}
  });

};
