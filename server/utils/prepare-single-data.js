module.exports = function(data) {
  if(data === ']') {
    return JSON.parse("[]")
  } else {
    return JSON.parse(data).map((item) => {
      var temp = {};
      for (var i in item) {
        temp[i.charAt(0).toLowerCase() + i.slice(1)] = item[i];
      }

      return temp;
    })[0];
  }
};
