/*global describe, beforeEach, it */
'use strict';
var path = require('path');
var helpers = require('yeoman-generator').test;

describe('metalsmith generator', function () {
  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) {
        return done(err);
      }

      this.app = helpers.createGenerator('metalsmith:app', [
        '../../app'
      ]);
      done();
    }.bind(this));
  });

  it('creates expected files', function (done) {
    var expected = [
      '_layouts/post.html',
      '_posts/2012-08-20-first-post.md',
      '_posts/2012-08-23-second-post.md',
      '_posts/2012-09-28-third-post.md',
      '_posts/2012-12-07-fourth-post.md',
      '.gitignore',
      'package.json',
      'metalsmith.json',
      'Makefile',
      'README.md'
    ];

    helpers.mockPrompt(this.app, {
      'msTitle': 'Metalsmith Blog',
      'msDesc': 'My Metalsmith-Powered Site',
      'msAuthor': 'Metal Smith',
      'msGithubUser': 'metalsmith',
    });
    this.app.options['skip-install'] = true;
    this.app.run({}, function () {
      helpers.assertFile(expected);
      done();
    });
  });
});
