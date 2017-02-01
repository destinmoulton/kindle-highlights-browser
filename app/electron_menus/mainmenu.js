import { Menu } from "electron";

export default function BuildMainMenu (app, win){
    var menuTemplate = [{
        label: "File",
        submenu: [
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
    Menu.setApplicationMenu(Menu.buildFromTemplate(menuTemplate));
}