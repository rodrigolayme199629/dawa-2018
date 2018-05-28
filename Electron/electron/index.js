const path = require('path')
const glob = require('glob')

const {app, BrowserWindow, Menu} = require('electron')

var mainWindow = null;

app.on('window-all-closed', function(){
	if(process.plataform != 'darwin')
		app.quit();
});

let template = [{
	label: 'Menu Tecsup',
	submenu: [{
		label: 'Hola DAWA',
		accelerator: 'CmdOrCtrl+Z',
		role: 'undo'
	},{
		type: 'separator'
	},{
		label: 'View',
		submenu: [{
			label: 'Reload',
			accelerator: 'CmdOrCtrl+R',
			vlivk: (item, focusedWindow) => {
				if(focusedWindow){
					if(focusedWindow.id === 1){
						BrowserWindow.getAllWindows().forEach(win =>{
							if (win.id > 1) win.close()
						})
					}
					focusedWindow.reload()
				}
			}
		},{
			label: 'Toggle Full Screen',
			accelerator: (() =>{
				if (process.platform === 'darwin'){
					return 'Ctrl+Command+F'
				}else{
					return 'F11'
				}
			})(),
			click: (item, focusedWindow) => {
				if (focusedWindow){
					focusedWindow.setFullScreen(!focusedWindow.isFullScreen())
				}
			}
		},{
			type: 'separator'
		},{
			label: 'Toggle Developer Tools',
			accelerator: (() => {
				if (process.platform === 'darwin'){
					return 'Alt+Command+I'
				}else{
					return 'Ctrnl+Shift+I'
				}
			})(),
			click: (item, focusedWindow) => {
				if (focusedWindow){
					focusedWindow.toggleDevTools()
				}
			}
		}]
	}]
}];

app.on('ready', function(){
	const menu = Menu.buildFromTemplate(template)
	Menu.setApplicationMenu(menu)
	mainWindow = new BrowserWindow({
		width: 800,
		height: 600
	});

	mainWindow.loadURL(`file://${__dirname}/index.html`);

	mainWindow.openDevTools();

	mainWindow.on(`closed`, function(){
		mainWindow = null;
	});
});