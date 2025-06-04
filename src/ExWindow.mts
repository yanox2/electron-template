/* Copyright 2024 dodat */
/*---------------------------------------------------------------------------*
 * Class - ExWindow
 *      メインウィンドウ
 *---------------------------------------------------------------------------*/
import BaseWindow from "./cmn/BaseWindow.mjs";

class ExWindow extends BaseWindow{

/*---------------------------------------------------------------------------*
 * implements abstract BaseWindow
 *---------------------------------------------------------------------------*/
	protected async myInit(){
		this.win?.webContents.openDevTools();
	}
}
export default ExWindow;
