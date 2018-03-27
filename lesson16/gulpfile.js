/* BASE */
var gulp = require("gulp");
var watch = require("gulp-watch");

/* HTML */
var htmlmin = require("gulp-htmlmin");

/* CSS */
var sass = require("gulp-sass");

/* Plugin for JS*/
var concat = require("gulp-concat");
var minify = require("gulp-minify");

/* Plugin for webserver*/
var browserSync = require("browser-sync");
var reload = browserSync.reload;

/* Plugin for Images */
var imagemin = require("gulp-imagemin");
var pngquant = require("imagemin-pngquant");
/* HELPERS*/
var newer = require("gulp-newer"); /*  Plugin look for new changes in files */
var clean = require("gulp-clean"); /* Plugin delete some folder, content */

/*const sass = require("gulp-sass");*/
const autoprefixer = require("gulp-autoprefixer");
const sourcemaps = require("gulp-sourcemaps");
const notify = require("gulp-notify");
// Task for HTML
gulp.task("html", () => {
  return gulp
    .src("./index.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("./build"))
    .pipe(reload({ stream: true }));
});
/*Task for CSS*/
gulp.task("css", () => {
  gulp
    .src("./src/styles/main.scss")
    .pipe(sourcemaps.init())
    .pipe(
      sass({ outputStyle: "compressed" }).on("error", function(err) {
        return notify().write(err);
      })
    )
    .pipe(
      autoprefixer({
        browsers: ["last 2 versions"],
        cascade: false
      })
    )
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("./build/css"))
    .pipe(reload({ stream: true }));
});
// Task for CSS
/*gulp.task("css", () => {
  return gulp
    .src("./src/css/main.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("./build/css"))
    .pipe(reload({ stream: true }));
});*/

/*Task for JS*/
gulp.task("js", () => {
  gulp
    .src([
      "./node_modules/jquery/dist/jquery.js",
      "./node_modules/slick-carousel/slick/slick.js",
      "./src/js/main.js"
    ])
    .pipe(concat("main.js"))
    .pipe(minify({ ext: { min: ".js" }, compress: true, noSource: true }))
    .pipe(gulp.dest("./build/js"))
    .pipe(reload({ stream: true }));
});

/*Task for Images*/
gulp.task("image", () => {
  gulp
    .src("./src/img/**/*.*")
    .pipe(newer("./build/img/"))
    .pipe(
      imagemin({
        progressive: true,
        svgoPlugins: [{ removeViewBox: false }],
        use: [pngquant()],
        interlaced: true
      })
    )
    .pipe(gulp.dest("./build/img/"))
    .pipe(reload({ stream: true }));
});

/*Task for webserver*/
const config = {
  server: {
    baseDir: "./build"
  },
  tunnel: false,
  host: "localhost",
  port: 9000,
  logPrefix: "marinaserver"
};
gulp.task("webserver", () => browserSync(config));

/* Plugin for SASS*/
/*const sass = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");
const sourcemaps = require("gulp-sourcemaps");
const notify = require("gulp-notify");
*/
/* Task Build */
gulp.task("build", ["html", "css", "js", "image"]);

/* Task Watch */
gulp.task("watch", () => {
  watch("./src/*.html", () => gulp.run("html"));
  watch("./src/css/**/*.scss", () => gulp.run("css"));
  watch("./src/js/**/*.js", () => gulp.run("js"));
  watch("./src/img/**/*.*", () => gulp.run("image"));
});

/* default task */
gulp.task("default", ["build", "webserver", "watch"]);

/* Task Clean (delete folder [build/]) */
gulp.task("clean", () => {
  gulp.src("build", { read: false }).pipe(clean());
});
