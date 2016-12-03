/**
 * Created by kidroca on 3.12.2016 г..
 */
"use strict";

const gulp = require("gulp");
const bowerFiles = require("main-bower-files");
const inject = require("gulp-inject");
const es = require("event-stream");
const path = require("path");

const sourceOptions = {
    read: false,
    cwd: path.join(__dirname, "/source")
};

gulp.task("inject-resources", () => {

    gulp.src(["source/views/layout/scripts.pug", "source/views/layout/styles.pug"])

        .pipe(inject(
            gulp.src(bowerFiles(), sourceOptions), { name: "bower" }
        ))

        .pipe(inject(es.merge(
            gulp.src("public/css/**/*", sourceOptions),
            gulp.src("public/js/**/*", sourceOptions)
        )))

        .pipe(gulp.dest("./source/views/layout/"));
});
