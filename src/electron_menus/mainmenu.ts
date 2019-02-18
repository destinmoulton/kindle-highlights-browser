import * as Electr from "electron";

const OpenFile = {
    label: "Open My Clippings",
    accelerator: "CommandOrControl+O",
    click: (
        menuItem: Electron.MenuItem,
        currentWindow: Electron.BrowserWindow
    ) => {
        currentWindow.webContents.send("open-my-clippings");
    }
};

const CloseFile = {
    label: "Close File",
    accelerator: "CommandOrControl+W",
    click: (
        menuItem: Electron.MenuItem,
        currentWindow: Electron.BrowserWindow
    ) => {
        currentWindow.webContents.send("close-my-clippings");
    }
};

function BuildMainMenu(app: Electron.App, win: Electron.BrowserWindow) {
    var menuTemplate = [
        {
            label: "File",
            submenu: [
                OpenFile,
                CloseFile,
                {
                    label: "Exit",
                    role: "close",
                    accelerator: "CmdOrCtrl+q"
                }
            ]
        },
        {
            label: "Edit",
            submenu: [
                {
                    label: "Copy",
                    role: "copy"
                }
            ]
        },

        {
            label: "Help",
            submenu: [
                {
                    label: "Dev",
                    submenu: [
                        {
                            label: "Reload",
                            role: "reload"
                        },
                        {
                            role: "toggledevtools",
                            label: "Developer Tools",
                            accelerator: "F12"
                        }
                    ]
                }
            ]
        }
    ];

    if (process.platform === "darwin") {
        //Remove the file menu
        menuTemplate.shift();

        //Add a Mac "File" menu
        menuTemplate.unshift({
            label: "Kindle Highlights Browser",
            submenu: [
                OpenFile,
                {
                    label: "Close",
                    role: "close",
                    accelerator: "CmdOrCtrl+q"
                }
            ]
        });
    }

    Electron.Menu.setApplicationMenu(
        Electron.Menu.buildFromTemplate(menuTemplate)
    );
}

module.exports = BuildMainMenu;
