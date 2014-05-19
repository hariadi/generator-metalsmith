'use strict';

var yeoman = require('yeoman-generator');

var MetalsmithGenerator = yeoman.generators.Base.extend({

  init: function () {
    this.pkg = require('../package.json');

    this.on('end', function () {
      this.installDependencies({
        skipInstall: this.options['skip-install'] || this.options.s,
        callback: function () {
          this.spawnCommand('make', ['build']);
        }.bind(this)
      });
    });

    this.metalsmith = {
	  title: 'Metalsmith Blog',
	  description: 'My Metalsmith-Powered Site',
	  plugins: {
	    'metalsmith-ignore': '^0.1.2',
	    'metalsmith-drafts': '^0.0.1',
	    'metalsmith-templates': '^0.5.0',
	    'metalsmith-markdown': '^0.2.1',
	    'metalsmith-permalinks': '^0.3.0',
	    'metalsmith-collections': '^0.4.1'
	  },
	  engine: {
	    swig: '^1.3.2',
	    handlebars: '^2.0.0-alpha.2'
	  }
	};

  },

  askFor: function () {
    var done = this.async();

    if (!this.options['skip-welcome-message'] || !this.options.w) {
      this.log(this.yeoman);
    }

    var plugins = this.metalsmith.plugins;
    var choices = [];
    for (var plugin in plugins) {
      if (plugins.hasOwnProperty(plugin)) {
        choices.push({ name: plugin, checked: true });
      }
    }

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
      type    : 'input',
      name    : 'msAuthor',
      message : 'Author name',
      default : this.user.git.username || 'Metal Smith'
    }, {
      type    : 'input',
      name    : 'msGithubUser',
      message : 'Would you mind telling me your username on Github?',
      default : process.env.username || 'metalsmith'
    }, {
      type: 'checkbox',
      name: 'msPlugins',
      message: 'Which plugins do you want to use?',
      choices: choices
    }, {
      type: 'list',
      message: 'Which template engine do you want to use?',
      name: 'templateEngine',
      //TODO: support https://github.com/visionmedia/consolidate.js#supported-template-engines
      choices: [{
        name: 'swig',
        checked: true
      }, 'handlebars'],
      when : function (answers) {
        return answers.msPlugins.indexOf('metalsmith-templates') > -1;
      }
    }, {
      type: 'input',
      message: 'What should a permalink look like?',
      name: 'permalinksPattern',
      default : ':title',
      when : function (answers) {
        return answers.msPlugins.indexOf('metalsmith-permalinks') > -1;
      }
    }];

    this.prompt(prompts, function (answers) {

      var deps = this._.object(answers.msPlugins.map(function (plugin) {
        return plugin.replace('metalsmith-', '');
      }), answers.msPlugins.map(function () {
        return true;
      }));

      for (var key in answers) {
        if (answers.hasOwnProperty(key)) {
          if (key === 'msPlugins') {

            for (var pkg in deps) {
              if (deps.hasOwnProperty(pkg)) {
                this[pkg] = deps[pkg];
              }
            }

          } else {
            this[key] = answers[key];
          }
        }
      }

      done();
    }.bind(this));
  },

  site: function () {
    this.mkdir('_site');
  },

  layouts: function () {

    var prefix = (this.templateEngine === 'swig') ? '' : this.templateEngine + '-';

    this.mkdir('_layouts');
    this.template('_layouts/' + prefix + 'default.html', '_layouts/default.html');
    this.template('_layouts/' + prefix + 'post.html', '_layouts/post.html');
  },

  posts: function () {
    this.mkdir('_posts');
    this.directory('_posts', '_posts');
  },

  gitfiles: function () {
    this.copy('gitignore', '.gitignore');
  },

  package: function () {
    this.template('_package.json', 'package.json');
  },

  metalsmith: function () {
    this.template('_metalsmith.json', 'metalsmith.json');
  },

  makefile: function () {
    this.copy('Makefile', 'Makefile');
  },

  readme: function () {
    this.copy('README.md', 'README.md');
  },

});

module.exports = MetalsmithGenerator;
