const electron = require("electron")
const menuTemplate = require("./menu")

const { Menu } = electron

const {app, BrowserWindow} = require('electron');

app.setName("Android Messages")

//const BrowserWindow = electron.BrowserWindow

let mainWindow

// Insert ContextMenu

require('electron-context-menu')({
	prepend: (params, mainWindow) => [{
		visible: params.mediaType === 'image'
	}]
});

app.setAboutPanelOptions({
    "copyright": "All copyright goes to Google LLC."
})

app.on('ready', createWindow);

function createWindow(){
    mainWindow = new BrowserWindow({
        height: 848,
        width: 1145
    })

    const menuContents = Menu.buildFromTemplate(menuTemplate(mainWindow))
    Menu.setApplicationMenu(menuContents)

    mainWindow.loadURL(`file://${__dirname}/index.html`)

    mainWindow.on('closed', () => {
        mainWindow = null
    })

}

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow()
    }
});
