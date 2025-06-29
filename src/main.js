// PurpleBrain - Your Purple Rain Desktop Environment
// Where neurodivergent brilliance meets Prince's artistic vision

const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
  // Create the Purple Rain workspace
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    },
    backgroundColor: '#1A1A1A', // Theatrical black
    show: false // Don't show until ready
  });

  // Load the PurpleBrain interface
  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL('http://localhost:5173');
    // Uncomment for debugging: mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile('public/index.html');
  }

  // Theatrical entrance - fade in like Prince on stage
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  // Handle window closed
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// App event handlers
app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// IPC handlers for agent communication
ipcMain.handle('agent-research', async (event, query) => {
  // Research Agent will be implemented here
  return { status: 'Agent system initializing...' };
});

ipcMain.handle('agent-factcheck', async (event, content) => {
  // Fact-checking Agent will be implemented here
  return { status: 'Fact-checking system ready...' };
});

ipcMain.handle('agent-write', async (event, data) => {
  // Writing Agent (code-switcher) will be implemented here
  return { status: 'Writing agent standing by...' };
});

ipcMain.handle('agent-visualize', async (event, data) => {
  // Visionary Agent (artistic visualization) will be implemented here
  return { status: 'Visionary agent awakening...' };
});

console.log('🎵 PurpleBrain Desktop Environment Loading...');
console.log('💜 Honoring Prince - The Purple One');
console.log('🧠 Celebrating Neurodivergent Brilliance');
console.log('🎭 Where AI Agents Dance Like Purple Rain');