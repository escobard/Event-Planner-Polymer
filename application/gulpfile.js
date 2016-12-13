/*eslint-env node */

// establishes gulp dependenciesf
var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var eslint = require('gulp-eslint');

// defines gulp tasks on default command
gulp.task('default', ['copy-html', 'copy-images', 'styles', 'lint', 'scripts'], function() {
	gulp.watch('components/sass/**/*.scss', ['styles']);
	gulp.watch('components/js/**/*.js', ['lint']);
	gulp.watch('/index.html', ['copy-html']);
	gulp.watch('index.html').on('change', browserSync.reload);
	gulp.watch('components/sass/*.scss').on('change', browserSync.reload);
	gulp.watch('components/*.html').on('change', browserSync.reload);
	gulp.watch('components/js/*.js').on('change', browserSync.reload);
});

//publishes content, calls tasks that copy content over
gulp.task('public', [
	'copy-html',
	'copy-html-components',
	'copy-images',
	'styles',
	'lint',
	'copy-scripts',
	'copy-json'
]);

// copy js files over to public folder, into a single file
// this can be re-used for CSS compilation
gulp.task('scripts', function() {
  gulp.src('./components/js/*.js')
    .pipe(concat('all.js'))
    .pipe(gulp.dest('./public/components/js/'));
});

// copies scripts + concats
gulp.task('copy-scripts', function() {
	gulp.src('./components/js/main.js')
		.pipe(concat('main.js'))
		.pipe(gulp.dest('./public/components/js'));
});

// copies over json files
gulp.task('copy-json', function() {
	gulp.src('./components/json/*.json')
		.pipe(gulp.dest('./public/components/json'));
});

// copies ALL html over from root to the public folder. This can be used for json / template files
// USE THIS to setup these two tasks in the future when json files are in the right palce
gulp.task('copy-html', function() {
	gulp.src('./*.html')
		.pipe(gulp.dest('./public'));
});

// copies ALL html over from components to the public folder. This can be used for json / template files
gulp.task('copy-html-components', function() {
	gulp.src('./components/*.html')
		.pipe(gulp.dest('./public/components'));
});


// copies images over to the public folder
gulp.task('copy-images', function() {
	gulp.src('img/*')
		.pipe(gulp.dest('public/components/img/*'));
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
		.pipe(gulp.dest('public/css'))
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
     server: "./"
 });
 browserSync.stream();
