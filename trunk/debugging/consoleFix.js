// Club AJAX General Purpose Code
//
// Fix Console
//
// author:
//		Mike Wilcox
// site:
//		http://clubajax.org
// support:
//		http://groups.google.com/group/clubajax
//
// clubajax.debugging.consoleFix
//
//	DESCRIPTION:
//		Fixes some of the annoyances with the IE8 console.
//			-	clears the logs on reload
//			- 	adds spaces between logged arguments
//
// 	USAGE:
// 		include file:
//			<script src="clubajax/debugging/consoleFix.js"></script>
//
//	No examples. Just include the script and the console will work better.
//
var debug = window.debug || /debug=true/.test(document.location.href) || false;

(function(){
	var common = "info,debug,warn,error,log";
	var more = "time,timeEnd,assert,count,trace,dir,dirxml,group,groupEnd";
	var fixIE = function(){
		var calls = common.split(",");
		for(var i=0;i<calls.length;i++){
			var m = calls[i];
			var n = "_"+calls[i]
			console[n] = console[m];
			console[m] = (function(){
				var type = n;
				return function(){
					console[type](Array.prototype.slice.call(arguments).join(" "));
				}
			})();
		}
		// clear the console on load. This is more than a convenience - too many logs crashes it.
		// If closed it throws an error
		try{ console.clear(); }catch(e){}
	}
	var hideConsole = function(){
		var calls = (more+","+common).split(",");
		if(!window.console) console = {};
		for(var i=0;i<calls.length;i++){
			console[calls[i]] = function(){};
		}
	}
	if(debug && /Trident/.test(window.navigator.userAgent)){
		fixIE();
	}else if(!debug || !window.console){
		hideConsole();
	}
})();
