var babelExport = {
	"presets": [
		["@babel/preset-env", {
			"targets": {
				"node": true
			},
			"modules": "umd",
			"loose": true
		}]
	],
	"plugins": []
}

const gulp = require('gulp');
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');

gulp.task('concat-src', function() {
	return gulp.src(['src/for-index-start.js', 'src/EasyAnimation.js'])
	.pipe(concat('index.js', {newLine: ' '}))
	.pipe(babel(babelExport))
/*	.pipe(uglify({
		toplevel: true
	}))*/
	.pipe(gulp.dest('./src/'));
});

gulp.task('concat-min', function() {
	return gulp.src(['src/for-es5-start.js', 'src/EasyAnimation.js', 'src/for-es5-end.js'])
	.pipe(concat('EasyAnimation.js'))
	.pipe(babel())
	.pipe(uglify({
		toplevel: true
	}))
	.pipe(gulp.dest('./dist/javascript/'));
});

gulp.task('default', gulp.parallel('concat-src', 'concat-min'));

gulp.task('watch', function(){
	gulp.watch(['./src/EasyAnimation.js', './src/for-index-end.js', './src/for-es5-start.js', './src/for-es5-end.js'], gulp.series('concat-src', 'concat-min'));
});