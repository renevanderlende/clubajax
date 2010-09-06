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
//		Allows the ability to turn the console on and off. Use debug=true
//		in a script before this loads, or in the page url, like:
//			http://mypage/index.html?debug=true
//		Without debug=true in one of these two places, the console is turned off
//		to prevent throwing errors in users' browsers that do not have Firebug
//		installed.
//
//		Fixes some of the annoyances with the IE8 console:
//			-	clears the logs on reload
//			- 	adds spaces between logged arguments
//			- 	adds stubs for Firebug commands
//		Fixes WebKit Mobile Debuggers:
//			- concatenates all arguments into a string to get
//				around the one argument-logged silliness.
//			- Does not log objects.
//			- Only log, info, debug and warn are supported.
//
// 	USAGE:
// 		include file:
//			<script src="clubajax/debugging/consoleFix.js"></script>
//
//	Just include the script and the console will work better.
// TESTS:
//		See tests/consoleFix.html
//

(function(){
	var dbg = window.debug || /debug=true/.test(document.location.href) || false;
	var count = window.loglimit || 299;
	window.loglimit = count;
	if(!window.console) console = {};
	var common = "info,error,log,warn";
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
					count--;
					if(count == 0) console._log("***LOG LIMIT OF "+loglimit+" HAS BEEN REACHED***");
					if(count < 1) return;
					console[type](Array.prototype.slice.call(arguments).join(" "));
				}
			})();
		}
		// clear the console on load. This is more than a convenience - too many logs crashes it.
		// (If closed it throws an error)
		try{ console.clear(); }catch(e){}
	}

	var fixMobile = function(){
		// iPad and iPhone use the crappy old Safari debugger.
		var calls = common.split(",");
		for(var i=0;i<calls.length;i++){
			(function(){
				var m = calls[i];
				var n = "_"+calls[i]
				console[n] = console[m];
				console[m] = function(){
					console[n](Array.prototype.slice.call(arguments).join(" "));
				};
			})();
		}
	}

	var hideCalls = function(str){
		var calls = str.split(",");
		for(var i=0;i<calls.length;i++){
			console[calls[i]] = function(){};
		}
	}

	var tweak = function(){
		var calls = more.split(",");
		for(var i=0;i<calls.length;i++){
			if(!console[calls[i]]) console[calls[i]] = function(){};
		}
	}

	var ua = window.navigator.userAgent;
	if(dbg && /Trident/.test(ua)){
		fixIE();
		hideCalls(more);
	}else if(dbg && /WebKit|iPad|iPhone/.test(ua)){
		fixMobile();
		tweak();
	}else if((/IE/.test(ua) && !/Trident/.test(ua)) || !dbg || !window.console){ // IE6 or no console
		hideCalls(more+","+common);
	}else{
		tweak();
	}

})();
