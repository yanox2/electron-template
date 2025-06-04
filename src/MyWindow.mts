/* Copyright 2025 dodat */
/*---------------------------------------------------------------------------*
 * Class - ExWindow
 *      メインウィンドウ
 *---------------------------------------------------------------------------*/
import { ipcMain } from "electron";
import Exception from "./cmn/Exception.mjs";
import BaseWindow from "./cmn/BaseWindow.mjs";

class MyWindow extends BaseWindow{

/*---------------------------------------------------------------------------*
 * implements abstract BaseWindow
 *---------------------------------------------------------------------------*/
	protected async myInit(){
		this.win?.webContents.openDevTools();
	}

/*---------------------------------------------------------------------------*
 * override BaseWindow UIhandler
 *---------------------------------------------------------------------------*/
	protected UIhandler(){
		super.UIhandler();
	}

/*---------------------------------------------------------------------------*
 * override BaseWindow myMenu
 *---------------------------------------------------------------------------*/
	protected myMenu(){
		super.myMenu();
	}
}
export default MyWindow;
