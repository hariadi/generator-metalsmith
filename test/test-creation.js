/*global describe, beforeEach, it */
'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;

describe('metalsmith generator', function () {

  before(function (done) {
    helpers.run(path.join(__dirname, '../app'))
      .inDir(path.join(__dirname, './temp'))
      .withOptions({
        'skip-install-message': true,
        'skip-install': true,
        'skip-welcome-message': true,
        'skip-message': true
      })
      .withPrompt({
        msTitle: 'Metalsmith Blog',
        msDesc: 'My Metalsmith-Powered Site',
        msAuthor: 'Metal Smith',
        msGithubUser: 'metalsmith',
        msPlugins: [
          'metalsmith-ignore',
          'metalsmith-drafts',
          'metalsmith-templates',
          'metalsmith-markdown',
          'metalsmith-permalinks',
          'metalsmith-collections'
        ],
        templateEngine: 'swig',
        permalinksPattern: ':title',
      })
      .on('end', done);
  });

  it('creates files', function () {
    assert.file([
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
    ]);
  });

});
