/* Copyright 2025 dodat */
/*---------------------------------------------------------------------------*
 * Preload
 *      プリロードスクリプト
 *---------------------------------------------------------------------------*/
const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("MyBridge", {
	testSend: (no: number) => ipcRenderer.invoke("testSend", no),
});
