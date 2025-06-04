/* Copyright 2024 dodat */
/*---------------------------------------------------------------------------*
 * Class - Example
 *      製品クラス
 *---------------------------------------------------------------------------*/
import type { Coord, Settings } from "./types/types.mjs";
import Exception from "./cmn/Exception.mjs";
import AppBase from "./cmn/AppBase.mjs";
import type BaseWindow from "./cmn/BaseWindow.mjs";
import ExWindow from "./ExWindow.mjs";

class ExApp extends AppBase{

/*---------------------------------------------------------------------------*
 * implements abstract AppBase
 *---------------------------------------------------------------------------*/
	protected async myInit(){
		Exception.setLevel(1);
		const win: BaseWindow = new ExWindow();
		await win.init("main.html", "ipc/preload.cjs", this);
		//await win.init("main.html", undefined, this);
		//await win.init("main.html");
	}

	protected initSettings(): Settings{
		const coord: Coord = {"width":1024, "height":576, "x":50, "y":50};
		return {"mode":1, "mainWinCoord":coord};
	}
}
export default ExApp;
