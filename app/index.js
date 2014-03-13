'use strict';

var yeoman = require('yeoman-generator');
var chalk = require('chalk');

var MetalsmithGenerator = yeoman.generators.Base.extend({

  init: function () {
    this.pkg = require('../package.json');

    this.on('end', function () {
      this.installDependencies({
        skipInstall: this.options['skip-install'] || this.options['s'],
        callback: function () {
          this.spawnCommand('make', ['build']);
        }.bind(this)
      });
    });

  },

  askFor: function () {
    var done = this.async();

    if (!this.options['skip-welcome-message'] || !this.options['w']) {
      this.log(this.yeoman);
      this.log(chalk.magenta('You\'re using the fantastic Metalsmith generator.'));
    }

    /*
    TODO:
    1. build type
    2. metalsmith-templates engine
    */

    var prompts = [{
      type    : 'input',
      name    : 'msTitle',
      message : 'Site Title',
      default : this.appname
    }, {
      type    : 'input',
      name    : 'msDesc',
      message : 'Site Description',
      default : 'My Metalsmith-Powered Site'
    }, {
      type    : "input",
      name    : "msAuthor",
      message : "Author name",
      default : this.user.git.username || 'Metal Smith'
    }, {
      type    : "input",
      name    : "msGithubUser",
      message : "Would you mind telling me your username on Github?",
      default : process.env.username || 'metalsmith'
    }];

    this.prompt(prompts, function (answers) {

      for (var key in answers) {
        if (answers.hasOwnProperty(key)) {
          this[key] = answers[key];
        }
      }

      done();
    }.bind(this));
  },

  site: function () {
    this.mkdir('_site');
  },

  layouts: function () {
    this.mkdir('_layouts');
    this.directory('_layouts', '_layouts');
  },

  posts: function () {
    this.mkdir('_posts');
    this.directory('_posts', '_posts');
  },

  gitfiles: function () {
    this.copy('gitignore', '.gitignore');
  },

  app: function () {
    this.copy('_package.json', 'package.json');
    this.copy('_metalsmith.json', 'metalsmith.json');
    this.copy('Makefile', 'Makefile');
    this.copy('README.md', 'README.md');
  },

});

module.exports = MetalsmithGenerator;
