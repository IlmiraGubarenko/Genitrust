var gulp         = require('gulp'), // Подключаем Gulp
    browserSync  = require('browser-sync'), // Подключаем Browser Sync
    // cssnano      = require('gulp-cssnano'), // Подключаем пакет для минификации CSS
    // rename       = require('gulp-rename'), // Подключаем библиотеку для переименования файлов
    cache        = require('gulp-cache'), // Подключаем библиотеку кеширования
    sass         = require('gulp-sass');

gulp.task('sass', function () {
    gulp.src('app/static/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('app/static/css'))
}) ;

// gulp.task('css', function() {
//     return gulp.src('app 4/static/css/*.css') // Выбираем файл для минификации
//         .pipe(cssnano()) // Сжимаем
//         .pipe(rename({suffix: '.min'})) // Добавляем суффикс .min
//         .pipe(gulp.dest('app 4/static/css')); // Выгружаем в папку app/css
// });

gulp.task('browser-sync', function() { // Создаем таск browser-sync
    browserSync({ // Выполняем browserSync
        server: { // Определяем параметры сервера
            baseDir: 'app' // Директория для сервера - app
        },
        notify: false // Отключаем уведомления
    });
});

gulp.task('watch', ['browser-sync', 'sass'], function() {
    gulp.watch('app/static/scss/**/*.scss', ['sass']);
    // gulp.watch('app 4/static/css/*.css', ['css']);
    gulp.watch('app/*.html', browserSync.reload);
    gulp.watch('app/static/scss/**/*.scss', browserSync.reload);
    gulp.watch('app/static/css/*.css', browserSync.reload);
});

gulp.task('clear', function () {
    return cache.clearAll();
});

gulp.task('default', ['watch']);