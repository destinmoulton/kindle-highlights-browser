const { Menu } = require("electron");

function BuildMainMenu (app, win){
    var menuTemplate = [{
        label: "File",
        submenu: [
            {
                label: "Open My Clippings",
                click: (menuItem, currentWindow) => {
                    currentWindow.webContents.send('open-my-clippings');
                }
            },
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
                role: "copy",
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
                        role: 'reload'

                    },
                    {
                        role: 'toggledevtools',
                        label: "Developer Tools",
                        accelerator: "F12"
                    }
                ]
            },
            
        ]
    }];

    if (process.platform === 'darwin') {
        //Remove the file menu
        menuTemplate.shift();

        //Add a Mac worthy menu
        menuTemplate.unshift({
            label:"Kindle Highlights Browser",
            submenu: [
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