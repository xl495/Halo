const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("haloDesktop", {
  isDesktop: true,
  platform: process.platform,
  openSettings: () => ipcRenderer.invoke("halo:open-settings"),
  closeSettings: () => ipcRenderer.invoke("halo:close-settings"),
  setAlwaysOnTop: (value) => ipcRenderer.invoke("halo:always-on-top", value),
  resizeWidget: (info) => ipcRenderer.invoke("halo:resize-widget", info),
});
