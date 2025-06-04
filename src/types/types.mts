/* Copyright 2024 dodat */
/*---------------------------------------------------------------------------*
 * types
 *      共通型定義
 *---------------------------------------------------------------------------*/

// 座標情報
export interface Coord{
	width: number;
	height: number;
	x: number;
	y: number;
}

// 設定ファイル
export interface Settings{
	mode: number;
	mainWinCoord: Coord;
}

// リスナー
export interface CloseListener{
	onClose(coord: Coord): Promise<void>;
	onClosed(): Promise<void>;
}
export interface OpenListener{
	onOpen(): Promise<void>;
	onOpened(): Promise<void>;
}
