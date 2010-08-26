(function(){
var _1=window.debug||/debug=true/.test(document.location.href)||false;
var _2=window.loglimit||299;
window.loglimit=_2;
if(!window.console){
console={};
}
var _3="info,error,log,warn";
var _4="debug,time,timeEnd,assert,count,trace,dir,dirxml,group,groupEnd,groupCollapsed,exception";
var _5=function(){
var _6=_3.split(",");
for(var i=0;i<_6.length;i++){
var m=_6[i];
var n="_"+_6[i];
console[n]=console[m];
console[m]=(function(){
var _7=n;
return function(){
_2--;
if(_2==0){
console._log("***LOG LIMIT OF "+loglimit+" HAS BEEN REACHED***");
}
if(_2<1){
return;
}
console[_7](Array.prototype.slice.call(arguments).join(" "));
};
})();
}
try{
console.clear();
}
catch(e){
}
};
var _8=function(){
console._log=console.log;
console.log=console.debug=console.info=console.warn=console.error=function(){
var a=[];
for(var i=0;i<arguments.length;i++){
a.push(arguments[i]);
}
console._log(a.join(" "));
};
};
var _9=function(_a){
var _b=_a.split(",");
for(var i=0;i<_b.length;i++){
console[_b[i]]=function(){
};
}
};
var ua=window.navigator.userAgent;
if(_1&&/Trident/.test(ua)){
_5();
_9(_4);
}else{
if(_1&&/iPad|iPhone/.test(ua)){
_8();
}else{
if((/IE/.test(ua)&&!/Trident/.test(ua))||!_1||!window.console){
_9(_4+","+_3);
}
}
}
})();

