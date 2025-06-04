/* Copyright 2025 dodat */
/*---------------------------------------------------------------------------*
 * Global ambient declare
 *      グローバル宣言
 *---------------------------------------------------------------------------*/

declare global{
	interface Window{
		MyBridge:{
			testSend: (no: number) => Promise<string>;
		};
	}
}
export {};
