import { remote } from "electron";
const dialog = remote.dialog;

export function errorDialog(message, callback) {
    const options = {
        type: "error",
        buttons: ["OK"],
        title: "Houston, we have a problem!",
        message
    };
    callback = callback || function() {};
    dialog.showMessageBox(options, callback);
}
