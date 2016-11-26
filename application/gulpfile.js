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
	gulp.watch('components/sass/main.scss').on('change', browserSync.reload);
	gulp.watch('components/signup.html').on('change', browserSync.reload);
	gulp.watch('components/main-app.html').on('change', browserSync.reload);
	gulp.watch('components/event-toolbar.html').on('change', browserSync.reload);
	gulp.watch('components/event-planner.html').on('change', browserSync.reload);
	gulp.watch('components/login-components.html').on('change', browserSync.reload);
	gulp.watch('components/event-login.html').on('change', browserSync.reload);	
	gulp.watch('components/event-login-form.html').on('change', browserSync.reload);	
	gulp.watch('components/event-registration-form.html').on('change', browserSync.reload);
	gulp.watch('components/event-planner-editor.html').on('change', browserSync.reload);
});

//publishes content, calls tasks that copy content over
gulp.task('public', [
	'copy-html',
	'copy-images',
	'styles',
	'lint',
	'scripts-public'
]);

// copy js files over to public folder, into a single file
// this can be re-used for CSS compilation
gulp.task('scripts', function() {
  gulp.src('./components/js/*.js')
    .pipe(concat('all.js'))
    .pipe(gulp.dest('./public/components/js/'));
});


gulp.task('scripts-public', function() {
	gulp.src('./components/js/main.js')
		.pipe(concat('main.js'))
		.pipe(gulp.dest('./public/components/js'));
});


// copies ALL html over to the public folder. This can be used for json / template files
// USE THIS to setup these two tasks in the future when json files are in the right palce
gulp.task('copy-html', function() {
	gulp.src('./*.html')
		.pipe(gulp.dest('./public'));
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
