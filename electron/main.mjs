import {
  app,
  BrowserWindow,
  ipcMain,
  Menu,
  Tray,
  nativeImage,
  screen,
} from "electron";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.join(__dirname, "..", "desktop-dist");
const ICON = path.join(__dirname, "..", "build", "icon.png");

/** @type {BrowserWindow | null} */
let widget = null;
/** @type {BrowserWindow | null} */
let settings = null;
/** @type {Tray | null} */
let tray = null;

function page(hash) {
  return path.join(DIST, "desktop.html");
}

function load(win, hash) {
  win.loadFile(page(hash), { hash });
}

function widgetSize(shape = "ring", size = 236) {
  const padX = 48;
  const padY = 92;
  if (shape === "pill") {
    return {
      width: Math.round(size * 1.28) + padX,
      height: Math.max(Math.round(size * 0.4), 72) + padY,
    };
  }
  if (shape === "card") {
    return {
      width: Math.round(size * 1.12) + padX,
      height: Math.round(size * 0.78) + padY,
    };
  }
  if (shape === "minimal") {
    return { width: Math.round(size * 1.2) + padX, height: 140 + padY };
  }
  return { width: size + padX, height: size + padY };
}

function createWidget() {
  const { width, height } = widgetSize();
  const display = screen.getPrimaryDisplay().workArea;
  widget = new BrowserWindow({
    width,
    height,
    x: Math.round(display.x + display.width - width - 36),
    y: Math.round(display.y + 72),
    transparent: true,
    frame: false,
    alwaysOnTop: true,
    hasShadow: false,
    resizable: false,
    fullscreenable: false,
    skipTaskbar: process.platform === "darwin",
    backgroundColor: "#00000000",
    icon: ICON,
    webPreferences: {
      preload: path.join(__dirname, "preload.cjs"),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
    },
  });
  if (process.platform === "darwin") {
    widget.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true });
  }
  load(widget, "widget");
  widget.on("closed", () => {
    widget = null;
  });
}

function createSettings() {
  if (settings && !settings.isDestroyed()) {
    settings.show();
    settings.focus();
    return;
  }
  settings = new BrowserWindow({
    width: 420,
    height: 680,
    minWidth: 360,
    minHeight: 520,
    title: "Halo",
    backgroundColor: "#07110f",
    frame: false,
    icon: ICON,
    webPreferences: {
      preload: path.join(__dirname, "preload.cjs"),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
    },
  });
  load(settings, "settings");
  settings.on("closed", () => {
    settings = null;
  });
}

function createTray() {
  const image = nativeImage.createFromPath(ICON);
  tray = new Tray(
    image.isEmpty() ? nativeImage.createEmpty() : image.resize({ width: 18, height: 18 }),
  );
  tray.setToolTip("Halo");
  tray.setContextMenu(
    Menu.buildFromTemplate([
      { label: "Halo", enabled: false },
      { type: "separator" },
      { label: "设置", click: () => createSettings() },
      {
        label: "显示计时器",
        click: () => {
          if (!widget) createWidget();
          else widget.show();
        },
      },
      { type: "separator" },
      { label: "退出", click: () => app.quit() },
    ]),
  );
  tray.on("click", () => createSettings());
}

ipcMain.handle("halo:open-settings", () => {
  createSettings();
});
ipcMain.handle("halo:close-settings", () => {
  settings?.hide();
});
ipcMain.handle("halo:always-on-top", (_event, value) => {
  widget?.setAlwaysOnTop(Boolean(value));
});
ipcMain.handle("halo:resize-widget", (_event, info) => {
  if (!widget) return;
  const next = widgetSize(info?.shape, info?.size);
  widget.setSize(next.width, next.height);
});

const gotLock = app.requestSingleInstanceLock();
if (!gotLock) {
  app.quit();
} else {
  app.on("second-instance", () => {
    if (!widget) createWidget();
    else widget.show();
    createSettings();
  });

  app.whenReady().then(() => {
    app.setName("Halo");
    createWidget();
    createSettings();
    createTray();
  });
}

app.on("window-all-closed", () => {
  app.quit();
});
