var user;
import beforeRemote from '../utils/cc-before-remote-init';
import prepareListData from '../utils/prepare-list-data';

module.exports = Participant => {

  Participant.beforeRemote('*', (context, unused, next) => {
    beforeRemote(context, (userInstance) => {
      user = userInstance;
      if (!user) {
        context.res.status(401).json({"error": "Login failed! Either ou provided wrong credentials, or your access token is expired."});
      } else {
        next();
      }
    });
  });

  Participant.getList = (filter, cb) => {
    user.cc.query.getParticipantsList([], user.username, (err, data) => {
      cb(err, prepareListData(data, filter));
    });
  };

  Participant.count = cb => {
    user.cc.query.getParticipantsQuantity([], user.username, (err, data) => {
      cb(err, JSON.parse(data));
    });
  };

  Participant.add = (participant, cb)=> {
    user.cc.invoke.addParticipant([
      participant.participantName,
      participant.participantType
    ], user.username, (err, data) => {
      cb(err, data);
    });
  };

  Participant.getByType = (type, cb) => {
    user.cc.query.getParticipantsByType(type, user.username, (err, data) => {
      cb(err, prepareListData(data));
    });
  };

  Participant.delete = (id, cb) => {
    user.invoke.deleteRow(['Participants', id], user.username, (err,data) => {
      cb(err, data);
    });
  };

  Participant.remoteMethod('getList', {
    http: {
      path: '/',
      verb: 'get'
    },
    accepts: {arg: 'filter', type: 'object'},
    returns: {type: 'Participant', root: true}
  });

  Participant.remoteMethod('count', {
    http: {
      path: '/count',
      verb: 'get'
    },
    returns: {arg: 'count', type: 'int'}
  });

  Participant.remoteMethod('add', {
    http: {
      path: '/',
      verb: 'post'
    },
    accepts: {arg: 'data', type: 'Participant', http: {source: 'body'}},
    returns: {type: 'object', root: true}
  });

  Participant.remoteMethod('getByType', {
    http: {
      path: '/getByType',
      verb: 'get'
    },
    accepts: {arg: 'type', type: 'string'},
    returns: {type: 'Participant', root: true}
  });

  Participant.remoteMethod('delete', {
    http: {
      path: '/:id',
      verb: 'delete'
    },
    accepts: {arg: 'id', type: 'string', required: true},
    returns: {type: 'object', root: true}
  });
};
