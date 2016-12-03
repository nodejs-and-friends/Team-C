/**
 * Created by kidroca on 3.12.2016 г..
 */
"use strict";

const gulp = require("gulp");
const bowerFiles = require("main-bower-files");
const inject = require("gulp-inject");
const es = require("event-stream");

gulp.task("inject-resources", () => {

    gulp.src(["source/views/layout/scripts.pug", "source/views/layout/styles.pug"])

        .pipe(inject(
            gulp.src(bowerFiles(), { read: false }), { name: "bower" }
        ))

        .pipe(inject(es.merge(
            gulp.src("source/public/css/**/*", { read: false }),
            gulp.src("source/public/js/**/*", { read: false })
        )))

        .pipe(gulp.dest("./source/views/layout/"));
});
