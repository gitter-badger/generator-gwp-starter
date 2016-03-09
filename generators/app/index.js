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
      'Welcome to the first-rate ' + chalk.red('generator-gw-starter') + ' generator!'
    ));

    var prompts = [{
      name: 'projectName',
      message: 'What\'s the name of your project?',
      default: 'GW Starter'
    }, {
      name: 'dbLocalUrl',
      message: '[LOCAL] Domain of your local installation',
      default: 'gw-starter.dev'
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
    }, {
      name: 'dbStagingUrl',
      message: '[STAGING] Domain of your staging installation'
    }, {
      name: 'dbStagingServer',
      message: '[STAGING] Name of your staging database server'
    }, {
      name: 'dbStagingUser',
      message: '[STAGING] Name of your staging database user'
    }, {
      name: 'dbStagingPassword',
      message: '[STAGING] Password of your staging database user'
    }, {
      name: 'dbStagingName',
      message: '[STAGING] Name of your staging database'
    }];

    this.prompt(prompts, function (props) {
      this.projectName = props.projectName;

      this.dbLocalUrl = props.dbLocalUrl;
      this.dbLocalServer = props.dbLocalServer;
      this.dbLocalUser = props.dbLocalUser;
      this.dbLocalPassword = props.dbLocalPassword;
      this.dbLocalName = props.dbLocalName;

      this.dbStagingUrl = props.dbStagingUrl;
      this.dbStagingServer = props.dbStagingServer;
      this.dbStagingUser = props.dbStagingUser;
      this.dbStagingPassword = props.dbStagingPassword;
      this.dbStagingName = props.dbStagingName;

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
    var dbStaging = {
      server: this.dbStagingServer,
      user: this.dbStagingUser,
      password: this.dbStagingPassword,
      dbname: this.dbStagingName
    };
    var domains = {
      local: this.dbLocalUrl,
      staging: this.dbStagingUrl
    };

    // Download and extract Craft
    var done = this.async();
    this.extract(craftUrl, '.', {mode: '755'}, function(error) {
        if (error) {
            console.log(error);
        } else {
            console.log('extracted');
            done();
        }
    });
  },

  install: function () {
    this.installDependencies();
  }
});
