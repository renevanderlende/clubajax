// Club AJAX General Purpose Code
//
// Declare
//
// author:
//		Mike Wilcox
// site:
//		http://clubajax.org
// support:
//		http://groups.google.com/group/clubajax
//
// clubajax.lang.declare
//
//	DESCRIPTION:
//		Declare provides a simple inhertiance method for combining
//		multiple objects into a single class.

// 	USAGE:
// 		include file:
//			<script src="clubajax/lang/declare.js"></script>
//
//		var Foo = {
//			Foo: function(){
//				// initialize!
//			},
//			update: function(){
//				// update something!
//			}
//		};
//
//		var Bar = {
//			Bar: function(){
//				// initialize!
//			},
//			draw: function(){
//				// draw something!
//			}
//		};
//
//		var Zap = {
//			Zap: function(){
//				// initialize!
//			},
//			remove: function(){
//				// remove something!
//			}
//		};
//
//		var CustomClass = declare(Foo, Bar, Zap);
//
//
declare = function(){
		var i, a = arguments, constructors = [], classes = [];

	var Class = function(){
		this.classes = classes;
		for(i=0; i<=constructors.length-1 ; i++){
			constructors[i].apply(this, arguments);
		}
	}

	Class.prototype = {
		isClass: function(cls){
			return this.classes[this.classes.length -1] === cls;
		},
		isSubclass: function(cls){
			for(var i=0;i<this.classes.length;i++){
				if(this.classes[i] === cls) return true;
			}
			return false
		}
	};

	for(i=a.length-1;i>=0;i--){
		for(var n in a[i]){
			if(/^[A-Z]/.test(n)){
				constructors.push(a[i][n]);
				classes.push(n);
			}else{
				Class.prototype[n] = a[i][n];
			}
		}
	}

	return Class;
}
