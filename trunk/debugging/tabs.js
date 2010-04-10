// Club AJAX General Purpose Code
//
// author:
//		Mike Wilcox
// site:
//		http://clubajax.org
// support:
//		http://groups.google.com/group/clubajax
//
// clubajax.debugging.tabs
//	DESCIPTION:
//		Adds tabbing functionality to the console, whether that be Firebug
//		or any other debugger that supports spaces (if HTML is used,
//		multiple spaces become one).
//	properties:
//		console.tabLength: Number (defaults to 10)
//			The amount of characters between tabs
//		console.justify: String (defaults to left)
//			Whether the tabs are right, left or center justified
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
	var initTabs = function(){
		console.tabLength = 10;
		console.justify = "left";
		console.pad = function(s){
			s = s+""
			for( var i=s.length; i<this.tabLength; i++){
				s = this.justify=="left" ? s + " " : " " + s;
			}
			return s;
		}
		console.tabs = function(){
			var msg = "";
			for(var i=0; i<arguments.length; i++){
				msg += this.pad(arguments[i]);
			}
			this.log.apply(this, [msg]);
		}
	}
	// we may need to check for IE8 here. Its console is hard to detect.
	if(window.console){ initTabs(); }
})();
