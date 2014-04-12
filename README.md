# generator-metalsmith [![Build Status](https://travis-ci.org/hariadi/generator-metalsmith.svg)](https://travis-ci.org/hariadi/generator-metalsmith)

> [Yeoman](http://yeoman.io) generator for [Metalsmith](http://metalsmith.io)


## Getting Started

To install generator-metalsmith from npm, run:

```
$ npm install -g generator-metalsmith
```

## Usage

```
$ yo metalsmith
```

## Option

* `-s` alias `--skip-install`

  Skips the automatic execution of `bower` and `npm` after scaffolding has finished.

* `-w` alias `--skip-welcome-message`

  Skips app welcome message.

## Metalsmith Boilerplate

The following directory structure is generated after running `yo metalsmith`:

    .
    ├── .gitignore
    ├── Makefile
    ├── metalsmith.json
    ├── package.json
    ├── README.md
    ├── _layouts
    │   ├── defaul.html
    │   └── post.html
    ├── _posts
    │   ├── 2012-08-20-first-post.md
    │   ├── 2012-09-28-second-post.md
    │   ├── 2012-09-28-third-post.md
    │   └── 2012-12-07-fourth-post.md
    └── _site


## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)

