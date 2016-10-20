module.exports = function(data, filter) {
  if(data === ']' || data === 'null' || data === null) {
    return JSON.parse("[]")
  } else {
    var result = JSON.parse(data).map((item) => {
      var temp = {};
      for (var i in item) {
        temp[i.charAt(0).toLowerCase() + i.slice(1)] = item[i];
      }

      return temp;
    });

    if(filter && result.length) {
      result = result.filter(item => {
        for(var i in filter) {
          if(item[i] != filter[i])
            return false;
        }

        return true;
      });
    }
    return result;
  }
};
