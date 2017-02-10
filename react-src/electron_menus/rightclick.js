import {remote} from "electron";
const {Menu, MenuItem} = remote;

const contextMenuTpl = [
    {
        id:'copy',
        label: 'Copy',
        role: 'copy'
    }
];

const menu = Menu.buildFromTemplate(contextMenuTpl);

window.addEventListener('contextmenu', (e) => {
    e.preventDefault()
    menu.popup(remote.getCurrentWindow())
}, false);