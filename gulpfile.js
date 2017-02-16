/*eslint-env node */

// establishes gulp dependencies
var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var eslint = require('gulp-eslint');
var uglify = require('gulp-uglify');
var babel = require('gulp-babel');
var htmlmin = require('gulp-htmlmin');
var cleanCSS = require('gulp-clean-css');
var vulcanize = require('gulp-vulcanize');
var minifyInline = require('gulp-minify-inline');

// defines gulp tasks on default command
gulp.task('serve', ['styles', 'lint'], function() {
	gulp.watch('components/sass/**/*.scss', ['styles']);
	gulp.watch('components/js/**/*.js', ['lint']);
	gulp.watch('index.html').on('change', browserSync.reload);
	gulp.watch('components/sass/*.scss').on('change', browserSync.reload);
	gulp.watch('components/*.html').on('change', browserSync.reload);
	gulp.watch('components/js/*.js').on('change', browserSync.reload);
});

//publishes content, calls tasks that copy content over
gulp.task('build', [
	'copy-html',
	'copy-json',
	'copy-sw',
	'copy-images',
	'styles',
	'lint'
]);

// copies ALL html over from root to the public folder. This can be used for json / template files
// USE THIS to setup these two tasks in the future when json files are in the right place
gulp.task('copy-html', function() {
	gulp.src('index.html')
		.pipe(vulcanize({
	      stripComments: true,
	      inlineScripts: true,
	      inlineCss: true
	    }))
		.pipe(htmlmin({collapseWhitespace: true}))
		.pipe(gulp.dest('./dist'));	
});
// copies ALL html over from root to the public folder. This can be used for json / template files
// USE THIS to setup these two tasks in the future when json files are in the right place
gulp.task('copy-sw', function() {
	gulp.src('service-worker.js')
		.pipe(gulp.dest('./dist'));	
});

gulp.task('copy-json', function() {
	gulp.src('manifest.json')
		.pipe(gulp.dest('./dist'));	
});

// copies images over to the public folder
gulp.task('copy-images', function() {
	gulp.src('components/img/**')
		.pipe(gulp.dest('./dist/components/img/'));
});


// copies css over to the public folder, after converting from scss
gulp.task('styles', function() {
	gulp.src('sass/**/*.scss')
		.pipe(sass({
			outputStyle: 'compressed'
		}).on('error', sass.logError))
		.pipe(autoprefixer({
			browsers: ['last 2 versions']
		}))
		.pipe(gulp.dest('./dist/css'))
		.pipe(browserSync.stream());
});

// does not allow publishing of scripts that are synxtically incorrect
gulp.task('lint', function () {
	return gulp.src(['js/**/*.js'])
		// eslint() attaches the lint output to the eslint property
		// of the file object so it can be used by other modules.
		.pipe(eslint())
		// eslint.format() outputs the lint results to the console.
		// Alternatively use eslint.formatEach() (see Docs).
		.pipe(eslint.format())
		// To have the process exit with an error code (1) on
		// lint error, return the stream and pipe to failOnError last.
		.pipe(eslint.failOnError());
});

// use browser-sync start --server --index index.html --files="public/*.css"
 browserSync.init({
     server: "./dist"
 });
 browserSync.stream();
