const { src, dest, task, series, watch, parallel } = require("gulp");

const rm = require('gulp-rm');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const sassGlob = require('gulp-sass-glob');
const autoprefixer = require('gulp-autoprefixer');
const gcmq = require('gulp-group-css-media-queries');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const svgo = require('gulp-svgo');
const svgSprite = require('gulp-svg-sprite');
const gulpif = require('gulp-if');
const env = process.env.NODE_ENV;
 
sass.compiler = require('node-sass');
 
task('clean', () => {
	return src('dist/**/*', { read: false })
		.pipe(rm())
})
 
task('copy:html', () => {
	return src('src/*.html')
		.pipe(dest('dist'))
		.pipe(reload({ stream: true }));
})

task('copy:img', () => {
	return src('src/images/**/*')
		.pipe(dest('dist/images'))
		.pipe(reload({ stream: true }));
	})

const styles = [
	'node_modules/normalize.css/normalize.css',
	'src/styles/main.scss'
];
 
task('styles', () => {
	return src(styles)
		.pipe(gulpif(env === 'dev', sourcemaps.init()))
		.pipe(concat('main.min.scss'))
		.pipe(sassGlob())
		.pipe(sass().on('error', sass.logError))
		.pipe(gulpif(env === 'prod', autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		})))
		.pipe(gulpif(env === 'prod', gcmq()))
		.pipe(gulpif(env === 'prod', cleanCSS()))
		.pipe(gulpif(env === 'dev', sourcemaps.write()))
		.pipe(dest('dist'))
		.pipe(reload({ stream: true }));
});
 
const libs = [
	'node_modules/jquery/dist/jquery.js',
	'node_modules/slick-carousel/slick/slick.js',
	'node_modules/jquery-touchswipe/jquery.touchSwipe.js',
	'src/scripts/*.js'
];

task('scripts', () => {
	return src(libs)
		.pipe(gulpif(env === 'dev', sourcemaps.init()))
		.pipe(concat('main.min.js', {newLine: ';'}))
		.pipe(gulpif(env === 'prod', babel({
			presets: ['@babel/env']
		})))
		.pipe(gulpif(env === 'prod', uglify()))
		.pipe(gulpif(env === 'dev', sourcemaps.write()))
		.pipe(dest('dist'))
		.pipe(reload({ stream: true }));
});

task('icons', () => {
	return src('src/images/icons/toSprite/*.svg')
		.pipe(svgo({
			plugins: [
				{
					removeAttrs: {
						attrs: '(fill|stroke|style|width|height|data.*)'
					}
				}
			]
		}))
		.pipe(svgSprite({
			mode: {
				symbol: {
					sprite: '../sprite.svg'
				}
			}
		}))
		.pipe(dest('dist/images'));
});
 
task('server', () => {
	browserSync.init({
		server: {
			baseDir: "./dist"
		},
		open: false
	});
});
 
task('watch', () => {
	watch('./src/styles/**/*.scss', series('styles'));
	watch('./src/*.html', series('copy:html'));
	watch('./src/scripts/*.js', series('scripts'));
	watch('./src/images/icons/*.svg', series('icons'));
});
 
task('default',
	series(
		'clean',
		parallel('copy:html', 'copy:img', 'styles', 'scripts', 'icons'),
		parallel('watch', 'server')
	)
);

task('build',
	series(
		'clean',
		parallel('copy:html', 'copy:img', 'styles', 'scripts', 'icons'))
);