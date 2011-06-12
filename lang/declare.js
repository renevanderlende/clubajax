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
