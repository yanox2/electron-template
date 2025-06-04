/* Copyright 2024 dodat */
/*---------------------------------------------------------------------------*
 * Renderer
 *      メインウィンドウ UIイベント
 *---------------------------------------------------------------------------*/

//$(window).on("load", function(){ // JQuery
window.addEventListener("load", function(){
	let btnEle = document.getElementById("testSend");
	if(btnEle){
		btnEle.addEventListener("click", function(){
			window.AABridge.testSend(10).then((msg) => {
				console.log(msg);
			});
		});
	}
});
/*
window.AABridge.onDispMes((arg:string) => {
	let ele = document.getElementById("message");
	if(ele) ele.innerHTML += arg + "<br>";
});
*/