var user;
import beforeRemote from '../utils/cc-before-remote-init';

module.exports = Util => {
  Util.beforeRemote('*', (context, unused, next) => {
    beforeRemote(context, (userInstance) => {
      user = userInstance;
      if (!user) {
        context.res.status(401).json({"error": "Login failed! Either ou provided wrong credentials, or your access token is expired."});
      } else {
        next();
      }
    });
  });

  Util.getBankId = cb => {
    user.cc.query.getBankId([], user.username, (err, data) => {
      cb(err, data);
    }, ['bankid']);
  };

  Util.remoteMethod('getBankId', {
    http: {
      path: '/bankId',
      verb: 'get'
    },
    returns: {type: 'number', root: true}
  });
};
