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
const WINDOWS_OPTIONS = {
    dir: "./src",
    out: "./dist/win32",
    platform: "win32",
    arch: "x64",
    electronVersion: "4.0.4",
    //ignore: ["assets", "typings", ".vscode", "dist", "node_modules"],

    icon: "assets/icons/BlackvariantKindle.ico"
};
const LINUX_OPTIONS = {
    dir: "./src-electron",
    out: "./dist/linux",
    platform: "linux",
    arch: "x64",
    electronVersion: "4.0.4"
    //ignore: ["assets", "typings", ".vscode", "dist", "node_modules"],
};

function build(options) {
    return electron(options, (err, appPath) => {
        if (err) {
            util.log(err);
        } else {
            util.log(
                "Built",
                util.colors.cyan(opts.name),
                util.colors.magenta("v" + opts.appVersion)
            );
            util.log("Packaged to: ");
            for (var i = 0; i < appPath.length; i++) {
                util.log("            ", util.colors.cyan(appPath[i]));
            }
        }
    });
}

gulp.task("build:linux", function(done) {
    build(LINUX_OPTIONS);
    return done();
});
