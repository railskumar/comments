// -*- Mode: SCSS; tab-width: 8; indent-tabs-mode: true; c-basic-offset: 8 -*-

var Juvia, toMarkdown, RawDeflate, Base64;
if (!Juvia) {
	Juvia = {
    user_logged_in: false,
    restrict_comment_length: false,
    sorting_order: 'oldest',
    current_page: 1,
    total_pages: 1,
    site_key: '',
    topic_key: '',
    topic_url: '',
    topic_title: '',
    username: '',
    user_email: '',
    use_my_user: 'false',
    root_url: '',
    juvia_jquery: ''
	};
}

(function(Juvia) {
    
  // jquery-1.7.1.min.js
  /*! jQuery v1.7.1 jquery.com | jquery.org/license */
  (function(a,b){function cy(a){return f.isWindow(a)?a:a.nodeType===9?a.defaultView||a.parentWindow:!1}function cv(a){if(!ck[a]){var b=c.body,d=f("<"+a+">").appendTo(b),e=d.css("display");d.remove();if(e==="none"||e===""){cl||(cl=c.createElement("iframe"),cl.frameBorder=cl.width=cl.height=0),b.appendChild(cl);if(!cm||!cl.createElement)cm=(cl.contentWindow||cl.contentDocument).document,cm.write((c.compatMode==="CSS1Compat"?"<!doctype html>":"")+"<html><body>"),cm.close();d=cm.createElement(a),cm.body.appendChild(d),e=f.css(d,"display"),b.removeChild(cl)}ck[a]=e}return ck[a]}function cu(a,b){var c={};f.each(cq.concat.apply([],cq.slice(0,b)),function(){c[this]=a});return c}function ct(){cr=b}function cs(){setTimeout(ct,0);return cr=f.now()}function cj(){try{return new a.ActiveXObject("Microsoft.XMLHTTP")}catch(b){}}function ci(){try{return new a.XMLHttpRequest}catch(b){}}function cc(a,c){a.dataFilter&&(c=a.dataFilter(c,a.dataType));var d=a.dataTypes,e={},g,h,i=d.length,j,k=d[0],l,m,n,o,p;for(g=1;g<i;g++){if(g===1)for(h in a.converters)typeof h=="string"&&(e[h.toLowerCase()]=a.converters[h]);l=k,k=d[g];if(k==="*")k=l;else if(l!=="*"&&l!==k){m=l+" "+k,n=e[m]||e["* "+k];if(!n){p=b;for(o in e){j=o.split(" ");if(j[0]===l||j[0]==="*"){p=e[j[1]+" "+k];if(p){o=e[o],o===!0?n=p:p===!0&&(n=o);break}}}}!n&&!p&&f.error("No conversion from "+m.replace(" "," to ")),n!==!0&&(c=n?n(c):p(o(c)))}}return c}function cb(a,c,d){var e=a.contents,f=a.dataTypes,g=a.responseFields,h,i,j,k;for(i in g)i in d&&(c[g[i]]=d[i]);while(f[0]==="*")f.shift(),h===b&&(h=a.mimeType||c.getResponseHeader("content-type"));if(h)for(i in e)if(e[i]&&e[i].test(h)){f.unshift(i);break}if(f[0]in d)j=f[0];else{for(i in d){if(!f[0]||a.converters[i+" "+f[0]]){j=i;break}k||(k=i)}j=j||k}if(j){j!==f[0]&&f.unshift(j);return d[j]}}function ca(a,b,c,d){if(f.isArray(b))f.each(b,function(b,e){c||bE.test(a)?d(a,e):ca(a+"["+(typeof e=="object"||f.isArray(e)?b:"")+"]",e,c,d)});else if(!c&&b!=null&&typeof b=="object")for(var e in b)ca(a+"["+e+"]",b[e],c,d);else d(a,b)}function b_(a,c){var d,e,g=f.ajaxSettings.flatOptions||{};for(d in c)c[d]!==b&&((g[d]?a:e||(e={}))[d]=c[d]);e&&f.extend(!0,a,e)}function b$(a,c,d,e,f,g){f=f||c.dataTypes[0],g=g||{},g[f]=!0;var h=a[f],i=0,j=h?h.length:0,k=a===bT,l;for(;i<j&&(k||!l);i++)l=h[i](c,d,e),typeof l=="string"&&(!k||g[l]?l=b:(c.dataTypes.unshift(l),l=b$(a,c,d,e,l,g)));(k||!l)&&!g["*"]&&(l=b$(a,c,d,e,"*",g));return l}function bZ(a){return function(b,c){typeof b!="string"&&(c=b,b="*");if(f.isFunction(c)){var d=b.toLowerCase().split(bP),e=0,g=d.length,h,i,j;for(;e<g;e++)h=d[e],j=/^\+/.test(h),j&&(h=h.substr(1)||"*"),i=a[h]=a[h]||[],i[j?"unshift":"push"](c)}}}function bC(a,b,c){var d=b==="width"?a.offsetWidth:a.offsetHeight,e=b==="width"?bx:by,g=0,h=e.length;if(d>0){if(c!=="border")for(;g<h;g++)c||(d-=parseFloat(f.css(a,"padding"+e[g]))||0),c==="margin"?d+=parseFloat(f.css(a,c+e[g]))||0:d-=parseFloat(f.css(a,"border"+e[g]+"Width"))||0;return d+"px"}d=bz(a,b,b);if(d<0||d==null)d=a.style[b]||0;d=parseFloat(d)||0;if(c)for(;g<h;g++)d+=parseFloat(f.css(a,"padding"+e[g]))||0,c!=="padding"&&(d+=parseFloat(f.css(a,"border"+e[g]+"Width"))||0),c==="margin"&&(d+=parseFloat(f.css(a,c+e[g]))||0);return d+"px"}function bp(a,b){b.src?f.ajax({url:b.src,async:!1,dataType:"script"}):f.globalEval((b.text||b.textContent||b.innerHTML||"").replace(bf,"/*$0*/")),b.parentNode&&b.parentNode.removeChild(b)}function bo(a){var b=c.createElement("div");bh.appendChild(b),b.innerHTML=a.outerHTML;return b.firstChild}function bn(a){var b=(a.nodeName||"").toLowerCase();b==="input"?bm(a):b!=="script"&&typeof a.getElementsByTagName!="undefined"&&f.grep(a.getElementsByTagName("input"),bm)}function bm(a){if(a.type==="checkbox"||a.type==="radio")a.defaultChecked=a.checked}function bl(a){return typeof a.getElementsByTagName!="undefined"?a.getElementsByTagName("*"):typeof a.querySelectorAll!="undefined"?a.querySelectorAll("*"):[]}function bk(a,b){var c;if(b.nodeType===1){b.clearAttributes&&b.clearAttributes(),b.mergeAttributes&&b.mergeAttributes(a),c=b.nodeName.toLowerCase();if(c==="object")b.outerHTML=a.outerHTML;else if(c!=="input"||a.type!=="checkbox"&&a.type!=="radio"){if(c==="option")b.selected=a.defaultSelected;else if(c==="input"||c==="textarea")b.defaultValue=a.defaultValue}else a.checked&&(b.defaultChecked=b.checked=a.checked),b.value!==a.value&&(b.value=a.value);b.removeAttribute(f.expando)}}function bj(a,b){if(b.nodeType===1&&!!f.hasData(a)){var c,d,e,g=f._data(a),h=f._data(b,g),i=g.events;if(i){delete h.handle,h.events={};for(c in i)for(d=0,e=i[c].length;d<e;d++)f.event.add(b,c+(i[c][d].namespace?".":"")+i[c][d].namespace,i[c][d],i[c][d].data)}h.data&&(h.data=f.extend({},h.data))}}function bi(a,b){return f.nodeName(a,"table")?a.getElementsByTagName("tbody")[0]||a.appendChild(a.ownerDocument.createElement("tbody")):a}function U(a){var b=V.split("|"),c=a.createDocumentFragment();if(c.createElement)while(b.length)c.createElement(b.pop());return c}function T(a,b,c){b=b||0;if(f.isFunction(b))return f.grep(a,function(a,d){var e=!!b.call(a,d,a);return e===c});if(b.nodeType)return f.grep(a,function(a,d){return a===b===c});if(typeof b=="string"){var d=f.grep(a,function(a){return a.nodeType===1});if(O.test(b))return f.filter(b,d,!c);b=f.filter(b,d)}return f.grep(a,function(a,d){return f.inArray(a,b)>=0===c})}function S(a){return!a||!a.parentNode||a.parentNode.nodeType===11}function K(){return!0}function J(){return!1}function n(a,b,c){var d=b+"defer",e=b+"queue",g=b+"mark",h=f._data(a,d);h&&(c==="queue"||!f._data(a,e))&&(c==="mark"||!f._data(a,g))&&setTimeout(function(){!f._data(a,e)&&!f._data(a,g)&&(f.removeData(a,d,!0),h.fire())},0)}function m(a){for(var b in a){if(b==="data"&&f.isEmptyObject(a[b]))continue;if(b!=="toJSON")return!1}return!0}function l(a,c,d){if(d===b&&a.nodeType===1){var e="data-"+c.replace(k,"-$1").toLowerCase();d=a.getAttribute(e);if(typeof d=="string"){try{d=d==="true"?!0:d==="false"?!1:d==="null"?null:f.isNumeric(d)?parseFloat(d):j.test(d)?f.parseJSON(d):d}catch(g){}f.data(a,c,d)}else d=b}return d}function h(a){var b=g[a]={},c,d;a=a.split(/\s+/);for(c=0,d=a.length;c<d;c++)b[a[c]]=!0;return b}var c=a.document,d=a.navigator,e=a.location,f=function(){function J(){if(!e.isReady){try{c.documentElement.doScroll("left")}catch(a){setTimeout(J,1);return}e.ready()}}var e=function(a,b){return new e.fn.init(a,b,h)},f=a.jQuery,g=a.$,h,i=/^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,j=/\S/,k=/^\s+/,l=/\s+$/,m=/^<(\w+)\s*\/?>(?:<\/\1>)?$/,n=/^[\],:{}\s]*$/,o=/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,p=/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,q=/(?:^|:|,)(?:\s*\[)+/g,r=/(webkit)[ \/]([\w.]+)/,s=/(opera)(?:.*version)?[ \/]([\w.]+)/,t=/(msie) ([\w.]+)/,u=/(mozilla)(?:.*? rv:([\w.]+))?/,v=/-([a-z]|[0-9])/ig,w=/^-ms-/,x=function(a,b){return(b+"").toUpperCase()},y=d.userAgent,z,A,B,C=Object.prototype.toString,D=Object.prototype.hasOwnProperty,E=Array.prototype.push,F=Array.prototype.slice,G=String.prototype.trim,H=Array.prototype.indexOf,I={};e.fn=e.prototype={constructor:e,init:function(a,d,f){var g,h,j,k;if(!a)return this;if(a.nodeType){this.context=this[0]=a,this.length=1;return this}if(a==="body"&&!d&&c.body){this.context=c,this[0]=c.body,this.selector=a,this.length=1;return this}if(typeof a=="string"){a.charAt(0)!=="<"||a.charAt(a.length-1)!==">"||a.length<3?g=i.exec(a):g=[null,a,null];if(g&&(g[1]||!d)){if(g[1]){d=d instanceof e?d[0]:d,k=d?d.ownerDocument||d:c,j=m.exec(a),j?e.isPlainObject(d)?(a=[c.createElement(j[1])],e.fn.attr.call(a,d,!0)):a=[k.createElement(j[1])]:(j=e.buildFragment([g[1]],[k]),a=(j.cacheable?e.clone(j.fragment):j.fragment).childNodes);return e.merge(this,a)}h=c.getElementById(g[2]);if(h&&h.parentNode){if(h.id!==g[2])return f.find(a);this.length=1,this[0]=h}this.context=c,this.selector=a;return this}return!d||d.jquery?(d||f).find(a):this.constructor(d).find(a)}if(e.isFunction(a))return f.ready(a);a.selector!==b&&(this.selector=a.selector,this.context=a.context);return e.makeArray(a,this)},selector:"",jquery:"1.7.1",length:0,size:function(){return this.length},toArray:function(){return F.call(this,0)},get:function(a){return a==null?this.toArray():a<0?this[this.length+a]:this[a]},pushStack:function(a,b,c){var d=this.constructor();e.isArray(a)?E.apply(d,a):e.merge(d,a),d.prevObject=this,d.context=this.context,b==="find"?d.selector=this.selector+(this.selector?" ":"")+c:b&&(d.selector=this.selector+"."+b+"("+c+")");return d},each:function(a,b){return e.each(this,a,b)},ready:function(a){e.bindReady(),A.add(a);return this},eq:function(a){a=+a;return a===-1?this.slice(a):this.slice(a,a+1)},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},slice:function(){return this.pushStack(F.apply(this,arguments),"slice",F.call(arguments).join(","))},map:function(a){return this.pushStack(e.map(this,function(b,c){return a.call(b,c,b)}))},end:function(){return this.prevObject||this.constructor(null)},push:E,sort:[].sort,splice:[].splice},e.fn.init.prototype=e.fn,e.extend=e.fn.extend=function(){var a,c,d,f,g,h,i=arguments[0]||{},j=1,k=arguments.length,l=!1;typeof i=="boolean"&&(l=i,i=arguments[1]||{},j=2),typeof i!="object"&&!e.isFunction(i)&&(i={}),k===j&&(i=this,--j);for(;j<k;j++)if((a=arguments[j])!=null)for(c in a){d=i[c],f=a[c];if(i===f)continue;l&&f&&(e.isPlainObject(f)||(g=e.isArray(f)))?(g?(g=!1,h=d&&e.isArray(d)?d:[]):h=d&&e.isPlainObject(d)?d:{},i[c]=e.extend(l,h,f)):f!==b&&(i[c]=f)}return i},e.extend({noConflict:function(b){a.$===e&&(a.$=g),b&&a.jQuery===e&&(a.jQuery=f);return e},isReady:!1,readyWait:1,holdReady:function(a){a?e.readyWait++:e.ready(!0)},ready:function(a){if(a===!0&&!--e.readyWait||a!==!0&&!e.isReady){if(!c.body)return setTimeout(e.ready,1);e.isReady=!0;if(a!==!0&&--e.readyWait>0)return;A.fireWith(c,[e]),e.fn.trigger&&e(c).trigger("ready").off("ready")}},bindReady:function(){if(!A){A=e.Callbacks("once memory");if(c.readyState==="complete")return setTimeout(e.ready,1);if(c.addEventListener)c.addEventListener("DOMContentLoaded",B,!1),a.addEventListener("load",e.ready,!1);else if(c.attachEvent){c.attachEvent("onreadystatechange",B),a.attachEvent("onload",e.ready);var b=!1;try{b=a.frameElement==null}catch(d){}c.documentElement.doScroll&&b&&J()}}},isFunction:function(a){return e.type(a)==="function"},isArray:Array.isArray||function(a){return e.type(a)==="array"},isWindow:function(a){return a&&typeof a=="object"&&"setInterval"in a},isNumeric:function(a){return!isNaN(parseFloat(a))&&isFinite(a)},type:function(a){return a==null?String(a):I[C.call(a)]||"object"},isPlainObject:function(a){if(!a||e.type(a)!=="object"||a.nodeType||e.isWindow(a))return!1;try{if(a.constructor&&!D.call(a,"constructor")&&!D.call(a.constructor.prototype,"isPrototypeOf"))return!1}catch(c){return!1}var d;for(d in a);return d===b||D.call(a,d)},isEmptyObject:function(a){for(var b in a)return!1;return!0},error:function(a){throw new Error(a)},parseJSON:function(b){if(typeof b!="string"||!b)return null;b=e.trim(b);if(a.JSON&&a.JSON.parse)return a.JSON.parse(b);if(n.test(b.replace(o,"@").replace(p,"]").replace(q,"")))return(new Function("return "+b))();e.error("Invalid JSON: "+b)},parseXML:function(c){var d,f;try{a.DOMParser?(f=new DOMParser,d=f.parseFromString(c,"text/xml")):(d=new ActiveXObject("Microsoft.XMLDOM"),d.async="false",d.loadXML(c))}catch(g){d=b}(!d||!d.documentElement||d.getElementsByTagName("parsererror").length)&&e.error("Invalid XML: "+c);return d},noop:function(){},globalEval:function(b){b&&j.test(b)&&(a.execScript||function(b){a.eval.call(a,b)})(b)},camelCase:function(a){return a.replace(w,"ms-").replace(v,x)},nodeName:function(a,b){return a.nodeName&&a.nodeName.toUpperCase()===b.toUpperCase()},each:function(a,c,d){var f,g=0,h=a.length,i=h===b||e.isFunction(a);if(d){if(i){for(f in a)if(c.apply(a[f],d)===!1)break}else for(;g<h;)if(c.apply(a[g++],d)===!1)break}else if(i){for(f in a)if(c.call(a[f],f,a[f])===!1)break}else for(;g<h;)if(c.call(a[g],g,a[g++])===!1)break;return a},trim:G?function(a){return a==null?"":G.call(a)}:function(a){return a==null?"":(a+"").replace(k,"").replace(l,"")},makeArray:function(a,b){var c=b||[];if(a!=null){var d=e.type(a);a.length==null||d==="string"||d==="function"||d==="regexp"||e.isWindow(a)?E.call(c,a):e.merge(c,a)}return c},inArray:function(a,b,c){var d;if(b){if(H)return H.call(b,a,c);d=b.length,c=c?c<0?Math.max(0,d+c):c:0;for(;c<d;c++)if(c in b&&b[c]===a)return c}return-1},merge:function(a,c){var d=a.length,e=0;if(typeof c.length=="number")for(var f=c.length;e<f;e++)a[d++]=c[e];else while(c[e]!==b)a[d++]=c[e++];a.length=d;return a},grep:function(a,b,c){var d=[],e;c=!!c;for(var f=0,g=a.length;f<g;f++)e=!!b(a[f],f),c!==e&&d.push(a[f]);return d},map:function(a,c,d){var f,g,h=[],i=0,j=a.length,k=a instanceof e||j!==b&&typeof j=="number"&&(j>0&&a[0]&&a[j-1]||j===0||e.isArray(a));if(k)for(;i<j;i++)f=c(a[i],i,d),f!=null&&(h[h.length]=f);else for(g in a)f=c(a[g],g,d),f!=null&&(h[h.length]=f);return h.concat.apply([],h)},guid:1,proxy:function(a,c){if(typeof c=="string"){var d=a[c];c=a,a=d}if(!e.isFunction(a))return b;var f=F.call(arguments,2),g=function(){return a.apply(c,f.concat(F.call(arguments)))};g.guid=a.guid=a.guid||g.guid||e.guid++;return g},access:function(a,c,d,f,g,h){var i=a.length;if(typeof c=="object"){for(var j in c)e.access(a,j,c[j],f,g,d);return a}if(d!==b){f=!h&&f&&e.isFunction(d);for(var k=0;k<i;k++)g(a[k],c,f?d.call(a[k],k,g(a[k],c)):d,h);return a}return i?g(a[0],c):b},now:function(){return(new Date).getTime()},uaMatch:function(a){a=a.toLowerCase();var b=r.exec(a)||s.exec(a)||t.exec(a)||a.indexOf("compatible")<0&&u.exec(a)||[];return{browser:b[1]||"",version:b[2]||"0"}},sub:function(){function a(b,c){return new a.fn.init(b,c)}e.extend(!0,a,this),a.superclass=this,a.fn=a.prototype=this(),a.fn.constructor=a,a.sub=this.sub,a.fn.init=function(d,f){f&&f instanceof e&&!(f instanceof a)&&(f=a(f));return e.fn.init.call(this,d,f,b)},a.fn.init.prototype=a.fn;var b=a(c);return a},browser:{}}),e.each("Boolean Number String Function Array Date RegExp Object".split(" "),function(a,b){I["[object "+b+"]"]=b.toLowerCase()}),z=e.uaMatch(y),z.browser&&(e.browser[z.browser]=!0,e.browser.version=z.version),e.browser.webkit&&(e.browser.safari=!0),j.test(" ")&&(k=/^[\s\xA0]+/,l=/[\s\xA0]+$/),h=e(c),c.addEventListener?B=function(){c.removeEventListener("DOMContentLoaded",B,!1),e.ready()}:c.attachEvent&&(B=function(){c.readyState==="complete"&&(c.detachEvent("onreadystatechange",B),e.ready())});return e}(),g={};f.Callbacks=function(a){a=a?g[a]||h(a):{};var c=[],d=[],e,i,j,k,l,m=function(b){var d,e,g,h,i;for(d=0,e=b.length;d<e;d++)g=b[d],h=f.type(g),h==="array"?m(g):h==="function"&&(!a.unique||!o.has(g))&&c.push(g)},n=function(b,f){f=f||[],e=!a.memory||[b,f],i=!0,l=j||0,j=0,k=c.length;for(;c&&l<k;l++)if(c[l].apply(b,f)===!1&&a.stopOnFalse){e=!0;break}i=!1,c&&(a.once?e===!0?o.disable():c=[]:d&&d.length&&(e=d.shift(),o.fireWith(e[0],e[1])))},o={add:function(){if(c){var a=c.length;m(arguments),i?k=c.length:e&&e!==!0&&(j=a,n(e[0],e[1]))}return this},remove:function(){if(c){var b=arguments,d=0,e=b.length;for(;d<e;d++)for(var f=0;f<c.length;f++)if(b[d]===c[f]){i&&f<=k&&(k--,f<=l&&l--),c.splice(f--,1);if(a.unique)break}}return this},has:function(a){if(c){var b=0,d=c.length;for(;b<d;b++)if(a===c[b])return!0}return!1},empty:function(){c=[];return this},disable:function(){c=d=e=b;return this},disabled:function(){return!c},lock:function(){d=b,(!e||e===!0)&&o.disable();return this},locked:function(){return!d},fireWith:function(b,c){d&&(i?a.once||d.push([b,c]):(!a.once||!e)&&n(b,c));return this},fire:function(){o.fireWith(this,arguments);return this},fired:function(){return!!e}};return o};var i=[].slice;f.extend({Deferred:function(a){var b=f.Callbacks("once memory"),c=f.Callbacks("once memory"),d=f.Callbacks("memory"),e="pending",g={resolve:b,reject:c,notify:d},h={done:b.add,fail:c.add,progress:d.add,state:function(){return e},isResolved:b.fired,isRejected:c.fired,then:function(a,b,c){i.done(a).fail(b).progress(c);return this},always:function(){i.done.apply(i,arguments).fail.apply(i,arguments);return this},pipe:function(a,b,c){return f.Deferred(function(d){f.each({done:[a,"resolve"],fail:[b,"reject"],progress:[c,"notify"]},function(a,b){var c=b[0],e=b[1],g;f.isFunction(c)?i[a](function(){g=c.apply(this,arguments),g&&f.isFunction(g.promise)?g.promise().then(d.resolve,d.reject,d.notify):d[e+"With"](this===i?d:this,[g])}):i[a](d[e])})}).promise()},promise:function(a){if(a==null)a=h;else for(var b in h)a[b]=h[b];return a}},i=h.promise({}),j;for(j in g)i[j]=g[j].fire,i[j+"With"]=g[j].fireWith;i.done(function(){e="resolved"},c.disable,d.lock).fail(function(){e="rejected"},b.disable,d.lock),a&&a.call(i,i);return i},when:function(a){function m(a){return function(b){e[a]=arguments.length>1?i.call(arguments,0):b,j.notifyWith(k,e)}}function l(a){return function(c){b[a]=arguments.length>1?i.call(arguments,0):c,--g||j.resolveWith(j,b)}}var b=i.call(arguments,0),c=0,d=b.length,e=Array(d),g=d,h=d,j=d<=1&&a&&f.isFunction(a.promise)?a:f.Deferred(),k=j.promise();if(d>1){for(;c<d;c++)b[c]&&b[c].promise&&f.isFunction(b[c].promise)?b[c].promise().then(l(c),j.reject,m(c)):--g;g||j.resolveWith(j,b)}else j!==a&&j.resolveWith(j,d?[a]:[]);return k}}),f.support=function(){var b,d,e,g,h,i,j,k,l,m,n,o,p,q=c.createElement("div"),r=c.documentElement;q.setAttribute("className","t"),q.innerHTML="   <link/><table></table><a href='/a' style='top:1px;float:left;opacity:.55;'>a</a><input type='checkbox'/>",d=q.getElementsByTagName("*"),e=q.getElementsByTagName("a")[0];if(!d||!d.length||!e)return{};g=c.createElement("select"),h=g.appendChild(c.createElement("option")),i=q.getElementsByTagName("input")[0],b={leadingWhitespace:q.firstChild.nodeType===3,tbody:!q.getElementsByTagName("tbody").length,htmlSerialize:!!q.getElementsByTagName("link").length,style:/top/.test(e.getAttribute("style")),hrefNormalized:e.getAttribute("href")==="/a",opacity:/^0.55/.test(e.style.opacity),cssFloat:!!e.style.cssFloat,checkOn:i.value==="on",optSelected:h.selected,getSetAttribute:q.className!=="t",enctype:!!c.createElement("form").enctype,html5Clone:c.createElement("nav").cloneNode(!0).outerHTML!=="<:nav></:nav>",submitBubbles:!0,changeBubbles:!0,focusinBubbles:!1,deleteExpando:!0,noCloneEvent:!0,inlineBlockNeedsLayout:!1,shrinkWrapBlocks:!1,reliableMarginRight:!0},i.checked=!0,b.noCloneChecked=i.cloneNode(!0).checked,g.disabled=!0,b.optDisabled=!h.disabled;try{delete q.test}catch(s){b.deleteExpando=!1}!q.addEventListener&&q.attachEvent&&q.fireEvent&&(q.attachEvent("onclick",function(){b.noCloneEvent=!1}),q.cloneNode(!0).fireEvent("onclick")),i=c.createElement("input"),i.value="t",i.setAttribute("type","radio"),b.radioValue=i.value==="t",i.setAttribute("checked","checked"),q.appendChild(i),k=c.createDocumentFragment(),k.appendChild(q.lastChild),b.checkClone=k.cloneNode(!0).cloneNode(!0).lastChild.checked,b.appendChecked=i.checked,k.removeChild(i),k.appendChild(q),q.innerHTML="",a.getComputedStyle&&(j=c.createElement("div"),j.style.width="0",j.style.marginRight="0",q.style.width="2px",q.appendChild(j),b.reliableMarginRight=(parseInt((a.getComputedStyle(j,null)||{marginRight:0}).marginRight,10)||0)===0);if(q.attachEvent)for(o in{submit:1,change:1,focusin:1})n="on"+o,p=n in q,p||(q.setAttribute(n,"return;"),p=typeof q[n]=="function"),b[o+"Bubbles"]=p;k.removeChild(q),k=g=h=j=q=i=null,f(function(){var a,d,e,g,h,i,j,k,m,n,o,r=c.getElementsByTagName("body")[0];!r||(j=1,k="position:absolute;top:0;left:0;width:1px;height:1px;margin:0;",m="visibility:hidden;border:0;",n="style='"+k+"border:5px solid #000;padding:0;'",o="<div "+n+"><div></div></div>"+"<table "+n+" cellpadding='0' cellspacing='0'>"+"<tr><td></td></tr></table>",a=c.createElement("div"),a.style.cssText=m+"width:0;height:0;position:static;top:0;margin-top:"+j+"px",r.insertBefore(a,r.firstChild),q=c.createElement("div"),a.appendChild(q),q.innerHTML="<table><tr><td style='padding:0;border:0;display:none'></td><td>t</td></tr></table>",l=q.getElementsByTagName("td"),p=l[0].offsetHeight===0,l[0].style.display="",l[1].style.display="none",b.reliableHiddenOffsets=p&&l[0].offsetHeight===0,q.innerHTML="",q.style.width=q.style.paddingLeft="1px",f.boxModel=b.boxModel=q.offsetWidth===2,typeof q.style.zoom!="undefined"&&(q.style.display="inline",q.style.zoom=1,b.inlineBlockNeedsLayout=q.offsetWidth===2,q.style.display="",q.innerHTML="<div style='width:4px;'></div>",b.shrinkWrapBlocks=q.offsetWidth!==2),q.style.cssText=k+m,q.innerHTML=o,d=q.firstChild,e=d.firstChild,h=d.nextSibling.firstChild.firstChild,i={doesNotAddBorder:e.offsetTop!==5,doesAddBorderForTableAndCells:h.offsetTop===5},e.style.position="fixed",e.style.top="20px",i.fixedPosition=e.offsetTop===20||e.offsetTop===15,e.style.position=e.style.top="",d.style.overflow="hidden",d.style.position="relative",i.subtractsBorderForOverflowNotVisible=e.offsetTop===-5,i.doesNotIncludeMarginInBodyOffset=r.offsetTop!==j,r.removeChild(a),q=a=null,f.extend(b,i))});return b}();var j=/^(?:\{.*\}|\[.*\])$/,k=/([A-Z])/g;f.extend({cache:{},uuid:0,expando:"jQuery"+(f.fn.jquery+Math.random()).replace(/\D/g,""),noData:{embed:!0,object:"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",applet:!0},hasData:function(a){a=a.nodeType?f.cache[a[f.expando]]:a[f.expando];return!!a&&!m(a)},data:function(a,c,d,e){if(!!f.acceptData(a)){var g,h,i,j=f.expando,k=typeof c=="string",l=a.nodeType,m=l?f.cache:a,n=l?a[j]:a[j]&&j,o=c==="events";if((!n||!m[n]||!o&&!e&&!m[n].data)&&k&&d===b)return;n||(l?a[j]=n=++f.uuid:n=j),m[n]||(m[n]={},l||(m[n].toJSON=f.noop));if(typeof c=="object"||typeof c=="function")e?m[n]=f.extend(m[n],c):m[n].data=f.extend(m[n].data,c);g=h=m[n],e||(h.data||(h.data={}),h=h.data),d!==b&&(h[f.camelCase(c)]=d);if(o&&!h[c])return g.events;k?(i=h[c],i==null&&(i=h[f.camelCase(c)])):i=h;return i}},removeData:function(a,b,c){if(!!f.acceptData(a)){var d,e,g,h=f.expando,i=a.nodeType,j=i?f.cache:a,k=i?a[h]:h;if(!j[k])return;if(b){d=c?j[k]:j[k].data;if(d){f.isArray(b)||(b in d?b=[b]:(b=f.camelCase(b),b in d?b=[b]:b=b.split(" ")));for(e=0,g=b.length;e<g;e++)delete d[b[e]];if(!(c?m:f.isEmptyObject)(d))return}}if(!c){delete j[k].data;if(!m(j[k]))return}f.support.deleteExpando||!j.setInterval?delete j[k]:j[k]=null,i&&(f.support.deleteExpando?delete a[h]:a.removeAttribute?a.removeAttribute(h):a[h]=null)}},_data:function(a,b,c){return f.data(a,b,c,!0)},acceptData:function(a){if(a.nodeName){var b=f.noData[a.nodeName.toLowerCase()];if(b)return b!==!0&&a.getAttribute("classid")===b}return!0}}),f.fn.extend({data:function(a,c){var d,e,g,h=null;if(typeof a=="undefined"){if(this.length){h=f.data(this[0]);if(this[0].nodeType===1&&!f._data(this[0],"parsedAttrs")){e=this[0].attributes;for(var i=0,j=e.length;i<j;i++)g=e[i].name,g.indexOf("data-")===0&&(g=f.camelCase(g.substring(5)),l(this[0],g,h[g]));f._data(this[0],"parsedAttrs",!0)}}return h}if(typeof a=="object")return this.each(function(){f.data(this,a)});d=a.split("."),d[1]=d[1]?"."+d[1]:"";if(c===b){h=this.triggerHandler("getData"+d[1]+"!",[d[0]]),h===b&&this.length&&(h=f.data(this[0],a),h=l(this[0],a,h));return h===b&&d[1]?this.data(d[0]):h}return this.each(function(){var b=f(this),e=[d[0],c];b.triggerHandler("setData"+d[1]+"!",e),f.data(this,a,c),b.triggerHandler("changeData"+d[1]+"!",e)})},removeData:function(a){return this.each(function(){f.removeData(this,a)})}}),f.extend({_mark:function(a,b){a&&(b=(b||"fx")+"mark",f._data(a,b,(f._data(a,b)||0)+1))},_unmark:function(a,b,c){a!==!0&&(c=b,b=a,a=!1);if(b){c=c||"fx";var d=c+"mark",e=a?0:(f._data(b,d)||1)-1;e?f._data(b,d,e):(f.removeData(b,d,!0),n(b,c,"mark"))}},queue:function(a,b,c){var d;if(a){b=(b||"fx")+"queue",d=f._data(a,b),c&&(!d||f.isArray(c)?d=f._data(a,b,f.makeArray(c)):d.push(c));return d||[]}},dequeue:function(a,b){b=b||"fx";var c=f.queue(a,b),d=c.shift(),e={};d==="inprogress"&&(d=c.shift()),d&&(b==="fx"&&c.unshift("inprogress"),f._data(a,b+".run",e),d.call(a,function(){f.dequeue(a,b)},e)),c.length||(f.removeData(a,b+"queue "+b+".run",!0),n(a,b,"queue"))}}),f.fn.extend({queue:function(a,c){typeof a!="string"&&(c=a,a="fx");if(c===b)return f.queue(this[0],a);return this.each(function(){var b=f.queue(this,a,c);a==="fx"&&b[0]!=="inprogress"&&f.dequeue(this,a)})},dequeue:function(a){return this.each(function(){f.dequeue(this,a)})},delay:function(a,b){a=f.fx?f.fx.speeds[a]||a:a,b=b||"fx";return this.queue(b,function(b,c){var d=setTimeout(b,a);c.stop=function(){clearTimeout(d)}})},clearQueue:function(a){return this.queue(a||"fx",[])},promise:function(a,c){function m(){--h||d.resolveWith(e,[e])}typeof a!="string"&&(c=a,a=b),a=a||"fx";var d=f.Deferred(),e=this,g=e.length,h=1,i=a+"defer",j=a+"queue",k=a+"mark",l;while(g--)if(l=f.data(e[g],i,b,!0)||(f.data(e[g],j,b,!0)||f.data(e[g],k,b,!0))&&f.data(e[g],i,f.Callbacks("once memory"),!0))h++,l.add(m);m();return d.promise()}});var o=/[\n\t\r]/g,p=/\s+/,q=/\r/g,r=/^(?:button|input)$/i,s=/^(?:button|input|object|select|textarea)$/i,t=/^a(?:rea)?$/i,u=/^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,v=f.support.getSetAttribute,w,x,y;f.fn.extend({attr:function(a,b){return f.access(this,a,b,!0,f.attr)},removeAttr:function(a){return this.each(function(){f.removeAttr(this,a)})},prop:function(a,b){return f.access(this,a,b,!0,f.prop)},removeProp:function(a){a=f.propFix[a]||a;return this.each(function(){try{this[a]=b,delete this[a]}catch(c){}})},addClass:function(a){var b,c,d,e,g,h,i;if(f.isFunction(a))return this.each(function(b){f(this).addClass(a.call(this,b,this.className))});if(a&&typeof a=="string"){b=a.split(p);for(c=0,d=this.length;c<d;c++){e=this[c];if(e.nodeType===1)if(!e.className&&b.length===1)e.className=a;else{g=" "+e.className+" ";for(h=0,i=b.length;h<i;h++)~g.indexOf(" "+b[h]+" ")||(g+=b[h]+" ");e.className=f.trim(g)}}}return this},removeClass:function(a){var c,d,e,g,h,i,j;if(f.isFunction(a))return this.each(function(b){f(this).removeClass(a.call(this,b,this.className))});if(a&&typeof a=="string"||a===b){c=(a||"").split(p);for(d=0,e=this.length;d<e;d++){g=this[d];if(g.nodeType===1&&g.className)if(a){h=(" "+g.className+" ").replace(o," ");for(i=0,j=c.length;i<j;i++)h=h.replace(" "+c[i]+" "," ");g.className=f.trim(h)}else g.className=""}}return this},toggleClass:function(a,b){var c=typeof a,d=typeof b=="boolean";if(f.isFunction(a))return this.each(function(c){f(this).toggleClass(a.call(this,c,this.className,b),b)});return this.each(function(){if(c==="string"){var e,g=0,h=f(this),i=b,j=a.split(p);while(e=j[g++])i=d?i:!h.hasClass(e),h[i?"addClass":"removeClass"](e)}else if(c==="undefined"||c==="boolean")this.className&&f._data(this,"__className__",this.className),this.className=this.className||a===!1?"":f._data(this,"__className__")||""})},hasClass:function(a){var b=" "+a+" ",c=0,d=this.length;for(;c<d;c++)if(this[c].nodeType===1&&(" "+this[c].className+" ").replace(o," ").indexOf(b)>-1)return!0;return!1},val:function(a){var c,d,e,g=this[0];{if(!!arguments.length){e=f.isFunction(a);return this.each(function(d){var g=f(this),h;if(this.nodeType===1){e?h=a.call(this,d,g.val()):h=a,h==null?h="":typeof h=="number"?h+="":f.isArray(h)&&(h=f.map(h,function(a){return a==null?"":a+""})),c=f.valHooks[this.nodeName.toLowerCase()]||f.valHooks[this.type];if(!c||!("set"in c)||c.set(this,h,"value")===b)this.value=h}})}if(g){c=f.valHooks[g.nodeName.toLowerCase()]||f.valHooks[g.type];if(c&&"get"in c&&(d=c.get(g,"value"))!==b)return d;d=g.value;return typeof d=="string"?d.replace(q,""):d==null?"":d}}}}),f.extend({valHooks:{option:{get:function(a){var b=a.attributes.value;return!b||b.specified?a.value:a.text}},select:{get:function(a){var b,c,d,e,g=a.selectedIndex,h=[],i=a.options,j=a.type==="select-one";if(g<0)return null;c=j?g:0,d=j?g+1:i.length;for(;c<d;c++){e=i[c];if(e.selected&&(f.support.optDisabled?!e.disabled:e.getAttribute("disabled")===null)&&(!e.parentNode.disabled||!f.nodeName(e.parentNode,"optgroup"))){b=f(e).val();if(j)return b;h.push(b)}}if(j&&!h.length&&i.length)return f(i[g]).val();return h},set:function(a,b){var c=f.makeArray(b);f(a).find("option").each(function(){this.selected=f.inArray(f(this).val(),c)>=0}),c.length||(a.selectedIndex=-1);return c}}},attrFn:{val:!0,css:!0,html:!0,text:!0,data:!0,width:!0,height:!0,offset:!0},attr:function(a,c,d,e){var g,h,i,j=a.nodeType;if(!!a&&j!==3&&j!==8&&j!==2){if(e&&c in f.attrFn)return f(a)[c](d);if(typeof a.getAttribute=="undefined")return f.prop(a,c,d);i=j!==1||!f.isXMLDoc(a),i&&(c=c.toLowerCase(),h=f.attrHooks[c]||(u.test(c)?x:w));if(d!==b){if(d===null){f.removeAttr(a,c);return}if(h&&"set"in h&&i&&(g=h.set(a,d,c))!==b)return g;a.setAttribute(c,""+d);return d}if(h&&"get"in h&&i&&(g=h.get(a,c))!==null)return g;g=a.getAttribute(c);return g===null?b:g}},removeAttr:function(a,b){var c,d,e,g,h=0;if(b&&a.nodeType===1){d=b.toLowerCase().split(p),g=d.length;for(;h<g;h++)e=d[h],e&&(c=f.propFix[e]||e,f.attr(a,e,""),a.removeAttribute(v?e:c),u.test(e)&&c in a&&(a[c]=!1))}},attrHooks:{type:{set:function(a,b){if(r.test(a.nodeName)&&a.parentNode)f.error("type property can't be changed");else if(!f.support.radioValue&&b==="radio"&&f.nodeName(a,"input")){var c=a.value;a.setAttribute("type",b),c&&(a.value=c);return b}}},value:{get:function(a,b){if(w&&f.nodeName(a,"button"))return w.get(a,b);return b in a?a.value:null},set:function(a,b,c){if(w&&f.nodeName(a,"button"))return w.set(a,b,c);a.value=b}}},propFix:{tabindex:"tabIndex",readonly:"readOnly","for":"htmlFor","class":"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder",contenteditable:"contentEditable"},prop:function(a,c,d){var e,g,h,i=a.nodeType;if(!!a&&i!==3&&i!==8&&i!==2){h=i!==1||!f.isXMLDoc(a),h&&(c=f.propFix[c]||c,g=f.propHooks[c]);return d!==b?g&&"set"in g&&(e=g.set(a,d,c))!==b?e:a[c]=d:g&&"get"in g&&(e=g.get(a,c))!==null?e:a[c]}},propHooks:{tabIndex:{get:function(a){var c=a.getAttributeNode("tabindex");return c&&c.specified?parseInt(c.value,10):s.test(a.nodeName)||t.test(a.nodeName)&&a.href?0:b}}}}),f.attrHooks.tabindex=f.propHooks.tabIndex,x={get:function(a,c){var d,e=f.prop(a,c);return e===!0||typeof e!="boolean"&&(d=a.getAttributeNode(c))&&d.nodeValue!==!1?c.toLowerCase():b},set:function(a,b,c){var d;b===!1?f.removeAttr(a,c):(d=f.propFix[c]||c,d in a&&(a[d]=!0),a.setAttribute(c,c.toLowerCase()));return c}},v||(y={name:!0,id:!0},w=f.valHooks.button={get:function(a,c){var d;d=a.getAttributeNode(c);return d&&(y[c]?d.nodeValue!=="":d.specified)?d.nodeValue:b},set:function(a,b,d){var e=a.getAttributeNode(d);e||(e=c.createAttribute(d),a.setAttributeNode(e));return e.nodeValue=b+""}},f.attrHooks.tabindex.set=w.set,f.each(["width","height"],function(a,b){f.attrHooks[b]=f.extend(f.attrHooks[b],{set:function(a,c){if(c===""){a.setAttribute(b,"auto");return c}}})}),f.attrHooks.contenteditable={get:w.get,set:function(a,b,c){b===""&&(b="false"),w.set(a,b,c)}}),f.support.hrefNormalized||f.each(["href","src","width","height"],function(a,c){f.attrHooks[c]=f.extend(f.attrHooks[c],{get:function(a){var d=a.getAttribute(c,2);return d===null?b:d}})}),f.support.style||(f.attrHooks.style={get:function(a){return a.style.cssText.toLowerCase()||b},set:function(a,b){return a.style.cssText=""+b}}),f.support.optSelected||(f.propHooks.selected=f.extend(f.propHooks.selected,{get:function(a){var b=a.parentNode;b&&(b.selectedIndex,b.parentNode&&b.parentNode.selectedIndex);return null}})),f.support.enctype||(f.propFix.enctype="encoding"),f.support.checkOn||f.each(["radio","checkbox"],function(){f.valHooks[this]={get:function(a){return a.getAttribute("value")===null?"on":a.value}}}),f.each(["radio","checkbox"],function(){f.valHooks[this]=f.extend(f.valHooks[this],{set:function(a,b){if(f.isArray(b))return a.checked=f.inArray(f(a).val(),b)>=0}})});var z=/^(?:textarea|input|select)$/i,A=/^([^\.]*)?(?:\.(.+))?$/,B=/\bhover(\.\S+)?\b/,C=/^key/,D=/^(?:mouse|contextmenu)|click/,E=/^(?:focusinfocus|focusoutblur)$/,F=/^(\w*)(?:#([\w\-]+))?(?:\.([\w\-]+))?$/,G=function(a){var b=F.exec(a);b&&(b[1]=(b[1]||"").toLowerCase(),b[3]=b[3]&&new RegExp("(?:^|\\s)"+b[3]+"(?:\\s|$)"));return b},H=function(a,b){var c=a.attributes||{};return(!b[1]||a.nodeName.toLowerCase()===b[1])&&(!b[2]||(c.id||{}).value===b[2])&&(!b[3]||b[3].test((c["class"]||{}).value))},I=function(a){return f.event.special.hover?a:a.replace(B,"mouseenter$1 mouseleave$1")};
  f.event={add:function(a,c,d,e,g){var h,i,j,k,l,m,n,o,p,q,r,s;if(!(a.nodeType===3||a.nodeType===8||!c||!d||!(h=f._data(a)))){d.handler&&(p=d,d=p.handler),d.guid||(d.guid=f.guid++),j=h.events,j||(h.events=j={}),i=h.handle,i||(h.handle=i=function(a){return typeof f!="undefined"&&(!a||f.event.triggered!==a.type)?f.event.dispatch.apply(i.elem,arguments):b},i.elem=a),c=f.trim(I(c)).split(" ");for(k=0;k<c.length;k++){l=A.exec(c[k])||[],m=l[1],n=(l[2]||"").split(".").sort(),s=f.event.special[m]||{},m=(g?s.delegateType:s.bindType)||m,s=f.event.special[m]||{},o=f.extend({type:m,origType:l[1],data:e,handler:d,guid:d.guid,selector:g,quick:G(g),namespace:n.join(".")},p),r=j[m];if(!r){r=j[m]=[],r.delegateCount=0;if(!s.setup||s.setup.call(a,e,n,i)===!1)a.addEventListener?a.addEventListener(m,i,!1):a.attachEvent&&a.attachEvent("on"+m,i)}s.add&&(s.add.call(a,o),o.handler.guid||(o.handler.guid=d.guid)),g?r.splice(r.delegateCount++,0,o):r.push(o),f.event.global[m]=!0}a=null}},global:{},remove:function(a,b,c,d,e){var g=f.hasData(a)&&f._data(a),h,i,j,k,l,m,n,o,p,q,r,s;if(!!g&&!!(o=g.events)){b=f.trim(I(b||"")).split(" ");for(h=0;h<b.length;h++){i=A.exec(b[h])||[],j=k=i[1],l=i[2];if(!j){for(j in o)f.event.remove(a,j+b[h],c,d,!0);continue}p=f.event.special[j]||{},j=(d?p.delegateType:p.bindType)||j,r=o[j]||[],m=r.length,l=l?new RegExp("(^|\\.)"+l.split(".").sort().join("\\.(?:.*\\.)?")+"(\\.|$)"):null;for(n=0;n<r.length;n++)s=r[n],(e||k===s.origType)&&(!c||c.guid===s.guid)&&(!l||l.test(s.namespace))&&(!d||d===s.selector||d==="**"&&s.selector)&&(r.splice(n--,1),s.selector&&r.delegateCount--,p.remove&&p.remove.call(a,s));r.length===0&&m!==r.length&&((!p.teardown||p.teardown.call(a,l)===!1)&&f.removeEvent(a,j,g.handle),delete o[j])}f.isEmptyObject(o)&&(q=g.handle,q&&(q.elem=null),f.removeData(a,["events","handle"],!0))}},customEvent:{getData:!0,setData:!0,changeData:!0},trigger:function(c,d,e,g){if(!e||e.nodeType!==3&&e.nodeType!==8){var h=c.type||c,i=[],j,k,l,m,n,o,p,q,r,s;if(E.test(h+f.event.triggered))return;h.indexOf("!")>=0&&(h=h.slice(0,-1),k=!0),h.indexOf(".")>=0&&(i=h.split("."),h=i.shift(),i.sort());if((!e||f.event.customEvent[h])&&!f.event.global[h])return;c=typeof c=="object"?c[f.expando]?c:new f.Event(h,c):new f.Event(h),c.type=h,c.isTrigger=!0,c.exclusive=k,c.namespace=i.join("."),c.namespace_re=c.namespace?new RegExp("(^|\\.)"+i.join("\\.(?:.*\\.)?")+"(\\.|$)"):null,o=h.indexOf(":")<0?"on"+h:"";if(!e){j=f.cache;for(l in j)j[l].events&&j[l].events[h]&&f.event.trigger(c,d,j[l].handle.elem,!0);return}c.result=b,c.target||(c.target=e),d=d!=null?f.makeArray(d):[],d.unshift(c),p=f.event.special[h]||{};if(p.trigger&&p.trigger.apply(e,d)===!1)return;r=[[e,p.bindType||h]];if(!g&&!p.noBubble&&!f.isWindow(e)){s=p.delegateType||h,m=E.test(s+h)?e:e.parentNode,n=null;for(;m;m=m.parentNode)r.push([m,s]),n=m;n&&n===e.ownerDocument&&r.push([n.defaultView||n.parentWindow||a,s])}for(l=0;l<r.length&&!c.isPropagationStopped();l++)m=r[l][0],c.type=r[l][1],q=(f._data(m,"events")||{})[c.type]&&f._data(m,"handle"),q&&q.apply(m,d),q=o&&m[o],q&&f.acceptData(m)&&q.apply(m,d)===!1&&c.preventDefault();c.type=h,!g&&!c.isDefaultPrevented()&&(!p._default||p._default.apply(e.ownerDocument,d)===!1)&&(h!=="click"||!f.nodeName(e,"a"))&&f.acceptData(e)&&o&&e[h]&&(h!=="focus"&&h!=="blur"||c.target.offsetWidth!==0)&&!f.isWindow(e)&&(n=e[o],n&&(e[o]=null),f.event.triggered=h,e[h](),f.event.triggered=b,n&&(e[o]=n));return c.result}},dispatch:function(c){c=f.event.fix(c||a.event);var d=(f._data(this,"events")||{})[c.type]||[],e=d.delegateCount,g=[].slice.call(arguments,0),h=!c.exclusive&&!c.namespace,i=[],j,k,l,m,n,o,p,q,r,s,t;g[0]=c,c.delegateTarget=this;if(e&&!c.target.disabled&&(!c.button||c.type!=="click")){m=f(this),m.context=this.ownerDocument||this;for(l=c.target;l!=this;l=l.parentNode||this){o={},q=[],m[0]=l;for(j=0;j<e;j++)r=d[j],s=r.selector,o[s]===b&&(o[s]=r.quick?H(l,r.quick):m.is(s)),o[s]&&q.push(r);q.length&&i.push({elem:l,matches:q})}}d.length>e&&i.push({elem:this,matches:d.slice(e)});for(j=0;j<i.length&&!c.isPropagationStopped();j++){p=i[j],c.currentTarget=p.elem;for(k=0;k<p.matches.length&&!c.isImmediatePropagationStopped();k++){r=p.matches[k];if(h||!c.namespace&&!r.namespace||c.namespace_re&&c.namespace_re.test(r.namespace))c.data=r.data,c.handleObj=r,n=((f.event.special[r.origType]||{}).handle||r.handler).apply(p.elem,g),n!==b&&(c.result=n,n===!1&&(c.preventDefault(),c.stopPropagation()))}}return c.result},props:"attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(a,b){a.which==null&&(a.which=b.charCode!=null?b.charCode:b.keyCode);return a}},mouseHooks:{props:"button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(a,d){var e,f,g,h=d.button,i=d.fromElement;a.pageX==null&&d.clientX!=null&&(e=a.target.ownerDocument||c,f=e.documentElement,g=e.body,a.pageX=d.clientX+(f&&f.scrollLeft||g&&g.scrollLeft||0)-(f&&f.clientLeft||g&&g.clientLeft||0),a.pageY=d.clientY+(f&&f.scrollTop||g&&g.scrollTop||0)-(f&&f.clientTop||g&&g.clientTop||0)),!a.relatedTarget&&i&&(a.relatedTarget=i===a.target?d.toElement:i),!a.which&&h!==b&&(a.which=h&1?1:h&2?3:h&4?2:0);return a}},fix:function(a){if(a[f.expando])return a;var d,e,g=a,h=f.event.fixHooks[a.type]||{},i=h.props?this.props.concat(h.props):this.props;a=f.Event(g);for(d=i.length;d;)e=i[--d],a[e]=g[e];a.target||(a.target=g.srcElement||c),a.target.nodeType===3&&(a.target=a.target.parentNode),a.metaKey===b&&(a.metaKey=a.ctrlKey);return h.filter?h.filter(a,g):a},special:{ready:{setup:f.bindReady},load:{noBubble:!0},focus:{delegateType:"focusin"},blur:{delegateType:"focusout"},beforeunload:{setup:function(a,b,c){f.isWindow(this)&&(this.onbeforeunload=c)},teardown:function(a,b){this.onbeforeunload===b&&(this.onbeforeunload=null)}}},simulate:function(a,b,c,d){var e=f.extend(new f.Event,c,{type:a,isSimulated:!0,originalEvent:{}});d?f.event.trigger(e,null,b):f.event.dispatch.call(b,e),e.isDefaultPrevented()&&c.preventDefault()}},f.event.handle=f.event.dispatch,f.removeEvent=c.removeEventListener?function(a,b,c){a.removeEventListener&&a.removeEventListener(b,c,!1)}:function(a,b,c){a.detachEvent&&a.detachEvent("on"+b,c)},f.Event=function(a,b){if(!(this instanceof f.Event))return new f.Event(a,b);a&&a.type?(this.originalEvent=a,this.type=a.type,this.isDefaultPrevented=a.defaultPrevented||a.returnValue===!1||a.getPreventDefault&&a.getPreventDefault()?K:J):this.type=a,b&&f.extend(this,b),this.timeStamp=a&&a.timeStamp||f.now(),this[f.expando]=!0},f.Event.prototype={preventDefault:function(){this.isDefaultPrevented=K;var a=this.originalEvent;!a||(a.preventDefault?a.preventDefault():a.returnValue=!1)},stopPropagation:function(){this.isPropagationStopped=K;var a=this.originalEvent;!a||(a.stopPropagation&&a.stopPropagation(),a.cancelBubble=!0)},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=K,this.stopPropagation()},isDefaultPrevented:J,isPropagationStopped:J,isImmediatePropagationStopped:J},f.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(a,b){f.event.special[a]={delegateType:b,bindType:b,handle:function(a){var c=this,d=a.relatedTarget,e=a.handleObj,g=e.selector,h;if(!d||d!==c&&!f.contains(c,d))a.type=e.origType,h=e.handler.apply(this,arguments),a.type=b;return h}}}),f.support.submitBubbles||(f.event.special.submit={setup:function(){if(f.nodeName(this,"form"))return!1;f.event.add(this,"click._submit keypress._submit",function(a){var c=a.target,d=f.nodeName(c,"input")||f.nodeName(c,"button")?c.form:b;d&&!d._submit_attached&&(f.event.add(d,"submit._submit",function(a){this.parentNode&&!a.isTrigger&&f.event.simulate("submit",this.parentNode,a,!0)}),d._submit_attached=!0)})},teardown:function(){if(f.nodeName(this,"form"))return!1;f.event.remove(this,"._submit")}}),f.support.changeBubbles||(f.event.special.change={setup:function(){if(z.test(this.nodeName)){if(this.type==="checkbox"||this.type==="radio")f.event.add(this,"propertychange._change",function(a){a.originalEvent.propertyName==="checked"&&(this._just_changed=!0)}),f.event.add(this,"click._change",function(a){this._just_changed&&!a.isTrigger&&(this._just_changed=!1,f.event.simulate("change",this,a,!0))});return!1}f.event.add(this,"beforeactivate._change",function(a){var b=a.target;z.test(b.nodeName)&&!b._change_attached&&(f.event.add(b,"change._change",function(a){this.parentNode&&!a.isSimulated&&!a.isTrigger&&f.event.simulate("change",this.parentNode,a,!0)}),b._change_attached=!0)})},handle:function(a){var b=a.target;if(this!==b||a.isSimulated||a.isTrigger||b.type!=="radio"&&b.type!=="checkbox")return a.handleObj.handler.apply(this,arguments)},teardown:function(){f.event.remove(this,"._change");return z.test(this.nodeName)}}),f.support.focusinBubbles||f.each({focus:"focusin",blur:"focusout"},function(a,b){var d=0,e=function(a){f.event.simulate(b,a.target,f.event.fix(a),!0)};f.event.special[b]={setup:function(){d++===0&&c.addEventListener(a,e,!0)},teardown:function(){--d===0&&c.removeEventListener(a,e,!0)}}}),f.fn.extend({on:function(a,c,d,e,g){var h,i;if(typeof a=="object"){typeof c!="string"&&(d=c,c=b);for(i in a)this.on(i,c,d,a[i],g);return this}d==null&&e==null?(e=c,d=c=b):e==null&&(typeof c=="string"?(e=d,d=b):(e=d,d=c,c=b));if(e===!1)e=J;else if(!e)return this;g===1&&(h=e,e=function(a){f().off(a);return h.apply(this,arguments)},e.guid=h.guid||(h.guid=f.guid++));return this.each(function(){f.event.add(this,a,e,d,c)})},one:function(a,b,c,d){return this.on.call(this,a,b,c,d,1)},off:function(a,c,d){if(a&&a.preventDefault&&a.handleObj){var e=a.handleObj;f(a.delegateTarget).off(e.namespace?e.type+"."+e.namespace:e.type,e.selector,e.handler);return this}if(typeof a=="object"){for(var g in a)this.off(g,c,a[g]);return this}if(c===!1||typeof c=="function")d=c,c=b;d===!1&&(d=J);return this.each(function(){f.event.remove(this,a,d,c)})},bind:function(a,b,c){return this.on(a,null,b,c)},unbind:function(a,b){return this.off(a,null,b)},live:function(a,b,c){f(this.context).on(a,this.selector,b,c);return this},die:function(a,b){f(this.context).off(a,this.selector||"**",b);return this},delegate:function(a,b,c,d){return this.on(b,a,c,d)},undelegate:function(a,b,c){return arguments.length==1?this.off(a,"**"):this.off(b,a,c)},trigger:function(a,b){return this.each(function(){f.event.trigger(a,b,this)})},triggerHandler:function(a,b){if(this[0])return f.event.trigger(a,b,this[0],!0)},toggle:function(a){var b=arguments,c=a.guid||f.guid++,d=0,e=function(c){var e=(f._data(this,"lastToggle"+a.guid)||0)%d;f._data(this,"lastToggle"+a.guid,e+1),c.preventDefault();return b[e].apply(this,arguments)||!1};e.guid=c;while(d<b.length)b[d++].guid=c;return this.click(e)},hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)}}),f.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(a,b){f.fn[b]=function(a,c){c==null&&(c=a,a=null);return arguments.length>0?this.on(b,null,a,c):this.trigger(b)},f.attrFn&&(f.attrFn[b]=!0),C.test(b)&&(f.event.fixHooks[b]=f.event.keyHooks),D.test(b)&&(f.event.fixHooks[b]=f.event.mouseHooks)}),function(){function x(a,b,c,e,f,g){for(var h=0,i=e.length;h<i;h++){var j=e[h];if(j){var k=!1;j=j[a];while(j){if(j[d]===c){k=e[j.sizset];break}if(j.nodeType===1){g||(j[d]=c,j.sizset=h);if(typeof b!="string"){if(j===b){k=!0;break}}else if(m.filter(b,[j]).length>0){k=j;break}}j=j[a]}e[h]=k}}}function w(a,b,c,e,f,g){for(var h=0,i=e.length;h<i;h++){var j=e[h];if(j){var k=!1;j=j[a];while(j){if(j[d]===c){k=e[j.sizset];break}j.nodeType===1&&!g&&(j[d]=c,j.sizset=h);if(j.nodeName.toLowerCase()===b){k=j;break}j=j[a]}e[h]=k}}}var a=/((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,d="sizcache"+(Math.random()+"").replace(".",""),e=0,g=Object.prototype.toString,h=!1,i=!0,j=/\\/g,k=/\r\n/g,l=/\W/;[0,0].sort(function(){i=!1;return 0});var m=function(b,d,e,f){e=e||[],d=d||c;var h=d;if(d.nodeType!==1&&d.nodeType!==9)return[];if(!b||typeof b!="string")return e;var i,j,k,l,n,q,r,t,u=!0,v=m.isXML(d),w=[],x=b;do{a.exec(""),i=a.exec(x);if(i){x=i[3],w.push(i[1]);if(i[2]){l=i[3];break}}}while(i);if(w.length>1&&p.exec(b))if(w.length===2&&o.relative[w[0]])j=y(w[0]+w[1],d,f);else{j=o.relative[w[0]]?[d]:m(w.shift(),d);while(w.length)b=w.shift(),o.relative[b]&&(b+=w.shift()),j=y(b,j,f)}else{!f&&w.length>1&&d.nodeType===9&&!v&&o.match.ID.test(w[0])&&!o.match.ID.test(w[w.length-1])&&(n=m.find(w.shift(),d,v),d=n.expr?m.filter(n.expr,n.set)[0]:n.set[0]);if(d){n=f?{expr:w.pop(),set:s(f)}:m.find(w.pop(),w.length===1&&(w[0]==="~"||w[0]==="+")&&d.parentNode?d.parentNode:d,v),j=n.expr?m.filter(n.expr,n.set):n.set,w.length>0?k=s(j):u=!1;while(w.length)q=w.pop(),r=q,o.relative[q]?r=w.pop():q="",r==null&&(r=d),o.relative[q](k,r,v)}else k=w=[]}k||(k=j),k||m.error(q||b);if(g.call(k)==="[object Array]")if(!u)e.push.apply(e,k);else if(d&&d.nodeType===1)for(t=0;k[t]!=null;t++)k[t]&&(k[t]===!0||k[t].nodeType===1&&m.contains(d,k[t]))&&e.push(j[t]);else for(t=0;k[t]!=null;t++)k[t]&&k[t].nodeType===1&&e.push(j[t]);else s(k,e);l&&(m(l,h,e,f),m.uniqueSort(e));return e};m.uniqueSort=function(a){if(u){h=i,a.sort(u);if(h)for(var b=1;b<a.length;b++)a[b]===a[b-1]&&a.splice(b--,1)}return a},m.matches=function(a,b){return m(a,null,null,b)},m.matchesSelector=function(a,b){return m(b,null,null,[a]).length>0},m.find=function(a,b,c){var d,e,f,g,h,i;if(!a)return[];for(e=0,f=o.order.length;e<f;e++){h=o.order[e];if(g=o.leftMatch[h].exec(a)){i=g[1],g.splice(1,1);if(i.substr(i.length-1)!=="\\"){g[1]=(g[1]||"").replace(j,""),d=o.find[h](g,b,c);if(d!=null){a=a.replace(o.match[h],"");break}}}}d||(d=typeof b.getElementsByTagName!="undefined"?b.getElementsByTagName("*"):[]);return{set:d,expr:a}},m.filter=function(a,c,d,e){var f,g,h,i,j,k,l,n,p,q=a,r=[],s=c,t=c&&c[0]&&m.isXML(c[0]);while(a&&c.length){for(h in o.filter)if((f=o.leftMatch[h].exec(a))!=null&&f[2]){k=o.filter[h],l=f[1],g=!1,f.splice(1,1);if(l.substr(l.length-1)==="\\")continue;s===r&&(r=[]);if(o.preFilter[h]){f=o.preFilter[h](f,s,d,r,e,t);if(!f)g=i=!0;else if(f===!0)continue}if(f)for(n=0;(j=s[n])!=null;n++)j&&(i=k(j,f,n,s),p=e^i,d&&i!=null?p?g=!0:s[n]=!1:p&&(r.push(j),g=!0));if(i!==b){d||(s=r),a=a.replace(o.match[h],"");if(!g)return[];break}}if(a===q)if(g==null)m.error(a);else break;q=a}return s},m.error=function(a){throw new Error("Syntax error, unrecognized expression: "+a)};var n=m.getText=function(a){var b,c,d=a.nodeType,e="";if(d){if(d===1||d===9){if(typeof a.textContent=="string")return a.textContent;if(typeof a.innerText=="string")return a.innerText.replace(k,"");for(a=a.firstChild;a;a=a.nextSibling)e+=n(a)}else if(d===3||d===4)return a.nodeValue}else for(b=0;c=a[b];b++)c.nodeType!==8&&(e+=n(c));return e},o=m.selectors={order:["ID","NAME","TAG"],match:{ID:/#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,CLASS:/\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,NAME:/\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,ATTR:/\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(?:(['"])(.*?)\3|(#?(?:[\w\u00c0-\uFFFF\-]|\\.)*)|)|)\s*\]/,TAG:/^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,CHILD:/:(only|nth|last|first)-child(?:\(\s*(even|odd|(?:[+\-]?\d+|(?:[+\-]?\d*)?n\s*(?:[+\-]\s*\d+)?))\s*\))?/,POS:/:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,PSEUDO:/:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/},leftMatch:{},attrMap:{"class":"className","for":"htmlFor"},attrHandle:{href:function(a){return a.getAttribute("href")},type:function(a){return a.getAttribute("type")}},relative:{"+":function(a,b){var c=typeof b=="string",d=c&&!l.test(b),e=c&&!d;d&&(b=b.toLowerCase());for(var f=0,g=a.length,h;f<g;f++)if(h=a[f]){while((h=h.previousSibling)&&h.nodeType!==1);a[f]=e||h&&h.nodeName.toLowerCase()===b?h||!1:h===b}e&&m.filter(b,a,!0)},">":function(a,b){var c,d=typeof b=="string",e=0,f=a.length;if(d&&!l.test(b)){b=b.toLowerCase();for(;e<f;e++){c=a[e];if(c){var g=c.parentNode;a[e]=g.nodeName.toLowerCase()===b?g:!1}}}else{for(;e<f;e++)c=a[e],c&&(a[e]=d?c.parentNode:c.parentNode===b);d&&m.filter(b,a,!0)}},"":function(a,b,c){var d,f=e++,g=x;typeof b=="string"&&!l.test(b)&&(b=b.toLowerCase(),d=b,g=w),g("parentNode",b,f,a,d,c)},"~":function(a,b,c){var d,f=e++,g=x;typeof b=="string"&&!l.test(b)&&(b=b.toLowerCase(),d=b,g=w),g("previousSibling",b,f,a,d,c)}},find:{ID:function(a,b,c){if(typeof b.getElementById!="undefined"&&!c){var d=b.getElementById(a[1]);return d&&d.parentNode?[d]:[]}},NAME:function(a,b){if(typeof b.getElementsByName!="undefined"){var c=[],d=b.getElementsByName(a[1]);for(var e=0,f=d.length;e<f;e++)d[e].getAttribute("name")===a[1]&&c.push(d[e]);return c.length===0?null:c}},TAG:function(a,b){if(typeof b.getElementsByTagName!="undefined")return b.getElementsByTagName(a[1])}},preFilter:{CLASS:function(a,b,c,d,e,f){a=" "+a[1].replace(j,"")+" ";if(f)return a;for(var g=0,h;(h=b[g])!=null;g++)h&&(e^(h.className&&(" "+h.className+" ").replace(/[\t\n\r]/g," ").indexOf(a)>=0)?c||d.push(h):c&&(b[g]=!1));return!1},ID:function(a){return a[1].replace(j,"")},TAG:function(a,b){return a[1].replace(j,"").toLowerCase()},CHILD:function(a){if(a[1]==="nth"){a[2]||m.error(a[0]),a[2]=a[2].replace(/^\+|\s*/g,"");var b=/(-?)(\d*)(?:n([+\-]?\d*))?/.exec(a[2]==="even"&&"2n"||a[2]==="odd"&&"2n+1"||!/\D/.test(a[2])&&"0n+"+a[2]||a[2]);a[2]=b[1]+(b[2]||1)-0,a[3]=b[3]-0}else a[2]&&m.error(a[0]);a[0]=e++;return a},ATTR:function(a,b,c,d,e,f){var g=a[1]=a[1].replace(j,"");!f&&o.attrMap[g]&&(a[1]=o.attrMap[g]),a[4]=(a[4]||a[5]||"").replace(j,""),a[2]==="~="&&(a[4]=" "+a[4]+" ");return a},PSEUDO:function(b,c,d,e,f){if(b[1]==="not")if((a.exec(b[3])||"").length>1||/^\w/.test(b[3]))b[3]=m(b[3],null,null,c);else{var g=m.filter(b[3],c,d,!0^f);d||e.push.apply(e,g);return!1}else if(o.match.POS.test(b[0])||o.match.CHILD.test(b[0]))return!0;return b},POS:function(a){a.unshift(!0);return a}},filters:{enabled:function(a){return a.disabled===!1&&a.type!=="hidden"},disabled:function(a){return a.disabled===!0},checked:function(a){return a.checked===!0},selected:function(a){a.parentNode&&a.parentNode.selectedIndex;return a.selected===!0},parent:function(a){return!!a.firstChild},empty:function(a){return!a.firstChild},has:function(a,b,c){return!!m(c[3],a).length},header:function(a){return/h\d/i.test(a.nodeName)},text:function(a){var b=a.getAttribute("type"),c=a.type;return a.nodeName.toLowerCase()==="input"&&"text"===c&&(b===c||b===null)},radio:function(a){return a.nodeName.toLowerCase()==="input"&&"radio"===a.type},checkbox:function(a){return a.nodeName.toLowerCase()==="input"&&"checkbox"===a.type},file:function(a){return a.nodeName.toLowerCase()==="input"&&"file"===a.type},password:function(a){return a.nodeName.toLowerCase()==="input"&&"password"===a.type},submit:function(a){var b=a.nodeName.toLowerCase();return(b==="input"||b==="button")&&"submit"===a.type},image:function(a){return a.nodeName.toLowerCase()==="input"&&"image"===a.type},reset:function(a){var b=a.nodeName.toLowerCase();return(b==="input"||b==="button")&&"reset"===a.type},button:function(a){var b=a.nodeName.toLowerCase();return b==="input"&&"button"===a.type||b==="button"},input:function(a){return/input|select|textarea|button/i.test(a.nodeName)},focus:function(a){return a===a.ownerDocument.activeElement}},setFilters:{first:function(a,b){return b===0},last:function(a,b,c,d){return b===d.length-1},even:function(a,b){return b%2===0},odd:function(a,b){return b%2===1},lt:function(a,b,c){return b<c[3]-0},gt:function(a,b,c){return b>c[3]-0},nth:function(a,b,c){return c[3]-0===b},eq:function(a,b,c){return c[3]-0===b}},filter:{PSEUDO:function(a,b,c,d){var e=b[1],f=o.filters[e];if(f)return f(a,c,b,d);if(e==="contains")return(a.textContent||a.innerText||n([a])||"").indexOf(b[3])>=0;if(e==="not"){var g=b[3];for(var h=0,i=g.length;h<i;h++)if(g[h]===a)return!1;return!0}m.error(e)},CHILD:function(a,b){var c,e,f,g,h,i,j,k=b[1],l=a;switch(k){case"only":case"first":while(l=l.previousSibling)if(l.nodeType===1)return!1;if(k==="first")return!0;l=a;case"last":while(l=l.nextSibling)if(l.nodeType===1)return!1;return!0;case"nth":c=b[2],e=b[3];if(c===1&&e===0)return!0;f=b[0],g=a.parentNode;if(g&&(g[d]!==f||!a.nodeIndex)){i=0;for(l=g.firstChild;l;l=l.nextSibling)l.nodeType===1&&(l.nodeIndex=++i);g[d]=f}j=a.nodeIndex-e;return c===0?j===0:j%c===0&&j/c>=0}},ID:function(a,b){return a.nodeType===1&&a.getAttribute("id")===b},TAG:function(a,b){return b==="*"&&a.nodeType===1||!!a.nodeName&&a.nodeName.toLowerCase()===b},CLASS:function(a,b){return(" "+(a.className||a.getAttribute("class"))+" ").indexOf(b)>-1},ATTR:function(a,b){var c=b[1],d=m.attr?m.attr(a,c):o.attrHandle[c]?o.attrHandle[c](a):a[c]!=null?a[c]:a.getAttribute(c),e=d+"",f=b[2],g=b[4];return d==null?f==="!=":!f&&m.attr?d!=null:f==="="?e===g:f==="*="?e.indexOf(g)>=0:f==="~="?(" "+e+" ").indexOf(g)>=0:g?f==="!="?e!==g:f==="^="?e.indexOf(g)===0:f==="$="?e.substr(e.length-g.length)===g:f==="|="?e===g||e.substr(0,g.length+1)===g+"-":!1:e&&d!==!1},POS:function(a,b,c,d){var e=b[2],f=o.setFilters[e];if(f)return f(a,c,b,d)}}},p=o.match.POS,q=function(a,b){return"\\"+(b-0+1)};for(var r in o.match)o.match[r]=new RegExp(o.match[r].source+/(?![^\[]*\])(?![^\(]*\))/.source),o.leftMatch[r]=new RegExp(/(^(?:.|\r|\n)*?)/.source+o.match[r].source.replace(/\\(\d+)/g,q));var s=function(a,b){a=Array.prototype.slice.call(a,0);if(b){b.push.apply(b,a);return b}return a};try{Array.prototype.slice.call(c.documentElement.childNodes,0)[0].nodeType}catch(t){s=function(a,b){var c=0,d=b||[];if(g.call(a)==="[object Array]")Array.prototype.push.apply(d,a);else if(typeof a.length=="number")for(var e=a.length;c<e;c++)d.push(a[c]);else for(;a[c];c++)d.push(a[c]);return d}}var u,v;c.documentElement.compareDocumentPosition?u=function(a,b){if(a===b){h=!0;return 0}if(!a.compareDocumentPosition||!b.compareDocumentPosition)return a.compareDocumentPosition?-1:1;return a.compareDocumentPosition(b)&4?-1:1}:(u=function(a,b){if(a===b){h=!0;return 0}if(a.sourceIndex&&b.sourceIndex)return a.sourceIndex-b.sourceIndex;var c,d,e=[],f=[],g=a.parentNode,i=b.parentNode,j=g;if(g===i)return v(a,b);if(!g)return-1;if(!i)return 1;while(j)e.unshift(j),j=j.parentNode;j=i;while(j)f.unshift(j),j=j.parentNode;c=e.length,d=f.length;for(var k=0;k<c&&k<d;k++)if(e[k]!==f[k])return v(e[k],f[k]);return k===c?v(a,f[k],-1):v(e[k],b,1)},v=function(a,b,c){if(a===b)return c;var d=a.nextSibling;while(d){if(d===b)return-1;d=d.nextSibling}return 1}),function(){var a=c.createElement("div"),d="script"+(new Date).getTime(),e=c.documentElement;a.innerHTML="<a name='"+d+"'/>",e.insertBefore(a,e.firstChild),c.getElementById(d)&&(o.find.ID=function(a,c,d){if(typeof c.getElementById!="undefined"&&!d){var e=c.getElementById(a[1]);return e?e.id===a[1]||typeof e.getAttributeNode!="undefined"&&e.getAttributeNode("id").nodeValue===a[1]?[e]:b:[]}},o.filter.ID=function(a,b){var c=typeof a.getAttributeNode!="undefined"&&a.getAttributeNode("id");return a.nodeType===1&&c&&c.nodeValue===b}),e.removeChild(a),e=a=null}(),function(){var a=c.createElement("div");a.appendChild(c.createComment("")),a.getElementsByTagName("*").length>0&&(o.find.TAG=function(a,b){var c=b.getElementsByTagName(a[1]);if(a[1]==="*"){var d=[];for(var e=0;c[e];e++)c[e].nodeType===1&&d.push(c[e]);c=d}return c}),a.innerHTML="<a href='#'></a>",a.firstChild&&typeof a.firstChild.getAttribute!="undefined"&&a.firstChild.getAttribute("href")!=="#"&&(o.attrHandle.href=function(a){return a.getAttribute("href",2)}),a=null}(),c.querySelectorAll&&function(){var a=m,b=c.createElement("div"),d="__sizzle__";b.innerHTML="<p class='TEST'></p>";if(!b.querySelectorAll||b.querySelectorAll(".TEST").length!==0){m=function(b,e,f,g){e=e||c;if(!g&&!m.isXML(e)){var h=/^(\w+$)|^\.([\w\-]+$)|^#([\w\-]+$)/.exec(b);if(h&&(e.nodeType===1||e.nodeType===9)){if(h[1])return s(e.getElementsByTagName(b),f);if(h[2]&&o.find.CLASS&&e.getElementsByClassName)return s(e.getElementsByClassName(h[2]),f)}if(e.nodeType===9){if(b==="body"&&e.body)return s([e.body],f);if(h&&h[3]){var i=e.getElementById(h[3]);if(!i||!i.parentNode)return s([],f);if(i.id===h[3])return s([i],f)}try{return s(e.querySelectorAll(b),f)}catch(j){}}else if(e.nodeType===1&&e.nodeName.toLowerCase()!=="object"){var k=e,l=e.getAttribute("id"),n=l||d,p=e.parentNode,q=/^\s*[+~]/.test(b);l?n=n.replace(/'/g,"\\$&"):e.setAttribute("id",n),q&&p&&(e=e.parentNode);try{if(!q||p)return s(e.querySelectorAll("[id='"+n+"'] "+b),f)}catch(r){}finally{l||k.removeAttribute("id")}}}return a(b,e,f,g)};for(var e in a)m[e]=a[e];b=null}}(),function(){var a=c.documentElement,b=a.matchesSelector||a.mozMatchesSelector||a.webkitMatchesSelector||a.msMatchesSelector;if(b){var d=!b.call(c.createElement("div"),"div"),e=!1;try{b.call(c.documentElement,"[test!='']:sizzle")}catch(f){e=!0}m.matchesSelector=function(a,c){c=c.replace(/\=\s*([^'"\]]*)\s*\]/g,"='$1']");if(!m.isXML(a))try{if(e||!o.match.PSEUDO.test(c)&&!/!=/.test(c)){var f=b.call(a,c);if(f||!d||a.document&&a.document.nodeType!==11)return f}}catch(g){}return m(c,null,null,[a]).length>0}}}(),function(){var a=c.createElement("div");a.innerHTML="<div class='test e'></div><div class='test'></div>";if(!!a.getElementsByClassName&&a.getElementsByClassName("e").length!==0){a.lastChild.className="e";if(a.getElementsByClassName("e").length===1)return;o.order.splice(1,0,"CLASS"),o.find.CLASS=function(a,b,c){if(typeof b.getElementsByClassName!="undefined"&&!c)return b.getElementsByClassName(a[1])},a=null}}(),c.documentElement.contains?m.contains=function(a,b){return a!==b&&(a.contains?a.contains(b):!0)}:c.documentElement.compareDocumentPosition?m.contains=function(a,b){return!!(a.compareDocumentPosition(b)&16)}:m.contains=function(){return!1},m.isXML=function(a){var b=(a?a.ownerDocument||a:0).documentElement;return b?b.nodeName!=="HTML":!1};var y=function(a,b,c){var d,e=[],f="",g=b.nodeType?[b]:b;while(d=o.match.PSEUDO.exec(a))f+=d[0],a=a.replace(o.match.PSEUDO,"");a=o.relative[a]?a+"*":a;for(var h=0,i=g.length;h<i;h++)m(a,g[h],e,c);return m.filter(f,e)};m.attr=f.attr,m.selectors.attrMap={},f.find=m,f.expr=m.selectors,f.expr[":"]=f.expr.filters,f.unique=m.uniqueSort,f.text=m.getText,f.isXMLDoc=m.isXML,f.contains=m.contains}();var L=/Until$/,M=/^(?:parents|prevUntil|prevAll)/,N=/,/,O=/^.[^:#\[\.,]*$/,P=Array.prototype.slice,Q=f.expr.match.POS,R={children:!0,contents:!0,next:!0,prev:!0};f.fn.extend({find:function(a){var b=this,c,d;if(typeof a!="string")return f(a).filter(function(){for(c=0,d=b.length;c<d;c++)if(f.contains(b[c],this))return!0});var e=this.pushStack("","find",a),g,h,i;for(c=0,d=this.length;c<d;c++){g=e.length,f.find(a,this[c],e);if(c>0)for(h=g;h<e.length;h++)for(i=0;i<g;i++)if(e[i]===e[h]){e.splice(h--,1);break}}return e},has:function(a){var b=f(a);return this.filter(function(){for(var a=0,c=b.length;a<c;a++)if(f.contains(this,b[a]))return!0})},not:function(a){return this.pushStack(T(this,a,!1),"not",a)},filter:function(a){return this.pushStack(T(this,a,!0),"filter",a)},is:function(a){return!!a&&(typeof a=="string"?Q.test(a)?f(a,this.context).index(this[0])>=0:f.filter(a,this).length>0:this.filter(a).length>0)},closest:function(a,b){var c=[],d,e,g=this[0];if(f.isArray(a)){var h=1;while(g&&g.ownerDocument&&g!==b){for(d=0;d<a.length;d++)f(g).is(a[d])&&c.push({selector:a[d],elem:g,level:h});g=g.parentNode,h++}return c}var i=Q.test(a)||typeof a!="string"?f(a,b||this.context):0;for(d=0,e=this.length;d<e;d++){g=this[d];while(g){if(i?i.index(g)>-1:f.find.matchesSelector(g,a)){c.push(g);break}g=g.parentNode;if(!g||!g.ownerDocument||g===b||g.nodeType===11)break}}c=c.length>1?f.unique(c):c;return this.pushStack(c,"closest",a)},index:function(a){if(!a)return this[0]&&this[0].parentNode?this.prevAll().length:-1;if(typeof a=="string")return f.inArray(this[0],f(a));return f.inArray(a.jquery?a[0]:a,this)},add:function(a,b){var c=typeof a=="string"?f(a,b):f.makeArray(a&&a.nodeType?[a]:a),d=f.merge(this.get(),c);return this.pushStack(S(c[0])||S(d[0])?d:f.unique(d))},andSelf:function(){return this.add(this.prevObject)}}),f.each({parent:function(a){var b=a.parentNode;return b&&b.nodeType!==11?b:null},parents:function(a){return f.dir(a,"parentNode")},parentsUntil:function(a,b,c){return f.dir(a,"parentNode",c)},next:function(a){return f.nth(a,2,"nextSibling")},prev:function(a){return f.nth(a,2,"previousSibling")},nextAll:function(a){return f.dir(a,"nextSibling")},prevAll:function(a){return f.dir(a,"previousSibling")},nextUntil:function(a,b,c){return f.dir(a,"nextSibling",c)},prevUntil:function(a,b,c){return f.dir(a,"previousSibling",c)},siblings:function(a){return f.sibling(a.parentNode.firstChild,a)},children:function(a){return f.sibling(a.firstChild)},contents:function(a){return f.nodeName(a,"iframe")?a.contentDocument||a.contentWindow.document:f.makeArray(a.childNodes)}},function(a,b){f.fn[a]=function(c,d){var e=f.map(this,b,c);L.test(a)||(d=c),d&&typeof d=="string"&&(e=f.filter(d,e)),e=this.length>1&&!R[a]?f.unique(e):e,(this.length>1||N.test(d))&&M.test(a)&&(e=e.reverse());return this.pushStack(e,a,P.call(arguments).join(","))}}),f.extend({filter:function(a,b,c){c&&(a=":not("+a+")");return b.length===1?f.find.matchesSelector(b[0],a)?[b[0]]:[]:f.find.matches(a,b)},dir:function(a,c,d){var e=[],g=a[c];while(g&&g.nodeType!==9&&(d===b||g.nodeType!==1||!f(g).is(d)))g.nodeType===1&&e.push(g),g=g[c];return e},nth:function(a,b,c,d){b=b||1;var e=0;for(;a;a=a[c])if(a.nodeType===1&&++e===b)break;return a},sibling:function(a,b){var c=[];for(;a;a=a.nextSibling)a.nodeType===1&&a!==b&&c.push(a);return c}});var V="abbr|article|aside|audio|canvas|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",W=/ jQuery\d+="(?:\d+|null)"/g,X=/^\s+/,Y=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,Z=/<([\w:]+)/,$=/<tbody/i,_=/<|&#?\w+;/,ba=/<(?:script|style)/i,bb=/<(?:script|object|embed|option|style)/i,bc=new RegExp("<(?:"+V+")","i"),bd=/checked\s*(?:[^=]|=\s*.checked.)/i,be=/\/(java|ecma)script/i,bf=/^\s*<!(?:\[CDATA\[|\-\-)/,bg={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],area:[1,"<map>","</map>"],_default:[0,"",""]},bh=U(c);bg.optgroup=bg.option,bg.tbody=bg.tfoot=bg.colgroup=bg.caption=bg.thead,bg.th=bg.td,f.support.htmlSerialize||(bg._default=[1,"div<div>","</div>"]),f.fn.extend({text:function(a){if(f.isFunction(a))return this.each(function(b){var c=f(this);c.text(a.call(this,b,c.text()))});if(typeof a!="object"&&a!==b)return this.empty().append((this[0]&&this[0].ownerDocument||c).createTextNode(a));return f.text(this)},wrapAll:function(a){if(f.isFunction(a))return this.each(function(b){f(this).wrapAll(a.call(this,b))});if(this[0]){var b=f(a,this[0].ownerDocument).eq(0).clone(!0);this[0].parentNode&&b.insertBefore(this[0]),b.map(function(){var a=this;while(a.firstChild&&a.firstChild.nodeType===1)a=a.firstChild;return a}).append(this)}return this},wrapInner:function(a){if(f.isFunction(a))return this.each(function(b){f(this).wrapInner(a.call(this,b))});return this.each(function(){var b=f(this),c=b.contents();c.length?c.wrapAll(a):b.append(a)})},wrap:function(a){var b=f.isFunction(a);return this.each(function(c){f(this).wrapAll(b?a.call(this,c):a)})},unwrap:function(){return this.parent().each(function(){f.nodeName(this,"body")||f(this).replaceWith(this.childNodes)}).end()},append:function(){return this.domManip(arguments,!0,function(a){this.nodeType===1&&this.appendChild(a)})},prepend:function(){return this.domManip(arguments,!0,function(a){this.nodeType===1&&this.insertBefore(a,this.firstChild)})},before:function(){if(this[0]&&this[0].parentNode)return this.domManip(arguments,!1,function(a){this.parentNode.insertBefore(a,this)});if(arguments.length){var a=f.clean(arguments);a.push.apply(a,this.toArray());return this.pushStack(a,"before",arguments)}},after:function(){if(this[0]&&this[0].parentNode)return this.domManip(arguments,!1,function(a){this.parentNode.insertBefore(a,this.nextSibling)});if(arguments.length){var a=this.pushStack(this,"after",arguments);a.push.apply(a,f.clean(arguments));return a}},remove:function(a,b){for(var c=0,d;(d=this[c])!=null;c++)if(!a||f.filter(a,[d]).length)!b&&d.nodeType===1&&(f.cleanData(d.getElementsByTagName("*")),f.cleanData([d])),d.parentNode&&d.parentNode.removeChild(d);return this},empty:function()
  {for(var a=0,b;(b=this[a])!=null;a++){b.nodeType===1&&f.cleanData(b.getElementsByTagName("*"));while(b.firstChild)b.removeChild(b.firstChild)}return this},clone:function(a,b){a=a==null?!1:a,b=b==null?a:b;return this.map(function(){return f.clone(this,a,b)})},html:function(a){if(a===b)return this[0]&&this[0].nodeType===1?this[0].innerHTML.replace(W,""):null;if(typeof a=="string"&&!ba.test(a)&&(f.support.leadingWhitespace||!X.test(a))&&!bg[(Z.exec(a)||["",""])[1].toLowerCase()]){a=a.replace(Y,"<$1></$2>");try{for(var c=0,d=this.length;c<d;c++)this[c].nodeType===1&&(f.cleanData(this[c].getElementsByTagName("*")),this[c].innerHTML=a)}catch(e){this.empty().append(a)}}else f.isFunction(a)?this.each(function(b){var c=f(this);c.html(a.call(this,b,c.html()))}):this.empty().append(a);return this},replaceWith:function(a){if(this[0]&&this[0].parentNode){if(f.isFunction(a))return this.each(function(b){var c=f(this),d=c.html();c.replaceWith(a.call(this,b,d))});typeof a!="string"&&(a=f(a).detach());return this.each(function(){var b=this.nextSibling,c=this.parentNode;f(this).remove(),b?f(b).before(a):f(c).append(a)})}return this.length?this.pushStack(f(f.isFunction(a)?a():a),"replaceWith",a):this},detach:function(a){return this.remove(a,!0)},domManip:function(a,c,d){var e,g,h,i,j=a[0],k=[];if(!f.support.checkClone&&arguments.length===3&&typeof j=="string"&&bd.test(j))return this.each(function(){f(this).domManip(a,c,d,!0)});if(f.isFunction(j))return this.each(function(e){var g=f(this);a[0]=j.call(this,e,c?g.html():b),g.domManip(a,c,d)});if(this[0]){i=j&&j.parentNode,f.support.parentNode&&i&&i.nodeType===11&&i.childNodes.length===this.length?e={fragment:i}:e=f.buildFragment(a,this,k),h=e.fragment,h.childNodes.length===1?g=h=h.firstChild:g=h.firstChild;if(g){c=c&&f.nodeName(g,"tr");for(var l=0,m=this.length,n=m-1;l<m;l++)d.call(c?bi(this[l],g):this[l],e.cacheable||m>1&&l<n?f.clone(h,!0,!0):h)}k.length&&f.each(k,bp)}return this}}),f.buildFragment=function(a,b,d){var e,g,h,i,j=a[0];b&&b[0]&&(i=b[0].ownerDocument||b[0]),i.createDocumentFragment||(i=c),a.length===1&&typeof j=="string"&&j.length<512&&i===c&&j.charAt(0)==="<"&&!bb.test(j)&&(f.support.checkClone||!bd.test(j))&&(f.support.html5Clone||!bc.test(j))&&(g=!0,h=f.fragments[j],h&&h!==1&&(e=h)),e||(e=i.createDocumentFragment(),f.clean(a,i,e,d)),g&&(f.fragments[j]=h?e:1);return{fragment:e,cacheable:g}},f.fragments={},f.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){f.fn[a]=function(c){var d=[],e=f(c),g=this.length===1&&this[0].parentNode;if(g&&g.nodeType===11&&g.childNodes.length===1&&e.length===1){e[b](this[0]);return this}for(var h=0,i=e.length;h<i;h++){var j=(h>0?this.clone(!0):this).get();f(e[h])[b](j),d=d.concat(j)}return this.pushStack(d,a,e.selector)}}),f.extend({clone:function(a,b,c){var d,e,g,h=f.support.html5Clone||!bc.test("<"+a.nodeName)?a.cloneNode(!0):bo(a);if((!f.support.noCloneEvent||!f.support.noCloneChecked)&&(a.nodeType===1||a.nodeType===11)&&!f.isXMLDoc(a)){bk(a,h),d=bl(a),e=bl(h);for(g=0;d[g];++g)e[g]&&bk(d[g],e[g])}if(b){bj(a,h);if(c){d=bl(a),e=bl(h);for(g=0;d[g];++g)bj(d[g],e[g])}}d=e=null;return h},clean:function(a,b,d,e){var g;b=b||c,typeof b.createElement=="undefined"&&(b=b.ownerDocument||b[0]&&b[0].ownerDocument||c);var h=[],i;for(var j=0,k;(k=a[j])!=null;j++){typeof k=="number"&&(k+="");if(!k)continue;if(typeof k=="string")if(!_.test(k))k=b.createTextNode(k);else{k=k.replace(Y,"<$1></$2>");var l=(Z.exec(k)||["",""])[1].toLowerCase(),m=bg[l]||bg._default,n=m[0],o=b.createElement("div");b===c?bh.appendChild(o):U(b).appendChild(o),o.innerHTML=m[1]+k+m[2];while(n--)o=o.lastChild;if(!f.support.tbody){var p=$.test(k),q=l==="table"&&!p?o.firstChild&&o.firstChild.childNodes:m[1]==="<table>"&&!p?o.childNodes:[];for(i=q.length-1;i>=0;--i)f.nodeName(q[i],"tbody")&&!q[i].childNodes.length&&q[i].parentNode.removeChild(q[i])}!f.support.leadingWhitespace&&X.test(k)&&o.insertBefore(b.createTextNode(X.exec(k)[0]),o.firstChild),k=o.childNodes}var r;if(!f.support.appendChecked)if(k[0]&&typeof (r=k.length)=="number")for(i=0;i<r;i++)bn(k[i]);else bn(k);k.nodeType?h.push(k):h=f.merge(h,k)}if(d){g=function(a){return!a.type||be.test(a.type)};for(j=0;h[j];j++)if(e&&f.nodeName(h[j],"script")&&(!h[j].type||h[j].type.toLowerCase()==="text/javascript"))e.push(h[j].parentNode?h[j].parentNode.removeChild(h[j]):h[j]);else{if(h[j].nodeType===1){var s=f.grep(h[j].getElementsByTagName("script"),g);h.splice.apply(h,[j+1,0].concat(s))}d.appendChild(h[j])}}return h},cleanData:function(a){var b,c,d=f.cache,e=f.event.special,g=f.support.deleteExpando;for(var h=0,i;(i=a[h])!=null;h++){if(i.nodeName&&f.noData[i.nodeName.toLowerCase()])continue;c=i[f.expando];if(c){b=d[c];if(b&&b.events){for(var j in b.events)e[j]?f.event.remove(i,j):f.removeEvent(i,j,b.handle);b.handle&&(b.handle.elem=null)}g?delete i[f.expando]:i.removeAttribute&&i.removeAttribute(f.expando),delete d[c]}}}});var bq=/alpha\([^)]*\)/i,br=/opacity=([^)]*)/,bs=/([A-Z]|^ms)/g,bt=/^-?\d+(?:px)?$/i,bu=/^-?\d/,bv=/^([\-+])=([\-+.\de]+)/,bw={position:"absolute",visibility:"hidden",display:"block"},bx=["Left","Right"],by=["Top","Bottom"],bz,bA,bB;f.fn.css=function(a,c){if(arguments.length===2&&c===b)return this;return f.access(this,a,c,!0,function(a,c,d){return d!==b?f.style(a,c,d):f.css(a,c)})},f.extend({cssHooks:{opacity:{get:function(a,b){if(b){var c=bz(a,"opacity","opacity");return c===""?"1":c}return a.style.opacity}}},cssNumber:{fillOpacity:!0,fontWeight:!0,lineHeight:!0,opacity:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":f.support.cssFloat?"cssFloat":"styleFloat"},style:function(a,c,d,e){if(!!a&&a.nodeType!==3&&a.nodeType!==8&&!!a.style){var g,h,i=f.camelCase(c),j=a.style,k=f.cssHooks[i];c=f.cssProps[i]||i;if(d===b){if(k&&"get"in k&&(g=k.get(a,!1,e))!==b)return g;return j[c]}h=typeof d,h==="string"&&(g=bv.exec(d))&&(d=+(g[1]+1)*+g[2]+parseFloat(f.css(a,c)),h="number");if(d==null||h==="number"&&isNaN(d))return;h==="number"&&!f.cssNumber[i]&&(d+="px");if(!k||!("set"in k)||(d=k.set(a,d))!==b)try{j[c]=d}catch(l){}}},css:function(a,c,d){var e,g;c=f.camelCase(c),g=f.cssHooks[c],c=f.cssProps[c]||c,c==="cssFloat"&&(c="float");if(g&&"get"in g&&(e=g.get(a,!0,d))!==b)return e;if(bz)return bz(a,c)},swap:function(a,b,c){var d={};for(var e in b)d[e]=a.style[e],a.style[e]=b[e];c.call(a);for(e in b)a.style[e]=d[e]}}),f.curCSS=f.css,f.each(["height","width"],function(a,b){f.cssHooks[b]={get:function(a,c,d){var e;if(c){if(a.offsetWidth!==0)return bC(a,b,d);f.swap(a,bw,function(){e=bC(a,b,d)});return e}},set:function(a,b){if(!bt.test(b))return b;b=parseFloat(b);if(b>=0)return b+"px"}}}),f.support.opacity||(f.cssHooks.opacity={get:function(a,b){return br.test((b&&a.currentStyle?a.currentStyle.filter:a.style.filter)||"")?parseFloat(RegExp.$1)/100+"":b?"1":""},set:function(a,b){var c=a.style,d=a.currentStyle,e=f.isNumeric(b)?"alpha(opacity="+b*100+")":"",g=d&&d.filter||c.filter||"";c.zoom=1;if(b>=1&&f.trim(g.replace(bq,""))===""){c.removeAttribute("filter");if(d&&!d.filter)return}c.filter=bq.test(g)?g.replace(bq,e):g+" "+e}}),f(function(){f.support.reliableMarginRight||(f.cssHooks.marginRight={get:function(a,b){var c;f.swap(a,{display:"inline-block"},function(){b?c=bz(a,"margin-right","marginRight"):c=a.style.marginRight});return c}})}),c.defaultView&&c.defaultView.getComputedStyle&&(bA=function(a,b){var c,d,e;b=b.replace(bs,"-$1").toLowerCase(),(d=a.ownerDocument.defaultView)&&(e=d.getComputedStyle(a,null))&&(c=e.getPropertyValue(b),c===""&&!f.contains(a.ownerDocument.documentElement,a)&&(c=f.style(a,b)));return c}),c.documentElement.currentStyle&&(bB=function(a,b){var c,d,e,f=a.currentStyle&&a.currentStyle[b],g=a.style;f===null&&g&&(e=g[b])&&(f=e),!bt.test(f)&&bu.test(f)&&(c=g.left,d=a.runtimeStyle&&a.runtimeStyle.left,d&&(a.runtimeStyle.left=a.currentStyle.left),g.left=b==="fontSize"?"1em":f||0,f=g.pixelLeft+"px",g.left=c,d&&(a.runtimeStyle.left=d));return f===""?"auto":f}),bz=bA||bB,f.expr&&f.expr.filters&&(f.expr.filters.hidden=function(a){var b=a.offsetWidth,c=a.offsetHeight;return b===0&&c===0||!f.support.reliableHiddenOffsets&&(a.style&&a.style.display||f.css(a,"display"))==="none"},f.expr.filters.visible=function(a){return!f.expr.filters.hidden(a)});var bD=/%20/g,bE=/\[\]$/,bF=/\r?\n/g,bG=/#.*$/,bH=/^(.*?):[ \t]*([^\r\n]*)\r?$/mg,bI=/^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,bJ=/^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/,bK=/^(?:GET|HEAD)$/,bL=/^\/\//,bM=/\?/,bN=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,bO=/^(?:select|textarea)/i,bP=/\s+/,bQ=/([?&])_=[^&]*/,bR=/^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+))?)?/,bS=f.fn.load,bT={},bU={},bV,bW,bX=["*/"]+["*"];try{bV=e.href}catch(bY){bV=c.createElement("a"),bV.href="",bV=bV.href}bW=bR.exec(bV.toLowerCase())||[],f.fn.extend({load:function(a,c,d){if(typeof a!="string"&&bS)return bS.apply(this,arguments);if(!this.length)return this;var e=a.indexOf(" ");if(e>=0){var g=a.slice(e,a.length);a=a.slice(0,e)}var h="GET";c&&(f.isFunction(c)?(d=c,c=b):typeof c=="object"&&(c=f.param(c,f.ajaxSettings.traditional),h="POST"));var i=this;f.ajax({url:a,type:h,dataType:"html",data:c,complete:function(a,b,c){c=a.responseText,a.isResolved()&&(a.done(function(a){c=a}),i.html(g?f("<div>").append(c.replace(bN,"")).find(g):c)),d&&i.each(d,[c,b,a])}});return this},serialize:function(){return f.param(this.serializeArray())},serializeArray:function(){return this.map(function(){return this.elements?f.makeArray(this.elements):this}).filter(function(){return this.name&&!this.disabled&&(this.checked||bO.test(this.nodeName)||bI.test(this.type))}).map(function(a,b){var c=f(this).val();return c==null?null:f.isArray(c)?f.map(c,function(a,c){return{name:b.name,value:a.replace(bF,"\r\n")}}):{name:b.name,value:c.replace(bF,"\r\n")}}).get()}}),f.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "),function(a,b){f.fn[b]=function(a){return this.on(b,a)}}),f.each(["get","post"],function(a,c){f[c]=function(a,d,e,g){f.isFunction(d)&&(g=g||e,e=d,d=b);return f.ajax({type:c,url:a,data:d,success:e,dataType:g})}}),f.extend({getScript:function(a,c){return f.get(a,b,c,"script")},getJSON:function(a,b,c){return f.get(a,b,c,"json")},ajaxSetup:function(a,b){b?b_(a,f.ajaxSettings):(b=a,a=f.ajaxSettings),b_(a,b);return a},ajaxSettings:{url:bV,isLocal:bJ.test(bW[1]),global:!0,type:"GET",contentType:"application/x-www-form-urlencoded",processData:!0,async:!0,accepts:{xml:"application/xml, text/xml",html:"text/html",text:"text/plain",json:"application/json, text/javascript","*":bX},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText"},converters:{"* text":a.String,"text html":!0,"text json":f.parseJSON,"text xml":f.parseXML},flatOptions:{context:!0,url:!0}},ajaxPrefilter:bZ(bT),ajaxTransport:bZ(bU),ajax:function(a,c){function w(a,c,l,m){if(s!==2){s=2,q&&clearTimeout(q),p=b,n=m||"",v.readyState=a>0?4:0;var o,r,u,w=c,x=l?cb(d,v,l):b,y,z;if(a>=200&&a<300||a===304){if(d.ifModified){if(y=v.getResponseHeader("Last-Modified"))f.lastModified[k]=y;if(z=v.getResponseHeader("Etag"))f.etag[k]=z}if(a===304)w="notmodified",o=!0;else try{r=cc(d,x),w="success",o=!0}catch(A){w="parsererror",u=A}}else{u=w;if(!w||a)w="error",a<0&&(a=0)}v.status=a,v.statusText=""+(c||w),o?h.resolveWith(e,[r,w,v]):h.rejectWith(e,[v,w,u]),v.statusCode(j),j=b,t&&g.trigger("ajax"+(o?"Success":"Error"),[v,d,o?r:u]),i.fireWith(e,[v,w]),t&&(g.trigger("ajaxComplete",[v,d]),--f.active||f.event.trigger("ajaxStop"))}}typeof a=="object"&&(c=a,a=b),c=c||{};var d=f.ajaxSetup({},c),e=d.context||d,g=e!==d&&(e.nodeType||e instanceof f)?f(e):f.event,h=f.Deferred(),i=f.Callbacks("once memory"),j=d.statusCode||{},k,l={},m={},n,o,p,q,r,s=0,t,u,v={readyState:0,setRequestHeader:function(a,b){if(!s){var c=a.toLowerCase();a=m[c]=m[c]||a,l[a]=b}return this},getAllResponseHeaders:function(){return s===2?n:null},getResponseHeader:function(a){var c;if(s===2){if(!o){o={};while(c=bH.exec(n))o[c[1].toLowerCase()]=c[2]}c=o[a.toLowerCase()]}return c===b?null:c},overrideMimeType:function(a){s||(d.mimeType=a);return this},abort:function(a){a=a||"abort",p&&p.abort(a),w(0,a);return this}};h.promise(v),v.success=v.done,v.error=v.fail,v.complete=i.add,v.statusCode=function(a){if(a){var b;if(s<2)for(b in a)j[b]=[j[b],a[b]];else b=a[v.status],v.then(b,b)}return this},d.url=((a||d.url)+"").replace(bG,"").replace(bL,bW[1]+"//"),d.dataTypes=f.trim(d.dataType||"*").toLowerCase().split(bP),d.crossDomain==null&&(r=bR.exec(d.url.toLowerCase()),d.crossDomain=!(!r||r[1]==bW[1]&&r[2]==bW[2]&&(r[3]||(r[1]==="http:"?80:443))==(bW[3]||(bW[1]==="http:"?80:443)))),d.data&&d.processData&&typeof d.data!="string"&&(d.data=f.param(d.data,d.traditional)),b$(bT,d,c,v);if(s===2)return!1;t=d.global,d.type=d.type.toUpperCase(),d.hasContent=!bK.test(d.type),t&&f.active++===0&&f.event.trigger("ajaxStart");if(!d.hasContent){d.data&&(d.url+=(bM.test(d.url)?"&":"?")+d.data,delete d.data),k=d.url;if(d.cache===!1){var x=f.now(),y=d.url.replace(bQ,"$1_="+x);d.url=y+(y===d.url?(bM.test(d.url)?"&":"?")+"_="+x:"")}}(d.data&&d.hasContent&&d.contentType!==!1||c.contentType)&&v.setRequestHeader("Content-Type",d.contentType),d.ifModified&&(k=k||d.url,f.lastModified[k]&&v.setRequestHeader("If-Modified-Since",f.lastModified[k]),f.etag[k]&&v.setRequestHeader("If-None-Match",f.etag[k])),v.setRequestHeader("Accept",d.dataTypes[0]&&d.accepts[d.dataTypes[0]]?d.accepts[d.dataTypes[0]]+(d.dataTypes[0]!=="*"?", "+bX+"; q=0.01":""):d.accepts["*"]);for(u in d.headers)v.setRequestHeader(u,d.headers[u]);if(d.beforeSend&&(d.beforeSend.call(e,v,d)===!1||s===2)){v.abort();return!1}for(u in{success:1,error:1,complete:1})v[u](d[u]);p=b$(bU,d,c,v);if(!p)w(-1,"No Transport");else{v.readyState=1,t&&g.trigger("ajaxSend",[v,d]),d.async&&d.timeout>0&&(q=setTimeout(function(){v.abort("timeout")},d.timeout));try{s=1,p.send(l,w)}catch(z){if(s<2)w(-1,z);else throw z}}return v},param:function(a,c){var d=[],e=function(a,b){b=f.isFunction(b)?b():b,d[d.length]=encodeURIComponent(a)+"="+encodeURIComponent(b)};c===b&&(c=f.ajaxSettings.traditional);if(f.isArray(a)||a.jquery&&!f.isPlainObject(a))f.each(a,function(){e(this.name,this.value)});else for(var g in a)ca(g,a[g],c,e);return d.join("&").replace(bD,"+")}}),f.extend({active:0,lastModified:{},etag:{}});var cd=f.now(),ce=/(\=)\?(&|$)|\?\?/i;f.ajaxSetup({jsonp:"callback",jsonpCallback:function(){return f.expando+"_"+cd++}}),f.ajaxPrefilter("json jsonp",function(b,c,d){var e=b.contentType==="application/x-www-form-urlencoded"&&typeof b.data=="string";if(b.dataTypes[0]==="jsonp"||b.jsonp!==!1&&(ce.test(b.url)||e&&ce.test(b.data))){var g,h=b.jsonpCallback=f.isFunction(b.jsonpCallback)?b.jsonpCallback():b.jsonpCallback,i=a[h],j=b.url,k=b.data,l="$1"+h+"$2";b.jsonp!==!1&&(j=j.replace(ce,l),b.url===j&&(e&&(k=k.replace(ce,l)),b.data===k&&(j+=(/\?/.test(j)?"&":"?")+b.jsonp+"="+h))),b.url=j,b.data=k,a[h]=function(a){g=[a]},d.always(function(){a[h]=i,g&&f.isFunction(i)&&a[h](g[0])}),b.converters["script json"]=function(){g||f.error(h+" was not called");return g[0]},b.dataTypes[0]="json";return"script"}}),f.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/javascript|ecmascript/},converters:{"text script":function(a){f.globalEval(a);return a}}}),f.ajaxPrefilter("script",function(a){a.cache===b&&(a.cache=!1),a.crossDomain&&(a.type="GET",a.global=!1)}),f.ajaxTransport("script",function(a){if(a.crossDomain){var d,e=c.head||c.getElementsByTagName("head")[0]||c.documentElement;return{send:function(f,g){d=c.createElement("script"),d.async="async",a.scriptCharset&&(d.charset=a.scriptCharset),d.src=a.url,d.onload=d.onreadystatechange=function(a,c){if(c||!d.readyState||/loaded|complete/.test(d.readyState))d.onload=d.onreadystatechange=null,e&&d.parentNode&&e.removeChild(d),d=b,c||g(200,"success")},e.insertBefore(d,e.firstChild)},abort:function(){d&&d.onload(0,1)}}}});var cf=a.ActiveXObject?function(){for(var a in ch)ch[a](0,1)}:!1,cg=0,ch;f.ajaxSettings.xhr=a.ActiveXObject?function(){return!this.isLocal&&ci()||cj()}:ci,function(a){f.extend(f.support,{ajax:!!a,cors:!!a&&"withCredentials"in a})}(f.ajaxSettings.xhr()),f.support.ajax&&f.ajaxTransport(function(c){if(!c.crossDomain||f.support.cors){var d;return{send:function(e,g){var h=c.xhr(),i,j;c.username?h.open(c.type,c.url,c.async,c.username,c.password):h.open(c.type,c.url,c.async);if(c.xhrFields)for(j in c.xhrFields)h[j]=c.xhrFields[j];c.mimeType&&h.overrideMimeType&&h.overrideMimeType(c.mimeType),!c.crossDomain&&!e["X-Requested-With"]&&(e["X-Requested-With"]="XMLHttpRequest");try{for(j in e)h.setRequestHeader(j,e[j])}catch(k){}h.send(c.hasContent&&c.data||null),d=function(a,e){var j,k,l,m,n;try{if(d&&(e||h.readyState===4)){d=b,i&&(h.onreadystatechange=f.noop,cf&&delete ch[i]);if(e)h.readyState!==4&&h.abort();else{j=h.status,l=h.getAllResponseHeaders(),m={},n=h.responseXML,n&&n.documentElement&&(m.xml=n),m.text=h.responseText;try{k=h.statusText}catch(o){k=""}!j&&c.isLocal&&!c.crossDomain?j=m.text?200:404:j===1223&&(j=204)}}}catch(p){e||g(-1,p)}m&&g(j,k,m,l)},!c.async||h.readyState===4?d():(i=++cg,cf&&(ch||(ch={},f(a).unload(cf)),ch[i]=d),h.onreadystatechange=d)},abort:function(){d&&d(0,1)}}}});var ck={},cl,cm,cn=/^(?:toggle|show|hide)$/,co=/^([+\-]=)?([\d+.\-]+)([a-z%]*)$/i,cp,cq=[["height","marginTop","marginBottom","paddingTop","paddingBottom"],["width","marginLeft","marginRight","paddingLeft","paddingRight"],["opacity"]],cr;f.fn.extend({show:function(a,b,c){var d,e;if(a||a===0)return this.animate(cu("show",3),a,b,c);for(var g=0,h=this.length;g<h;g++)d=this[g],d.style&&(e=d.style.display,!f._data(d,"olddisplay")&&e==="none"&&(e=d.style.display=""),e===""&&f.css(d,"display")==="none"&&f._data(d,"olddisplay",cv(d.nodeName)));for(g=0;g<h;g++){d=this[g];if(d.style){e=d.style.display;if(e===""||e==="none")d.style.display=f._data(d,"olddisplay")||""}}return this},hide:function(a,b,c){if(a||a===0)return this.animate(cu("hide",3),a,b,c);var d,e,g=0,h=this.length;for(;g<h;g++)d=this[g],d.style&&(e=f.css(d,"display"),e!=="none"&&!f._data(d,"olddisplay")&&f._data(d,"olddisplay",e));for(g=0;g<h;g++)this[g].style&&(this[g].style.display="none");return this},_toggle:f.fn.toggle,toggle:function(a,b,c){var d=typeof a=="boolean";f.isFunction(a)&&f.isFunction(b)?this._toggle.apply(this,arguments):a==null||d?this.each(function(){var b=d?a:f(this).is(":hidden");f(this)[b?"show":"hide"]()}):this.animate(cu("toggle",3),a,b,c);return this},fadeTo:function(a,b,c,d){return this.filter(":hidden").css("opacity",0).show().end().animate({opacity:b},a,c,d)},animate:function(a,b,c,d){function g(){e.queue===!1&&f._mark(this);var b=f.extend({},e),c=this.nodeType===1,d=c&&f(this).is(":hidden"),g,h,i,j,k,l,m,n,o;b.animatedProperties={};for(i in a){g=f.camelCase(i),i!==g&&(a[g]=a[i],delete a[i]),h=a[g],f.isArray(h)?(b.animatedProperties[g]=h[1],h=a[g]=h[0]):b.animatedProperties[g]=b.specialEasing&&b.specialEasing[g]||b.easing||"swing";if(h==="hide"&&d||h==="show"&&!d)return b.complete.call(this);c&&(g==="height"||g==="width")&&(b.overflow=[this.style.overflow,this.style.overflowX,this.style.overflowY],f.css(this,"display")==="inline"&&f.css(this,"float")==="none"&&(!f.support.inlineBlockNeedsLayout||cv(this.nodeName)==="inline"?this.style.display="inline-block":this.style.zoom=1))}b.overflow!=null&&(this.style.overflow="hidden");for(i in a)j=new f.fx(this,b,i),h=a[i],cn.test(h)?(o=f._data(this,"toggle"+i)||(h==="toggle"?d?"show":"hide":0),o?(f._data(this,"toggle"+i,o==="show"?"hide":"show"),j[o]()):j[h]()):(k=co.exec(h),l=j.cur(),k?(m=parseFloat(k[2]),n=k[3]||(f.cssNumber[i]?"":"px"),n!=="px"&&(f.style(this,i,(m||1)+n),l=(m||1)/j.cur()*l,f.style(this,i,l+n)),k[1]&&(m=(k[1]==="-="?-1:1)*m+l),j.custom(l,m,n)):j.custom(l,h,""));return!0}var e=f.speed(b,c,d);if(f.isEmptyObject(a))return this.each(e.complete,[!1]);a=f.extend({},a);return e.queue===!1?this.each(g):this.queue(e.queue,g)},stop:function(a,c,d){typeof a!="string"&&(d=c,c=a,a=b),c&&a!==!1&&this.queue(a||"fx",[]);return this.each(function(){function h(a,b,c){var e=b[c];f.removeData(a,c,!0),e.stop(d)}var b,c=!1,e=f.timers,g=f._data(this);d||f._unmark(!0,this);if(a==null)for(b in g)g[b]&&g[b].stop&&b.indexOf(".run")===b.length-4&&h(this,g,b);else g[b=a+".run"]&&g[b].stop&&h(this,g,b);for(b=e.length;b--;)e[b].elem===this&&(a==null||e[b].queue===a)&&(d?e[b](!0):e[b].saveState(),c=!0,e.splice(b,1));(!d||!c)&&f.dequeue(this,a)})}}),f.each({slideDown:cu("show",1),slideUp:cu("hide",1),slideToggle:cu("toggle",1),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(a,b){f.fn[a]=function(a,c,d){return this.animate(b,a,c,d)}}),f.extend({speed:function(a,b,c){var d=a&&typeof a=="object"?f.extend({},a):{complete:c||!c&&b||f.isFunction(a)&&a,duration:a,easing:c&&b||b&&!f.isFunction(b)&&b};d.duration=f.fx.off?0:typeof d.duration=="number"?d.duration:d.duration in f.fx.speeds?f.fx.speeds[d.duration]:f.fx.speeds._default;if(d.queue==null||d.queue===!0)d.queue="fx";d.old=d.complete,d.complete=function(a){f.isFunction(d.old)&&d.old.call(this),d.queue?f.dequeue(this,d.queue):a!==!1&&f._unmark(this)};return d},easing:{linear:function(a,b,c,d){return c+d*a},swing:function(a,b,c,d){return(-Math.cos(a*Math.PI)/2+.5)*d+c}},timers:[],fx:function(a,b,c){this.options=b,this.elem=a,this.prop=c,b.orig=b.orig||{}}}),f.fx.prototype={update:function(){this.options.step&&this.options.step.call(this.elem,this.now,this),(f.fx.step[this.prop]||f.fx.step._default)(this)},cur:function(){if(this.elem[this.prop]!=null&&(!this.elem.style||this.elem.style[this.prop]==null))return this.elem[this.prop];var a,b=f.css(this.elem,this.prop);return isNaN(a=parseFloat(b))?!b||b==="auto"?0:b:a},custom:function(a,c,d){function h(a){return e.step(a)}var e=this,g=f.fx;this.startTime=cr||cs(),this.end=c,this.now=this.start=a,this.pos=this.state=0,this.unit=d||this.unit||(f.cssNumber[this.prop]?"":"px"),h.queue=this.options.queue,h.elem=this.elem,h.saveState=function(){e.options.hide&&f._data(e.elem,"fxshow"+e.prop)===b&&f._data(e.elem,"fxshow"+e.prop,e.start)},h()&&f.timers.push(h)&&!cp&&(cp=setInterval(g.tick,g.interval))},show:function(){var a=f._data(this.elem,"fxshow"+this.prop);this.options.orig[this.prop]=a||f.style(this.elem,this.prop),this.options.show=!0,a!==b?this.custom(this.cur(),a):this.custom(this.prop==="width"||this.prop==="height"?1:0,this.cur()),f(this.elem).show()},hide:function(){this.options.orig[this.prop]=f._data(this.elem,"fxshow"+this.prop)||f.style(this.elem,this.prop),this.options.hide=!0,this.custom(this.cur(),0)},step:function(a){var b,c,d,e=cr||cs(),g=!0,h=this.elem,i=this.options;if(a||e>=i.duration+this.startTime){this.now=this.end,this.pos=this.state=1,this.update(),i.animatedProperties[this.prop]=!0;for(b in i.animatedProperties)i.animatedProperties[b]!==!0&&(g=!1);if(g){i.overflow!=null&&!f.support.shrinkWrapBlocks&&f.each(["","X","Y"],function(a,b){h.style["overflow"+b]=i.overflow[a]}),i.hide&&f(h).hide();if(i.hide||i.show)for(b in i.animatedProperties)f.style(h,b,i.orig[b]),f.removeData(h,"fxshow"+b,!0),f.removeData(h,"toggle"+b,!0);d=i.complete,d&&(i.complete=!1,d.call(h))}return!1}i.duration==Infinity?this.now=e:(c=e-this.startTime,this.state=c/i.duration,this.pos=f.easing[i.animatedProperties[this.prop]](this.state,c,0,1,i.duration),this.now=this.start+(this.end-this.start)*this.pos),this.update();return!0}},f.extend(f.fx,{tick:function(){var a,b=f.timers,c=0;for(;c<b.length;c++)a=b[c],!a()&&b[c]===a&&b.splice(c--,1);b.length||f.fx.stop()},interval:13,stop:function(){clearInterval(cp),cp=null},speeds:{slow:600,fast:200,_default:400},step:{opacity:function(a){f.style(a.elem,"opacity",a.now)},_default:function(a){a.elem.style&&a.elem.style[a.prop]!=null?a.elem.style[a.prop]=a.now+a.unit:a.elem[a.prop]=a.now}}}),f.each(["width","height"],function(a,b){f.fx.step[b]=function(a){f.style(a.elem,b,Math.max(0,a.now)+a.unit)}}),f.expr&&f.expr.filters&&(f.expr.filters.animated=function(a){return f.grep(f.timers,function(b){return a===b.elem}).length});var cw=/^t(?:able|d|h)$/i,cx=/^(?:body|html)$/i;"getBoundingClientRect"in c.documentElement?f.fn.offset=function(a){var b=this[0],c;if(a)return this.each(function(b){f.offset.setOffset(this,a,b)});if(!b||!b.ownerDocument)return null;if(b===b.ownerDocument.body)return f.offset.bodyOffset(b);try{c=b.getBoundingClientRect()}catch(d){}var e=b.ownerDocument,g=e.documentElement;if(!c||!f.contains(g,b))return c?{top:c.top,left:c.left}:{top:0,left:0};var h=e.body,i=cy(e),j=g.clientTop||h.clientTop||0,k=g.clientLeft||h.clientLeft||0,l=i.pageYOffset||f.support.boxModel&&g.scrollTop||h.scrollTop,m=i.pageXOffset||f.support.boxModel&&g.scrollLeft||h.scrollLeft,n=c.top+l-j,o=c.left+m-k;return{top:n,left:o}}:f.fn.offset=function(a){var b=this[0];if(a)return this.each(function(b){f.offset.setOffset(this,a,b)});if(!b||!b.ownerDocument)return null;if(b===b.ownerDocument.body)return f.offset.bodyOffset(b);var c,d=b.offsetParent,e=b,g=b.ownerDocument,h=g.documentElement,i=g.body,j=g.defaultView,k=j?j.getComputedStyle(b,null):b.currentStyle,l=b.offsetTop,m=b.offsetLeft;while((b=b.parentNode)&&b!==i&&b!==h){if(f.support.fixedPosition&&k.position==="fixed")break;c=j?j.getComputedStyle(b,null):b.currentStyle,l-=b.scrollTop,m-=b.scrollLeft,b===d&&(l+=b.offsetTop,m+=b.offsetLeft,f.support.doesNotAddBorder&&(!f.support.doesAddBorderForTableAndCells||!cw.test(b.nodeName))&&(l+=parseFloat(c.borderTopWidth)||0,m+=parseFloat(c.borderLeftWidth)||0),e=d,d=b.offsetParent),f.support.subtractsBorderForOverflowNotVisible&&c.overflow!=="visible"&&(l+=parseFloat(c.borderTopWidth)||0,m+=parseFloat(c.borderLeftWidth)||0),k=c}if(k.position==="relative"||k.position==="static")l+=i.offsetTop,m+=i.offsetLeft;f.support.fixedPosition&&k.position==="fixed"&&(l+=Math.max(h.scrollTop,i.scrollTop),m+=Math.max(h.scrollLeft,i.scrollLeft));return{top:l,left:m}},f.offset={bodyOffset:function(a){var b=a.offsetTop,c=a.offsetLeft;f.support.doesNotIncludeMarginInBodyOffset&&(b+=parseFloat(f.css(a,"marginTop"))||0,c+=parseFloat(f.css(a,"marginLeft"))||0);return{top:b,left:c}},setOffset:function(a,b,c){var d=f.css(a,"position");d==="static"&&(a.style.position="relative");var e=f(a),g=e.offset(),h=f.css(a,"top"),i=f.css(a,"left"),j=(d==="absolute"||d==="fixed")&&f.inArray("auto",[h,i])>-1,k={},l={},m,n;j?(l=e.position(),m=l.top,n=l.left):(m=parseFloat(h)||0,n=parseFloat(i)||0),f.isFunction(b)&&(b=b.call(a,c,g)),b.top!=null&&(k.top=b.top-g.top+m),b.left!=null&&(k.left=b.left-g.left+n),"using"in b?b.using.call(a,k):e.css(k)}},f.fn.extend({position:function(){if(!this[0])return null;var a=this[0],b=this.offsetParent(),c=this.offset(),d=cx.test(b[0].nodeName)?{top:0,left:0}:b.offset();c.top-=parseFloat(f.css(a,"marginTop"))||0,c.left-=parseFloat(f.css(a,"marginLeft"))||0,d.top+=parseFloat(f.css(b[0],"borderTopWidth"))||0,d.left+=parseFloat(f.css(b[0],"borderLeftWidth"))||0;return{top:c.top-d.top,left:c.left-d.left}},offsetParent:function(){return this.map(function(){var a=this.offsetParent||c.body;while(a&&!cx.test(a.nodeName)&&f.css(a,"position")==="static")a=a.offsetParent;return a})}}),f.each(["Left","Top"],function(a,c){var d="scroll"+c;f.fn[d]=function(c){var e,g;if(c===b){e=this[0];if(!e)return null;g=cy(e);return g?"pageXOffset"in g?g[a?"pageYOffset":"pageXOffset"]:f.support.boxModel&&g.document.documentElement[d]||g.document.body[d]:e[d]}return this.each(function(){g=cy(this),g?g.scrollTo(a?f(g).scrollLeft():c,a?c:f(g).scrollTop()):this[d]=c})}}),f.each(["Height","Width"],function(a,c){var d=c.toLowerCase();f.fn["inner"+c]=function(){var a=this[0];return a?a.style?parseFloat(f.css(a,d,"padding")):this[d]():null},f.fn["outer"+c]=function(a){var b=this[0];return b?b.style?parseFloat(f.css(b,d,a?"margin":"border")):this[d]():null},f.fn[d]=function(a){var e=this[0];if(!e)return a==null?null:this;if(f.isFunction(a))return this.each(function(b){var c=f(this);c[d](a.call(this,b,c[d]()))});if(f.isWindow(e)){var g=e.document.documentElement["client"+c],h=e.document.body;return e.document.compatMode==="CSS1Compat"&&g||h&&h["client"+c]||g}if(e.nodeType===9)return Math.max(e.documentElement["client"+c],e.body["scroll"+c],e.documentElement["scroll"+c],e.body["offset"+c],e.documentElement["offset"+c]);if(a===b){var i=f.css(e,d),j=parseFloat(i);return f.isNumeric(j)?j:i}return this.css(d,typeof a=="string"?a:a+"px")}}),a.jQuery=a.$=f,typeof define=="function"&&define.amd&&define.amd.jQuery&&define("jquery",[],function(){return f})})(window);  
  
  
  
  //jquery.example.min.js
  (function(a){"use strict",a.fn.example=function(b,c){var d=a.isFunction(b),e=a.extend({},c,{example:b});return this.each(function(){var b,c,f=a(this);a.metadata?b=a.extend({},a.fn.example.defaults,f.metadata(),e):b=a.extend({},a.fn.example.defaults,e),c=function(){a(this).find("."+b.className).val("")},a.fn.example.boundClassNames[b.className]||(a(window).bind("unload.example",function(){a("."+b.className).val("")}),a.fn.on?a("body").on("submit.example","form",c):a.fn.delegate?a("body").delegate("form","submit.example",c):a.fn.live?a("form").live("submit.example",c):a("form").bind("submit.example",c),a.fn.example.boundClassNames[b.className]=!0),f.val()!==this.defaultValue&&(d||f.val()===b.example)&&f.val(this.defaultValue),f.val()===""&&!f.is(":focus")&&f.addClass(b.className).val(d?b.example.call(this):b.example),f.bind("focus.example",function(){a(this).is("."+b.className)&&a(this).val("").removeClass(b.className)}).bind("change.example",function(){a(this).is("."+b.className)&&a(this).removeClass(b.className)}).bind("blur.example",function(){a(this).val()===""&&a(this).addClass(b.className).val(d?b.example.call(this):b.example)})})},a.fn.example.defaults={className:"example"},a.fn.example.boundClassNames=[]})(jQuery);
  
  
  // delayed-observer.js
  (function($){
      $.extend($.fn, {
          delayedObserver: function(callback, delay, options) {
              return this.each(function() {
                  var el = $(this);
                  var op = options || {};
                  
                  var timer;
                  var oldval = el.val();
                  var condition = op.condition || function() {
                      return $(this).val() == oldval;
                  }
                  delay = delay || 0.5;
                  
                  function changeHandler() {
                      if (!condition.apply(el)) {
                          if (timer) {
                              clearTimeout(timer);
                          }
                          timer = setTimeout(function() {
                              callback.apply(el);
                          }, delay * 1000);
                          oldval = el.val();
                      }
                  }
                  
                  el.bind(op.event || 'keyup', changeHandler);
              });
          }
      });
  })(jQuery);
  
  //rawdeflate.js
  (function(){

  /* constant parameters */
  var zip_WSIZE = 32768;		// Sliding Window size
  var zip_STORED_BLOCK = 0;
  var zip_STATIC_TREES = 1;
  var zip_DYN_TREES    = 2;

  /* for deflate */
  var zip_DEFAULT_LEVEL = 6;
  var zip_FULL_SEARCH = true;
  var zip_INBUFSIZ = 32768;	// Input buffer size
  var zip_INBUF_EXTRA = 64;	// Extra buffer
  var zip_OUTBUFSIZ = 1024 * 8;
  var zip_window_size = 2 * zip_WSIZE;
  var zip_MIN_MATCH = 3;
  var zip_MAX_MATCH = 258;
  var zip_BITS = 16;
  // for SMALL_MEM
  var zip_LIT_BUFSIZE = 0x2000;
  var zip_HASH_BITS = 13;
  // for MEDIUM_MEM
  // var zip_LIT_BUFSIZE = 0x4000;
  // var zip_HASH_BITS = 14;
  // for BIG_MEM
  // var zip_LIT_BUFSIZE = 0x8000;
  // var zip_HASH_BITS = 15;
  if(zip_LIT_BUFSIZE > zip_INBUFSIZ)
      alert("error: zip_INBUFSIZ is too small");
  if((zip_WSIZE<<1) > (1<<zip_BITS))
      alert("error: zip_WSIZE is too large");
  if(zip_HASH_BITS > zip_BITS-1)
      alert("error: zip_HASH_BITS is too large");
  if(zip_HASH_BITS < 8 || zip_MAX_MATCH != 258)
      alert("error: Code too clever");
  var zip_DIST_BUFSIZE = zip_LIT_BUFSIZE;
  var zip_HASH_SIZE = 1 << zip_HASH_BITS;
  var zip_HASH_MASK = zip_HASH_SIZE - 1;
  var zip_WMASK = zip_WSIZE - 1;
  var zip_NIL = 0; // Tail of hash chains
  var zip_TOO_FAR = 4096;
  var zip_MIN_LOOKAHEAD = zip_MAX_MATCH + zip_MIN_MATCH + 1;
  var zip_MAX_DIST = zip_WSIZE - zip_MIN_LOOKAHEAD;
  var zip_SMALLEST = 1;
  var zip_MAX_BITS = 15;
  var zip_MAX_BL_BITS = 7;
  var zip_LENGTH_CODES = 29;
  var zip_LITERALS =256;
  var zip_END_BLOCK = 256;
  var zip_L_CODES = zip_LITERALS + 1 + zip_LENGTH_CODES;
  var zip_D_CODES = 30;
  var zip_BL_CODES = 19;
  var zip_REP_3_6 = 16;
  var zip_REPZ_3_10 = 17;
  var zip_REPZ_11_138 = 18;
  var zip_HEAP_SIZE = 2 * zip_L_CODES + 1;
  var zip_H_SHIFT = parseInt((zip_HASH_BITS + zip_MIN_MATCH - 1) /
           zip_MIN_MATCH);

  /* variables */
  var zip_free_queue;
  var zip_qhead, zip_qtail;
  var zip_initflag;
  var zip_outbuf = null;
  var zip_outcnt, zip_outoff;
  var zip_complete;
  var zip_window;
  var zip_d_buf;
  var zip_l_buf;
  var zip_prev;
  var zip_bi_buf;
  var zip_bi_valid;
  var zip_block_start;
  var zip_ins_h;
  var zip_hash_head;
  var zip_prev_match;
  var zip_match_available;
  var zip_match_length;
  var zip_prev_length;
  var zip_strstart;
  var zip_match_start;
  var zip_eofile;
  var zip_lookahead;
  var zip_max_chain_length;
  var zip_max_lazy_match;
  var zip_compr_level;
  var zip_good_match;
  var zip_nice_match;
  var zip_dyn_ltree;
  var zip_dyn_dtree;
  var zip_static_ltree;
  var zip_static_dtree;
  var zip_bl_tree;
  var zip_l_desc;
  var zip_d_desc;
  var zip_bl_desc;
  var zip_bl_count;
  var zip_heap;
  var zip_heap_len;
  var zip_heap_max;
  var zip_depth;
  var zip_length_code;
  var zip_dist_code;
  var zip_base_length;
  var zip_base_dist;
  var zip_flag_buf;
  var zip_last_lit;
  var zip_last_dist;
  var zip_last_flags;
  var zip_flags;
  var zip_flag_bit;
  var zip_opt_len;
  var zip_static_len;
  var zip_deflate_data;
  var zip_deflate_pos;

  /* objects (deflate) */

  var zip_DeflateCT = function() {
      this.fc = 0; // frequency count or bit string
      this.dl = 0; // father node in Huffman tree or length of bit string
  }

  var zip_DeflateTreeDesc = function() {
      this.dyn_tree = null;	// the dynamic tree
      this.static_tree = null;	// corresponding static tree or NULL
      this.extra_bits = null;	// extra bits for each code or NULL
      this.extra_base = 0;	// base index for extra_bits
      this.elems = 0;		// max number of elements in the tree
      this.max_length = 0;	// max bit length for the codes
      this.max_code = 0;		// largest code with non zero frequency
  }

  /* Values for max_lazy_match, good_match and max_chain_length, depending on
   * the desired pack level (0..9). The values given below have been tuned to
   * exclude worst case performance for pathological files. Better values may be
   * found for specific files.
   */
  var zip_DeflateConfiguration = function(a, b, c, d) {
      this.good_length = a; // reduce lazy search above this match length
      this.max_lazy = b;    // do not perform lazy search above this match length
      this.nice_length = c; // quit search above this match length
      this.max_chain = d;
  }

  var zip_DeflateBuffer = function() {
      this.next = null;
      this.len = 0;
      this.ptr = new Array(zip_OUTBUFSIZ);
      this.off = 0;
  }

  /* constant tables */
  var zip_extra_lbits = new Array(
      0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0);
  var zip_extra_dbits = new Array(
      0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13);
  var zip_extra_blbits = new Array(
      0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7);
  var zip_bl_order = new Array(
      16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15);
  var zip_configuration_table = new Array(
    new zip_DeflateConfiguration(0,    0,   0,    0),
    new zip_DeflateConfiguration(4,    4,   8,    4),
    new zip_DeflateConfiguration(4,    5,  16,    8),
    new zip_DeflateConfiguration(4,    6,  32,   32),
    new zip_DeflateConfiguration(4,    4,  16,   16),
    new zip_DeflateConfiguration(8,   16,  32,   32),
    new zip_DeflateConfiguration(8,   16, 128,  128),
    new zip_DeflateConfiguration(8,   32, 128,  256),
    new zip_DeflateConfiguration(32, 128, 258, 1024),
    new zip_DeflateConfiguration(32, 258, 258, 4096));


  /* routines (deflate) */

  var zip_deflate_start = function(level) {
      var i;

      if(!level)
    level = zip_DEFAULT_LEVEL;
      else if(level < 1)
    level = 1;
      else if(level > 9)
    level = 9;

      zip_compr_level = level;
      zip_initflag = false;
      zip_eofile = false;
      if(zip_outbuf != null)
    return;

      zip_free_queue = zip_qhead = zip_qtail = null;
      zip_outbuf = new Array(zip_OUTBUFSIZ);
      zip_window = new Array(zip_window_size);
      zip_d_buf = new Array(zip_DIST_BUFSIZE);
      zip_l_buf = new Array(zip_INBUFSIZ + zip_INBUF_EXTRA);
      zip_prev = new Array(1 << zip_BITS);
      zip_dyn_ltree = new Array(zip_HEAP_SIZE);
      for(i = 0; i < zip_HEAP_SIZE; i++)
    zip_dyn_ltree[i] = new zip_DeflateCT();
      zip_dyn_dtree = new Array(2*zip_D_CODES+1);
      for(i = 0; i < 2*zip_D_CODES+1; i++)
    zip_dyn_dtree[i] = new zip_DeflateCT();
      zip_static_ltree = new Array(zip_L_CODES+2);
      for(i = 0; i < zip_L_CODES+2; i++)
    zip_static_ltree[i] = new zip_DeflateCT();
      zip_static_dtree = new Array(zip_D_CODES);
      for(i = 0; i < zip_D_CODES; i++)
    zip_static_dtree[i] = new zip_DeflateCT();
      zip_bl_tree = new Array(2*zip_BL_CODES+1);
      for(i = 0; i < 2*zip_BL_CODES+1; i++)
    zip_bl_tree[i] = new zip_DeflateCT();
      zip_l_desc = new zip_DeflateTreeDesc();
      zip_d_desc = new zip_DeflateTreeDesc();
      zip_bl_desc = new zip_DeflateTreeDesc();
      zip_bl_count = new Array(zip_MAX_BITS+1);
      zip_heap = new Array(2*zip_L_CODES+1);
      zip_depth = new Array(2*zip_L_CODES+1);
      zip_length_code = new Array(zip_MAX_MATCH-zip_MIN_MATCH+1);
      zip_dist_code = new Array(512);
      zip_base_length = new Array(zip_LENGTH_CODES);
      zip_base_dist = new Array(zip_D_CODES);
      zip_flag_buf = new Array(parseInt(zip_LIT_BUFSIZE / 8));
  }

  var zip_deflate_end = function() {
      zip_free_queue = zip_qhead = zip_qtail = null;
      zip_outbuf = null;
      zip_window = null;
      zip_d_buf = null;
      zip_l_buf = null;
      zip_prev = null;
      zip_dyn_ltree = null;
      zip_dyn_dtree = null;
      zip_static_ltree = null;
      zip_static_dtree = null;
      zip_bl_tree = null;
      zip_l_desc = null;
      zip_d_desc = null;
      zip_bl_desc = null;
      zip_bl_count = null;
      zip_heap = null;
      zip_depth = null;
      zip_length_code = null;
      zip_dist_code = null;
      zip_base_length = null;
      zip_base_dist = null;
      zip_flag_buf = null;
  }

  var zip_reuse_queue = function(p) {
      p.next = zip_free_queue;
      zip_free_queue = p;
  }

  var zip_new_queue = function() {
      var p;

      if(zip_free_queue != null)
      {
    p = zip_free_queue;
    zip_free_queue = zip_free_queue.next;
      }
      else
    p = new zip_DeflateBuffer();
      p.next = null;
      p.len = p.off = 0;

      return p;
  }

  var zip_head1 = function(i) {
      return zip_prev[zip_WSIZE + i];
  }

  var zip_head2 = function(i, val) {
      return zip_prev[zip_WSIZE + i] = val;
  }

  /* put_byte is used for the compressed output, put_ubyte for the
   * uncompressed output. However unlzw() uses window for its
   * suffix table instead of its output buffer, so it does not use put_ubyte
   * (to be cleaned up).
   */
  var zip_put_byte = function(c) {
      zip_outbuf[zip_outoff + zip_outcnt++] = c;
      if(zip_outoff + zip_outcnt == zip_OUTBUFSIZ)
    zip_qoutbuf();
  }

  /* Output a 16 bit value, lsb first */
  var zip_put_short = function(w) {
      w &= 0xffff;
      if(zip_outoff + zip_outcnt < zip_OUTBUFSIZ - 2) {
    zip_outbuf[zip_outoff + zip_outcnt++] = (w & 0xff);
    zip_outbuf[zip_outoff + zip_outcnt++] = (w >>> 8);
      } else {
    zip_put_byte(w & 0xff);
    zip_put_byte(w >>> 8);
      }
  }

  /* ==========================================================================
   * Insert string s in the dictionary and set match_head to the previous head
   * of the hash chain (the most recent string with same hash key). Return
   * the previous length of the hash chain.
   * IN  assertion: all calls to to INSERT_STRING are made with consecutive
   *    input characters and the first MIN_MATCH bytes of s are valid
   *    (except for the last MIN_MATCH-1 bytes of the input file).
   */
  var zip_INSERT_STRING = function() {
      zip_ins_h = ((zip_ins_h << zip_H_SHIFT)
       ^ (zip_window[zip_strstart + zip_MIN_MATCH - 1] & 0xff))
    & zip_HASH_MASK;
      zip_hash_head = zip_head1(zip_ins_h);
      zip_prev[zip_strstart & zip_WMASK] = zip_hash_head;
      zip_head2(zip_ins_h, zip_strstart);
  }

  /* Send a code of the given tree. c and tree must not have side effects */
  var zip_SEND_CODE = function(c, tree) {
      zip_send_bits(tree[c].fc, tree[c].dl);
  }

  /* Mapping from a distance to a distance code. dist is the distance - 1 and
   * must not have side effects. dist_code[256] and dist_code[257] are never
   * used.
   */
  var zip_D_CODE = function(dist) {
      return (dist < 256 ? zip_dist_code[dist]
        : zip_dist_code[256 + (dist>>7)]) & 0xff;
  }

  /* ==========================================================================
   * Compares to subtrees, using the tree depth as tie breaker when
   * the subtrees have equal frequency. This minimizes the worst case length.
   */
  var zip_SMALLER = function(tree, n, m) {
      return tree[n].fc < tree[m].fc ||
        (tree[n].fc == tree[m].fc && zip_depth[n] <= zip_depth[m]);
  }

  /* ==========================================================================
   * read string data
   */
  var zip_read_buff = function(buff, offset, n) {
      var i;
      for(i = 0; i < n && zip_deflate_pos < zip_deflate_data.length; i++)
    buff[offset + i] =
        zip_deflate_data.charCodeAt(zip_deflate_pos++) & 0xff;
      return i;
  }

  /* ==========================================================================
   * Initialize the "longest match" routines for a new file
   */
  var zip_lm_init = function() {
      var j;

      /* Initialize the hash table. */
      for(j = 0; j < zip_HASH_SIZE; j++)
  //	zip_head2(j, zip_NIL);
    zip_prev[zip_WSIZE + j] = 0;
      /* prev will be initialized on the fly */

      /* Set the default configuration parameters:
       */
      zip_max_lazy_match = zip_configuration_table[zip_compr_level].max_lazy;
      zip_good_match     = zip_configuration_table[zip_compr_level].good_length;
      if(!zip_FULL_SEARCH)
    zip_nice_match = zip_configuration_table[zip_compr_level].nice_length;
      zip_max_chain_length = zip_configuration_table[zip_compr_level].max_chain;

      zip_strstart = 0;
      zip_block_start = 0;

      zip_lookahead = zip_read_buff(zip_window, 0, 2 * zip_WSIZE);
      if(zip_lookahead <= 0) {
    zip_eofile = true;
    zip_lookahead = 0;
    return;
      }
      zip_eofile = false;
      /* Make sure that we always have enough lookahead. This is important
       * if input comes from a device such as a tty.
       */
      while(zip_lookahead < zip_MIN_LOOKAHEAD && !zip_eofile)
    zip_fill_window();

      /* If lookahead < MIN_MATCH, ins_h is garbage, but this is
       * not important since only literal bytes will be emitted.
       */
      zip_ins_h = 0;
      for(j = 0; j < zip_MIN_MATCH - 1; j++) {
  //      UPDATE_HASH(ins_h, window[j]);
    zip_ins_h = ((zip_ins_h << zip_H_SHIFT) ^ (zip_window[j] & 0xff)) & zip_HASH_MASK;
      }
  }

  /* ==========================================================================
   * Set match_start to the longest match starting at the given string and
   * return its length. Matches shorter or equal to prev_length are discarded,
   * in which case the result is equal to prev_length and match_start is
   * garbage.
   * IN assertions: cur_match is the head of the hash chain for the current
   *   string (strstart) and its distance is <= MAX_DIST, and prev_length >= 1
   */
  var zip_longest_match = function(cur_match) {
      var chain_length = zip_max_chain_length; // max hash chain length
      var scanp = zip_strstart; // current string
      var matchp;		// matched string
      var len;		// length of current match
      var best_len = zip_prev_length;	// best match length so far

      /* Stop when cur_match becomes <= limit. To simplify the code,
       * we prevent matches with the string of window index 0.
       */
      var limit = (zip_strstart > zip_MAX_DIST ? zip_strstart - zip_MAX_DIST : zip_NIL);

      var strendp = zip_strstart + zip_MAX_MATCH;
      var scan_end1 = zip_window[scanp + best_len - 1];
      var scan_end  = zip_window[scanp + best_len];

      /* Do not waste too much time if we already have a good match: */
      if(zip_prev_length >= zip_good_match)
    chain_length >>= 2;

  //  Assert(encoder->strstart <= window_size-MIN_LOOKAHEAD, "insufficient lookahead");

      do {
  //    Assert(cur_match < encoder->strstart, "no future");
    matchp = cur_match;

    /* Skip to next match if the match length cannot increase
        * or if the match length is less than 2:
    */
    if(zip_window[matchp + best_len]	!= scan_end  ||
       zip_window[matchp + best_len - 1]	!= scan_end1 ||
       zip_window[matchp]			!= zip_window[scanp] ||
       zip_window[++matchp]			!= zip_window[scanp + 1]) {
        continue;
    }

    /* The check at best_len-1 can be removed because it will be made
           * again later. (This heuristic is not always a win.)
           * It is not necessary to compare scan[2] and match[2] since they
           * are always equal when the other bytes match, given that
           * the hash keys are equal and that HASH_BITS >= 8.
           */
    scanp += 2;
    matchp++;

    /* We check for insufficient lookahead only every 8th comparison;
           * the 256th check will be made at strstart+258.
           */
    do {
    } while(zip_window[++scanp] == zip_window[++matchp] &&
      zip_window[++scanp] == zip_window[++matchp] &&
      zip_window[++scanp] == zip_window[++matchp] &&
      zip_window[++scanp] == zip_window[++matchp] &&
      zip_window[++scanp] == zip_window[++matchp] &&
      zip_window[++scanp] == zip_window[++matchp] &&
      zip_window[++scanp] == zip_window[++matchp] &&
      zip_window[++scanp] == zip_window[++matchp] &&
      scanp < strendp);

        len = zip_MAX_MATCH - (strendp - scanp);
        scanp = strendp - zip_MAX_MATCH;

        if(len > best_len) {
      zip_match_start = cur_match;
      best_len = len;
      if(zip_FULL_SEARCH) {
          if(len >= zip_MAX_MATCH) break;
      } else {
          if(len >= zip_nice_match) break;
      }

      scan_end1  = zip_window[scanp + best_len-1];
      scan_end   = zip_window[scanp + best_len];
        }
      } while((cur_match = zip_prev[cur_match & zip_WMASK]) > limit
        && --chain_length != 0);

      return best_len;
  }

  /* ==========================================================================
   * Fill the window when the lookahead becomes insufficient.
   * Updates strstart and lookahead, and sets eofile if end of input file.
   * IN assertion: lookahead < MIN_LOOKAHEAD && strstart + lookahead > 0
   * OUT assertions: at least one byte has been read, or eofile is set;
   *    file reads are performed for at least two bytes (required for the
   *    translate_eol option).
   */
  var zip_fill_window = function() {
      var n, m;

      // Amount of free space at the end of the window.
      var more = zip_window_size - zip_lookahead - zip_strstart;

      /* If the window is almost full and there is insufficient lookahead,
       * move the upper half to the lower one to make room in the upper half.
       */
      if(more == -1) {
    /* Very unlikely, but possible on 16 bit machine if strstart == 0
           * and lookahead == 1 (input done one byte at time)
           */
    more--;
      } else if(zip_strstart >= zip_WSIZE + zip_MAX_DIST) {
    /* By the IN assertion, the window is not empty so we can't confuse
           * more == 0 with more == 64K on a 16 bit machine.
           */
  //	Assert(window_size == (ulg)2*WSIZE, "no sliding with BIG_MEM");

  //	System.arraycopy(window, WSIZE, window, 0, WSIZE);
    for(n = 0; n < zip_WSIZE; n++)
        zip_window[n] = zip_window[n + zip_WSIZE];
        
    zip_match_start -= zip_WSIZE;
    zip_strstart    -= zip_WSIZE; /* we now have strstart >= MAX_DIST: */
    zip_block_start -= zip_WSIZE;

    for(n = 0; n < zip_HASH_SIZE; n++) {
        m = zip_head1(n);
        zip_head2(n, m >= zip_WSIZE ? m - zip_WSIZE : zip_NIL);
    }
    for(n = 0; n < zip_WSIZE; n++) {
        /* If n is not on any hash chain, prev[n] is garbage but
         * its value will never be used.
         */
        m = zip_prev[n];
        zip_prev[n] = (m >= zip_WSIZE ? m - zip_WSIZE : zip_NIL);
    }
    more += zip_WSIZE;
      }
      // At this point, more >= 2
      if(!zip_eofile) {
    n = zip_read_buff(zip_window, zip_strstart + zip_lookahead, more);
    if(n <= 0)
        zip_eofile = true;
    else
        zip_lookahead += n;
      }
  }

  /* ==========================================================================
   * Processes a new input file and return its compressed length. This
   * function does not perform lazy evaluationof matches and inserts
   * new strings in the dictionary only for unmatched strings or for short
   * matches. It is used only for the fast compression options.
   */
  var zip_deflate_fast = function() {
      while(zip_lookahead != 0 && zip_qhead == null) {
    var flush; // set if current block must be flushed

    /* Insert the string window[strstart .. strstart+2] in the
     * dictionary, and set hash_head to the head of the hash chain:
     */
    zip_INSERT_STRING();

    /* Find the longest match, discarding those <= prev_length.
     * At this point we have always match_length < MIN_MATCH
     */
    if(zip_hash_head != zip_NIL &&
       zip_strstart - zip_hash_head <= zip_MAX_DIST) {
        /* To simplify the code, we prevent matches with the string
         * of window index 0 (in particular we have to avoid a match
         * of the string with itself at the start of the input file).
         */
        zip_match_length = zip_longest_match(zip_hash_head);
        /* longest_match() sets match_start */
        if(zip_match_length > zip_lookahead)
      zip_match_length = zip_lookahead;
    }
    if(zip_match_length >= zip_MIN_MATCH) {
  //	    check_match(strstart, match_start, match_length);

        flush = zip_ct_tally(zip_strstart - zip_match_start,
           zip_match_length - zip_MIN_MATCH);
        zip_lookahead -= zip_match_length;

        /* Insert new strings in the hash table only if the match length
         * is not too large. This saves time but degrades compression.
         */
        if(zip_match_length <= zip_max_lazy_match) {
      zip_match_length--; // string at strstart already in hash table
      do {
          zip_strstart++;
          zip_INSERT_STRING();
          /* strstart never exceeds WSIZE-MAX_MATCH, so there are
           * always MIN_MATCH bytes ahead. If lookahead < MIN_MATCH
           * these bytes are garbage, but it does not matter since
           * the next lookahead bytes will be emitted as literals.
           */
      } while(--zip_match_length != 0);
      zip_strstart++;
        } else {
      zip_strstart += zip_match_length;
      zip_match_length = 0;
      zip_ins_h = zip_window[zip_strstart] & 0xff;
  //		UPDATE_HASH(ins_h, window[strstart + 1]);
      zip_ins_h = ((zip_ins_h<<zip_H_SHIFT) ^ (zip_window[zip_strstart + 1] & 0xff)) & zip_HASH_MASK;

  //#if MIN_MATCH != 3
  //		Call UPDATE_HASH() MIN_MATCH-3 more times
  //#endif

        }
    } else {
        /* No match, output a literal byte */
        flush = zip_ct_tally(0, zip_window[zip_strstart] & 0xff);
        zip_lookahead--;
        zip_strstart++;
    }
    if(flush) {
        zip_flush_block(0);
        zip_block_start = zip_strstart;
    }

    /* Make sure that we always have enough lookahead, except
     * at the end of the input file. We need MAX_MATCH bytes
     * for the next match, plus MIN_MATCH bytes to insert the
     * string following the next match.
     */
    while(zip_lookahead < zip_MIN_LOOKAHEAD && !zip_eofile)
        zip_fill_window();
      }
  }

  var zip_deflate_better = function() {
      /* Process the input block. */
      while(zip_lookahead != 0 && zip_qhead == null) {
    /* Insert the string window[strstart .. strstart+2] in the
     * dictionary, and set hash_head to the head of the hash chain:
     */
    zip_INSERT_STRING();

    /* Find the longest match, discarding those <= prev_length.
     */
    zip_prev_length = zip_match_length;
    zip_prev_match = zip_match_start;
    zip_match_length = zip_MIN_MATCH - 1;

    if(zip_hash_head != zip_NIL &&
       zip_prev_length < zip_max_lazy_match &&
       zip_strstart - zip_hash_head <= zip_MAX_DIST) {
        /* To simplify the code, we prevent matches with the string
         * of window index 0 (in particular we have to avoid a match
         * of the string with itself at the start of the input file).
         */
        zip_match_length = zip_longest_match(zip_hash_head);
        /* longest_match() sets match_start */
        if(zip_match_length > zip_lookahead)
      zip_match_length = zip_lookahead;

        /* Ignore a length 3 match if it is too distant: */
        if(zip_match_length == zip_MIN_MATCH &&
           zip_strstart - zip_match_start > zip_TOO_FAR) {
      /* If prev_match is also MIN_MATCH, match_start is garbage
       * but we will ignore the current match anyway.
       */
      zip_match_length--;
        }
    }
    /* If there was a match at the previous step and the current
     * match is not better, output the previous match:
     */
    if(zip_prev_length >= zip_MIN_MATCH &&
       zip_match_length <= zip_prev_length) {
        var flush; // set if current block must be flushed

  //	    check_match(strstart - 1, prev_match, prev_length);
        flush = zip_ct_tally(zip_strstart - 1 - zip_prev_match,
           zip_prev_length - zip_MIN_MATCH);

        /* Insert in hash table all strings up to the end of the match.
         * strstart-1 and strstart are already inserted.
         */
        zip_lookahead -= zip_prev_length - 1;
        zip_prev_length -= 2;
        do {
      zip_strstart++;
      zip_INSERT_STRING();
      /* strstart never exceeds WSIZE-MAX_MATCH, so there are
       * always MIN_MATCH bytes ahead. If lookahead < MIN_MATCH
       * these bytes are garbage, but it does not matter since the
       * next lookahead bytes will always be emitted as literals.
       */
        } while(--zip_prev_length != 0);
        zip_match_available = 0;
        zip_match_length = zip_MIN_MATCH - 1;
        zip_strstart++;
        if(flush) {
      zip_flush_block(0);
      zip_block_start = zip_strstart;
        }
    } else if(zip_match_available != 0) {
        /* If there was no match at the previous position, output a
         * single literal. If there was a match but the current match
         * is longer, truncate the previous match to a single literal.
         */
        if(zip_ct_tally(0, zip_window[zip_strstart - 1] & 0xff)) {
      zip_flush_block(0);
      zip_block_start = zip_strstart;
        }
        zip_strstart++;
        zip_lookahead--;
    } else {
        /* There is no previous match to compare with, wait for
         * the next step to decide.
         */
        zip_match_available = 1;
        zip_strstart++;
        zip_lookahead--;
    }

    /* Make sure that we always have enough lookahead, except
     * at the end of the input file. We need MAX_MATCH bytes
     * for the next match, plus MIN_MATCH bytes to insert the
     * string following the next match.
     */
    while(zip_lookahead < zip_MIN_LOOKAHEAD && !zip_eofile)
        zip_fill_window();
      }
  }

  var zip_init_deflate = function() {
      if(zip_eofile)
    return;
      zip_bi_buf = 0;
      zip_bi_valid = 0;
      zip_ct_init();
      zip_lm_init();

      zip_qhead = null;
      zip_outcnt = 0;
      zip_outoff = 0;

      if(zip_compr_level <= 3)
      {
    zip_prev_length = zip_MIN_MATCH - 1;
    zip_match_length = 0;
      }
      else
      {
    zip_match_length = zip_MIN_MATCH - 1;
    zip_match_available = 0;
      }

      zip_complete = false;
  }

  /* ==========================================================================
   * Same as above, but achieves better compression. We use a lazy
   * evaluation for matches: a match is finally adopted only if there is
   * no better match at the next window position.
   */
  var zip_deflate_internal = function(buff, off, buff_size) {
      var n;

      if(!zip_initflag)
      {
    zip_init_deflate();
    zip_initflag = true;
    if(zip_lookahead == 0) { // empty
        zip_complete = true;
        return 0;
    }
      }

      if((n = zip_qcopy(buff, off, buff_size)) == buff_size)
    return buff_size;

      if(zip_complete)
    return n;

      if(zip_compr_level <= 3) // optimized for speed
    zip_deflate_fast();
      else
    zip_deflate_better();
      if(zip_lookahead == 0) {
    if(zip_match_available != 0)
        zip_ct_tally(0, zip_window[zip_strstart - 1] & 0xff);
    zip_flush_block(1);
    zip_complete = true;
      }
      return n + zip_qcopy(buff, n + off, buff_size - n);
  }

  var zip_qcopy = function(buff, off, buff_size) {
      var n, i, j;

      n = 0;
      while(zip_qhead != null && n < buff_size)
      {
    i = buff_size - n;
    if(i > zip_qhead.len)
        i = zip_qhead.len;
  //      System.arraycopy(qhead.ptr, qhead.off, buff, off + n, i);
    for(j = 0; j < i; j++)
        buff[off + n + j] = zip_qhead.ptr[zip_qhead.off + j];
    
    zip_qhead.off += i;
    zip_qhead.len -= i;
    n += i;
    if(zip_qhead.len == 0) {
        var p;
        p = zip_qhead;
        zip_qhead = zip_qhead.next;
        zip_reuse_queue(p);
    }
      }

      if(n == buff_size)
    return n;

      if(zip_outoff < zip_outcnt) {
    i = buff_size - n;
    if(i > zip_outcnt - zip_outoff)
        i = zip_outcnt - zip_outoff;
    // System.arraycopy(outbuf, outoff, buff, off + n, i);
    for(j = 0; j < i; j++)
        buff[off + n + j] = zip_outbuf[zip_outoff + j];
    zip_outoff += i;
    n += i;
    if(zip_outcnt == zip_outoff)
        zip_outcnt = zip_outoff = 0;
      }
      return n;
  }

  /* ==========================================================================
   * Allocate the match buffer, initialize the various tables and save the
   * location of the internal file attribute (ascii/binary) and method
   * (DEFLATE/STORE).
   */
  var zip_ct_init = function() {
      var n;	// iterates over tree elements
      var bits;	// bit counter
      var length;	// length value
      var code;	// code value
      var dist;	// distance index

      if(zip_static_dtree[0].dl != 0) return; // ct_init already called

      zip_l_desc.dyn_tree		= zip_dyn_ltree;
      zip_l_desc.static_tree	= zip_static_ltree;
      zip_l_desc.extra_bits	= zip_extra_lbits;
      zip_l_desc.extra_base	= zip_LITERALS + 1;
      zip_l_desc.elems		= zip_L_CODES;
      zip_l_desc.max_length	= zip_MAX_BITS;
      zip_l_desc.max_code		= 0;

      zip_d_desc.dyn_tree		= zip_dyn_dtree;
      zip_d_desc.static_tree	= zip_static_dtree;
      zip_d_desc.extra_bits	= zip_extra_dbits;
      zip_d_desc.extra_base	= 0;
      zip_d_desc.elems		= zip_D_CODES;
      zip_d_desc.max_length	= zip_MAX_BITS;
      zip_d_desc.max_code		= 0;

      zip_bl_desc.dyn_tree	= zip_bl_tree;
      zip_bl_desc.static_tree	= null;
      zip_bl_desc.extra_bits	= zip_extra_blbits;
      zip_bl_desc.extra_base	= 0;
      zip_bl_desc.elems		= zip_BL_CODES;
      zip_bl_desc.max_length	= zip_MAX_BL_BITS;
      zip_bl_desc.max_code	= 0;

      // Initialize the mapping length (0..255) -> length code (0..28)
      length = 0;
      for(code = 0; code < zip_LENGTH_CODES-1; code++) {
    zip_base_length[code] = length;
    for(n = 0; n < (1<<zip_extra_lbits[code]); n++)
        zip_length_code[length++] = code;
      }
      // Assert (length == 256, "ct_init: length != 256");

      /* Note that the length 255 (match length 258) can be represented
       * in two different ways: code 284 + 5 bits or code 285, so we
       * overwrite length_code[255] to use the best encoding:
       */
      zip_length_code[length-1] = code;

      /* Initialize the mapping dist (0..32K) -> dist code (0..29) */
      dist = 0;
      for(code = 0 ; code < 16; code++) {
    zip_base_dist[code] = dist;
    for(n = 0; n < (1<<zip_extra_dbits[code]); n++) {
        zip_dist_code[dist++] = code;
    }
      }
      // Assert (dist == 256, "ct_init: dist != 256");
      dist >>= 7; // from now on, all distances are divided by 128
      for( ; code < zip_D_CODES; code++) {
    zip_base_dist[code] = dist << 7;
    for(n = 0; n < (1<<(zip_extra_dbits[code]-7)); n++)
        zip_dist_code[256 + dist++] = code;
      }
      // Assert (dist == 256, "ct_init: 256+dist != 512");

      // Construct the codes of the static literal tree
      for(bits = 0; bits <= zip_MAX_BITS; bits++)
    zip_bl_count[bits] = 0;
      n = 0;
      while(n <= 143) { zip_static_ltree[n++].dl = 8; zip_bl_count[8]++; }
      while(n <= 255) { zip_static_ltree[n++].dl = 9; zip_bl_count[9]++; }
      while(n <= 279) { zip_static_ltree[n++].dl = 7; zip_bl_count[7]++; }
      while(n <= 287) { zip_static_ltree[n++].dl = 8; zip_bl_count[8]++; }
      /* Codes 286 and 287 do not exist, but we must include them in the
       * tree construction to get a canonical Huffman tree (longest code
       * all ones)
       */
      zip_gen_codes(zip_static_ltree, zip_L_CODES + 1);

      /* The static distance tree is trivial: */
      for(n = 0; n < zip_D_CODES; n++) {
    zip_static_dtree[n].dl = 5;
    zip_static_dtree[n].fc = zip_bi_reverse(n, 5);
      }

      // Initialize the first block of the first file:
      zip_init_block();
  }

  /* ==========================================================================
   * Initialize a new block.
   */
  var zip_init_block = function() {
      var n; // iterates over tree elements

      // Initialize the trees.
      for(n = 0; n < zip_L_CODES;  n++) zip_dyn_ltree[n].fc = 0;
      for(n = 0; n < zip_D_CODES;  n++) zip_dyn_dtree[n].fc = 0;
      for(n = 0; n < zip_BL_CODES; n++) zip_bl_tree[n].fc = 0;

      zip_dyn_ltree[zip_END_BLOCK].fc = 1;
      zip_opt_len = zip_static_len = 0;
      zip_last_lit = zip_last_dist = zip_last_flags = 0;
      zip_flags = 0;
      zip_flag_bit = 1;
  }

  /* ==========================================================================
   * Restore the heap property by moving down the tree starting at node k,
   * exchanging a node with the smallest of its two sons if necessary, stopping
   * when the heap property is re-established (each father smaller than its
   * two sons).
   */
  var zip_pqdownheap = function(
      tree,	// the tree to restore
      k) {	// node to move down
      var v = zip_heap[k];
      var j = k << 1;	// left son of k

      while(j <= zip_heap_len) {
    // Set j to the smallest of the two sons:
    if(j < zip_heap_len &&
       zip_SMALLER(tree, zip_heap[j + 1], zip_heap[j]))
        j++;

    // Exit if v is smaller than both sons
    if(zip_SMALLER(tree, v, zip_heap[j]))
        break;

    // Exchange v with the smallest son
    zip_heap[k] = zip_heap[j];
    k = j;

    // And continue down the tree, setting j to the left son of k
    j <<= 1;
      }
      zip_heap[k] = v;
  }

  /* ==========================================================================
   * Compute the optimal bit lengths for a tree and update the total bit length
   * for the current block.
   * IN assertion: the fields freq and dad are set, heap[heap_max] and
   *    above are the tree nodes sorted by increasing frequency.
   * OUT assertions: the field len is set to the optimal bit length, the
   *     array bl_count contains the frequencies for each bit length.
   *     The length opt_len is updated; static_len is also updated if stree is
   *     not null.
   */
  var zip_gen_bitlen = function(desc) { // the tree descriptor
      var tree		= desc.dyn_tree;
      var extra		= desc.extra_bits;
      var base		= desc.extra_base;
      var max_code	= desc.max_code;
      var max_length	= desc.max_length;
      var stree		= desc.static_tree;
      var h;		// heap index
      var n, m;		// iterate over the tree elements
      var bits;		// bit length
      var xbits;		// extra bits
      var f;		// frequency
      var overflow = 0;	// number of elements with bit length too large

      for(bits = 0; bits <= zip_MAX_BITS; bits++)
    zip_bl_count[bits] = 0;

      /* In a first pass, compute the optimal bit lengths (which may
       * overflow in the case of the bit length tree).
       */
      tree[zip_heap[zip_heap_max]].dl = 0; // root of the heap

      for(h = zip_heap_max + 1; h < zip_HEAP_SIZE; h++) {
    n = zip_heap[h];
    bits = tree[tree[n].dl].dl + 1;
    if(bits > max_length) {
        bits = max_length;
        overflow++;
    }
    tree[n].dl = bits;
    // We overwrite tree[n].dl which is no longer needed

    if(n > max_code)
        continue; // not a leaf node

    zip_bl_count[bits]++;
    xbits = 0;
    if(n >= base)
        xbits = extra[n - base];
    f = tree[n].fc;
    zip_opt_len += f * (bits + xbits);
    if(stree != null)
        zip_static_len += f * (stree[n].dl + xbits);
      }
      if(overflow == 0)
    return;

      // This happens for example on obj2 and pic of the Calgary corpus

      // Find the first bit length which could increase:
      do {
    bits = max_length - 1;
    while(zip_bl_count[bits] == 0)
        bits--;
    zip_bl_count[bits]--;		// move one leaf down the tree
    zip_bl_count[bits + 1] += 2;	// move one overflow item as its brother
    zip_bl_count[max_length]--;
    /* The brother of the overflow item also moves one step up,
     * but this does not affect bl_count[max_length]
     */
    overflow -= 2;
      } while(overflow > 0);

      /* Now recompute all bit lengths, scanning in increasing frequency.
       * h is still equal to HEAP_SIZE. (It is simpler to reconstruct all
       * lengths instead of fixing only the wrong ones. This idea is taken
       * from 'ar' written by Haruhiko Okumura.)
       */
      for(bits = max_length; bits != 0; bits--) {
    n = zip_bl_count[bits];
    while(n != 0) {
        m = zip_heap[--h];
        if(m > max_code)
      continue;
        if(tree[m].dl != bits) {
      zip_opt_len += (bits - tree[m].dl) * tree[m].fc;
      tree[m].fc = bits;
        }
        n--;
    }
      }
  }

    /* ==========================================================================
     * Generate the codes for a given tree and bit counts (which need not be
     * optimal).
     * IN assertion: the array bl_count contains the bit length statistics for
     * the given tree and the field len is set for all tree elements.
     * OUT assertion: the field code is set for all tree elements of non
     *     zero code length.
     */
  var zip_gen_codes = function(tree,	// the tree to decorate
         max_code) {	// largest code with non zero frequency
      var next_code = new Array(zip_MAX_BITS+1); // next code value for each bit length
      var code = 0;		// running code value
      var bits;			// bit index
      var n;			// code index

      /* The distribution counts are first used to generate the code values
       * without bit reversal.
       */
      for(bits = 1; bits <= zip_MAX_BITS; bits++) {
    code = ((code + zip_bl_count[bits-1]) << 1);
    next_code[bits] = code;
      }

      /* Check that the bit counts in bl_count are consistent. The last code
       * must be all ones.
       */
  //    Assert (code + encoder->bl_count[MAX_BITS]-1 == (1<<MAX_BITS)-1,
  //	    "inconsistent bit counts");
  //    Tracev((stderr,"\ngen_codes: max_code %d ", max_code));

      for(n = 0; n <= max_code; n++) {
    var len = tree[n].dl;
    if(len == 0)
        continue;
    // Now reverse the bits
    tree[n].fc = zip_bi_reverse(next_code[len]++, len);

  //      Tracec(tree != static_ltree, (stderr,"\nn %3d %c l %2d c %4x (%x) ",
  //	  n, (isgraph(n) ? n : ' '), len, tree[n].fc, next_code[len]-1));
      }
  }

  /* ==========================================================================
   * Construct one Huffman tree and assigns the code bit strings and lengths.
   * Update the total bit length for the current block.
   * IN assertion: the field freq is set for all tree elements.
   * OUT assertions: the fields len and code are set to the optimal bit length
   *     and corresponding code. The length opt_len is updated; static_len is
   *     also updated if stree is not null. The field max_code is set.
   */
  var zip_build_tree = function(desc) { // the tree descriptor
      var tree	= desc.dyn_tree;
      var stree	= desc.static_tree;
      var elems	= desc.elems;
      var n, m;		// iterate over heap elements
      var max_code = -1;	// largest code with non zero frequency
      var node = elems;	// next internal node of the tree

      /* Construct the initial heap, with least frequent element in
       * heap[SMALLEST]. The sons of heap[n] are heap[2*n] and heap[2*n+1].
       * heap[0] is not used.
       */
      zip_heap_len = 0;
      zip_heap_max = zip_HEAP_SIZE;

      for(n = 0; n < elems; n++) {
    if(tree[n].fc != 0) {
        zip_heap[++zip_heap_len] = max_code = n;
        zip_depth[n] = 0;
    } else
        tree[n].dl = 0;
      }

      /* The pkzip format requires that at least one distance code exists,
       * and that at least one bit should be sent even if there is only one
       * possible code. So to avoid special checks later on we force at least
       * two codes of non zero frequency.
       */
      while(zip_heap_len < 2) {
    var xnew = zip_heap[++zip_heap_len] = (max_code < 2 ? ++max_code : 0);
    tree[xnew].fc = 1;
    zip_depth[xnew] = 0;
    zip_opt_len--;
    if(stree != null)
        zip_static_len -= stree[xnew].dl;
    // new is 0 or 1 so it does not have extra bits
      }
      desc.max_code = max_code;

      /* The elements heap[heap_len/2+1 .. heap_len] are leaves of the tree,
       * establish sub-heaps of increasing lengths:
       */
      for(n = zip_heap_len >> 1; n >= 1; n--)
    zip_pqdownheap(tree, n);

      /* Construct the Huffman tree by repeatedly combining the least two
       * frequent nodes.
       */
      do {
    n = zip_heap[zip_SMALLEST];
    zip_heap[zip_SMALLEST] = zip_heap[zip_heap_len--];
    zip_pqdownheap(tree, zip_SMALLEST);

    m = zip_heap[zip_SMALLEST];  // m = node of next least frequency

    // keep the nodes sorted by frequency
    zip_heap[--zip_heap_max] = n;
    zip_heap[--zip_heap_max] = m;

    // Create a new node father of n and m
    tree[node].fc = tree[n].fc + tree[m].fc;
  //	depth[node] = (char)(MAX(depth[n], depth[m]) + 1);
    if(zip_depth[n] > zip_depth[m] + 1)
        zip_depth[node] = zip_depth[n];
    else
        zip_depth[node] = zip_depth[m] + 1;
    tree[n].dl = tree[m].dl = node;

    // and insert the new node in the heap
    zip_heap[zip_SMALLEST] = node++;
    zip_pqdownheap(tree, zip_SMALLEST);

      } while(zip_heap_len >= 2);

      zip_heap[--zip_heap_max] = zip_heap[zip_SMALLEST];

      /* At this point, the fields freq and dad are set. We can now
       * generate the bit lengths.
       */
      zip_gen_bitlen(desc);

      // The field len is now set, we can generate the bit codes
      zip_gen_codes(tree, max_code);
  }

  /* ==========================================================================
   * Scan a literal or distance tree to determine the frequencies of the codes
   * in the bit length tree. Updates opt_len to take into account the repeat
   * counts. (The contribution of the bit length codes will be added later
   * during the construction of bl_tree.)
   */
  var zip_scan_tree = function(tree,// the tree to be scanned
             max_code) {  // and its largest code of non zero frequency
      var n;			// iterates over all tree elements
      var prevlen = -1;		// last emitted length
      var curlen;			// length of current code
      var nextlen = tree[0].dl;	// length of next code
      var count = 0;		// repeat count of the current code
      var max_count = 7;		// max repeat count
      var min_count = 4;		// min repeat count

      if(nextlen == 0) {
    max_count = 138;
    min_count = 3;
      }
      tree[max_code + 1].dl = 0xffff; // guard

      for(n = 0; n <= max_code; n++) {
    curlen = nextlen;
    nextlen = tree[n + 1].dl;
    if(++count < max_count && curlen == nextlen)
        continue;
    else if(count < min_count)
        zip_bl_tree[curlen].fc += count;
    else if(curlen != 0) {
        if(curlen != prevlen)
      zip_bl_tree[curlen].fc++;
        zip_bl_tree[zip_REP_3_6].fc++;
    } else if(count <= 10)
        zip_bl_tree[zip_REPZ_3_10].fc++;
    else
        zip_bl_tree[zip_REPZ_11_138].fc++;
    count = 0; prevlen = curlen;
    if(nextlen == 0) {
        max_count = 138;
        min_count = 3;
    } else if(curlen == nextlen) {
        max_count = 6;
        min_count = 3;
    } else {
        max_count = 7;
        min_count = 4;
    }
      }
  }

    /* ==========================================================================
     * Send a literal or distance tree in compressed form, using the codes in
     * bl_tree.
     */
  var zip_send_tree = function(tree, // the tree to be scanned
         max_code) { // and its largest code of non zero frequency
      var n;			// iterates over all tree elements
      var prevlen = -1;		// last emitted length
      var curlen;			// length of current code
      var nextlen = tree[0].dl;	// length of next code
      var count = 0;		// repeat count of the current code
      var max_count = 7;		// max repeat count
      var min_count = 4;		// min repeat count

      /* tree[max_code+1].dl = -1; */  /* guard already set */
      if(nextlen == 0) {
        max_count = 138;
        min_count = 3;
      }

      for(n = 0; n <= max_code; n++) {
    curlen = nextlen;
    nextlen = tree[n+1].dl;
    if(++count < max_count && curlen == nextlen) {
        continue;
    } else if(count < min_count) {
        do { zip_SEND_CODE(curlen, zip_bl_tree); } while(--count != 0);
    } else if(curlen != 0) {
        if(curlen != prevlen) {
      zip_SEND_CODE(curlen, zip_bl_tree);
      count--;
        }
        // Assert(count >= 3 && count <= 6, " 3_6?");
        zip_SEND_CODE(zip_REP_3_6, zip_bl_tree);
        zip_send_bits(count - 3, 2);
    } else if(count <= 10) {
        zip_SEND_CODE(zip_REPZ_3_10, zip_bl_tree);
        zip_send_bits(count-3, 3);
    } else {
        zip_SEND_CODE(zip_REPZ_11_138, zip_bl_tree);
        zip_send_bits(count-11, 7);
    }
    count = 0;
    prevlen = curlen;
    if(nextlen == 0) {
        max_count = 138;
        min_count = 3;
    } else if(curlen == nextlen) {
        max_count = 6;
        min_count = 3;
    } else {
        max_count = 7;
        min_count = 4;
    }
      }
  }

  /* ==========================================================================
   * Construct the Huffman tree for the bit lengths and return the index in
   * bl_order of the last bit length code to send.
   */
  var zip_build_bl_tree = function() {
      var max_blindex;  // index of last bit length code of non zero freq

      // Determine the bit length frequencies for literal and distance trees
      zip_scan_tree(zip_dyn_ltree, zip_l_desc.max_code);
      zip_scan_tree(zip_dyn_dtree, zip_d_desc.max_code);

      // Build the bit length tree:
      zip_build_tree(zip_bl_desc);
      /* opt_len now includes the length of the tree representations, except
       * the lengths of the bit lengths codes and the 5+5+4 bits for the counts.
       */

      /* Determine the number of bit length codes to send. The pkzip format
       * requires that at least 4 bit length codes be sent. (appnote.txt says
       * 3 but the actual value used is 4.)
       */
      for(max_blindex = zip_BL_CODES-1; max_blindex >= 3; max_blindex--) {
    if(zip_bl_tree[zip_bl_order[max_blindex]].dl != 0) break;
      }
      /* Update opt_len to include the bit length tree and counts */
      zip_opt_len += 3*(max_blindex+1) + 5+5+4;
  //    Tracev((stderr, "\ndyn trees: dyn %ld, stat %ld",
  //	    encoder->opt_len, encoder->static_len));

      return max_blindex;
  }

  /* ==========================================================================
   * Send the header for a block using dynamic Huffman trees: the counts, the
   * lengths of the bit length codes, the literal tree and the distance tree.
   * IN assertion: lcodes >= 257, dcodes >= 1, blcodes >= 4.
   */
  var zip_send_all_trees = function(lcodes, dcodes, blcodes) { // number of codes for each tree
      var rank; // index in bl_order

  //    Assert (lcodes >= 257 && dcodes >= 1 && blcodes >= 4, "not enough codes");
  //    Assert (lcodes <= L_CODES && dcodes <= D_CODES && blcodes <= BL_CODES,
  //	    "too many codes");
  //    Tracev((stderr, "\nbl counts: "));
      zip_send_bits(lcodes-257, 5); // not +255 as stated in appnote.txt
      zip_send_bits(dcodes-1,   5);
      zip_send_bits(blcodes-4,  4); // not -3 as stated in appnote.txt
      for(rank = 0; rank < blcodes; rank++) {
  //      Tracev((stderr, "\nbl code %2d ", bl_order[rank]));
    zip_send_bits(zip_bl_tree[zip_bl_order[rank]].dl, 3);
      }

      // send the literal tree
      zip_send_tree(zip_dyn_ltree,lcodes-1);

      // send the distance tree
      zip_send_tree(zip_dyn_dtree,dcodes-1);
  }

  /* ==========================================================================
   * Determine the best encoding for the current block: dynamic trees, static
   * trees or store, and output the encoded block to the zip file.
   */
  var zip_flush_block = function(eof) { // true if this is the last block for a file
      var opt_lenb, static_lenb; // opt_len and static_len in bytes
      var max_blindex;	// index of last bit length code of non zero freq
      var stored_len;	// length of input block

      stored_len = zip_strstart - zip_block_start;
      zip_flag_buf[zip_last_flags] = zip_flags; // Save the flags for the last 8 items

      // Construct the literal and distance trees
      zip_build_tree(zip_l_desc);
  //    Tracev((stderr, "\nlit data: dyn %ld, stat %ld",
  //	    encoder->opt_len, encoder->static_len));

      zip_build_tree(zip_d_desc);
  //    Tracev((stderr, "\ndist data: dyn %ld, stat %ld",
  //	    encoder->opt_len, encoder->static_len));
      /* At this point, opt_len and static_len are the total bit lengths of
       * the compressed block data, excluding the tree representations.
       */

      /* Build the bit length tree for the above two trees, and get the index
       * in bl_order of the last bit length code to send.
       */
      max_blindex = zip_build_bl_tree();

      // Determine the best encoding. Compute first the block length in bytes
      opt_lenb	= (zip_opt_len   +3+7)>>3;
      static_lenb = (zip_static_len+3+7)>>3;

  //    Trace((stderr, "\nopt %lu(%lu) stat %lu(%lu) stored %lu lit %u dist %u ",
  //	   opt_lenb, encoder->opt_len,
  //	   static_lenb, encoder->static_len, stored_len,
  //	   encoder->last_lit, encoder->last_dist));

      if(static_lenb <= opt_lenb)
    opt_lenb = static_lenb;
      if(stored_len + 4 <= opt_lenb // 4: two words for the lengths
         && zip_block_start >= 0) {
    var i;

    /* The test buf != NULL is only necessary if LIT_BUFSIZE > WSIZE.
     * Otherwise we can't have processed more than WSIZE input bytes since
     * the last block flush, because compression would have been
     * successful. If LIT_BUFSIZE <= WSIZE, it is never too late to
     * transform a block into a stored block.
     */
    zip_send_bits((zip_STORED_BLOCK<<1)+eof, 3);  /* send block type */
    zip_bi_windup();		 /* align on byte boundary */
    zip_put_short(stored_len);
    zip_put_short(~stored_len);

        // copy block
  /*
        p = &window[block_start];
        for(i = 0; i < stored_len; i++)
    put_byte(p[i]);
  */
    for(i = 0; i < stored_len; i++)
        zip_put_byte(zip_window[zip_block_start + i]);

      } else if(static_lenb == opt_lenb) {
    zip_send_bits((zip_STATIC_TREES<<1)+eof, 3);
    zip_compress_block(zip_static_ltree, zip_static_dtree);
      } else {
    zip_send_bits((zip_DYN_TREES<<1)+eof, 3);
    zip_send_all_trees(zip_l_desc.max_code+1,
           zip_d_desc.max_code+1,
           max_blindex+1);
    zip_compress_block(zip_dyn_ltree, zip_dyn_dtree);
      }

      zip_init_block();

      if(eof != 0)
    zip_bi_windup();
  }

  /* ==========================================================================
   * Save the match info and tally the frequency counts. Return true if
   * the current block must be flushed.
   */
  var zip_ct_tally = function(
    dist, // distance of matched string
    lc) { // match length-MIN_MATCH or unmatched char (if dist==0)
      zip_l_buf[zip_last_lit++] = lc;
      if(dist == 0) {
    // lc is the unmatched char
    zip_dyn_ltree[lc].fc++;
      } else {
    // Here, lc is the match length - MIN_MATCH
    dist--;		    // dist = match distance - 1
  //      Assert((ush)dist < (ush)MAX_DIST &&
  //	     (ush)lc <= (ush)(MAX_MATCH-MIN_MATCH) &&
  //	     (ush)D_CODE(dist) < (ush)D_CODES,  "ct_tally: bad match");

    zip_dyn_ltree[zip_length_code[lc]+zip_LITERALS+1].fc++;
    zip_dyn_dtree[zip_D_CODE(dist)].fc++;

    zip_d_buf[zip_last_dist++] = dist;
    zip_flags |= zip_flag_bit;
      }
      zip_flag_bit <<= 1;

      // Output the flags if they fill a byte
      if((zip_last_lit & 7) == 0) {
    zip_flag_buf[zip_last_flags++] = zip_flags;
    zip_flags = 0;
    zip_flag_bit = 1;
      }
      // Try to guess if it is profitable to stop the current block here
      if(zip_compr_level > 2 && (zip_last_lit & 0xfff) == 0) {
    // Compute an upper bound for the compressed length
    var out_length = zip_last_lit * 8;
    var in_length = zip_strstart - zip_block_start;
    var dcode;

    for(dcode = 0; dcode < zip_D_CODES; dcode++) {
        out_length += zip_dyn_dtree[dcode].fc * (5 + zip_extra_dbits[dcode]);
    }
    out_length >>= 3;
  //      Trace((stderr,"\nlast_lit %u, last_dist %u, in %ld, out ~%ld(%ld%%) ",
  //	     encoder->last_lit, encoder->last_dist, in_length, out_length,
  //	     100L - out_length*100L/in_length));
    if(zip_last_dist < parseInt(zip_last_lit/2) &&
       out_length < parseInt(in_length/2))
        return true;
      }
      return (zip_last_lit == zip_LIT_BUFSIZE-1 ||
        zip_last_dist == zip_DIST_BUFSIZE);
      /* We avoid equality with LIT_BUFSIZE because of wraparound at 64K
       * on 16 bit machines and because stored blocks are restricted to
       * 64K-1 bytes.
       */
  }

    /* ==========================================================================
     * Send the block data compressed using the given Huffman trees
     */
  var zip_compress_block = function(
    ltree,	// literal tree
    dtree) {	// distance tree
      var dist;		// distance of matched string
      var lc;		// match length or unmatched char (if dist == 0)
      var lx = 0;		// running index in l_buf
      var dx = 0;		// running index in d_buf
      var fx = 0;		// running index in flag_buf
      var flag = 0;	// current flags
      var code;		// the code to send
      var extra;		// number of extra bits to send

      if(zip_last_lit != 0) do {
    if((lx & 7) == 0)
        flag = zip_flag_buf[fx++];
    lc = zip_l_buf[lx++] & 0xff;
    if((flag & 1) == 0) {
        zip_SEND_CODE(lc, ltree); /* send a literal byte */
  //	Tracecv(isgraph(lc), (stderr," '%c' ", lc));
    } else {
        // Here, lc is the match length - MIN_MATCH
        code = zip_length_code[lc];
        zip_SEND_CODE(code+zip_LITERALS+1, ltree); // send the length code
        extra = zip_extra_lbits[code];
        if(extra != 0) {
      lc -= zip_base_length[code];
      zip_send_bits(lc, extra); // send the extra length bits
        }
        dist = zip_d_buf[dx++];
        // Here, dist is the match distance - 1
        code = zip_D_CODE(dist);
  //	Assert (code < D_CODES, "bad d_code");

        zip_SEND_CODE(code, dtree);	  // send the distance code
        extra = zip_extra_dbits[code];
        if(extra != 0) {
      dist -= zip_base_dist[code];
      zip_send_bits(dist, extra);   // send the extra distance bits
        }
    } // literal or match pair ?
    flag >>= 1;
      } while(lx < zip_last_lit);

      zip_SEND_CODE(zip_END_BLOCK, ltree);
  }

  /* ==========================================================================
   * Send a value on a given number of bits.
   * IN assertion: length <= 16 and value fits in length bits.
   */
  var zip_Buf_size = 16; // bit size of bi_buf
  var zip_send_bits = function(
    value,	// value to send
    length) {	// number of bits
      /* If not enough room in bi_buf, use (valid) bits from bi_buf and
       * (16 - bi_valid) bits from value, leaving (width - (16-bi_valid))
       * unused bits in value.
       */
      if(zip_bi_valid > zip_Buf_size - length) {
    zip_bi_buf |= (value << zip_bi_valid);
    zip_put_short(zip_bi_buf);
    zip_bi_buf = (value >> (zip_Buf_size - zip_bi_valid));
    zip_bi_valid += length - zip_Buf_size;
      } else {
    zip_bi_buf |= value << zip_bi_valid;
    zip_bi_valid += length;
      }
  }

  /* ==========================================================================
   * Reverse the first len bits of a code, using straightforward code (a faster
   * method would use a table)
   * IN assertion: 1 <= len <= 15
   */
  var zip_bi_reverse = function(
    code,	// the value to invert
    len) {	// its bit length
      var res = 0;
      do {
    res |= code & 1;
    code >>= 1;
    res <<= 1;
      } while(--len > 0);
      return res >> 1;
  }

  /* ==========================================================================
   * Write out any remaining bits in an incomplete byte.
   */
  var zip_bi_windup = function() {
      if(zip_bi_valid > 8) {
    zip_put_short(zip_bi_buf);
      } else if(zip_bi_valid > 0) {
    zip_put_byte(zip_bi_buf);
      }
      zip_bi_buf = 0;
      zip_bi_valid = 0;
  }

  var zip_qoutbuf = function() {
      if(zip_outcnt != 0) {
    var q, i;
    q = zip_new_queue();
    if(zip_qhead == null)
        zip_qhead = zip_qtail = q;
    else
        zip_qtail = zip_qtail.next = q;
    q.len = zip_outcnt - zip_outoff;
  //      System.arraycopy(zip_outbuf, zip_outoff, q.ptr, 0, q.len);
    for(i = 0; i < q.len; i++)
        q.ptr[i] = zip_outbuf[zip_outoff + i];
    zip_outcnt = zip_outoff = 0;
      }
  }

  var zip_deflate = function(str, level) {
      var i, j;

      zip_deflate_data = str;
      zip_deflate_pos = 0;
      if(typeof level == "undefined")
    level = zip_DEFAULT_LEVEL;
      zip_deflate_start(level);

      var buff = new Array(1024);
      var aout = [];
      while((i = zip_deflate_internal(buff, 0, buff.length)) > 0) {
    var cbuf = new Array(i);
    for(j = 0; j < i; j++){
        cbuf[j] = String.fromCharCode(buff[j]);
    }
    aout[aout.length] = cbuf.join("");
      }
      zip_deflate_data = null; // G.C.
      return aout.join("");
  }

  RawDeflate = {};
  RawDeflate.deflate = zip_deflate;

  })();
  
  
  //base64.js
    Base64 = {
    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    
    encode: function(input) {
      var output = "";
      var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
      var i = 0;
      
      while (i < input.length) {
        chr1 = input.charCodeAt(i++);
        chr2 = input.charCodeAt(i++);
        chr3 = input.charCodeAt(i++);

        enc1 = chr1 >> 2;
        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
        enc4 = chr3 & 63;
        
        if (isNaN(chr2)) {
          enc3 = enc4 = 64;
        } else if (isNaN(chr3)) {
          enc4 = 64;
        }
        
        output = output +
        this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
        this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
      }
      
      return output;
    }
  };


  //bootstrap_juvia_tooltip.js
  !function ($) {

    "use strict"; // jshint ;_;


   /* TOOLTIP PUBLIC CLASS DEFINITION
  * =============================== */

    var JuviaTooltip = function (element, options) {
      this.init('juviatooltip', element, options)
    }

    JuviaTooltip.prototype = {

      constructor: JuviaTooltip

    , init: function (type, element, options) {
        var eventIn
          , eventOut

        this.type = type
        this.$element = $(element)
        this.options = this.getOptions(options)
        this.enabled = true

        if (this.options.trigger == 'click') {
          this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this))
        } else if (this.options.trigger != 'manual') {
          eventIn = this.options.trigger == 'hover' ? 'mouseenter' : 'focus'
          eventOut = this.options.trigger == 'hover' ? 'mouseleave' : 'blur'
          this.$element.on(eventIn + '.' + this.type, this.options.selector, $.proxy(this.enter, this))
          this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this))
        }

        this.options.selector ?
          (this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' })) :
          this.fixTitle()
      }

    , getOptions: function (options) {
        options = $.extend({}, $.fn[this.type].defaults, options, this.$element.data())

        if (options.delay && typeof options.delay == 'number') {
          options.delay = {
            show: options.delay
          , hide: options.delay
          }
        }

        return options
      }

    , enter: function (e) {
        var self = $(e.currentTarget)[this.type](this._options).data(this.type)

        if (!self.options.delay || !self.options.delay.show) return self.show()

        clearTimeout(this.timeout)
        self.hoverState = 'in'
        this.timeout = setTimeout(function() {
          if (self.hoverState == 'in') self.show()
        }, self.options.delay.show)
      }

    , leave: function (e) {
        var self = $(e.currentTarget)[this.type](this._options).data(this.type)

        if (this.timeout) clearTimeout(this.timeout)
        if (!self.options.delay || !self.options.delay.hide) return self.hide()

        self.hoverState = 'out'
        this.timeout = setTimeout(function() {
          if (self.hoverState == 'out') self.hide()
        }, self.options.delay.hide)
      }

    , show: function () {
        var $tip
          , inside
          , pos
          , actualWidth
          , actualHeight
          , placement
          , tp

        if (this.hasContent() && this.enabled) {
          $tip = this.tip()
          this.setContent()

          if (this.options.animation) {
            $tip.addClass('fade')
          }

          placement = typeof this.options.placement == 'function' ?
            this.options.placement.call(this, $tip[0], this.$element[0]) :
            this.options.placement

          inside = /in/.test(placement)

          $tip
            .detach()
            .css({ top: 0, left: 0, display: 'block' })
            .insertAfter(this.$element)

          pos = this.getPosition(inside)

          actualWidth = $tip[0].offsetWidth
          actualHeight = $tip[0].offsetHeight

          switch (inside ? placement.split(' ')[1] : placement) {
            case 'bottom':
              tp = {top: pos.top + pos.height, left: pos.left + pos.width / 2 - actualWidth / 2}
              break
            case 'top':
              tp = {top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2}
              break
            case 'left':
              tp = {top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth}
              break
            case 'right':
              tp = {top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width}
              break
          }

          $tip
            .offset(tp)
            .addClass(placement)
            .addClass('in')
        }
      }

    , setContent: function () {
        var $tip = this.tip()
          , title = this.getTitle()

        $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title)
        $tip.removeClass('fade in top bottom left right')
      }

    , hide: function () {
        var that = this
          , $tip = this.tip()

        $tip.removeClass('in')

        function removeWithAnimation() {
          var timeout = setTimeout(function () {
            $tip.off($.support.transition.end).detach()
          }, 500)

          $tip.one($.support.transition.end, function () {
            clearTimeout(timeout)
            $tip.detach()
          })
        }

        $.support.transition && this.$tip.hasClass('fade') ?
          removeWithAnimation() :
          $tip.detach()

        return this
      }

    , fixTitle: function () {
        var $e = this.$element
        if ($e.attr('title') || typeof($e.attr('data-original-title')) != 'string') {
          $e.attr('data-original-title', $e.attr('title') || '').removeAttr('title')
        }
      }

    , hasContent: function () {
        return this.getTitle()
      }

    , getPosition: function (inside) {
        return $.extend({}, (inside ? {top: 0, left: 0} : this.$element.offset()), {
          width: this.$element[0].offsetWidth
        , height: this.$element[0].offsetHeight
        })
      }

    , getTitle: function () {
        var title
          , $e = this.$element
          , o = this.options

        title = $e.attr('data-original-title')
          || (typeof o.title == 'function' ? o.title.call($e[0]) : o.title)

        return title
      }

    , tip: function () {
        return this.$tip = this.$tip || $(this.options.template)
      }

    , validate: function () {
        if (!this.$element[0].parentNode) {
          this.hide()
          this.$element = null
          this.options = null
        }
      }

    , enable: function () {
        this.enabled = true
      }

    , disable: function () {
        this.enabled = false
      }

    , toggleEnabled: function () {
        this.enabled = !this.enabled
      }

    , toggle: function (e) {
        var self = $(e.currentTarget)[this.type](this._options).data(this.type)
        self[self.tip().hasClass('in') ? 'hide' : 'show']()
      }

    , destroy: function () {
        this.hide().$element.off('.' + this.type).removeData(this.type)
      }

    }


   /* TOOLTIP PLUGIN DEFINITION
  * ========================= */

    $.fn.juviatooltip = function ( option ) {
      return this.each(function () {
        var $this = $(this)
          , data = $this.data('juviatooltip')
          , options = typeof option == 'object' && option
        if (!data) $this.data('juviatooltip', (data = new JuviaTooltip(this, options)))
        if (typeof option == 'string') data[option]()
      })
    }

    $.fn.juviatooltip.Constructor = JuviaTooltip

    $.fn.juviatooltip.defaults = {
      animation: true
    , placement: 'right'
    , selector: false
    , template: '<div class="juviatooltip tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'
    , trigger: 'hover'
    , title: ''
    , delay: 0
    , html: false
    }

  }(window.jQuery);
  
  //juvia-bootstrap-collapse.js
  !function ($) {

    "use strict"; // jshint ;_;


   /* COLLAPSE PUBLIC CLASS DEFINITION
    * ================================ */

    var JuviaCollapse = function (element, options) {
      this.$element = $(element)
      this.options = $.extend({}, $.fn.juviacollapse.defaults, options)

      if (this.options.parent) {
        this.$parent = $(this.options.parent)
      }

      this.options.toggle && this.toggle()
    }

    JuviaCollapse.prototype = {

      constructor: JuviaCollapse

    , dimension: function () {
        var hasWidth = this.$element.hasClass('width')
        return hasWidth ? 'width' : 'height'
      }

    , show: function () {
        var dimension
          , scroll
          , actives
          , hasData

        if (this.transitioning) return

        dimension = this.dimension()
        scroll = $.camelCase(['scroll', dimension].join('-'))
        actives = this.$parent && this.$parent.find('> .accordion-group > .in')

        if (actives && actives.length) {
          hasData = actives.data('jcollapse')
          if (hasData && hasData.transitioning) return
          actives.juviacollapse('hide')
          hasData || actives.data('jcollapse', null)
        }

        this.$element[dimension](0)
        this.transition('addClass', $.Event('show'), 'shown')
        this.$element[dimension](this.$element[0][scroll])
      }

    , hide: function () {
        var dimension
        if (this.transitioning) return
        dimension = this.dimension()
        this.reset(this.$element[dimension]())
        this.transition('removeClass', $.Event('hide'), 'hidden')
        this.$element[dimension](0)
      }

    , reset: function (size) {
        var dimension = this.dimension()

        this.$element
          .removeClass('jcollapse')
          [dimension](size || 'auto')
          [0].offsetWidth

        this.$element[size !== null ? 'addClass' : 'removeClass']('jcollapse')

        return this
      }

    , transition: function (method, startEvent, completeEvent) {
        var that = this
          , complete = function () {
              if (startEvent.type == 'show') that.reset()
              that.transitioning = 0
              that.$element.trigger(completeEvent)
            }

        this.$element.trigger(startEvent)

        if (startEvent.isDefaultPrevented()) return

        this.transitioning = 1

        this.$element[method]('in')

        $.support.transition && this.$element.hasClass('jcollapse') ?
          this.$element.one($.support.transition.end, complete) :
          complete()
      }

    , toggle: function () {
        this[this.$element.hasClass('in') ? 'hide' : 'show']()
      }

    }


   /* COLLAPSIBLE PLUGIN DEFINITION
    * ============================== */

    $.fn.juviacollapse = function (option) {
      return this.each(function () {
        var $this = $(this)
          , data = $this.data('jcollapse')
          , options = typeof option == 'object' && option
        if (!data) $this.data('jcollapse', (data = new JuviaCollapse(this, options)))
        if (typeof option == 'string') data[option]()
      })
    }

    $.fn.juviacollapse.defaults = {
      toggle: true
    }

    $.fn.juviacollapse.Constructor = JuviaCollapse


   /* COLLAPSIBLE DATA-API
    * ==================== */

    $(function () {
      $('body').on('click.jcollapse.data-api', '[data-toggle=jcollapse]', function ( e ) {
        var $this = $(this), href
          , target = $this.attr('data-target')
            || e.preventDefault()
            || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') //strip for ie7
          , option = $(target).data('jcollapse') ? 'toggle' : $this.data()
        $(target).juviacollapse(option)
      })
    })

  }(window.jQuery);
  
  //juvia-bootstrap-limit.js
  !function( $ ){

    "use strict"

    var Limit = function ( element, options ) {
      this.$element = $(element)
      this.options = $.extend({}, $.fn.limit.defaults, options)
      this.maxChars = this.options.maxChars || this.maxChars
      this.counter = $(this.options.counter) || this.counter
      this.listen()

      this.check()
    }

    Limit.prototype = {

      constructor: Limit

    , listen: function () {
        this.$element
          .on('keypress', $.proxy(this.keypress, this))
          .on('keyup',    $.proxy(this.keyup, this))
        
        if ($.browser.webkit || $.browser.msie) {
          this.$element.on('keydown', $.proxy(this.keypress, this))
        }
      }

    , check: function () {
        this.query = this.$element.val()

        if(!this.query) {
          this.counter.text(this.maxChars)
          this.counter.css('color', 'red')
          this.$element.trigger('uncross')
        }

        this.counter.text(this.maxChars - this.query.length)

        if (this.query.length > this.maxChars) {
          this.counter.css('color', 'red')
          this.$element.trigger('cross')
        } else if (this.query.length > this.maxChars - 10) {
          this.counter.css('color', 'red')
          this.$element.trigger('uncross')
        } else {
          this.counter.css('color', '')
          this.$element.trigger('uncross')
        }

    }

    , keyup: function (e) {
        
        this.check()

        e.stopPropagation()
        e.preventDefault() 
    }

    , keypress: function (e) {
        
        this.check()

        e.stopPropagation()
      }
    }


    /* limit PLUGIN DEFINITION
     * =========================== */

    $.fn.limit = function ( option ) {
      return this.each(function () {
        var $this = $(this)
          , data = $this.data('limit')
          , options = typeof option == 'object' && option
        if (!data) $this.data('limit', (data = new Limit(this, options)))
        if (typeof option == 'string') data[option]()
      })
    }

    $.fn.limit.defaults = {
      maxChars: 140
    , counter: ''
    }

    $.fn.limit.Constructor = Limit


   /* limit DATA-API
    * ================== */

    $(function () {
      $('body').on('focus.limit.data-api', '[data-provide="limit"]', function (e) {
        var $this = $(this)
        if ($this.data('limit')) return
        e.preventDefault()
        $this.limit($this.data())
      })
    })

  }( window.jQuery );  
  
  //jquery.cookie.js
  (function ($, document, undefined) {

    var pluses = /\+/g;

    function raw(s) {
      return s;
    }

    function decoded(s) {
      return decodeURIComponent(s.replace(pluses, ' '));
    }

    var config = $.cookie = function (key, value, options) {

      // write
      if (value !== undefined) {
        options = $.extend({}, config.defaults, options);

        if (value === null) {
          options.expires = -1;
        }

        if (typeof options.expires === 'number') {
          var days = options.expires, t = options.expires = new Date();
          t.setDate(t.getDate() + days);
        }

        value = config.json ? JSON.stringify(value) : String(value);

        return (document.cookie = [
          encodeURIComponent(key), '=', config.raw ? value : encodeURIComponent(value),
          options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
          options.path    ? '; path=' + options.path : '',
          options.domain  ? '; domain=' + options.domain : '',
          options.secure  ? '; secure' : ''
        ].join(''));
      }

      // read
      var decode = config.raw ? raw : decoded;
      var cookies = document.cookie.split('; ');
      for (var i = 0, l = cookies.length; i < l; i++) {
        var parts = cookies[i].split('=');
        if (decode(parts.shift()) === key) {
          var cookie = decode(parts.join('='));
          return config.json ? JSON.parse(cookie) : cookie;
        }
      }

      return null;
    };

    config.defaults = {};

    $.removeCookie = function (key, options) {
      if ($.cookie(key) !== null) {
        $.cookie(key, null, options);
        return true;
      }
      return false;
    };

  })(jQuery, document);
  
  //markdown.js
  (function( expose ) {

  /**
   *  class Markdown
   *
   *  Markdown processing in Javascript done right. We have very particular views
   *  on what constitutes 'right' which include:
   *
   *  - produces well-formed HTML (this means that em and strong nesting is
   *    important)
   *
   *  - has an intermediate representation to allow processing of parsed data (We
   *    in fact have two, both as [JsonML]: a markdown tree and an HTML tree).
   *
   *  - is easily extensible to add new dialects without having to rewrite the
   *    entire parsing mechanics
   *
   *  - has a good test suite
   *
   *  This implementation fulfills all of these (except that the test suite could
   *  do with expanding to automatically run all the fixtures from other Markdown
   *  implementations.)
   *
   *  ##### Intermediate Representation
   *
   *  *TODO* Talk about this :) Its JsonML, but document the node names we use.
   *
   *  [JsonML]: http://jsonml.org/ "JSON Markup Language"
   **/
  var Markdown = expose.Markdown = function Markdown(dialect) {
    switch (typeof dialect) {
      case "undefined":
        this.dialect = Markdown.dialects.Gruber;
        break;
      case "object":
        this.dialect = dialect;
        break;
      default:
        if (dialect in Markdown.dialects) {
          this.dialect = Markdown.dialects[dialect];
        }
        else {
          throw new Error("Unknown Markdown dialect '" + String(dialect) + "'");
        }
        break;
    }
    this.em_state = [];
    this.strong_state = [];
    this.debug_indent = "";
  };

  /**
   *  parse( markdown, [dialect] ) -> JsonML
   *  - markdown (String): markdown string to parse
   *  - dialect (String | Dialect): the dialect to use, defaults to gruber
   *
   *  Parse `markdown` and return a markdown document as a Markdown.JsonML tree.
   **/
  expose.parse = function( source, dialect ) {
    // dialect will default if undefined
    var md = new Markdown( dialect );
    return md.toTree( source );
  };

  /**
   *  toHTML( markdown, [dialect]  ) -> String
   *  toHTML( md_tree ) -> String
   *  - markdown (String): markdown string to parse
   *  - md_tree (Markdown.JsonML): parsed markdown tree
   *
   *  Take markdown (either as a string or as a JsonML tree) and run it through
   *  [[toHTMLTree]] then turn it into a well-formated HTML fragment.
   **/
  expose.toHTML = function toHTML( source , dialect , options ) {
    var input = expose.toHTMLTree( source , dialect , options );

    return expose.renderJsonML( input );
  };

  /**
   *  toHTMLTree( markdown, [dialect] ) -> JsonML
   *  toHTMLTree( md_tree ) -> JsonML
   *  - markdown (String): markdown string to parse
   *  - dialect (String | Dialect): the dialect to use, defaults to gruber
   *  - md_tree (Markdown.JsonML): parsed markdown tree
   *
   *  Turn markdown into HTML, represented as a JsonML tree. If a string is given
   *  to this function, it is first parsed into a markdown tree by calling
   *  [[parse]].
   **/
  expose.toHTMLTree = function toHTMLTree( input, dialect , options ) {
    // convert string input to an MD tree
    if ( typeof input ==="string" ) input = this.parse( input, dialect );

    // Now convert the MD tree to an HTML tree

    // remove references from the tree
    var attrs = extract_attr( input ),
        refs = {};

    if ( attrs && attrs.references ) {
      refs = attrs.references;
    }

    var html = convert_tree_to_html( input, refs , options );
    merge_text_nodes( html );
    return html;
  };

  // For Spidermonkey based engines
  function mk_block_toSource() {
    return "Markdown.mk_block( " +
            uneval(this.toString()) +
            ", " +
            uneval(this.trailing) +
            ", " +
            uneval(this.lineNumber) +
            " )";
  }

  // node
  function mk_block_inspect() {
    var util = require('util');
    return "Markdown.mk_block( " +
            util.inspect(this.toString()) +
            ", " +
            util.inspect(this.trailing) +
            ", " +
            util.inspect(this.lineNumber) +
            " )";

  }

  var mk_block = Markdown.mk_block = function(block, trail, line) {
    // Be helpful for default case in tests.
    if ( arguments.length == 1 ) trail = "\n\n";

    var s = new String(block);
    s.trailing = trail;
    // To make it clear its not just a string
    s.inspect = mk_block_inspect;
    s.toSource = mk_block_toSource;

    if (line != undefined)
      s.lineNumber = line;

    return s;
  };

  function count_lines( str ) {
    var n = 0, i = -1;
    while ( ( i = str.indexOf('\n', i+1) ) !== -1) n++;
    return n;
  }

  // Internal - split source into rough blocks
  Markdown.prototype.split_blocks = function splitBlocks( input, startLine ) {
    // [\s\S] matches _anything_ (newline or space)
    var re = /([\s\S]+?)($|\n(?:\s*\n|$)+)/g,
        blocks = [],
        m;

    var line_no = 1;

    if ( ( m = /^(\s*\n)/.exec(input) ) != null ) {
      // skip (but count) leading blank lines
      line_no += count_lines( m[0] );
      re.lastIndex = m[0].length;
    }

    while ( ( m = re.exec(input) ) !== null ) {
      blocks.push( mk_block( m[1], m[2], line_no ) );
      line_no += count_lines( m[0] );
    }

    return blocks;
  };

  /**
   *  Markdown#processBlock( block, next ) -> undefined | [ JsonML, ... ]
   *  - block (String): the block to process
   *  - next (Array): the following blocks
   *
   * Process `block` and return an array of JsonML nodes representing `block`.
   *
   * It does this by asking each block level function in the dialect to process
   * the block until one can. Succesful handling is indicated by returning an
   * array (with zero or more JsonML nodes), failure by a false value.
   *
   * Blocks handlers are responsible for calling [[Markdown#processInline]]
   * themselves as appropriate.
   *
   * If the blocks were split incorrectly or adjacent blocks need collapsing you
   * can adjust `next` in place using shift/splice etc.
   *
   * If any of this default behaviour is not right for the dialect, you can
   * define a `__call__` method on the dialect that will get invoked to handle
   * the block processing.
   */
  Markdown.prototype.processBlock = function processBlock( block, next ) {
    var cbs = this.dialect.block,
        ord = cbs.__order__;

    if ( "__call__" in cbs ) {
      return cbs.__call__.call(this, block, next);
    }

    for ( var i = 0; i < ord.length; i++ ) {
      //D:this.debug( "Testing", ord[i] );
      var res = cbs[ ord[i] ].call( this, block, next );
      if ( res ) {
        //D:this.debug("  matched");
        if ( !isArray(res) || ( res.length > 0 && !( isArray(res[0]) ) ) )
          this.debug(ord[i], "didn't return a proper array");
        //D:this.debug( "" );
        return res;
      }
    }

    // Uhoh! no match! Should we throw an error?
    return [];
  };

  Markdown.prototype.processInline = function processInline( block ) {
    return this.dialect.inline.__call__.call( this, String( block ) );
  };

  /**
   *  Markdown#toTree( source ) -> JsonML
   *  - source (String): markdown source to parse
   *
   *  Parse `source` into a JsonML tree representing the markdown document.
   **/
  // custom_tree means set this.tree to `custom_tree` and restore old value on return
  Markdown.prototype.toTree = function toTree( source, custom_root ) {
    var blocks = source instanceof Array ? source : this.split_blocks( source );

    // Make tree a member variable so its easier to mess with in extensions
    var old_tree = this.tree;
    try {
      this.tree = custom_root || this.tree || [ "markdown" ];

      blocks:
      while ( blocks.length ) {
        var b = this.processBlock( blocks.shift(), blocks );

        // Reference blocks and the like won't return any content
        if ( !b.length ) continue blocks;

        this.tree.push.apply( this.tree, b );
      }
      return this.tree;
    }
    finally {
      if ( custom_root ) {
        this.tree = old_tree;
      }
    }
  };

  // Noop by default
  Markdown.prototype.debug = function () {
    var args = Array.prototype.slice.call( arguments);
    args.unshift(this.debug_indent);
    if (typeof print !== "undefined")
        print.apply( print, args );
    if (typeof console !== "undefined" && typeof console.log !== "undefined")
        console.log.apply( null, args );
  }

  Markdown.prototype.loop_re_over_block = function( re, block, cb ) {
    // Dont use /g regexps with this
    var m,
        b = block.valueOf();

    while ( b.length && (m = re.exec(b) ) != null) {
      b = b.substr( m[0].length );
      cb.call(this, m);
    }
    return b;
  };

  /**
   * Markdown.dialects
   *
   * Namespace of built-in dialects.
   **/
  Markdown.dialects = {};

  /**
   * Markdown.dialects.Gruber
   *
   * The default dialect that follows the rules set out by John Gruber's
   * markdown.pl as closely as possible. Well actually we follow the behaviour of
   * that script which in some places is not exactly what the syntax web page
   * says.
   **/
  Markdown.dialects.Gruber = {
    block: {
      atxHeader: function atxHeader( block, next ) {
        var m = block.match( /^(#{1,6})\s*(.*?)\s*#*\s*(?:\n|$)/ );

        if ( !m ) return undefined;

        var header = [ "header", { level: m[ 1 ].length } ];
        Array.prototype.push.apply(header, this.processInline(m[ 2 ]));

        if ( m[0].length < block.length )
          next.unshift( mk_block( block.substr( m[0].length ), block.trailing, block.lineNumber + 2 ) );

        return [ header ];
      },

      setextHeader: function setextHeader( block, next ) {
        var m = block.match( /^(.*)\n([-=])\2\2+(?:\n|$)/ );

        if ( !m ) return undefined;

        var level = ( m[ 2 ] === "=" ) ? 1 : 2;
        var header = [ "header", { level : level }, m[ 1 ] ];

        if ( m[0].length < block.length )
          next.unshift( mk_block( block.substr( m[0].length ), block.trailing, block.lineNumber + 2 ) );

        return [ header ];
      },

      code: function code( block, next ) {
        // |    Foo
        // |bar
        // should be a code block followed by a paragraph. Fun
        //
        // There might also be adjacent code block to merge.

        var ret = [],
            re = /^(?: {0,3}\t| {4})(.*)\n?/,
            lines;

        // 4 spaces + content
        if ( !block.match( re ) ) return undefined;

        block_search:
        do {
          // Now pull out the rest of the lines
          var b = this.loop_re_over_block(
                    re, block.valueOf(), function( m ) { ret.push( m[1] ); } );

          if (b.length) {
            // Case alluded to in first comment. push it back on as a new block
            next.unshift( mk_block(b, block.trailing) );
            break block_search;
          }
          else if (next.length) {
            // Check the next block - it might be code too
            if ( !next[0].match( re ) ) break block_search;

            // Pull how how many blanks lines follow - minus two to account for .join
            ret.push ( block.trailing.replace(/[^\n]/g, '').substring(2) );

            block = next.shift();
          }
          else {
            break block_search;
          }
        } while (true);

        return [ [ "code_block", ret.join("\n") ] ];
      },

      horizRule: function horizRule( block, next ) {
        // this needs to find any hr in the block to handle abutting blocks
        var m = block.match( /^(?:([\s\S]*?)\n)?[ \t]*([-_*])(?:[ \t]*\2){2,}[ \t]*(?:\n([\s\S]*))?$/ );

        if ( !m ) {
          return undefined;
        }

        var jsonml = [ [ "hr" ] ];

        // if there's a leading abutting block, process it
        if ( m[ 1 ] ) {
          jsonml.unshift.apply( jsonml, this.processBlock( m[ 1 ], [] ) );
        }

        // if there's a trailing abutting block, stick it into next
        if ( m[ 3 ] ) {
          next.unshift( mk_block( m[ 3 ] ) );
        }

        return jsonml;
      },

      // There are two types of lists. Tight and loose. Tight lists have no whitespace
      // between the items (and result in text just in the <li>) and loose lists,
      // which have an empty line between list items, resulting in (one or more)
      // paragraphs inside the <li>.
      //
      // There are all sorts weird edge cases about the original markdown.pl's
      // handling of lists:
      //
      // * Nested lists are supposed to be indented by four chars per level. But
      //   if they aren't, you can get a nested list by indenting by less than
      //   four so long as the indent doesn't match an indent of an existing list
      //   item in the 'nest stack'.
      //
      // * The type of the list (bullet or number) is controlled just by the
      //    first item at the indent. Subsequent changes are ignored unless they
      //    are for nested lists
      //
      lists: (function( ) {
        // Use a closure to hide a few variables.
        var any_list = "[*+-]|\\d+\\.",
            bullet_list = /[*+-]/,
            number_list = /\d+\./,
            // Capture leading indent as it matters for determining nested lists.
            is_list_re = new RegExp( "^( {0,3})(" + any_list + ")[ \t]+" ),
            indent_re = "(?: {0,3}\\t| {4})";

        // TODO: Cache this regexp for certain depths.
        // Create a regexp suitable for matching an li for a given stack depth
        function regex_for_depth( depth ) {

          return new RegExp(
            // m[1] = indent, m[2] = list_type
            "(?:^(" + indent_re + "{0," + depth + "} {0,3})(" + any_list + ")\\s+)|" +
            // m[3] = cont
            "(^" + indent_re + "{0," + (depth-1) + "}[ ]{0,4})"
          );
        }
        function expand_tab( input ) {
          return input.replace( / {0,3}\t/g, "    " );
        }

        // Add inline content `inline` to `li`. inline comes from processInline
        // so is an array of content
        function add(li, loose, inline, nl) {
          if (loose) {
            li.push( [ "para" ].concat(inline) );
            return;
          }
          // Hmmm, should this be any block level element or just paras?
          var add_to = li[li.length -1] instanceof Array && li[li.length - 1][0] == "para"
                     ? li[li.length -1]
                     : li;

          // If there is already some content in this list, add the new line in
          if (nl && li.length > 1) inline.unshift(nl);

          for (var i=0; i < inline.length; i++) {
            var what = inline[i],
                is_str = typeof what == "string";
            if (is_str && add_to.length > 1 && typeof add_to[add_to.length-1] == "string" ) {
              add_to[ add_to.length-1 ] += what;
            }
            else {
              add_to.push( what );
            }
          }
        }

        // contained means have an indent greater than the current one. On
        // *every* line in the block
        function get_contained_blocks( depth, blocks ) {

          var re = new RegExp( "^(" + indent_re + "{" + depth + "}.*?\\n?)*$" ),
              replace = new RegExp("^" + indent_re + "{" + depth + "}", "gm"),
              ret = [];

          while ( blocks.length > 0 ) {
            if ( re.exec( blocks[0] ) ) {
              var b = blocks.shift(),
                  // Now remove that indent
                  x = b.replace( replace, "");

              ret.push( mk_block( x, b.trailing, b.lineNumber ) );
            }
            break;
          }
          return ret;
        }

        // passed to stack.forEach to turn list items up the stack into paras
        function paragraphify(s, i, stack) {
          var list = s.list;
          var last_li = list[list.length-1];

          if (last_li[1] instanceof Array && last_li[1][0] == "para") {
            return;
          }
          if (i+1 == stack.length) {
            // Last stack frame
            // Keep the same array, but replace the contents
            last_li.push( ["para"].concat( last_li.splice(1) ) );
          }
          else {
            var sublist = last_li.pop();
            last_li.push( ["para"].concat( last_li.splice(1) ), sublist );
          }
        }

        // The matcher function
        return function( block, next ) {
          var m = block.match( is_list_re );
          if ( !m ) return undefined;

          function make_list( m ) {
            var list = bullet_list.exec( m[2] )
                     ? ["bulletlist"]
                     : ["numberlist"];

            stack.push( { list: list, indent: m[1] } );
            return list;
          }


          var stack = [], // Stack of lists for nesting.
              list = make_list( m ),
              last_li,
              loose = false,
              ret = [ stack[0].list ],
              i;

          // Loop to search over block looking for inner block elements and loose lists
          loose_search:
          while( true ) {
            // Split into lines preserving new lines at end of line
            var lines = block.split( /(?=\n)/ );

            // We have to grab all lines for a li and call processInline on them
            // once as there are some inline things that can span lines.
            var li_accumulate = "";

            // Loop over the lines in this block looking for tight lists.
            tight_search:
            for (var line_no=0; line_no < lines.length; line_no++) {
              var nl = "",
                  l = lines[line_no].replace(/^\n/, function(n) { nl = n; return ""; });

              // TODO: really should cache this
              var line_re = regex_for_depth( stack.length );

              m = l.match( line_re );
              //print( "line:", uneval(l), "\nline match:", uneval(m) );

              // We have a list item
              if ( m[1] !== undefined ) {
                // Process the previous list item, if any
                if ( li_accumulate.length ) {
                  add( last_li, loose, this.processInline( li_accumulate ), nl );
                  // Loose mode will have been dealt with. Reset it
                  loose = false;
                  li_accumulate = "";
                }

                m[1] = expand_tab( m[1] );
                var wanted_depth = Math.floor(m[1].length/4)+1;
                //print( "want:", wanted_depth, "stack:", stack.length);
                if ( wanted_depth > stack.length ) {
                  // Deep enough for a nested list outright
                  //print ( "new nested list" );
                  list = make_list( m );
                  last_li.push( list );
                  last_li = list[1] = [ "listitem" ];
                }
                else {
                  // We aren't deep enough to be strictly a new level. This is
                  // where Md.pl goes nuts. If the indent matches a level in the
                  // stack, put it there, else put it one deeper then the
                  // wanted_depth deserves.
                  var found = false;
                  for (i = 0; i < stack.length; i++) {
                    if ( stack[ i ].indent != m[1] ) continue;
                    list = stack[ i ].list;
                    stack.splice( i+1 );
                    found = true;
                    break;
                  }

                  if (!found) {
                    //print("not found. l:", uneval(l));
                    wanted_depth++;
                    if (wanted_depth <= stack.length) {
                      stack.splice(wanted_depth);
                      //print("Desired depth now", wanted_depth, "stack:", stack.length);
                      list = stack[wanted_depth-1].list;
                      //print("list:", uneval(list) );
                    }
                    else {
                      //print ("made new stack for messy indent");
                      list = make_list(m);
                      last_li.push(list);
                    }
                  }

                  //print( uneval(list), "last", list === stack[stack.length-1].list );
                  last_li = [ "listitem" ];
                  list.push(last_li);
                } // end depth of shenegains
                nl = "";
              }

              // Add content
              if (l.length > m[0].length) {
                li_accumulate += nl + l.substr( m[0].length );
              }
            } // tight_search

            if ( li_accumulate.length ) {
              add( last_li, loose, this.processInline( li_accumulate ), nl );
              // Loose mode will have been dealt with. Reset it
              loose = false;
              li_accumulate = "";
            }

            // Look at the next block - we might have a loose list. Or an extra
            // paragraph for the current li
            var contained = get_contained_blocks( stack.length, next );

            // Deal with code blocks or properly nested lists
            if (contained.length > 0) {
              // Make sure all listitems up the stack are paragraphs
              forEach( stack, paragraphify, this);

              last_li.push.apply( last_li, this.toTree( contained, [] ) );
            }

            var next_block = next[0] && next[0].valueOf() || "";

            if ( next_block.match(is_list_re) || next_block.match( /^ / ) ) {
              block = next.shift();

              // Check for an HR following a list: features/lists/hr_abutting
              var hr = this.dialect.block.horizRule( block, next );

              if (hr) {
                ret.push.apply(ret, hr);
                break;
              }

              // Make sure all listitems up the stack are paragraphs
              forEach( stack, paragraphify, this);

              loose = true;
              continue loose_search;
            }
            break;
          } // loose_search

          return ret;
        };
      })(),

      blockquote: function blockquote( block, next ) {
        if ( !block.match( /^>/m ) )
          return undefined;

        var jsonml = [];

        // separate out the leading abutting block, if any
        if ( block[ 0 ] != ">" ) {
          var lines = block.split( /\n/ ),
              prev = [];

          // keep shifting lines until you find a crotchet
          while ( lines.length && lines[ 0 ][ 0 ] != ">" ) {
              prev.push( lines.shift() );
          }

          // reassemble!
          block = lines.join( "\n" );
          jsonml.push.apply( jsonml, this.processBlock( prev.join( "\n" ), [] ) );
        }

        // if the next block is also a blockquote merge it in
        while ( next.length && next[ 0 ][ 0 ] == ">" ) {
          var b = next.shift();
          block = new String(block + block.trailing + b);
          block.trailing = b.trailing;
        }

        // Strip off the leading "> " and re-process as a block.
        var input = block.replace( /^> ?/gm, '' ),
            old_tree = this.tree;
        jsonml.push( this.toTree( input, [ "blockquote" ] ) );

        return jsonml;
      },

      referenceDefn: function referenceDefn( block, next) {
        var re = /^\s*\[(.*?)\]:\s*(\S+)(?:\s+(?:(['"])(.*?)\3|\((.*?)\)))?\n?/;
        // interesting matches are [ , ref_id, url, , title, title ]

        if ( !block.match(re) )
          return undefined;

        // make an attribute node if it doesn't exist
        if ( !extract_attr( this.tree ) ) {
          this.tree.splice( 1, 0, {} );
        }

        var attrs = extract_attr( this.tree );

        // make a references hash if it doesn't exist
        if ( attrs.references === undefined ) {
          attrs.references = {};
        }

        var b = this.loop_re_over_block(re, block, function( m ) {

          if ( m[2] && m[2][0] == '<' && m[2][m[2].length-1] == '>' )
            m[2] = m[2].substring( 1, m[2].length - 1 );

          var ref = attrs.references[ m[1].toLowerCase() ] = {
            href: m[2]
          };

          if (m[4] !== undefined)
            ref.title = m[4];
          else if (m[5] !== undefined)
            ref.title = m[5];

        } );

        if (b.length)
          next.unshift( mk_block( b, block.trailing ) );

        return [];
      },

      para: function para( block, next ) {
        // everything's a para!
        return [ ["para"].concat( this.processInline( block ) ) ];
      }
    }
  };

  Markdown.dialects.Gruber.inline = {

      __oneElement__: function oneElement( text, patterns_or_re, previous_nodes ) {
        var m,
            res,
            lastIndex = 0;

        patterns_or_re = patterns_or_re || this.dialect.inline.__patterns__;
        var re = new RegExp( "([\\s\\S]*?)(" + (patterns_or_re.source || patterns_or_re) + ")" );

        m = re.exec( text );
        if (!m) {
          // Just boring text
          return [ text.length, text ];
        }
        else if ( m[1] ) {
          // Some un-interesting text matched. Return that first
          return [ m[1].length, m[1] ];
        }

        var res;
        if ( m[2] in this.dialect.inline ) {
          res = this.dialect.inline[ m[2] ].call(
                    this,
                    text.substr( m.index ), m, previous_nodes || [] );
        }
        // Default for now to make dev easier. just slurp special and output it.
        res = res || [ m[2].length, m[2] ];
        return res;
      },

      __call__: function inline( text, patterns ) {

        var out = [],
            res;

        function add(x) {
          //D:self.debug("  adding output", uneval(x));
          if (typeof x == "string" && typeof out[out.length-1] == "string")
            out[ out.length-1 ] += x;
          else
            out.push(x);
        }

        while ( text.length > 0 ) {
          res = this.dialect.inline.__oneElement__.call(this, text, patterns, out );
          text = text.substr( res.shift() );
          forEach(res, add )
        }

        return out;
      },

      // These characters are intersting elsewhere, so have rules for them so that
      // chunks of plain text blocks don't include them
      "]": function () {},
      "}": function () {},

      "\\": function escaped( text ) {
        // [ length of input processed, node/children to add... ]
        // Only esacape: \ ` * _ { } [ ] ( ) # * + - . !
        if ( text.match( /^\\[\\`\*_{}\[\]()#\+.!\-]/ ) )
          return [ 2, text[1] ];
        else
          // Not an esacpe
          return [ 1, "\\" ];
      },

      "![": function image( text ) {

        // Unlike images, alt text is plain text only. no other elements are
        // allowed in there

        // ![Alt text](/path/to/img.jpg "Optional title")
        //      1          2            3       4         <--- captures
        var m = text.match( /^!\[(.*?)\][ \t]*\([ \t]*(\S*)(?:[ \t]+(["'])(.*?)\3)?[ \t]*\)/ );

        if ( m ) {
          if ( m[2] && m[2][0] == '<' && m[2][m[2].length-1] == '>' )
            m[2] = m[2].substring( 1, m[2].length - 1 );

          m[2] = this.dialect.inline.__call__.call( this, m[2], /\\/ )[0];

          var attrs = { alt: m[1], href: m[2] || "" };
          if ( m[4] !== undefined)
            attrs.title = m[4];

          return [ m[0].length, [ "img", attrs ] ];
        }

        // ![Alt text][id]
        m = text.match( /^!\[(.*?)\][ \t]*\[(.*?)\]/ );

        if ( m ) {
          // We can't check if the reference is known here as it likely wont be
          // found till after. Check it in md tree->hmtl tree conversion
          return [ m[0].length, [ "img_ref", { alt: m[1], ref: m[2].toLowerCase(), original: m[0] } ] ];
        }

        // Just consume the '!['
        return [ 2, "![" ];
      },

      "[": function link( text ) {

        var orig = String(text);
        // Inline content is possible inside `link text`
        var res = Markdown.DialectHelpers.inline_until_char.call( this, text.substr(1), ']' );

        // No closing ']' found. Just consume the [
        if ( !res ) return [ 1, '[' ];

        var consumed = 1 + res[ 0 ],
            children = res[ 1 ],
            link,
            attrs;

        // At this point the first [...] has been parsed. See what follows to find
        // out which kind of link we are (reference or direct url)
        text = text.substr( consumed );

        // [link text](/path/to/img.jpg "Optional title")
        //                 1            2       3         <--- captures
        // This will capture up to the last paren in the block. We then pull
        // back based on if there a matching ones in the url
        //    ([here](/url/(test))
        // The parens have to be balanced
        var m = text.match( /^\s*\([ \t]*(\S+)(?:[ \t]+(["'])(.*?)\2)?[ \t]*\)/ );
        if ( m ) {
          var url = m[1];
          consumed += m[0].length;

          if ( url && url[0] == '<' && url[url.length-1] == '>' )
            url = url.substring( 1, url.length - 1 );

          // If there is a title we don't have to worry about parens in the url
          if ( !m[3] ) {
            var open_parens = 1; // One open that isn't in the capture
            for (var len = 0; len < url.length; len++) {
              switch ( url[len] ) {
              case '(':
                open_parens++;
                break;
              case ')':
                if ( --open_parens == 0) {
                  consumed -= url.length - len;
                  url = url.substring(0, len);
                }
                break;
              }
            }
          }

          // Process escapes only
          url = this.dialect.inline.__call__.call( this, url, /\\/ )[0];

          attrs = { href: url || "" };
          if ( m[3] !== undefined)
            attrs.title = m[3];

          link = [ "link", attrs ].concat( children );
          return [ consumed, link ];
        }

        // [Alt text][id]
        // [Alt text] [id]
        m = text.match( /^\s*\[(.*?)\]/ );

        if ( m ) {

          consumed += m[ 0 ].length;

          // [links][] uses links as its reference
          attrs = { ref: ( m[ 1 ] || String(children) ).toLowerCase(),  original: orig.substr( 0, consumed ) };

          link = [ "link_ref", attrs ].concat( children );

          // We can't check if the reference is known here as it likely wont be
          // found till after. Check it in md tree->hmtl tree conversion.
          // Store the original so that conversion can revert if the ref isn't found.
          return [ consumed, link ];
        }

        // [id]
        // Only if id is plain (no formatting.)
        if ( children.length == 1 && typeof children[0] == "string" ) {

          attrs = { ref: children[0].toLowerCase(),  original: orig.substr( 0, consumed ) };
          link = [ "link_ref", attrs, children[0] ];
          return [ consumed, link ];
        }

        // Just consume the '['
        return [ 1, "[" ];
      },


      "<": function autoLink( text ) {
        var m;

        if ( ( m = text.match( /^<(?:((https?|ftp|mailto):[^>]+)|(.*?@.*?\.[a-zA-Z]+))>/ ) ) != null ) {
          if ( m[3] ) {
            return [ m[0].length, [ "link", { href: "mailto:" + m[3] }, m[3] ] ];

          }
          else if ( m[2] == "mailto" ) {
            return [ m[0].length, [ "link", { href: m[1] }, m[1].substr("mailto:".length ) ] ];
          }
          else
            return [ m[0].length, [ "link", { href: m[1] }, m[1] ] ];
        }

        return [ 1, "<" ];
      },

      "`": function inlineCode( text ) {
        // Inline code block. as many backticks as you like to start it
        // Always skip over the opening ticks.
        var m = text.match( /(`+)(([\s\S]*?)\1)/ );

        if ( m && m[2] )
          return [ m[1].length + m[2].length, [ "inlinecode", m[3] ] ];
        else {
          // TODO: No matching end code found - warn!
          return [ 1, "`" ];
        }
      },

      "  \n": function lineBreak( text ) {
        return [ 3, [ "linebreak" ] ];
      }

  };

  // Meta Helper/generator method for em and strong handling
  function strong_em( tag, md ) {

    var state_slot = tag + "_state",
        other_slot = tag == "strong" ? "em_state" : "strong_state";

    function CloseTag(len) {
      this.len_after = len;
      this.name = "close_" + md;
    }

    return function ( text, orig_match ) {

      if (this[state_slot][0] == md) {
        // Most recent em is of this type
        //D:this.debug("closing", md);
        this[state_slot].shift();

        // "Consume" everything to go back to the recrusion in the else-block below
        return[ text.length, new CloseTag(text.length-md.length) ];
      }
      else {
        // Store a clone of the em/strong states
        var other = this[other_slot].slice(),
            state = this[state_slot].slice();

        this[state_slot].unshift(md);

        //D:this.debug_indent += "  ";

        // Recurse
        var res = this.processInline( text.substr( md.length ) );
        //D:this.debug_indent = this.debug_indent.substr(2);

        var last = res[res.length - 1];

        //D:this.debug("processInline from", tag + ": ", uneval( res ) );

        var check = this[state_slot].shift();
        if (last instanceof CloseTag) {
          res.pop();
          // We matched! Huzzah.
          var consumed = text.length - last.len_after;
          return [ consumed, [ tag ].concat(res) ];
        }
        else {
          // Restore the state of the other kind. We might have mistakenly closed it.
          this[other_slot] = other;
          this[state_slot] = state;

          // We can't reuse the processed result as it could have wrong parsing contexts in it.
          return [ md.length, md ];
        }
      }
    }; // End returned function
  }

  Markdown.dialects.Gruber.inline["**"] = strong_em("strong", "**");
  Markdown.dialects.Gruber.inline["__"] = strong_em("strong", "__");
  Markdown.dialects.Gruber.inline["*"]  = strong_em("em", "*");
  Markdown.dialects.Gruber.inline["_"]  = strong_em("em", "_");


  // Build default order from insertion order.
  Markdown.buildBlockOrder = function(d) {
    var ord = [];
    for ( var i in d ) {
      if ( i == "__order__" || i == "__call__" ) continue;
      ord.push( i );
    }
    d.__order__ = ord;
  };

  // Build patterns for inline matcher
  Markdown.buildInlinePatterns = function(d) {
    var patterns = [];

    for ( var i in d ) {
      // __foo__ is reserved and not a pattern
      if ( i.match( /^__.*__$/) ) continue;
      var l = i.replace( /([\\.*+?|()\[\]{}])/g, "\\$1" )
               .replace( /\n/, "\\n" );
      patterns.push( i.length == 1 ? l : "(?:" + l + ")" );
    }

    patterns = patterns.join("|");
    d.__patterns__ = patterns;
    //print("patterns:", uneval( patterns ) );

    var fn = d.__call__;
    d.__call__ = function(text, pattern) {
      if (pattern != undefined) {
        return fn.call(this, text, pattern);
      }
      else
      {
        return fn.call(this, text, patterns);
      }
    };
  };

  Markdown.DialectHelpers = {};
  Markdown.DialectHelpers.inline_until_char = function( text, want ) {
    var consumed = 0,
        nodes = [];

    while ( true ) {
      if ( text[ consumed ] == want ) {
        // Found the character we were looking for
        consumed++;
        return [ consumed, nodes ];
      }

      if ( consumed >= text.length ) {
        // No closing char found. Abort.
        return null;
      }

      var res = this.dialect.inline.__oneElement__.call(this, text.substr( consumed ) );
      consumed += res[ 0 ];
      // Add any returned nodes.
      nodes.push.apply( nodes, res.slice( 1 ) );
    }
  }

  // Helper function to make sub-classing a dialect easier
  Markdown.subclassDialect = function( d ) {
    function Block() {}
    Block.prototype = d.block;
    function Inline() {}
    Inline.prototype = d.inline;

    return { block: new Block(), inline: new Inline() };
  };

  Markdown.buildBlockOrder ( Markdown.dialects.Gruber.block );
  Markdown.buildInlinePatterns( Markdown.dialects.Gruber.inline );

  Markdown.dialects.Maruku = Markdown.subclassDialect( Markdown.dialects.Gruber );

  Markdown.dialects.Maruku.processMetaHash = function processMetaHash( meta_string ) {
    var meta = split_meta_hash( meta_string ),
        attr = {};

    for ( var i = 0; i < meta.length; ++i ) {
      // id: #foo
      if ( /^#/.test( meta[ i ] ) ) {
        attr.id = meta[ i ].substring( 1 );
      }
      // class: .foo
      else if ( /^\./.test( meta[ i ] ) ) {
        // if class already exists, append the new one
        if ( attr['class'] ) {
          attr['class'] = attr['class'] + meta[ i ].replace( /./, " " );
        }
        else {
          attr['class'] = meta[ i ].substring( 1 );
        }
      }
      // attribute: foo=bar
      else if ( /\=/.test( meta[ i ] ) ) {
        var s = meta[ i ].split( /\=/ );
        attr[ s[ 0 ] ] = s[ 1 ];
      }
    }

    return attr;
  }

  function split_meta_hash( meta_string ) {
    var meta = meta_string.split( "" ),
        parts = [ "" ],
        in_quotes = false;

    while ( meta.length ) {
      var letter = meta.shift();
      switch ( letter ) {
        case " " :
          // if we're in a quoted section, keep it
          if ( in_quotes ) {
            parts[ parts.length - 1 ] += letter;
          }
          // otherwise make a new part
          else {
            parts.push( "" );
          }
          break;
        case "'" :
        case '"' :
          // reverse the quotes and move straight on
          in_quotes = !in_quotes;
          break;
        case "\\" :
          // shift off the next letter to be used straight away.
          // it was escaped so we'll keep it whatever it is
          letter = meta.shift();
        default :
          parts[ parts.length - 1 ] += letter;
          break;
      }
    }

    return parts;
  }

  Markdown.dialects.Maruku.block.document_meta = function document_meta( block, next ) {
    // we're only interested in the first block
    if ( block.lineNumber > 1 ) return undefined;

    // document_meta blocks consist of one or more lines of `Key: Value\n`
    if ( ! block.match( /^(?:\w+:.*\n)*\w+:.*$/ ) ) return undefined;

    // make an attribute node if it doesn't exist
    if ( !extract_attr( this.tree ) ) {
      this.tree.splice( 1, 0, {} );
    }

    var pairs = block.split( /\n/ );
    for ( p in pairs ) {
      var m = pairs[ p ].match( /(\w+):\s*(.*)$/ ),
          key = m[ 1 ].toLowerCase(),
          value = m[ 2 ];

      this.tree[ 1 ][ key ] = value;
    }

    // document_meta produces no content!
    return [];
  };

  Markdown.dialects.Maruku.block.block_meta = function block_meta( block, next ) {
    // check if the last line of the block is an meta hash
    var m = block.match( /(^|\n) {0,3}\{:\s*((?:\\\}|[^\}])*)\s*\}$/ );
    if ( !m ) return undefined;

    // process the meta hash
    var attr = this.dialect.processMetaHash( m[ 2 ] );

    var hash;

    // if we matched ^ then we need to apply meta to the previous block
    if ( m[ 1 ] === "" ) {
      var node = this.tree[ this.tree.length - 1 ];
      hash = extract_attr( node );

      // if the node is a string (rather than JsonML), bail
      if ( typeof node === "string" ) return undefined;

      // create the attribute hash if it doesn't exist
      if ( !hash ) {
        hash = {};
        node.splice( 1, 0, hash );
      }

      // add the attributes in
      for ( a in attr ) {
        hash[ a ] = attr[ a ];
      }

      // return nothing so the meta hash is removed
      return [];
    }

    // pull the meta hash off the block and process what's left
    var b = block.replace( /\n.*$/, "" ),
        result = this.processBlock( b, [] );

    // get or make the attributes hash
    hash = extract_attr( result[ 0 ] );
    if ( !hash ) {
      hash = {};
      result[ 0 ].splice( 1, 0, hash );
    }

    // attach the attributes to the block
    for ( a in attr ) {
      hash[ a ] = attr[ a ];
    }

    return result;
  };

  Markdown.dialects.Maruku.block.definition_list = function definition_list( block, next ) {
    // one or more terms followed by one or more definitions, in a single block
    var tight = /^((?:[^\s:].*\n)+):\s+([\s\S]+)$/,
        list = [ "dl" ],
        i;

    // see if we're dealing with a tight or loose block
    if ( ( m = block.match( tight ) ) ) {
      // pull subsequent tight DL blocks out of `next`
      var blocks = [ block ];
      while ( next.length && tight.exec( next[ 0 ] ) ) {
        blocks.push( next.shift() );
      }

      for ( var b = 0; b < blocks.length; ++b ) {
        var m = blocks[ b ].match( tight ),
            terms = m[ 1 ].replace( /\n$/, "" ).split( /\n/ ),
            defns = m[ 2 ].split( /\n:\s+/ );

        // print( uneval( m ) );

        for ( i = 0; i < terms.length; ++i ) {
          list.push( [ "dt", terms[ i ] ] );
        }

        for ( i = 0; i < defns.length; ++i ) {
          // run inline processing over the definition
          list.push( [ "dd" ].concat( this.processInline( defns[ i ].replace( /(\n)\s+/, "$1" ) ) ) );
        }
      }
    }
    else {
      return undefined;
    }

    return [ list ];
  };

  Markdown.dialects.Maruku.inline[ "{:" ] = function inline_meta( text, matches, out ) {
    if ( !out.length ) {
      return [ 2, "{:" ];
    }

    // get the preceeding element
    var before = out[ out.length - 1 ];

    if ( typeof before === "string" ) {
      return [ 2, "{:" ];
    }

    // match a meta hash
    var m = text.match( /^\{:\s*((?:\\\}|[^\}])*)\s*\}/ );

    // no match, false alarm
    if ( !m ) {
      return [ 2, "{:" ];
    }

    // attach the attributes to the preceeding element
    var meta = this.dialect.processMetaHash( m[ 1 ] ),
        attr = extract_attr( before );

    if ( !attr ) {
      attr = {};
      before.splice( 1, 0, attr );
    }

    for ( var k in meta ) {
      attr[ k ] = meta[ k ];
    }

    // cut out the string and replace it with nothing
    return [ m[ 0 ].length, "" ];
  };

  Markdown.buildBlockOrder ( Markdown.dialects.Maruku.block );
  Markdown.buildInlinePatterns( Markdown.dialects.Maruku.inline );

  var isArray = Array.isArray || function(obj) {
    return Object.prototype.toString.call(obj) == '[object Array]';
  };

  var forEach;
  // Don't mess with Array.prototype. Its not friendly
  if ( Array.prototype.forEach ) {
    forEach = function( arr, cb, thisp ) {
      return arr.forEach( cb, thisp );
    };
  }
  else {
    forEach = function(arr, cb, thisp) {
      for (var i = 0; i < arr.length; i++) {
        cb.call(thisp || arr, arr[i], i, arr);
      }
    }
  }

  function extract_attr( jsonml ) {
    return isArray(jsonml)
        && jsonml.length > 1
        && typeof jsonml[ 1 ] === "object"
        && !( isArray(jsonml[ 1 ]) )
        ? jsonml[ 1 ]
        : undefined;
  }



  /**
   *  renderJsonML( jsonml[, options] ) -> String
   *  - jsonml (Array): JsonML array to render to XML
   *  - options (Object): options
   *
   *  Converts the given JsonML into well-formed XML.
   *
   *  The options currently understood are:
   *
   *  - root (Boolean): wether or not the root node should be included in the
   *    output, or just its children. The default `false` is to not include the
   *    root itself.
   */
  expose.renderJsonML = function( jsonml, options ) {
    options = options || {};
    // include the root element in the rendered output?
    options.root = options.root || false;

    var content = [];

    if ( options.root ) {
      content.push( render_tree( jsonml ) );
    }
    else {
      jsonml.shift(); // get rid of the tag
      if ( jsonml.length && typeof jsonml[ 0 ] === "object" && !( jsonml[ 0 ] instanceof Array ) ) {
        jsonml.shift(); // get rid of the attributes
      }

      while ( jsonml.length ) {
        content.push( render_tree( jsonml.shift() ) );
      }
    }

    return content.join( "\n\n" );
  };

  function escapeHTML( text ) {
    return text.replace( /&/g, "&amp;" )
               .replace( /</g, "&lt;" )
               .replace( />/g, "&gt;" )
               .replace( /"/g, "&quot;" )
               .replace( /'/g, "&#39;" );
  }

  function render_tree( jsonml ) {
    // basic case
    if ( typeof jsonml === "string" ) {
      return escapeHTML( jsonml );
    }

    var tag = jsonml.shift(),
        attributes = {},
        content = [];

    if ( jsonml.length && typeof jsonml[ 0 ] === "object" && !( jsonml[ 0 ] instanceof Array ) ) {
      attributes = jsonml.shift();
    }

    while ( jsonml.length ) {
      content.push( arguments.callee( jsonml.shift() ) );
    }

    var tag_attrs = "";
    for ( var a in attributes ) {
      tag_attrs += " " + a + '="' + escapeHTML( attributes[ a ] ) + '"';
    }

    // be careful about adding whitespace here for inline elements
    if ( tag == "img" || tag == "br" || tag == "hr" ) {
      return "<"+ tag + tag_attrs + "/>";
    }
    else {
      return "<"+ tag + tag_attrs + ">" + content.join( "" ) + "</" + tag + ">";
    }
  }

  function convert_tree_to_html( tree, references, options ) {
    var i;
    options = options || {};

    // shallow clone
    var jsonml = tree.slice( 0 );

    if (typeof options.preprocessTreeNode === "function") {
        jsonml = options.preprocessTreeNode(jsonml, references);
    }

    // Clone attributes if they exist
    var attrs = extract_attr( jsonml );
    if ( attrs ) {
      jsonml[ 1 ] = {};
      for ( i in attrs ) {
        jsonml[ 1 ][ i ] = attrs[ i ];
      }
      attrs = jsonml[ 1 ];
    }

    // basic case
    if ( typeof jsonml === "string" ) {
      return jsonml;
    }

    // convert this node
    switch ( jsonml[ 0 ] ) {
      case "header":
        jsonml[ 0 ] = "h" + jsonml[ 1 ].level;
        delete jsonml[ 1 ].level;
        break;
      case "bulletlist":
        jsonml[ 0 ] = "ul";
        break;
      case "numberlist":
        jsonml[ 0 ] = "ol";
        break;
      case "listitem":
        jsonml[ 0 ] = "li";
        break;
      case "para":
        jsonml[ 0 ] = "p";
        break;
      case "markdown":
        jsonml[ 0 ] = "html";
        if ( attrs ) delete attrs.references;
        break;
      case "code_block":
        jsonml[ 0 ] = "pre";
        i = attrs ? 2 : 1;
        var code = [ "code" ];
        code.push.apply( code, jsonml.splice( i ) );
        jsonml[ i ] = code;
        break;
      case "inlinecode":
        jsonml[ 0 ] = "code";
        break;
      case "img":
        jsonml[ 1 ].src = jsonml[ 1 ].href;
        delete jsonml[ 1 ].href;
        break;
      case "linebreak":
        jsonml[ 0 ] = "br";
      break;
      case "link":
        jsonml[ 0 ] = "a";
        break;
      case "link_ref":
        jsonml[ 0 ] = "a";

        // grab this ref and clean up the attribute node
        var ref = references[ attrs.ref ];

        // if the reference exists, make the link
        if ( ref ) {
          delete attrs.ref;

          // add in the href and title, if present
          attrs.href = ref.href;
          if ( ref.title ) {
            attrs.title = ref.title;
          }

          // get rid of the unneeded original text
          delete attrs.original;
        }
        // the reference doesn't exist, so revert to plain text
        else {
          return attrs.original;
        }
        break;
      case "img_ref":
        jsonml[ 0 ] = "img";

        // grab this ref and clean up the attribute node
        var ref = references[ attrs.ref ];

        // if the reference exists, make the link
        if ( ref ) {
          delete attrs.ref;

          // add in the href and title, if present
          attrs.src = ref.href;
          if ( ref.title ) {
            attrs.title = ref.title;
          }

          // get rid of the unneeded original text
          delete attrs.original;
        }
        // the reference doesn't exist, so revert to plain text
        else {
          return attrs.original;
        }
        break;
    }

    // convert all the children
    i = 1;

    // deal with the attribute node, if it exists
    if ( attrs ) {
      // if there are keys, skip over it
      for ( var key in jsonml[ 1 ] ) {
        i = 2;
      }
      // if there aren't, remove it
      if ( i === 1 ) {
        jsonml.splice( i, 1 );
      }
    }

    for ( ; i < jsonml.length; ++i ) {
      jsonml[ i ] = arguments.callee( jsonml[ i ], references, options );
    }

    return jsonml;
  }


  // merges adjacent text nodes into a single node
  function merge_text_nodes( jsonml ) {
    // skip the tag name and attribute hash
    var i = extract_attr( jsonml ) ? 2 : 1;

    while ( i < jsonml.length ) {
      // if it's a string check the next item too
      if ( typeof jsonml[ i ] === "string" ) {
        if ( i + 1 < jsonml.length && typeof jsonml[ i + 1 ] === "string" ) {
          // merge the second string into the first and remove it
          jsonml[ i ] += jsonml.splice( i + 1, 1 )[ 0 ];
        }
        else {
          ++i;
        }
      }
      // if it's not a string recurse
      else {
        arguments.callee( jsonml[ i ] );
        ++i;
      }
    }
  }

  } )( (function() {
    if ( typeof exports === "undefined" ) {
      window.markdown = {};
      return window.markdown;
    }
    else {
      return exports;
    }
  } )() );

  toMarkdown = function(string) {
    
    var ELEMENTS = [
      {
        patterns: 'p',
        replacement: function(str, attrs, innerHTML) {
          return innerHTML ? '\n\n' + innerHTML + '\n' : '';
        }
      },
      {
        patterns: 'br',
        type: 'void',
        replacement: '\n'
      },
      {
        patterns: 'h([1-6])',
        replacement: function(str, hLevel, attrs, innerHTML) {
          var hPrefix = '';
          for(var i = 0; i < hLevel; i++) {
            hPrefix += '#';
          }
          return '\n\n' + hPrefix + ' ' + innerHTML + '\n';
        }
      },
      {
        patterns: 'hr',
        type: 'void',
        replacement: '\n\n* * *\n'
      },
      {
        patterns: 'a',
        replacement: function(str, attrs, innerHTML) {
          var href = attrs.match(attrRegExp('href')),
              title = attrs.match(attrRegExp('title'));
          return href ? '[' + innerHTML + ']' + '(' + href[1] + (title && title[1] ? ' "' + title[1] + '"' : '') + ')' : str;
        }
      },
      {
        patterns: ['b', 'strong'],
        replacement: function(str, attrs, innerHTML) {
          return innerHTML ? '**' + innerHTML + '**' : '';
        }
      },
      {
        patterns: ['i', 'em'],
        replacement: function(str, attrs, innerHTML) {
          return innerHTML ? '_' + innerHTML + '_' : '';
        }
      },
      {
        patterns: 'code',
        replacement: function(str, attrs, innerHTML) {
          return innerHTML ? '`' + innerHTML + '`' : '';
        }
      },
      {
        patterns: 'img',
        type: 'void',
        replacement: function(str, attrs, innerHTML) {
          var src = attrs.match(attrRegExp('src')),
              alt = attrs.match(attrRegExp('alt')),
              title = attrs.match(attrRegExp('title'));
          return '![' + (alt && alt[1] ? alt[1] : '') + ']' + '(' + src[1] + (title && title[1] ? ' "' + title[1] + '"' : '') + ')';
        }
      }
    ];
    
    for(var i = 0, len = ELEMENTS.length; i < len; i++) {
      if(typeof ELEMENTS[i].patterns === 'string') {
        string = replaceEls(string, { tag: ELEMENTS[i].patterns, replacement: ELEMENTS[i].replacement, type: ELEMENTS[i].type });
      }
      else {
        for(var j = 0, pLen = ELEMENTS[i].patterns.length; j < pLen; j++) {
          string = replaceEls(string, { tag: ELEMENTS[i].patterns[j], replacement: ELEMENTS[i].replacement, type: ELEMENTS[i].type });
        }
      }
    }
    
    function replaceEls(html, elProperties) {
      var pattern = elProperties.type === 'void' ? '<' + elProperties.tag + '\\b([^>]*)\\/?>' : '<' + elProperties.tag + '\\b([^>]*)>([\\s\\S]*?)<\\/' + elProperties.tag + '>',
          regex = new RegExp(pattern, 'gi'),
          markdown = '';
      if(typeof elProperties.replacement === 'string') {
        markdown = html.replace(regex, elProperties.replacement);
      }
      else {
        markdown = html.replace(regex, function(str, p1, p2, p3) {
          return elProperties.replacement.call(this, str, p1, p2, p3);
        });
      }
      return markdown;
    }
    
    function attrRegExp(attr) {
      return new RegExp(attr + '\\s*=\\s*["\']?([^"\']*)["\']?', 'i');
    }
    
    // Pre code blocks
    
    string = string.replace(/<pre\b[^>]*>`([\s\S]*)`<\/pre>/gi, function(str, innerHTML) {
      innerHTML = innerHTML.replace(/^\t+/g, ' '); // convert tabs to spaces (you know it makes sense)
      innerHTML = innerHTML.replace(/\n/g, '\n ');
      return '\n\n ' + innerHTML + '\n';
    });
    
    // Lists

    // Escape numbers that could trigger an ol
    // If there are more than three spaces before the code, it would be in a pre tag
    // Make sure we are escaping the period not matching any character
    string = string.replace(/^(\s{0,3}\d+)\. /g, '$1\\. ');
    
    // Converts lists that have no child lists (of same type) first, then works it's way up
    var noChildrenRegex = /<(ul|ol)\b[^>]*>(?:(?!<ul|<ol)[\s\S])*?<\/\1>/gi;
    while(string.match(noChildrenRegex)) {
      string = string.replace(noChildrenRegex, function(str) {
        return replaceLists(str);
      });
    }
    
    function replaceLists(html) {
      
      html = html.replace(/<(ul|ol)\b[^>]*>([\s\S]*?)<\/\1>/gi, function(str, listType, innerHTML) {
        var lis = innerHTML.split('</li>');
        lis.splice(lis.length - 1, 1);
        
        for(i = 0, len = lis.length; i < len; i++) {
          if(lis[i]) {
            var prefix = (listType === 'ol') ? (i + 1) + ". " : "* ";
            lis[i] = lis[i].replace(/\s*<li[^>]*>([\s\S]*)/i, function(str, innerHTML) {
              
              innerHTML = innerHTML.replace(/^\s+/, '');
              innerHTML = innerHTML.replace(/\n\n/g, '\n\n ');
              // indent nested lists
              innerHTML = innerHTML.replace(/\n([ ]*)+(\*|\d+\.) /g, '\n$1 $2 ');
              return prefix + innerHTML;
            });
          }
        }
        return lis.join('\n');
      });
      return '\n\n' + html.replace(/[ \t]+\n|\s+$/g, '');
    }
    
    // Blockquotes
    var deepest = /<blockquote\b[^>]*>((?:(?!<blockquote)[\s\S])*?)<\/blockquote>/gi;
    while(string.match(deepest)) {
      string = string.replace(deepest, function(str) {
        return replaceBlockquotes(str);
      });
    }
    
    function replaceBlockquotes(html) {
      html = html.replace(/<blockquote\b[^>]*>([\s\S]*?)<\/blockquote>/gi, function(str, inner) {
        inner = inner.replace(/^\s+|\s+$/g, '');
        inner = cleanUp(inner);
        inner = inner.replace(/^/gm, '> ');
        inner = inner.replace(/^(>([ \t]{2,}>)+)/gm, '> >');
        return inner;
      });
      return html;
    }
    
    function cleanUp(string) {
      string = string.replace(/^[\t\r\n]+|[\t\r\n]+$/g, ''); // trim leading/trailing whitespace
      string = string.replace(/\n\s+\n/g, '\n\n');
      string = string.replace(/\n{3,}/g, '\n\n'); // limit consecutive linebreaks to 2
      return string;
    }
    
    return cleanUp(string);
  };

  if (typeof exports === 'object') {
    exports.toMarkdown = toMarkdown;
  }

  var $ = Juvia.$ = window.jQuery.noConflict(true);
  
  Juvia.juvia_jquery = $;
  
  Juvia.set_cookie = function(the_cookie, the_value, options){
    $.cookie(the_cookie, the_value, options);
  }
  
  Juvia.get_cookie = function(the_cookie){
    return $.cookie(the_cookie);
  }
  
  Juvia.remove_cookie = function(the_cookie){
    $.removeCookie(the_cookie);
    $.removeCookie(the_cookie, { path: '/' });
  }


	
	if (Date.now) {
		Juvia.now = Date.now;
	} else {
		Juvia.now = function() {
			return new Date().getTime();
		}
	}
	
	/********* Initialization *********/
	
	if (!('_juviaRequestCounter' in window)) {
		window._juviaRequestCounter = 0;
	}
	
	// Checks whether browser supports Cross-Origin Resource Sharing.
	if (!('supportsCors' in Juvia)) {
		if (window.XMLHttpRequest) {
			var xhr = new XMLHttpRequest();
			Juvia.supportsCors = 'withCredentials' in xhr;
		} else {
			Juvia.supportsCors = false;
		}
	}	
	
	for (var name in Juvia) {
		if (name != '$' && typeof(Juvia[name]) == 'function') {
			Juvia[name] = $.proxy(Juvia[name], Juvia);
		}
	}
})(Juvia);




	


