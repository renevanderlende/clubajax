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
	var i, a = arguments, constructors = [], subclasses = [], declaredClass;

	var Class = function(){
		this.subclasses = subclasses;
		this.declaredClass = declaredClass;
		for(i=0; i<=constructors.length-1 ; i++){
			constructors[i].apply(this, arguments);
		}
	}

	for(i=a.length-1;i>=0;i--){
		for(var n in a[i]){
			if(/^[A-Z]/.test(n)){
				constructors.push(a[i][n]);
				subclasses.push(n);
				if(!declaredClass) declaredClass = n;
			}else if(n == "init" || n == "constructor"){
				constructors.push(a[i][n]);
				subclasses.push(n);
			}else{
				Class.prototype[n] = a[i][n];
			}
		}
	}
	return Class;
}
