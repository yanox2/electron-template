/* Copyright 2024 dodat */
/*---------------------------------------------------------------------------*
 * Preload
 *      プリロードスクリプト
 *---------------------------------------------------------------------------*/
//import { contextBridge, ipcRenderer } from "electron"; # sandbox化によりESM loaderは使えない
const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("AABridge", {
	testSend: (no: number) => ipcRenderer.invoke("testSend", no),
/*
	editTestStep: (no:number, menu:number) => ipcRenderer.invoke("editTestStep", no, menu),
	formItemChanged: (arg: FormItem) => ipcRenderer.send("formItemChanged", arg),
	sendMain: (arg: string) => ipcRenderer.invoke("sendMain", arg),
	onDispMes: (callback:(arg: string) => void) => {
		ipcRenderer.on("dispMes", (_event, arg: string) => callback(arg));
	}
*/
});
