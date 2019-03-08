const path = require("path");

const gulp = require("gulp");
const util = require("gulp-util");
const rimraf = require("rimraf");
const zip = require("gulp-zip");
const electron = require("electron-packager");
const packageJson = require("./package.json");

const DIST_PATH = "./dist/";
const DISTS = ["osx", "win32", "linux"];

// electron packager api docs
// https://github.com/electron-userland/electron-packager/blob/master/docs/api.md

const COMMON_BUILD_OPTIONS = {
    dir: "./src/electron",
    electronVersion: "4.0.4",
    overwrite: true,
    appname: "Kindle Highlights Browser"
};

const BUILDS = [
    {
        ...COMMON_BUILD_OPTIONS,
        out: path.join(DIST_PATH, "win32"),
        platform: "win32",
        arch: "x64",
        icon: "assets/icons/BlackvariantKindle.ico",
        KHB: {
            buildDir: "Kindle Highlights Browser-win32-x64",
            zipFile: "KindleHighlightsBrowser_Windows_x64.zip"
        }
    },
    {
        ...COMMON_BUILD_OPTIONS,
        out: path.join(DIST_PATH, "linux"),
        platform: "linux",
        arch: "x64",
        KHB: {
            buildDir: "Kindle Highlights Browser-linux-x64",
            zipFile: "KindleHighlightsBrowser_Linux_x64.zip"
        }
    },
    {
        ...COMMON_BUILD_OPTIONS,
        out: path.join(DIST_PATH, "darwin"),
        platform: "darwin",
        arch: "x64",
        icon: "assets/icons/BlackvariantKindle.icns",
        KHB: {
            buildDir: "Kindle Highlights Browser-darwin-x64",
            zipFile: "KindleHighlightsBrowser_MacOSX.zip"
        }
    }
];

async function buildPackage(options) {
    return electron(options);
}

let zipTasks = [];
let rmTasks = [];
let packTasks = [];
BUILDS.forEach(build => {
    const packTaskName = "package:" + build.platform + ":" + build.arch;
    gulp.task(packTaskName, async done => {
        util.log(
            util.colors.cyan("Building electron distribution for:"),
            util.colors.magenta(build.platform),
            util.colors.magenta(build.arch)
        );
        await buildPackage(build);
        return done();
    });
    packTasks.push(packTaskName);

    const zipTaskName = "zip:" + build.platform + ":" + build.arch;
    // Create the zip tasks
    gulp.task(zipTaskName, () => {
        const glob = build.out + path.sep + "**/*";
        util.log(
            util.colors.cyan("Zipping:"),
            "'" + util.colors.green(build.out) + "'",
            "to",
            "'" + util.colors.blue(build.KHB.zipFile + "'")
        );
        return gulp
            .src(glob)
            .pipe(zip(build.KHB.zipFile))
            .pipe(gulp.dest(DIST_PATH));
    });
    zipTasks.push(zipTaskName);

    // Create the rm tasks
    const rmTaskName = "rm:" + build.platform + ":" + build.arch;
    gulp.task(rmTaskName, done => {
        util.log(util.colors.red("Removing:"), build.out);
        return rimraf(build.out, done);
    });
    rmTasks.push(rmTaskName);
});

gulp.task("package:all", gulp.series(...packTasks));
gulp.task("zip:all", gulp.series(...zipTasks));
gulp.task("rm:all", gulp.series(...rmTasks));
gulp.task("build", gulp.series("package:all", "zip:all", "rm:all"));
