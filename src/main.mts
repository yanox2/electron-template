/* Copyright 2024 dodat */
/*---------------------------------------------------------------------------*
 * Main
 *      メイン
 *---------------------------------------------------------------------------*/
import { app, session } from "electron";
import type AppBase from "./cmn/AppBase.mjs";
import ExApp from "./ExApp.mjs";

const main = async () => {
	const appBase: AppBase = new ExApp();
	await appBase.init();
};

app.whenReady().then(async () => {
	session.defaultSession.clearCache();
	await main();
});

app.on("window-all-closed", async () => {
	if(process.platform !== "darwin") app.quit();
});

export {app};
