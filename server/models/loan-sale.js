var user;
import beforeRemote from '../utils/cc-before-remote-init';
import prepareListData from '../utils/prepare-list-data';

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

  LoanSale.getList = (filter, cb) => {
      user.cc.query.getLoanSalesList([], user.username, (err, data) => {
        cb(err, prepareListData(data, filter));
      });
  };

  LoanSale.count = cb => {
      user.cc.query.getLoanSalesQuantity([], user.username, (err, data) => {
        cb(err, JSON.parse(data));
    });
  };

  LoanSale.add = (loanSale, cb)=> {
      user.cc.invoke.addLoanSale([
        loanSale.fromLoanSaleID,
        loanSale.toParticipantID,
        loanSale.amountSold
      ], user.username, (err, data) => {
        cb(err, data);
      });
  };

  LoanSale.remoteMethod('getList', {
    http: {
      path: '/',
      verb: 'get'
    },
    accepts: {arg: 'filter', type: 'object'},
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
