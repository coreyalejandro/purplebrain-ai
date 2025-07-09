// PurpleBrain - Your Purple Rain Desktop Environment
// Where neurodivergent brilliance meets Prince's artistic vision

const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const ResearchAgent = require('./agents/research/ResearchAgent');
const FactCheckAgent = require('./agents/factcheck/FactCheckAgent');
const WritingAgent = require('./agents/writing/WritingAgent');
const VisionaryAgent = require('./agents/visionary/VisionaryAgent');

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
  const researchAgent = new ResearchAgent();
  const result = await researchAgent.conductResearch(query);
  return result;
});

ipcMain.handle('agent-factcheck', async (event, content) => {
  const factCheckAgent = new FactCheckAgent();
  const result = await factCheckAgent.factCheck(content);
  return result;
});

ipcMain.handle('agent-write', async (event, data) => {
  const writingAgent = new WritingAgent();
  const result = await writingAgent.generateText(data.prompt, data.options);
  return result;
});

ipcMain.handle('agent-visualize', async (event, data) => {
  const visionaryAgent = new VisionaryAgent();
  const result = await visionaryAgent.createVision(data.prompt, data.options);
  return result;
});

console.log('🎵 PurpleBrain Desktop Environment Loading...');
console.log('💜 Honoring Prince - The Purple One');
console.log('🧠 Celebrating Neurodivergent Brilliance');
console.log('🎭 Where AI Agents Dance Like Purple Rain');