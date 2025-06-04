/* Copyright 2025 dodat */
/*---------------------------------------------------------------------------*
 * Class - Example
 *      製品クラス
 *---------------------------------------------------------------------------*/
import type { Coord, Settings } from "./types/types.mjs";
import Exception from "./cmn/Exception.mjs";
import AppBase from "./cmn/AppBase.mjs";
import type BaseWindow from "./cmn/BaseWindow.mjs";
import MyWindow from "./MyWindow.mjs";

class MyApp extends AppBase{

/*---------------------------------------------------------------------------*
 * implements abstract AppBase
 *---------------------------------------------------------------------------*/
	protected async myInit(){
		Exception.setLevel(1);
		const win: BaseWindow = new MyWindow();
		await win.init("main.html", "ipc/preload.cjs", this);
		//await win.init("main.html", undefined, this);
		//await win.init("main.html");
	}

	protected initSettings(): Settings{
		const coord: Coord = {"width":1024, "height":576, "x":50, "y":50};
		return {"mode":1, "mainWinCoord":coord};
	}
}
export default MyApp;
