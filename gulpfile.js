var gulp = require('gulp');
var gutil = require('gulp-util');
var webpack = require('webpack');
var webpackConfig = require('./webpack.config.js');
var path = require('path');
var mocha = require('gulp-mocha');
var tsc = require('gulp-typescript');

gulp.task('build-dev', ['webpack:build-dev'], function () {
    gulp.watch(['src/**/*'], ['webpack:build-dev']);
});

gulp.task('webpack:build-dev', function (callback) {
    var myDevConfig = Object.create(webpackConfig);
    myDevConfig.devtool = 'source-map';
    // create a single instance of the compiler to allow caching
    var devCompiler = webpack(myDevConfig);
    // run webpack
    devCompiler.run(function (err, stats) {
        if (err) throw new gutil.PluginError('webpack:build-dev', err);
        gutil.log('[webpack:build-dev]', stats.toString({
            colors: true
        }));
        callback();
    });
});

var tsTestProject = tsc.createProject({
  removeComments : false,
  noImplicitAny : false,
  target : "ES5",
  module : "commonjs",
  declarationFiles : false
});

gulp.task("build-test", function() {
  return gulp.src(__dirname + "/test/*.test.ts")
             .pipe(tsc(tsTestProject))
             .js.pipe(gulp.dest(__dirname + "/dist/test/"));
});

gulp.task('test', ['build-test'], function(){
    return gulp.src('dist/test/*.js', {read: false})
        // gulp-mocha needs filepaths so you can't have any plugins before it
        .pipe(mocha({reporter: 'spec'}));
});