/* Copyright 2024 dodat */
/*---------------------------------------------------------------------------*
 * Global ambient declare
 *      グローバル宣言
 *---------------------------------------------------------------------------*/

declare global{
	// windowオブジェクトの型拡張
	interface Window{
		browserNo: number;
		AABridge:{
			testSend: (no: number) => Promise<string>;
		};
	}
}
export {};
