/* Copyright 2025 dodat */
/*---------------------------------------------------------------------------*
 * Renderer
 *      メインウィンドウ UIイベント
 *---------------------------------------------------------------------------*/

window.addEventListener("load", function(){
	let btnEle = document.getElementById("testSend");
	if(btnEle){
		btnEle.addEventListener("click", function(){
			window.MyBridge.testSend(10).then((msg) => {
				console.log(msg);
			});
		});
	}
});
