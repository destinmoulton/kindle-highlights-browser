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

const BUILD_OPTIONS = [
    {
        ...COMMON_BUILD_OPTIONS,
        out: "./dist/win32",
        platform: "win32",
        arch: "x64",
        icon: "assets/icons/BlackvariantKindle.ico"
    },
    {
        ...COMMON_BUILD_OPTIONS,
        out: "./dist/linux",
        platform: "linux",
        arch: "x64"
    },
    {
        ...COMMON_BUILD_OPTIONS,
        out: "./dist/darwin",
        platform: "darwin",
        arch: "x64",
        icon: "assets/icons/BlackvariantKindle.icns"
    }
];

async function build(options) {
    util.log(
        "Building electron distribution for ",
        util.colors.magenta(options.platform)
    );
    return electron(options);
}

gulp.task("build", async function(done) {
    for (let opt of BUILD_OPTIONS) {
        await build(opt);
    }
    return done();
});
