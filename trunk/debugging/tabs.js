// Club AJAX General Purpose Code
//
// Console Tabs
//
// author:
//		Mike Wilcox
// site:
//		http://clubajax.org
// support:
//		http://groups.google.com/group/clubajax
//
// clubajax.debugging.tabs
//
//	DESCRIPTION:
//		Adds tabbing functionality to the console, whether that be Firebug
//		or any other debugger that supports spaces (if HTML is used,
//		multiple spaces become one).
//
//	properties:
//		console.tabLength: Number (defaults to 10)
//			The amount of characters between tabs
//		console.justify: String (defaults to left)
//			Whether the tabs are right, left or center justified
//		console.round: Boolean (defaults to false)
//			Rounds any number arguments. Great if you don't want
//			crazy JavaScript decimals like 3.000000001 in your lists.
//		console.pipe: Boolean (defaults to true)
//			Adds a | between tabs, only when centered.
//
// methods:
//		console.pad
//			arguments: expects one, can be anything
//			description:
//				Adds spaces to the side(s) of the argument
//				to space it out and simulate a tab-space.
//
//		console.tabs(thing, thing, [...])
//			arguments: any number, all args can be anything
//			description:
//				Key function. Call console.tabs(arg, arg, arg)
//				consecutively with presumably similar arguments.
//
// 	USAGE:
// 		include file:
//			<script src="clubajax/debugging/tabs.js"></script>
//
//	EXAMPLE:
//		console.tabLength = 20;
//		console.justify = "right"
//		console.tabs("club", "ajax", "rocks");
//		console.tabs("google", "code", "rocks");
//		console.tabs("html5", "css3", "foobar!");
//
//
(function(){
	window.id = "global"
	var initTabs = function(){
		var cn = console;
		cn.id = "console";
		cn.tabLength = 10;
		cn.justify = "left";
		cn.round = true;
		cn.pipe = true;
		cn.pad = function(s){
			s = typeof(s)=="number" && cn.round ? Math.ceil(s) : s;
			s = s+"";
			var c = " ",
				t = cn.tabLength,
				len = (t-s.length);
			for( var i=0; i<len; i++){
				if(cn.justify=="center"){
					s = i < len/2 ? s + c : c + s;
				}else{
					s = cn.justify=="left" ? s + c : c + s;
				}
			}
			if(cn.justify=="center" && cn.pipe){ s+= "|"; }
			return s;
		}
		cn.tabs = function(){
			var msg = "";
			for(var i=0; i<arguments.length; i++){
				msg += cn.pad(arguments[i]);
			}
			cn.log(msg)
		}
	}
	if(window.console && window.console.log){ initTabs(); }
})();
