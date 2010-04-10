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
	if(window.console){ initTabs(); }
})();
