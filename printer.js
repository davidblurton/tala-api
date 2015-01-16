var chalk = require('chalk');

module.exports = {
  print: function(obj) {
    for(var key in obj) {
      if(obj.hasOwnProperty(key) && key.indexOf('_') !== 0) {
        console.log(chalk.blue(key + ': '), obj[key]);
      }
    }
  }
}
