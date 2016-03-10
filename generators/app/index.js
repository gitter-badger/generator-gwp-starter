'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

var craftUrl = 'https://craftcms.com/latest.zip?accept_license=yes';

module.exports = yeoman.generators.Base.extend({
  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Let\'s get this party started!'
    ));

    var prompts = [{
      name: 'projectName',
      message: 'What\'s the name of the project?',
    }, {
      name: 'dbLocalUrl',
      message: '[LOCAL] Domain of your local installation',
    }, {
      name: 'dbLocalServer',
      message: '[LOCAL] Name of your local database server',
      default: 'localhost'
    }, {
      name: 'dbLocalUser',
      message: '[LOCAL] Name of your local database user',
      default: 'root'
    }, {
      name: 'dbLocalPassword',
      message: '[LOCAL] Password of your local database user',
      default: 'root'
    }, {
      name: 'dbLocalName',
      message: '[LOCAL] Name of your local database'
    }];

    this.prompt(prompts, function (props) {
      this.projectName = props.projectName;

      this.dbLocalUrl = props.dbLocalUrl;
      this.dbLocalServer = props.dbLocalServer;
      this.dbLocalUser = props.dbLocalUser;
      this.dbLocalPassword = props.dbLocalPassword;
      this.dbLocalName = props.dbLocalName;

      done();
    }.bind(this));
  },

  writing: function () {
    var projectName = {
      name: this.projectName
    };
    var dbLocal = {
      server: this.dbLocalServer,
      user: this.dbLocalUser,
      password: this.dbLocalPassword,
      dbname: this.dbLocalName
    };
    var domains = {
      local: this.dbLocalUrl
    };

    // Download and extract Craft
    var done = this.async();
    console.log('\nInstalling Craft...');
    this.extract(craftUrl, '.', {mode: '755'}, function(error) {
        if (error) {
            console.log(error);
        } else {
            console.log('Craft installed.');
            done();
        }
    });
  },

  install: function () {
    this.installDependencies();
  }
});
