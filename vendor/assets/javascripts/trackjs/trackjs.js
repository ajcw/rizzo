// COPYRIGHT (c) 2014 TrackJS LLC ALL RIGHTS RESERVED
(function(t){"use awesome";try{var h=function(e){function h(b){b=b||navigator.userAgent;var d=b.match(/Trident\/([\d.]+)/);return d&&"7.0"===d[1]?11:(b=b.match(/MSIE ([\d.]+)/))?parseInt(b[1],10):!1}return{slice:Array.prototype.slice,uuid:function(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(b){var d=16*Math.random()|0;return("x"==b?d:d&3|8).toString(16)})},reduce:function(b){try{return"object"===typeof b||"function"===typeof b?b.toString():b}catch(d){return"unknown"}},
defer:function(b,d){setTimeout(function(){b.apply(d)})},isoNow:function(){function b(a){a=String(a);1===a.length&&(a="0"+a);return a}var d=new Date;return d.getUTCFullYear()+"-"+b(d.getUTCMonth()+1)+"-"+b(d.getUTCDate())+"T"+b(d.getUTCHours())+":"+b(d.getUTCMinutes())+":"+b(d.getUTCSeconds())+"."+String((d.getUTCMilliseconds()/1E3).toFixed(3)).slice(2,5)+"Z"},isBrowserIE:h,isBrowserSupported:function(b){b=b||navigator.userAgent;b=h(b);return!b||8<b},contains:function(b,d){var a;for(a=0;a<b.length;a++)if(b[a]===
d)return!0;return!1}}}(this),m=function(e){var l={endpoint:"https://my.trackjs.com/capture",cdnHost:"dl1d2m8ri9v3j.cloudfront.net",version:"1.2.1.0",trackGlobal:!0,trackAjaxFail:!0,trackConsoleError:!0,inspectors:!0,consoleDisplay:!0,globalAlias:!0,userId:void 0,sessionId:void 0,ignore:[],mergeCustomerConfig:function(b){if(b){var d="userId sessionId trackGlobal trackAjaxFail trackAjaxFail trackConsoleError inspectors consoleDisplay globalAlias ignore".split(" "),a,e;for(a=0;a<d.length;a++)e=d[a],
void 0!==b[e]&&(l[e]=b[e])}},initialize:function(){t._trackJs&&l.mergeCustomerConfig(t._trackJs);h.isBrowserIE()&&(l.endpoint="//"+l.endpoint.split("://")[1])}};return l}(this),f=function(e){function l(p,a){g[p]||(g[p]=[]);var c=h.uuid();g[p].push({key:c,value:a});10<g[p].length&&(g[p]=g[p].slice(Math.max(g[p].length-10,0)));return c}function b(a,c,b){function d(a,c){var p=new e.XMLHttpRequest;"withCredentials"in p?(p.open(a,c),p.setRequestHeader("Content-Type","text/plain")):"undefined"!==typeof e.XDomainRequest?
(p=new e.XDomainRequest,p.open(a,c)):p=null;return p}try{if(!f){var k=d(a,c);k.onreadystatechange=function(a){4===k.readyState&&200!==k.status&&(f=!0)};k.tjs=void 0;k.send(JSON.stringify(b))}}catch(g){f=!0}}function d(){var a=(new Date).getTime();u++;if(v+1E3>=a){if(v=a,10<u)return w++,!0}else u=0,v=a;return!1}function a(){var a=w;w=0;return a}function n(c,k,g,q,l,n){c={column:l,entry:c,file:g,line:q,url:e.location.toString(),message:h.reduce(k),stack:n,timestamp:h.isoNow()};for(var f in r)r.hasOwnProperty(f)&&
(k=r[f],"function"===typeof k.onTransmit&&(c[f]=k.onTransmit()));if(!d()){c.throttled=a();a:{for(f=0;f<m.ignore.length;f++)if(m.ignore[f]&&m.ignore[f].test&&m.ignore[f].test(c.message)){f=!0;break a}f=!1}f||b("POST",m.endpoint,c)}}function c(a){var c=h.slice.call(arguments,1),b;for(b in a)"function"===typeof a[b]&&(h.contains(c,b)||function(){var c=a[b];a[b]=function(){try{var a=h.slice.call(arguments,0);return c.apply(this,a)}catch(b){return q("catch",b),!1}}}())}function k(a){for(var c in a)if(a.hasOwnProperty(c)){var b=
a[c];if("function"===typeof b.onInitialize)b.onInitialize()}}function q(a,c){n(a,c.message,c.fileName,c.lineNumber,void 0,c.stack)}var r={},g={},f=!1,u=0,w=0,v=(new Date).getTime();return{registerModule:function(a,c){return a?(r[a]={onInitialize:c.onInitialize,onTransmit:c.onTransmit,forTest:c.forTest},!0):!1},getModule:function(a){return r.hasOwnProperty(a)?r[a]:!1},addLogEntry:l,getLogEntry:function(a,c){g[a]||(g[a]=[]);for(var b=0;b<g[a].length;b++)if(g[a][b].key===c)return g[a][b].value;return!1},
flushLog:function(a){g[a]||(g[a]=[]);for(var c=[],b=0;b<g[a].length;b++)c.push(g[a][b].value);g[a].length=0;return c},updateLogEntry:function(a,c,b){g[a]||(g[a]=[]);for(var k=0;k<g[a].length;k++)if(g[a][k].key===c)return g[a][k].value=b,!0;return!1},transmit:n,transmitErrorObject:q,initialize:function(){m.initialize();k(r);m.trackGlobal&&m.inspectors&&(e.onerror=function(a,c,b,k){n("global",a,c,b,k)});e.trackJs={track:function(a){"[object Error]"===Object.prototype.toString.call(a)?q("direct",a):
n("direct",a)},attempt:function(a,c){try{var b=h.slice.call(arguments,2);return a.apply(c||this,b)}catch(k){return q("catch",k),!1}},watch:function(a,c){return function(){try{var b=h.slice.call(arguments,0);return a.apply(c||this,b)}catch(k){return q("catch",k),!1}}},watchAll:c,trackAll:c,configure:m.mergeCustomerConfig,version:m.version};var a,b=["log","debug","info","warn","error"];for(a=0;a<b.length;a++)(function(a){e.trackJs[a]=function(){var c=h.slice.call(arguments);l("c",{timestamp:h.isoNow(),
severity:a,message:h.reduce(c)});"error"===a&&m.trackConsoleError&&("[object Error]"===Object.prototype.toString.call(c[0])?q("console",c[0]):n("console",h.reduce(c)))}})(b[a]);m.globalAlias&&(e.track=e.trackJs.track)},forTest:{initializeModules:k,throttle:d,getThrottledCount:a,wrap:c}}}(this);(function(e){var l,b,d,a;function n(a,c){this.tjs={method:a[0],url:a[1]};return c.apply(this,a)}function c(a,c){function b(a){if(a.tjs){var c=f.getLogEntry("n",a.tjs.logId);c&&(c.completedOn=h.isoNow(),c.statusCode=
a.status,c.statusText=a.statusText,f.updateLogEntry("n",a.tjs.logId,c),a.tjs=void 0)}}function d(a){m.trackAjaxFail&&400<=a.status&&f.transmit("ajax",a.status+" "+a.statusText)}if(!this.tjs)return c.apply(this,a);this.tjs.logId=f.addLogEntry("n",{startedOn:h.isoNow(),method:this.tjs.method,url:this.tjs.url});e.ProgressEvent&&this.addEventListener("readystatechange",function(a){4===this.readyState&&b(this)});if(this.addEventListener)this.addEventListener("load",function(a){b(this);d(this)});else{var l=
this.onreadystatechange,n=function(a){4===this.readyState&&(b(this),d(this));"function"===typeof l&&l.apply(this,arguments)};this.onreadystatechange=n;h.defer(function(){this.onreadystatechange!==n&&(l=this.onreadystatechange,this.onreadystatechange=n)},this)}return c.apply(this,a)}f.registerModule("network",{onInitialize:function(){h.isBrowserSupported()&&m.inspectors&&(d=e.XMLHttpRequest.prototype.open,a=e.XMLHttpRequest.prototype.send,e.XMLHttpRequest.prototype.open=function(){var a=h.slice.call(arguments,
0);return n.call(this,a,d)},e.XMLHttpRequest.prototype.send=function(){var b=h.slice.call(arguments,0);return c.call(this,b,a)},e.XDomainRequest&&(l=e.XDomainRequest.prototype.open,b=e.XDomainRequest.prototype.send,e.XDomainRequest.prototype.open=function(){var a=h.slice.call(arguments,0);return n.call(this,a,l)},e.XDomainRequest.prototype.send=function(){var a=h.slice.call(arguments,0);return c.call(this,a,b)}))},onTransmit:function(){return f.flushLog("n")}})})(this);(function(e){function l(a,b,
d){for(var e={},g=a.attributes,f=0;f<g.length;f++)"value"!==g[f].name.toLowerCase()&&(e[g[f].name]=g[f].value);g=a.getBoundingClientRect();return{tag:a.tagName.toLowerCase(),attributes:e,position:{left:g.left,top:g.top,width:g.width,height:g.height},value:b?{length:b.length,pattern:""===b||void 0===b?"empty":/^[a-z0-9!#$%&'*+=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/.test(b)?"email":/^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/.test(b)||
/^(\d{4}[\/\-](0?[1-9]|1[012])[\/\-]0?[1-9]|[12][0-9]|3[01])$/.test(b)?"date":/^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/.test(b)?"usphone":/^\s*$/.test(b)?"whitespace":/^\d*$/.test(b)?"numeric":/^[a-zA-Z]*$/.test(b)?"alpha":/^[a-zA-Z0-9]*$/.test(b)?"alphanumeric":"characters",checked:d}:
void 0}}function b(a,b,d){if(a.tagName.toLowerCase()!==b.toLowerCase())return!1;if(!d)return!0;a=(a.getAttribute("type")||"").toLowerCase();for(b=0;b<d.length;b++)if(d[b]===a)return!0;return!1}function d(a,b,d,e){f.addLogEntry("v",{timestamp:h.isoNow(),action:b,element:l(a,d,e)})}function a(a){(a=a.target||document.elementFromPoint(a.clientX,a.clientY))&&a.tagName&&(b(a,"input",["checkbox"])&&d(a,"input",a.value,a.checked),b(a,"input",["radio"])&&d(a,"input",a.value,a.checked),(b(a,"a")||b(a,"button")||
b(a,"input",["button","submit"]))&&d(a,"click"))}function n(a){if((a=a.target||document.elementFromPoint(a.clientX,a.clientY))&&a.tagName&&(b(a,"textarea")&&d(a,"input",a.value),b(a,"select")&&d(a,"input",a.options[a.selectedIndex].value),b(a,"input")&&!b(a,"input",["button","submit","hidden","checkbox","radio"]))){var e=(a.getAttribute("type")||"").toLowerCase();d(a,"input","password"===e?void 0:a.value)}}f.registerModule("visitor",{onInitialize:function(){m.inspectors&&(document.addEventListener?
(document.addEventListener("click",a,!0),document.addEventListener("blur",n,!0)):document.attachEvent&&(document.attachEvent("onclick",a),document.attachEvent("onfocusout",n)))},onTransmit:function(){return f.flushLog("v")},forTest:{onDocumentClicked:a,onInputChanged:n}})})(this);(function(e){function l(){if(e._trackJs&&e._trackJs.customer)return e._trackJs.customer;var a=document.getElementsByTagName("script");return a[a.length-1].getAttribute("data-customer")}function b(a){if(a.token){var b=new Image;
setTimeout(function(){b.src="//"+m.cdnHost+"/usage.gif?customer="+a.token+"&correlationId="+a.correlationId+"&x="+h.uuid()},0)}}var d={};f.registerModule("customer",{onInitialize:function(){d.token=l();var a=document.cookie.replace(/(?:(?:^|.*;\s*)TJS\s*\=\s*([^;]*).*$)|^.*$/,"$1");a||(a=h.uuid(),document.cookie="TJS="+a+"; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/");d.correlationId=a;b(d)},onTransmit:function(){d.userId=m.userId;d.sessionId=m.sessionId;return d},forTest:{getCustomerToken:l}})})(this);
(function(e){function l(b,d){var a=b||{},e=a.log||function(){},c=["log","debug","info","warn","error"],k;for(k=0;k<c.length;k++)(function(b){var c=a[b]||e;a[b]=function(){var a=h.slice.call(arguments);f.addLogEntry("c",{timestamp:h.isoNow(),severity:b,message:h.reduce(a)});"error"===b&&d.trackConsoleError&&("[object Error]"===Object.prototype.toString.call(a[0])?f.transmitErrorObject("console",a[0]):f.transmit("console",h.reduce(a)));d.consoleDisplay&&"function"===typeof c&&(c.apply?c.apply(this,
a):c(a))}})(c[k]);return a}f.registerModule("console",{onInitialize:function(){m.inspectors&&(e.console=l(e.console,m))},onTransmit:function(){return f.flushLog("c")},forTest:{listenToConsole:l}})})(this);(function(e,h){function b(a){var b={};a.jQuery&&(a.jQuery.fn&&a.jQuery.fn.jquery)&&(b.jQuery=a.jQuery.fn.jquery);a.jQuery&&(a.jQuery.ui&&a.jQuery.ui.version)&&(b.jQueryUI=a.jQuery.ui.version);a.angular&&(a.angular.version&&a.angular.version.full)&&(b.angular=a.angular.version.full);for(key in a)try{if(a[key]){var c=
a[key].version||a[key].Version||a[key].VERSION;"string"===typeof c&&(b[key]=c)}}catch(d){}return b}var d=(new Date).getTime();f.registerModule("environment",{onTransmit:function(){return{userAgent:h.navigator.userAgent,age:(new Date).getTime()-d,viewportHeight:document.documentElement.clientHeight,viewportWidth:document.documentElement.clientWidth,dependencies:b(h)}},forTest:{discoverDependencies:b}})})(this,t);f.initialize()}catch(s){f.transmit("tracker",s.message,s.fileName,s.lineNumber,void 0,
s.stack)}})(window);