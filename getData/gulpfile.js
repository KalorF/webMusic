require('babel-polyfill');
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var babel = require('gulp-babel');
// 压缩 js 文件
// 在命令行使用 gulp script 启动此任务
gulp.task('es6', async function () {
  // 1. 找到文件
  await gulp.src('app.js')
    .pipe(babel({
      presets: ["@babel/preset-env"]
    }))
    // 2. 压缩文件
    .pipe(uglify({
      mangle: false
    }))
    // 3. 另存压缩后的文件
    .pipe(gulp.dest('dist/js'))
})