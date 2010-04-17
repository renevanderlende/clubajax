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
//		Allows the ability to turn the console on anf off. Use debug=true
//		in a script before this loads, or in the page url, like:
//			http://mypage/index.html?debug=true
//		Without debug=true in one of these two places, the console is turned off
//		to prevent throwing errors in users' browsers that do not have Firebug
//		installed.
//
//		Also fixes some of the annoyances with the IE8 console:
//			-	clears the logs on reload
//			- 	adds spaces between logged arguments
//			- 	adds stubs for Firebug commands
//
// 	USAGE:
// 		include file:
//			<script src="clubajax/debugging/consoleFix.js"></script>
//
//	Just include the script and the console will work better.
// TESTS:
//		See tests/consoleFix.html
//
var debug = window.debug || /debug=true/.test(document.location.href) || false;

(function(){
	var common = "info,warn,error,log";
	var more = "debug,time,timeEnd,assert,count,trace,dir,dirxml,group,groupEnd,groupCollapsed,exception";
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
	var hideCalls = function(str){
		var calls = str.split(",");
		if(!window.console) console = {};
		for(var i=0;i<calls.length;i++){
			console[calls[i]] = function(){};
		}
	}
	if(debug && /Trident/.test(window.navigator.userAgent)){
		fixIE();
		hideCalls(more);
	}else if(!debug || !window.console){
		hideCalls(more+","+common);
	}
})();
