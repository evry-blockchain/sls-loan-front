var user;
import beforeRemote from '../utils/cc-before-remote-init';
import prepareListData from '../utils/prepare-list-data';

module.exports = ParticipantUser => {

  ParticipantUser.beforeRemote('*', (context, unused, next) => {
    beforeRemote(context, (userInstance) => {
      user = userInstance;
      if (!user) {
        context.res.status(401).json({"error": "Login failed! Either ou provided wrong credentials, or your access token is expired."});
      } else {
        next();
      }
    });
  });

  ParticipantUser.getList = (filter, cb) => {
    user.cc.query.getUsersList([], user.username, (err, data) => {
      cb(err, prepareListData(data, filter));
    }, ['bankid']);
  };

  ParticipantUser.count = cb => {
    user.cc.query.getUsersQuantity([], user.username, (err, data) => {
      cb(err, JSON.parse(data));
    }, ['bankid']);
  };

  ParticipantUser.add = (participant, cb)=> {
    user.cc.invoke.addUser([
      participant.participantId,
      participant.userName
    ], user.username, (err, data) => {
      cb(err, data);
    }, ['bankid']);
  };

  ParticipantUser.delete = (id, cb) => {
    user.invoke.deleteRow(['Participants', id], user.username, (err,data) => {
      cb(err, data);
    }, ['bankid']);
  };

  ParticipantUser.remoteMethod('getList', {
    http: {
      path: '/',
      verb: 'get'
    },
    accepts: {arg: 'filter', type: 'object'},
    returns: {type: 'Participant', root: true}
  });

  ParticipantUser.remoteMethod('count', {
    http: {
      path: '/count',
      verb: 'get'
    },
    returns: {arg: 'count', type: 'int'}
  });

  ParticipantUser.remoteMethod('add', {
    http: {
      path: '/',
      verb: 'post'
    },
    accepts: {arg: 'data', type: 'Participant', http: {source: 'body'}},
    returns: {type: 'object', root: true}
  });

  ParticipantUser.remoteMethod('delete', {
    http: {
      path: '/:id',
      verb: 'delete'
    },
    accepts: {arg: 'id', type: 'string', required: true},
    returns: {type: 'object', root: true}
  });
};
