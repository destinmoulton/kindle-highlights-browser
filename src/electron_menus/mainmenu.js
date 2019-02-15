const { Menu } = require("electron");

const OpenFile = {
    label: "Open My Clippings",
    accelerator: "CommandOrControl+O",
    click: (menuItem, currentWindow) => {
        currentWindow.webContents.send("open-my-clippings");
    }
};

const CloseFile = {
    label: "Close File",
    accelerator: "CommandOrControl+W",
    click: (menuItem, currentWindow) => {
        currentWindow.webContents.send("close-my-clippings");
    }
};

function BuildMainMenu(app, win) {
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
                    role: "close",
                    accelerator: "CmdOrCtrl+q"
                }
            ]
        });
    }

    Menu.setApplicationMenu(Menu.buildFromTemplate(menuTemplate));
}

module.exports = BuildMainMenu;
