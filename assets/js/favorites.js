/*!
    localForage -- Offline Storage, Improved
    Version 1.7.3
    https://localforage.github.io/localForage
    (c) 2013-2017 Mozilla, Apache License 2.0
*/
!function(a){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=a();else if("function"==typeof define&&define.amd)define([],a);else{var b;b="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,b.localforage=a()}}(function(){return function a(b,c,d){function e(g,h){if(!c[g]){if(!b[g]){var i="function"==typeof require&&require;if(!h&&i)return i(g,!0);if(f)return f(g,!0);var j=new Error("Cannot find module '"+g+"'");throw j.code="MODULE_NOT_FOUND",j}var k=c[g]={exports:{}};b[g][0].call(k.exports,function(a){var c=b[g][1][a];return e(c||a)},k,k.exports,a,b,c,d)}return c[g].exports}for(var f="function"==typeof require&&require,g=0;g<d.length;g++)e(d[g]);return e}({1:[function(a,b,c){(function(a){"use strict";function c(){k=!0;for(var a,b,c=l.length;c;){for(b=l,l=[],a=-1;++a<c;)b[a]();c=l.length}k=!1}function d(a){1!==l.push(a)||k||e()}var e,f=a.MutationObserver||a.WebKitMutationObserver;if(f){var g=0,h=new f(c),i=a.document.createTextNode("");h.observe(i,{characterData:!0}),e=function(){i.data=g=++g%2}}else if(a.setImmediate||void 0===a.MessageChannel)e="document"in a&&"onreadystatechange"in a.document.createElement("script")?function(){var b=a.document.createElement("script");b.onreadystatechange=function(){c(),b.onreadystatechange=null,b.parentNode.removeChild(b),b=null},a.document.documentElement.appendChild(b)}:function(){setTimeout(c,0)};else{var j=new a.MessageChannel;j.port1.onmessage=c,e=function(){j.port2.postMessage(0)}}var k,l=[];b.exports=d}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],2:[function(a,b,c){"use strict";function d(){}function e(a){if("function"!=typeof a)throw new TypeError("resolver must be a function");this.state=s,this.queue=[],this.outcome=void 0,a!==d&&i(this,a)}function f(a,b,c){this.promise=a,"function"==typeof b&&(this.onFulfilled=b,this.callFulfilled=this.otherCallFulfilled),"function"==typeof c&&(this.onRejected=c,this.callRejected=this.otherCallRejected)}function g(a,b,c){o(function(){var d;try{d=b(c)}catch(b){return p.reject(a,b)}d===a?p.reject(a,new TypeError("Cannot resolve promise with itself")):p.resolve(a,d)})}function h(a){var b=a&&a.then;if(a&&("object"==typeof a||"function"==typeof a)&&"function"==typeof b)return function(){b.apply(a,arguments)}}function i(a,b){function c(b){f||(f=!0,p.reject(a,b))}function d(b){f||(f=!0,p.resolve(a,b))}function e(){b(d,c)}var f=!1,g=j(e);"error"===g.status&&c(g.value)}function j(a,b){var c={};try{c.value=a(b),c.status="success"}catch(a){c.status="error",c.value=a}return c}function k(a){return a instanceof this?a:p.resolve(new this(d),a)}function l(a){var b=new this(d);return p.reject(b,a)}function m(a){function b(a,b){function d(a){g[b]=a,++h!==e||f||(f=!0,p.resolve(j,g))}c.resolve(a).then(d,function(a){f||(f=!0,p.reject(j,a))})}var c=this;if("[object Array]"!==Object.prototype.toString.call(a))return this.reject(new TypeError("must be an array"));var e=a.length,f=!1;if(!e)return this.resolve([]);for(var g=new Array(e),h=0,i=-1,j=new this(d);++i<e;)b(a[i],i);return j}function n(a){function b(a){c.resolve(a).then(function(a){f||(f=!0,p.resolve(h,a))},function(a){f||(f=!0,p.reject(h,a))})}var c=this;if("[object Array]"!==Object.prototype.toString.call(a))return this.reject(new TypeError("must be an array"));var e=a.length,f=!1;if(!e)return this.resolve([]);for(var g=-1,h=new this(d);++g<e;)b(a[g]);return h}var o=a(1),p={},q=["REJECTED"],r=["FULFILLED"],s=["PENDING"];b.exports=e,e.prototype.catch=function(a){return this.then(null,a)},e.prototype.then=function(a,b){if("function"!=typeof a&&this.state===r||"function"!=typeof b&&this.state===q)return this;var c=new this.constructor(d);if(this.state!==s){g(c,this.state===r?a:b,this.outcome)}else this.queue.push(new f(c,a,b));return c},f.prototype.callFulfilled=function(a){p.resolve(this.promise,a)},f.prototype.otherCallFulfilled=function(a){g(this.promise,this.onFulfilled,a)},f.prototype.callRejected=function(a){p.reject(this.promise,a)},f.prototype.otherCallRejected=function(a){g(this.promise,this.onRejected,a)},p.resolve=function(a,b){var c=j(h,b);if("error"===c.status)return p.reject(a,c.value);var d=c.value;if(d)i(a,d);else{a.state=r,a.outcome=b;for(var e=-1,f=a.queue.length;++e<f;)a.queue[e].callFulfilled(b)}return a},p.reject=function(a,b){a.state=q,a.outcome=b;for(var c=-1,d=a.queue.length;++c<d;)a.queue[c].callRejected(b);return a},e.resolve=k,e.reject=l,e.all=m,e.race=n},{1:1}],3:[function(a,b,c){(function(b){"use strict";"function"!=typeof b.Promise&&(b.Promise=a(2))}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{2:2}],4:[function(a,b,c){"use strict";function d(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function e(){try{if("undefined"!=typeof indexedDB)return indexedDB;if("undefined"!=typeof webkitIndexedDB)return webkitIndexedDB;if("undefined"!=typeof mozIndexedDB)return mozIndexedDB;if("undefined"!=typeof OIndexedDB)return OIndexedDB;if("undefined"!=typeof msIndexedDB)return msIndexedDB}catch(a){return}}function f(){try{if(!ua)return!1;var a="undefined"!=typeof openDatabase&&/(Safari|iPhone|iPad|iPod)/.test(navigator.userAgent)&&!/Chrome/.test(navigator.userAgent)&&!/BlackBerry/.test(navigator.platform),b="function"==typeof fetch&&-1!==fetch.toString().indexOf("[native code");return(!a||b)&&"undefined"!=typeof indexedDB&&"undefined"!=typeof IDBKeyRange}catch(a){return!1}}function g(a,b){a=a||[],b=b||{};try{return new Blob(a,b)}catch(f){if("TypeError"!==f.name)throw f;for(var c="undefined"!=typeof BlobBuilder?BlobBuilder:"undefined"!=typeof MSBlobBuilder?MSBlobBuilder:"undefined"!=typeof MozBlobBuilder?MozBlobBuilder:WebKitBlobBuilder,d=new c,e=0;e<a.length;e+=1)d.append(a[e]);return d.getBlob(b.type)}}function h(a,b){b&&a.then(function(a){b(null,a)},function(a){b(a)})}function i(a,b,c){"function"==typeof b&&a.then(b),"function"==typeof c&&a.catch(c)}function j(a){return"string"!=typeof a&&(console.warn(a+" used as a key, but it is not a string."),a=String(a)),a}function k(){if(arguments.length&&"function"==typeof arguments[arguments.length-1])return arguments[arguments.length-1]}function l(a){for(var b=a.length,c=new ArrayBuffer(b),d=new Uint8Array(c),e=0;e<b;e++)d[e]=a.charCodeAt(e);return c}function m(a){return new va(function(b){var c=a.transaction(wa,Ba),d=g([""]);c.objectStore(wa).put(d,"key"),c.onabort=function(a){a.preventDefault(),a.stopPropagation(),b(!1)},c.oncomplete=function(){var a=navigator.userAgent.match(/Chrome\/(\d+)/),c=navigator.userAgent.match(/Edge\//);b(c||!a||parseInt(a[1],10)>=43)}}).catch(function(){return!1})}function n(a){return"boolean"==typeof xa?va.resolve(xa):m(a).then(function(a){return xa=a})}function o(a){var b=ya[a.name],c={};c.promise=new va(function(a,b){c.resolve=a,c.reject=b}),b.deferredOperations.push(c),b.dbReady?b.dbReady=b.dbReady.then(function(){return c.promise}):b.dbReady=c.promise}function p(a){var b=ya[a.name],c=b.deferredOperations.pop();if(c)return c.resolve(),c.promise}function q(a,b){var c=ya[a.name],d=c.deferredOperations.pop();if(d)return d.reject(b),d.promise}function r(a,b){return new va(function(c,d){if(ya[a.name]=ya[a.name]||B(),a.db){if(!b)return c(a.db);o(a),a.db.close()}var e=[a.name];b&&e.push(a.version);var f=ua.open.apply(ua,e);b&&(f.onupgradeneeded=function(b){var c=f.result;try{c.createObjectStore(a.storeName),b.oldVersion<=1&&c.createObjectStore(wa)}catch(c){if("ConstraintError"!==c.name)throw c;console.warn('The database "'+a.name+'" has been upgraded from version '+b.oldVersion+" to version "+b.newVersion+', but the storage "'+a.storeName+'" already exists.')}}),f.onerror=function(a){a.preventDefault(),d(f.error)},f.onsuccess=function(){c(f.result),p(a)}})}function s(a){return r(a,!1)}function t(a){return r(a,!0)}function u(a,b){if(!a.db)return!0;var c=!a.db.objectStoreNames.contains(a.storeName),d=a.version<a.db.version,e=a.version>a.db.version;if(d&&(a.version!==b&&console.warn('The database "'+a.name+"\" can't be downgraded from version "+a.db.version+" to version "+a.version+"."),a.version=a.db.version),e||c){if(c){var f=a.db.version+1;f>a.version&&(a.version=f)}return!0}return!1}function v(a){return new va(function(b,c){var d=new FileReader;d.onerror=c,d.onloadend=function(c){var d=btoa(c.target.result||"");b({__local_forage_encoded_blob:!0,data:d,type:a.type})},d.readAsBinaryString(a)})}function w(a){return g([l(atob(a.data))],{type:a.type})}function x(a){return a&&a.__local_forage_encoded_blob}function y(a){var b=this,c=b._initReady().then(function(){var a=ya[b._dbInfo.name];if(a&&a.dbReady)return a.dbReady});return i(c,a,a),c}function z(a){o(a);for(var b=ya[a.name],c=b.forages,d=0;d<c.length;d++){var e=c[d];e._dbInfo.db&&(e._dbInfo.db.close(),e._dbInfo.db=null)}return a.db=null,s(a).then(function(b){return a.db=b,u(a)?t(a):b}).then(function(d){a.db=b.db=d;for(var e=0;e<c.length;e++)c[e]._dbInfo.db=d}).catch(function(b){throw q(a,b),b})}function A(a,b,c,d){void 0===d&&(d=1);try{var e=a.db.transaction(a.storeName,b);c(null,e)}catch(e){if(d>0&&(!a.db||"InvalidStateError"===e.name||"NotFoundError"===e.name))return va.resolve().then(function(){if(!a.db||"NotFoundError"===e.name&&!a.db.objectStoreNames.contains(a.storeName)&&a.version<=a.db.version)return a.db&&(a.version=a.db.version+1),t(a)}).then(function(){return z(a).then(function(){A(a,b,c,d-1)})}).catch(c);c(e)}}function B(){return{forages:[],db:null,dbReady:null,deferredOperations:[]}}function C(a){function b(){return va.resolve()}var c=this,d={db:null};if(a)for(var e in a)d[e]=a[e];var f=ya[d.name];f||(f=B(),ya[d.name]=f),f.forages.push(c),c._initReady||(c._initReady=c.ready,c.ready=y);for(var g=[],h=0;h<f.forages.length;h++){var i=f.forages[h];i!==c&&g.push(i._initReady().catch(b))}var j=f.forages.slice(0);return va.all(g).then(function(){return d.db=f.db,s(d)}).then(function(a){return d.db=a,u(d,c._defaultConfig.version)?t(d):a}).then(function(a){d.db=f.db=a,c._dbInfo=d;for(var b=0;b<j.length;b++){var e=j[b];e!==c&&(e._dbInfo.db=d.db,e._dbInfo.version=d.version)}})}function D(a,b){var c=this;a=j(a);var d=new va(function(b,d){c.ready().then(function(){A(c._dbInfo,Aa,function(e,f){if(e)return d(e);try{var g=f.objectStore(c._dbInfo.storeName),h=g.get(a);h.onsuccess=function(){var a=h.result;void 0===a&&(a=null),x(a)&&(a=w(a)),b(a)},h.onerror=function(){d(h.error)}}catch(a){d(a)}})}).catch(d)});return h(d,b),d}function E(a,b){var c=this,d=new va(function(b,d){c.ready().then(function(){A(c._dbInfo,Aa,function(e,f){if(e)return d(e);try{var g=f.objectStore(c._dbInfo.storeName),h=g.openCursor(),i=1;h.onsuccess=function(){var c=h.result;if(c){var d=c.value;x(d)&&(d=w(d));var e=a(d,c.key,i++);void 0!==e?b(e):c.continue()}else b()},h.onerror=function(){d(h.error)}}catch(a){d(a)}})}).catch(d)});return h(d,b),d}function F(a,b,c){var d=this;a=j(a);var e=new va(function(c,e){var f;d.ready().then(function(){return f=d._dbInfo,"[object Blob]"===za.call(b)?n(f.db).then(function(a){return a?b:v(b)}):b}).then(function(b){A(d._dbInfo,Ba,function(f,g){if(f)return e(f);try{var h=g.objectStore(d._dbInfo.storeName);null===b&&(b=void 0);var i=h.put(b,a);g.oncomplete=function(){void 0===b&&(b=null),c(b)},g.onabort=g.onerror=function(){var a=i.error?i.error:i.transaction.error;e(a)}}catch(a){e(a)}})}).catch(e)});return h(e,c),e}function G(a,b){var c=this;a=j(a);var d=new va(function(b,d){c.ready().then(function(){A(c._dbInfo,Ba,function(e,f){if(e)return d(e);try{var g=f.objectStore(c._dbInfo.storeName),h=g.delete(a);f.oncomplete=function(){b()},f.onerror=function(){d(h.error)},f.onabort=function(){var a=h.error?h.error:h.transaction.error;d(a)}}catch(a){d(a)}})}).catch(d)});return h(d,b),d}function H(a){var b=this,c=new va(function(a,c){b.ready().then(function(){A(b._dbInfo,Ba,function(d,e){if(d)return c(d);try{var f=e.objectStore(b._dbInfo.storeName),g=f.clear();e.oncomplete=function(){a()},e.onabort=e.onerror=function(){var a=g.error?g.error:g.transaction.error;c(a)}}catch(a){c(a)}})}).catch(c)});return h(c,a),c}function I(a){var b=this,c=new va(function(a,c){b.ready().then(function(){A(b._dbInfo,Aa,function(d,e){if(d)return c(d);try{var f=e.objectStore(b._dbInfo.storeName),g=f.count();g.onsuccess=function(){a(g.result)},g.onerror=function(){c(g.error)}}catch(a){c(a)}})}).catch(c)});return h(c,a),c}function J(a,b){var c=this,d=new va(function(b,d){if(a<0)return void b(null);c.ready().then(function(){A(c._dbInfo,Aa,function(e,f){if(e)return d(e);try{var g=f.objectStore(c._dbInfo.storeName),h=!1,i=g.openCursor();i.onsuccess=function(){var c=i.result;if(!c)return void b(null);0===a?b(c.key):h?b(c.key):(h=!0,c.advance(a))},i.onerror=function(){d(i.error)}}catch(a){d(a)}})}).catch(d)});return h(d,b),d}function K(a){var b=this,c=new va(function(a,c){b.ready().then(function(){A(b._dbInfo,Aa,function(d,e){if(d)return c(d);try{var f=e.objectStore(b._dbInfo.storeName),g=f.openCursor(),h=[];g.onsuccess=function(){var b=g.result;if(!b)return void a(h);h.push(b.key),b.continue()},g.onerror=function(){c(g.error)}}catch(a){c(a)}})}).catch(c)});return h(c,a),c}function L(a,b){b=k.apply(this,arguments);var c=this.config();a="function"!=typeof a&&a||{},a.name||(a.name=a.name||c.name,a.storeName=a.storeName||c.storeName);var d,e=this;if(a.name){var f=a.name===c.name&&e._dbInfo.db,g=f?va.resolve(e._dbInfo.db):s(a).then(function(b){var c=ya[a.name],d=c.forages;c.db=b;for(var e=0;e<d.length;e++)d[e]._dbInfo.db=b;return b});d=a.storeName?g.then(function(b){if(b.objectStoreNames.contains(a.storeName)){var c=b.version+1;o(a);var d=ya[a.name],e=d.forages;b.close();for(var f=0;f<e.length;f++){var g=e[f];g._dbInfo.db=null,g._dbInfo.version=c}return new va(function(b,d){var e=ua.open(a.name,c);e.onerror=function(a){e.result.close(),d(a)},e.onupgradeneeded=function(){e.result.deleteObjectStore(a.storeName)},e.onsuccess=function(){var a=e.result;a.close(),b(a)}}).then(function(a){d.db=a;for(var b=0;b<e.length;b++){var c=e[b];c._dbInfo.db=a,p(c._dbInfo)}}).catch(function(b){throw(q(a,b)||va.resolve()).catch(function(){}),b})}}):g.then(function(b){o(a);var c=ya[a.name],d=c.forages;b.close();for(var e=0;e<d.length;e++){d[e]._dbInfo.db=null}return new va(function(b,c){var d=ua.deleteDatabase(a.name);d.onerror=d.onblocked=function(a){var b=d.result;b&&b.close(),c(a)},d.onsuccess=function(){var a=d.result;a&&a.close(),b(a)}}).then(function(a){c.db=a;for(var b=0;b<d.length;b++)p(d[b]._dbInfo)}).catch(function(b){throw(q(a,b)||va.resolve()).catch(function(){}),b})})}else d=va.reject("Invalid arguments");return h(d,b),d}function M(){return"function"==typeof openDatabase}function N(a){var b,c,d,e,f,g=.75*a.length,h=a.length,i=0;"="===a[a.length-1]&&(g--,"="===a[a.length-2]&&g--);var j=new ArrayBuffer(g),k=new Uint8Array(j);for(b=0;b<h;b+=4)c=Da.indexOf(a[b]),d=Da.indexOf(a[b+1]),e=Da.indexOf(a[b+2]),f=Da.indexOf(a[b+3]),k[i++]=c<<2|d>>4,k[i++]=(15&d)<<4|e>>2,k[i++]=(3&e)<<6|63&f;return j}function O(a){var b,c=new Uint8Array(a),d="";for(b=0;b<c.length;b+=3)d+=Da[c[b]>>2],d+=Da[(3&c[b])<<4|c[b+1]>>4],d+=Da[(15&c[b+1])<<2|c[b+2]>>6],d+=Da[63&c[b+2]];return c.length%3==2?d=d.substring(0,d.length-1)+"=":c.length%3==1&&(d=d.substring(0,d.length-2)+"=="),d}function P(a,b){var c="";if(a&&(c=Ua.call(a)),a&&("[object ArrayBuffer]"===c||a.buffer&&"[object ArrayBuffer]"===Ua.call(a.buffer))){var d,e=Ga;a instanceof ArrayBuffer?(d=a,e+=Ia):(d=a.buffer,"[object Int8Array]"===c?e+=Ka:"[object Uint8Array]"===c?e+=La:"[object Uint8ClampedArray]"===c?e+=Ma:"[object Int16Array]"===c?e+=Na:"[object Uint16Array]"===c?e+=Pa:"[object Int32Array]"===c?e+=Oa:"[object Uint32Array]"===c?e+=Qa:"[object Float32Array]"===c?e+=Ra:"[object Float64Array]"===c?e+=Sa:b(new Error("Failed to get type for BinaryArray"))),b(e+O(d))}else if("[object Blob]"===c){var f=new FileReader;f.onload=function(){var c=Ea+a.type+"~"+O(this.result);b(Ga+Ja+c)},f.readAsArrayBuffer(a)}else try{b(JSON.stringify(a))}catch(c){console.error("Couldn't convert value into a JSON string: ",a),b(null,c)}}function Q(a){if(a.substring(0,Ha)!==Ga)return JSON.parse(a);var b,c=a.substring(Ta),d=a.substring(Ha,Ta);if(d===Ja&&Fa.test(c)){var e=c.match(Fa);b=e[1],c=c.substring(e[0].length)}var f=N(c);switch(d){case Ia:return f;case Ja:return g([f],{type:b});case Ka:return new Int8Array(f);case La:return new Uint8Array(f);case Ma:return new Uint8ClampedArray(f);case Na:return new Int16Array(f);case Pa:return new Uint16Array(f);case Oa:return new Int32Array(f);case Qa:return new Uint32Array(f);case Ra:return new Float32Array(f);case Sa:return new Float64Array(f);default:throw new Error("Unkown type: "+d)}}function R(a,b,c,d){a.executeSql("CREATE TABLE IF NOT EXISTS "+b.storeName+" (id INTEGER PRIMARY KEY, key unique, value)",[],c,d)}function S(a){var b=this,c={db:null};if(a)for(var d in a)c[d]="string"!=typeof a[d]?a[d].toString():a[d];var e=new va(function(a,d){try{c.db=openDatabase(c.name,String(c.version),c.description,c.size)}catch(a){return d(a)}c.db.transaction(function(e){R(e,c,function(){b._dbInfo=c,a()},function(a,b){d(b)})},d)});return c.serializer=Va,e}function T(a,b,c,d,e,f){a.executeSql(c,d,e,function(a,g){g.code===g.SYNTAX_ERR?a.executeSql("SELECT name FROM sqlite_master WHERE type='table' AND name = ?",[b.storeName],function(a,h){h.rows.length?f(a,g):R(a,b,function(){a.executeSql(c,d,e,f)},f)},f):f(a,g)},f)}function U(a,b){var c=this;a=j(a);var d=new va(function(b,d){c.ready().then(function(){var e=c._dbInfo;e.db.transaction(function(c){T(c,e,"SELECT * FROM "+e.storeName+" WHERE key = ? LIMIT 1",[a],function(a,c){var d=c.rows.length?c.rows.item(0).value:null;d&&(d=e.serializer.deserialize(d)),b(d)},function(a,b){d(b)})})}).catch(d)});return h(d,b),d}function V(a,b){var c=this,d=new va(function(b,d){c.ready().then(function(){var e=c._dbInfo;e.db.transaction(function(c){T(c,e,"SELECT * FROM "+e.storeName,[],function(c,d){for(var f=d.rows,g=f.length,h=0;h<g;h++){var i=f.item(h),j=i.value;if(j&&(j=e.serializer.deserialize(j)),void 0!==(j=a(j,i.key,h+1)))return void b(j)}b()},function(a,b){d(b)})})}).catch(d)});return h(d,b),d}function W(a,b,c,d){var e=this;a=j(a);var f=new va(function(f,g){e.ready().then(function(){void 0===b&&(b=null);var h=b,i=e._dbInfo;i.serializer.serialize(b,function(b,j){j?g(j):i.db.transaction(function(c){T(c,i,"INSERT OR REPLACE INTO "+i.storeName+" (key, value) VALUES (?, ?)",[a,b],function(){f(h)},function(a,b){g(b)})},function(b){if(b.code===b.QUOTA_ERR){if(d>0)return void f(W.apply(e,[a,h,c,d-1]));g(b)}})})}).catch(g)});return h(f,c),f}function X(a,b,c){return W.apply(this,[a,b,c,1])}function Y(a,b){var c=this;a=j(a);var d=new va(function(b,d){c.ready().then(function(){var e=c._dbInfo;e.db.transaction(function(c){T(c,e,"DELETE FROM "+e.storeName+" WHERE key = ?",[a],function(){b()},function(a,b){d(b)})})}).catch(d)});return h(d,b),d}function Z(a){var b=this,c=new va(function(a,c){b.ready().then(function(){var d=b._dbInfo;d.db.transaction(function(b){T(b,d,"DELETE FROM "+d.storeName,[],function(){a()},function(a,b){c(b)})})}).catch(c)});return h(c,a),c}function $(a){var b=this,c=new va(function(a,c){b.ready().then(function(){var d=b._dbInfo;d.db.transaction(function(b){T(b,d,"SELECT COUNT(key) as c FROM "+d.storeName,[],function(b,c){var d=c.rows.item(0).c;a(d)},function(a,b){c(b)})})}).catch(c)});return h(c,a),c}function _(a,b){var c=this,d=new va(function(b,d){c.ready().then(function(){var e=c._dbInfo;e.db.transaction(function(c){T(c,e,"SELECT key FROM "+e.storeName+" WHERE id = ? LIMIT 1",[a+1],function(a,c){var d=c.rows.length?c.rows.item(0).key:null;b(d)},function(a,b){d(b)})})}).catch(d)});return h(d,b),d}function aa(a){var b=this,c=new va(function(a,c){b.ready().then(function(){var d=b._dbInfo;d.db.transaction(function(b){T(b,d,"SELECT key FROM "+d.storeName,[],function(b,c){for(var d=[],e=0;e<c.rows.length;e++)d.push(c.rows.item(e).key);a(d)},function(a,b){c(b)})})}).catch(c)});return h(c,a),c}function ba(a){return new va(function(b,c){a.transaction(function(d){d.executeSql("SELECT name FROM sqlite_master WHERE type='table' AND name <> '__WebKitDatabaseInfoTable__'",[],function(c,d){for(var e=[],f=0;f<d.rows.length;f++)e.push(d.rows.item(f).name);b({db:a,storeNames:e})},function(a,b){c(b)})},function(a){c(a)})})}function ca(a,b){b=k.apply(this,arguments);var c=this.config();a="function"!=typeof a&&a||{},a.name||(a.name=a.name||c.name,a.storeName=a.storeName||c.storeName);var d,e=this;return d=a.name?new va(function(b){var d;d=a.name===c.name?e._dbInfo.db:openDatabase(a.name,"","",0),b(a.storeName?{db:d,storeNames:[a.storeName]}:ba(d))}).then(function(a){return new va(function(b,c){a.db.transaction(function(d){function e(a){return new va(function(b,c){d.executeSql("DROP TABLE IF EXISTS "+a,[],function(){b()},function(a,b){c(b)})})}for(var f=[],g=0,h=a.storeNames.length;g<h;g++)f.push(e(a.storeNames[g]));va.all(f).then(function(){b()}).catch(function(a){c(a)})},function(a){c(a)})})}):va.reject("Invalid arguments"),h(d,b),d}function da(){try{return"undefined"!=typeof localStorage&&"setItem"in localStorage&&!!localStorage.setItem}catch(a){return!1}}function ea(a,b){var c=a.name+"/";return a.storeName!==b.storeName&&(c+=a.storeName+"/"),c}function fa(){var a="_localforage_support_test";try{return localStorage.setItem(a,!0),localStorage.removeItem(a),!1}catch(a){return!0}}function ga(){return!fa()||localStorage.length>0}function ha(a){var b=this,c={};if(a)for(var d in a)c[d]=a[d];return c.keyPrefix=ea(a,b._defaultConfig),ga()?(b._dbInfo=c,c.serializer=Va,va.resolve()):va.reject()}function ia(a){var b=this,c=b.ready().then(function(){for(var a=b._dbInfo.keyPrefix,c=localStorage.length-1;c>=0;c--){var d=localStorage.key(c);0===d.indexOf(a)&&localStorage.removeItem(d)}});return h(c,a),c}function ja(a,b){var c=this;a=j(a);var d=c.ready().then(function(){var b=c._dbInfo,d=localStorage.getItem(b.keyPrefix+a);return d&&(d=b.serializer.deserialize(d)),d});return h(d,b),d}function ka(a,b){var c=this,d=c.ready().then(function(){for(var b=c._dbInfo,d=b.keyPrefix,e=d.length,f=localStorage.length,g=1,h=0;h<f;h++){var i=localStorage.key(h);if(0===i.indexOf(d)){var j=localStorage.getItem(i);if(j&&(j=b.serializer.deserialize(j)),void 0!==(j=a(j,i.substring(e),g++)))return j}}});return h(d,b),d}function la(a,b){var c=this,d=c.ready().then(function(){var b,d=c._dbInfo;try{b=localStorage.key(a)}catch(a){b=null}return b&&(b=b.substring(d.keyPrefix.length)),b});return h(d,b),d}function ma(a){var b=this,c=b.ready().then(function(){for(var a=b._dbInfo,c=localStorage.length,d=[],e=0;e<c;e++){var f=localStorage.key(e);0===f.indexOf(a.keyPrefix)&&d.push(f.substring(a.keyPrefix.length))}return d});return h(c,a),c}function na(a){var b=this,c=b.keys().then(function(a){return a.length});return h(c,a),c}function oa(a,b){var c=this;a=j(a);var d=c.ready().then(function(){var b=c._dbInfo;localStorage.removeItem(b.keyPrefix+a)});return h(d,b),d}function pa(a,b,c){var d=this;a=j(a);var e=d.ready().then(function(){void 0===b&&(b=null);var c=b;return new va(function(e,f){var g=d._dbInfo;g.serializer.serialize(b,function(b,d){if(d)f(d);else try{localStorage.setItem(g.keyPrefix+a,b),e(c)}catch(a){"QuotaExceededError"!==a.name&&"NS_ERROR_DOM_QUOTA_REACHED"!==a.name||f(a),f(a)}})})});return h(e,c),e}function qa(a,b){if(b=k.apply(this,arguments),a="function"!=typeof a&&a||{},!a.name){var c=this.config();a.name=a.name||c.name,a.storeName=a.storeName||c.storeName}var d,e=this;return d=a.name?new va(function(b){b(a.storeName?ea(a,e._defaultConfig):a.name+"/")}).then(function(a){for(var b=localStorage.length-1;b>=0;b--){var c=localStorage.key(b);0===c.indexOf(a)&&localStorage.removeItem(c)}}):va.reject("Invalid arguments"),h(d,b),d}function ra(a,b){a[b]=function(){var c=arguments;return a.ready().then(function(){return a[b].apply(a,c)})}}function sa(){for(var a=1;a<arguments.length;a++){var b=arguments[a];if(b)for(var c in b)b.hasOwnProperty(c)&&($a(b[c])?arguments[0][c]=b[c].slice():arguments[0][c]=b[c])}return arguments[0]}var ta="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(a){return typeof a}:function(a){return a&&"function"==typeof Symbol&&a.constructor===Symbol&&a!==Symbol.prototype?"symbol":typeof a},ua=e();"undefined"==typeof Promise&&a(3);var va=Promise,wa="local-forage-detect-blob-support",xa=void 0,ya={},za=Object.prototype.toString,Aa="readonly",Ba="readwrite",Ca={_driver:"asyncStorage",_initStorage:C,_support:f(),iterate:E,getItem:D,setItem:F,removeItem:G,clear:H,length:I,key:J,keys:K,dropInstance:L},Da="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",Ea="~~local_forage_type~",Fa=/^~~local_forage_type~([^~]+)~/,Ga="__lfsc__:",Ha=Ga.length,Ia="arbf",Ja="blob",Ka="si08",La="ui08",Ma="uic8",Na="si16",Oa="si32",Pa="ur16",Qa="ui32",Ra="fl32",Sa="fl64",Ta=Ha+Ia.length,Ua=Object.prototype.toString,Va={serialize:P,deserialize:Q,stringToBuffer:N,bufferToString:O},Wa={_driver:"webSQLStorage",_initStorage:S,_support:M(),iterate:V,getItem:U,setItem:X,removeItem:Y,clear:Z,length:$,key:_,keys:aa,dropInstance:ca},Xa={_driver:"localStorageWrapper",_initStorage:ha,_support:da(),iterate:ka,getItem:ja,setItem:pa,removeItem:oa,clear:ia,length:na,key:la,keys:ma,dropInstance:qa},Ya=function(a,b){return a===b||"number"==typeof a&&"number"==typeof b&&isNaN(a)&&isNaN(b)},Za=function(a,b){for(var c=a.length,d=0;d<c;){if(Ya(a[d],b))return!0;d++}return!1},$a=Array.isArray||function(a){return"[object Array]"===Object.prototype.toString.call(a)},_a={},ab={},bb={INDEXEDDB:Ca,WEBSQL:Wa,LOCALSTORAGE:Xa},cb=[bb.INDEXEDDB._driver,bb.WEBSQL._driver,bb.LOCALSTORAGE._driver],db=["dropInstance"],eb=["clear","getItem","iterate","key","keys","length","removeItem","setItem"].concat(db),fb={description:"",driver:cb.slice(),name:"localforage",size:4980736,storeName:"keyvaluepairs",version:1},gb=function(){function a(b){d(this,a);for(var c in bb)if(bb.hasOwnProperty(c)){var e=bb[c],f=e._driver;this[c]=f,_a[f]||this.defineDriver(e)}this._defaultConfig=sa({},fb),this._config=sa({},this._defaultConfig,b),this._driverSet=null,this._initDriver=null,this._ready=!1,this._dbInfo=null,this._wrapLibraryMethodsWithReady(),this.setDriver(this._config.driver).catch(function(){})}return a.prototype.config=function(a){if("object"===(void 0===a?"undefined":ta(a))){if(this._ready)return new Error("Can't call config() after localforage has been used.");for(var b in a){if("storeName"===b&&(a[b]=a[b].replace(/\W/g,"_")),"version"===b&&"number"!=typeof a[b])return new Error("Database version must be a number.");this._config[b]=a[b]}return!("driver"in a&&a.driver)||this.setDriver(this._config.driver)}return"string"==typeof a?this._config[a]:this._config},a.prototype.defineDriver=function(a,b,c){var d=new va(function(b,c){try{var d=a._driver,e=new Error("Custom driver not compliant; see https://mozilla.github.io/localForage/#definedriver");if(!a._driver)return void c(e);for(var f=eb.concat("_initStorage"),g=0,i=f.length;g<i;g++){var j=f[g];if((!Za(db,j)||a[j])&&"function"!=typeof a[j])return void c(e)}(function(){for(var b=function(a){return function(){var b=new Error("Method "+a+" is not implemented by the current driver"),c=va.reject(b);return h(c,arguments[arguments.length-1]),c}},c=0,d=db.length;c<d;c++){var e=db[c];a[e]||(a[e]=b(e))}})();var k=function(c){_a[d]&&console.info("Redefining LocalForage driver: "+d),_a[d]=a,ab[d]=c,b()};"_support"in a?a._support&&"function"==typeof a._support?a._support().then(k,c):k(!!a._support):k(!0)}catch(a){c(a)}});return i(d,b,c),d},a.prototype.driver=function(){return this._driver||null},a.prototype.getDriver=function(a,b,c){var d=_a[a]?va.resolve(_a[a]):va.reject(new Error("Driver not found."));return i(d,b,c),d},a.prototype.getSerializer=function(a){var b=va.resolve(Va);return i(b,a),b},a.prototype.ready=function(a){var b=this,c=b._driverSet.then(function(){return null===b._ready&&(b._ready=b._initDriver()),b._ready});return i(c,a,a),c},a.prototype.setDriver=function(a,b,c){function d(){g._config.driver=g.driver()}function e(a){return g._extend(a),d(),g._ready=g._initStorage(g._config),g._ready}function f(a){return function(){function b(){for(;c<a.length;){var f=a[c];return c++,g._dbInfo=null,g._ready=null,g.getDriver(f).then(e).catch(b)}d();var h=new Error("No available storage method found.");return g._driverSet=va.reject(h),g._driverSet}var c=0;return b()}}var g=this;$a(a)||(a=[a]);var h=this._getSupportedDrivers(a),j=null!==this._driverSet?this._driverSet.catch(function(){return va.resolve()}):va.resolve();return this._driverSet=j.then(function(){var a=h[0];return g._dbInfo=null,g._ready=null,g.getDriver(a).then(function(a){g._driver=a._driver,d(),g._wrapLibraryMethodsWithReady(),g._initDriver=f(h)})}).catch(function(){d();var a=new Error("No available storage method found.");return g._driverSet=va.reject(a),g._driverSet}),i(this._driverSet,b,c),this._driverSet},a.prototype.supports=function(a){return!!ab[a]},a.prototype._extend=function(a){sa(this,a)},a.prototype._getSupportedDrivers=function(a){for(var b=[],c=0,d=a.length;c<d;c++){var e=a[c];this.supports(e)&&b.push(e)}return b},a.prototype._wrapLibraryMethodsWithReady=function(){for(var a=0,b=eb.length;a<b;a++)ra(this,eb[a])},a.prototype.createInstance=function(b){return new a(b)},a}(),hb=new gb;b.exports=hb},{3:3}]},{},[4])(4)});
/**
* Utility Methods
*/
var Favorites = Favorites || {};

Favorites.Utilities = function()
{
	var plugin = this;
	var $ = jQuery;

	/*
	* Check if an item is favorited
	* @param int post_id
	* @param object favorites for a specific site
	*/
	plugin.isFavorite = function(post_id, site_favorites)
	{
		var status = false;

		$.each(site_favorites, function(i, v) {

			if ( v && v.hasOwnProperty( 'post_id' ) && parseInt( v.post_id ) === parseInt( post_id ) ) {
				status = true;
			}

		});
		return status;
	}

	/**
	* Get the length of an
	*/
	plugin.objectLength = function(object)
	{
		var size = 0, key;
		for (key in object) {
			if (object.hasOwnProperty(key)) size++;
		}
		return size;
	}

	/*
	* Get Site index from All Favorites
	*/
	plugin.siteIndex = function(siteid, favs)
	{
			for ( var i = 0; i < favs.length; i++ ){
				if ( parseInt( favs[i].site_id ) !== parseInt(siteid) ) continue;
				return i;
			}

	}

	/*
	* Get a specific thumbnail size
	*/
	plugin.getThumbnail = function(favorite, size)
	{
		var thumbnails = favorite.thumbnails;
		if ( typeof thumbnails === 'undefined' || thumbnails.length == 0 ) return false;
		var thumbnail_url = thumbnails[size];
		if ( typeof thumbnail_url === 'undefined' ) return false;
		if ( !thumbnail_url ) return false;
		return thumbnail_url;
	}
}
/**
* Formatting functionality
*/
var Favorites = Favorites || {};

Favorites.Formatter = function()
{
	var plugin = this;
	var $ = jQuery;

	/*
	*  Add Favorite Count to a button
	*/
	plugin.addFavoriteCount = function(html, count)
	{
		if ( !Favorites.jsData.button_options.include_count ) return html;
		if ( count <= 0 ) count = 0;
		html += ' <span class="simplefavorite-button-count">' + count + '</span>';
		return html;
	}

	/**
	* Decrement all counts by one
	*/
	plugin.decrementAllCounts = function(){
		var buttons = $('.simplefavorite-button.active.has-count');
		for ( var i = 0; i < buttons.length; i++ ){
			var button = $(buttons)[i];
			var count_display = $(button).find('.simplefavorite-button-count');
			var new_count = $(count_display).text() - 1;
			$(button).attr('data-favoritecount', new_count);
		}
	}
}
/**
* Builds the favorite button html
*/
var Favorites = Favorites || {};

Favorites.ButtonOptionsFormatter = function()
{
	var plugin = this;
	var $ = jQuery;

	plugin.options = Favorites.jsData.button_options;
	plugin.formatter = new Favorites.Formatter;

	/**
	* Format the button according to plugin options
	*/
	plugin.format = function(button, isFavorite)
	{
		if ( plugin.options.custom_colors ) plugin.colors(button, isFavorite);
		plugin.html(button, isFavorite);
	}

	/**
	* Set the HTML content for the button
	*/
	plugin.html = function(button, isFavorite)
	{
		var count = $(button).attr('data-favoritecount');
		var options = plugin.options.button_type;
		var html = '';
		if ( plugin.options.button_type === 'custom' ){
			if ( isFavorite ) $(button).html(plugin.formatter.addFavoriteCount(Favorites.jsData.favorited, count));
			if ( !isFavorite ) $(button).html(plugin.formatter.addFavoriteCount(Favorites.jsData.favorite, count));
			plugin.applyIconColor(button, isFavorite);
			plugin.applyCountColor(button, isFavorite);
			return;
		}
		if ( isFavorite ){
			html += '<i class="' + options.icon_class + '"></i> ';
			html += options.state_active;
			$(button).html(plugin.formatter.addFavoriteCount(html, count));
			return;
		}
		html += '<i class="' + options.icon_class + '"></i> ';
		html += options.state_default;
		$(button).html(plugin.formatter.addFavoriteCount(html, count));
		plugin.applyIconColor(button, isFavorite);
		plugin.applyCountColor(button, isFavorite);
	}

	/**
	* Apply custom colors to the button if the option is selected
	*/
	plugin.colors = function(button, isFavorite)
	{
		if ( !plugin.options.custom_colors ) return;
		if ( isFavorite ){
			var options = plugin.options.active;
			if ( options.background_active ) $(button).css('background-color', options.background_active);
			if ( options.border_active ) $(button).css('border-color', options.border_active);
			if ( options.text_active ) $(button).css('color', options.text_active);
			return;
		}
		var options = plugin.options.default;
		if ( options.background_default ) $(button).css('background-color', options.background_default);
		if ( options.border_default ) $(button).css('border-color', options.border_default);
		if ( options.text_default ) $(button).css('color', options.text_default);
		plugin.boxShadow(button);
	}

	/**
	* Remove the box shadow from the button if the option is selected
	*/
	plugin.boxShadow = function(button)
	{
		if ( plugin.options.box_shadow ) return;
		$(button).css('box-shadow', 'none');
		$(button).css('-webkit-box-shadow', 'none');
		$(button).css('-moz-box-shadow', 'none');
	}

	/**
	* Apply custom colors to the icon if the option is selected
	*/
	plugin.applyIconColor = function(button, isFavorite)
	{
		if ( !plugin.options.custom_colors ) return;
		if ( isFavorite && plugin.options.active.icon_active ) {
			$(button).find('i').css('color', plugin.options.active.icon_active);
		}
		if ( !isFavorite && plugin.options.default.icon_default ) {
			$(button).find('i').css('color', plugin.options.default.icon_default);
		}
	}

	/**
	* Apply custom colors to the favorite count if the option is selected
	*/
	plugin.applyCountColor = function(button, isFavorite)
	{
		if ( !plugin.options.custom_colors ) return;
		if ( isFavorite && plugin.options.active.count_active ) {
			$(button).find(Favorites.selectors.count).css('color', plugin.options.active.count_active);
			return;
		}
		if ( !isFavorite && plugin.options.default.count_default ) {
			$(button).find(Favorites.selectors.count).css('color', plugin.options.default.count_default);
		}
	}
}
/**
* Gets the user favorites
*/
var Favorites = Favorites || {};

Favorites.UserFavorites = function()
{
	var plugin = this;
	var $ = jQuery;
	plugin.initialLoad = false;

	plugin.bindEvents = function()
	{
		$(window).on('load', function(){
			plugin.initialLoad = true;
			plugin.getFavorites();
		});
	}

	plugin.getFavoritesFromServer = function( maybeSkipUpdates ) {
		return $.get({
			url: Favorites.jsData.api_endpoints.user_favorites,
			datatype: 'json',
			beforeSend: function ( xhr ) {
				xhr.setRequestHeader( 'X-WP-Nonce', favorites_data.restNonce );
			},
			success: function(data){

				Favorites.store.setItem( 'userFavorites', data ).then( function( value ) {

					Favorites.userFavorites = value;

					if ( Favorites.jsData.dev_mode ) {
						//console.log('The current user favorites were successfully loaded.');
						console.log(value);
					}

					if ( maybeSkipUpdates ) {
						return;
					}

					$(document).trigger('favorites-user-favorites-loaded', [value, plugin.initialLoad]);
					$(document).trigger('favorites-update-all-buttons');

				} ).catch( function( error ) {

				} );

			},
			error: function(data){
				if ( !Favorites.jsData.dev_mode ) return;
				console.log('The was an error loading the user favorites.');
				console.log(data);
			}
		});
	}

	/**
	* Get the user favorites
	*/
	plugin.getFavorites = function( maybeSkipUpdates )
	{
		// We only need to get the user favorites, by default, on a short-coded page, or single post views that have the favorite action.
		if ( ! Favorites.jsData.maybeGetUserFavorites ) {
			return;
		}

		// First check localStorage for locally cached version of favorites
		return Favorites.store.getItem( 'userFavorites' ).then(function( favorites ) {
			if ( null !== favorites ) {

				Favorites.userFavorites = favorites;

				if ( maybeSkipUpdates ) {
					return favorites;
				}

				$(document).trigger('favorites-user-favorites-loaded', [Favorites.userFavorites, plugin.initialLoad]);
				$(document).trigger('favorites-update-all-buttons');

				return favorites;
			}

			return plugin.getFavoritesFromServer(maybeSkipUpdates);

		}).catch(function(err) {
			// This code runs if there were any errors
			console.log( err );
			return plugin.getFavoritesFromServer(maybeSkipUpdates);
		});

	}

	plugin.addFavorite = function( data ) {
		var fav = plugin.getFavorites();
		console.log(data);

		var post_id = data.post_id;

		plugin.loading( true, post_id );

		fav.then( function( favorites ) {

			//TODO Ensure we have fully populated getFavorites from server, with proper siteID, etc..
			if ( ! favorites[0].groups.length ) {
				favorites[0].groups[0] = {
					posts : []
				}
			}

			// Add to groups / TODO: Better way of identifying what goes where.
			if ( favorites[0].groups[0].posts.indexOf( post_id ) === -1 ) {
				favorites[0].groups[0].posts.push(post_id);
			}

			var args;

			if ( Favorites.removalCache.hasOwnProperty( post_id ) ) {
				args = Favorites.removalCache[data.post_id];
				delete Favorites.removalCache[data.post_id];
			} else {
				args = {
					button: '<button class="simplefavorite-button active" data-postid="' + post_id + '" data-siteid="' + data.site_id + '" data-groupid="1"><span class="fas fa-heart"></span> <span class="favorite-text">Recipe Saved</span></button>',
					excerpt: "",
					post_id: post_id,
					post_type: "post", // TODO: Get actual post type
					thumbnail: $( '.wprm-recipe-image' ).html(),
					link: window.location.href.replace( window.location.hash, '' ),
					quick_easy : $( '.category-quick-and-easy' ).length, // TODO: A good, filterable way to add additional data, a smart way to persist this data on the server as well
					title: $( 'h1.entry-title' ).text(),
					total: 1 // TODO Determine usage
				};
			}

			favorites[0].posts[ post_id ] = args;

			//favorites[0].posts = $.grep( favorites[0].posts,function(n){ return parseInt(n) > 0 });
			//favorites[0].posts = Object.keys( favorites[0].posts );
			//favorites[0]['groups'][0]['posts'] = $.grep( favorites[0]['groups'][0]['posts'],function(n){ return parseInt(n) > 0 });

			if ( $.isArray( favorites[0].posts ) ) {
				favorites[0].posts = favorites[0].posts.reduce(function(acc, cur, i) {
					acc[post_id] = cur;
					return acc;
				  }, {});
			}

			console.error( 'favorites added to data store' );
			console.error( favorites );

			Favorites.store.setItem( 'userFavorites', favorites ).then( function() {
				Favorites.userFavorites = favorites;
				$(document).trigger('favorites-updated-single', [favorites, post_id, data.site_id, data.status]);
				$(document).trigger('favorites-update-all-buttons');

				plugin.loading( false, post_id );

			} ).catch( function( err ) {
				console.log( 'could not save favorite' );
				console.log( err );
				console.log( favorites );
			} );

		} )
	}

	plugin.loading = function( loading, post_id ) {
		var allButtons = $('button[data-postid="' + post_id + '"]');

		$.each(allButtons, function(){
			$(this).attr('disabled', loading);
			$(this).toggleClass(Favorites.cssClasses.loading, loading);
			if ( loading ) {
				$(this).html(plugin.addLoadingIndication());
			}
		});

	}

	/*
	* Add loading indication to button
	*/
	plugin.addLoadingIndication = function(html)
	{
		if ( Favorites.jsData.indicate_loading !== '1' ) return html;
		if ( plugin.data.status === 'active' ) return Favorites.jsData.loading_text + Favorites.jsData.loading_image_active;
		return Favorites.jsData.loading_text + Favorites.jsData.loading_image;
	}

	// TODO Updating button state is failing. Confirm that we're actually removing/adding
	plugin.removeFavorite = function( data ) {
		plugin.loading( true, data.post_id );

		var fav = plugin.getFavorites();

		fav.then( function( favorites ) {
			if ( ! Favorites.removalCache.hasOwnProperty( data.post_id ) ) {
				Favorites.removalCache[data.post_id] = favorites[0].posts[ data.post_id ];
			}

			favorites[0].groups[0].posts = favorites[0].groups[0].posts.filter( function( id ) {
				return id !== data.post_id;
			} );

			delete favorites[0].posts[ data.post_id ];

			Favorites.store.setItem( 'userFavorites', favorites ).then( function() {
				Favorites.userFavorites = favorites;
				$(document).trigger('favorites-updated-single', [favorites, data.post_id, data.site_id, data.status]);
				$(document).trigger('favorites-update-all-buttons');
				plugin.loading( false, data.post_id );
			} ).catch( function( err ) {
				console.log( 'could not remove favorite' );
				console.log( err );
				console.log( favorites );
			} );
		} );

	}

	plugin.bindEvents();

	return plugin;
}
/**
* Sync favorites from local storage to server
*/
var Favorites = Favorites || {};

//KNOWN ISSUES
// 2. Log out and onbeforeunload should both be link checks, and checkDelta is returning undefined for both.
// 6. Check performance on the Promise objects being returned when getting Favorites. It's a bit laggy. Console logging shows Add/Remove iterating through a few times.

Favorites.Sync = function()
{
	var plugin = this;
	plugin.timeToSync = false;

	/**
	 * If time since last sync exceeds this for the favorites-debounced-sync event, sync.
	 * Defaults to 110 seconds
	 */
	// plugin.deltaCheckInterval = 110000; //Prod
	 plugin.deltaCheckInterval = 10000; //Prod

	/**
	 * Checks delta every 15 seconds for any changes.
	 */
	//plugin.timeoutInterval = 15000; //Prod
	plugin.timeoutInterval = 10000; //Prod
	var $ = jQuery;

	plugin.bindEvents = function()
	{
		if ( ! Favorites.jsData.logged_in.length ) {
			var favorites = Favorites.store.length();
			favorites.then( function( favorites ) {
				if ( favorites > 0 ) {
					Favorites.store.clear();
				}
			} );
			return;
		}

		$(window).on('load', function(){
			if ( $( 'div#wp-user-favorites' ).length > 0 ) { //TODO tied to theme - better check needed for if user dash
				plugin.loadPostsOnDashboard();
			}
		});

		//Anytime someone logs in syncFromServer
		$(document).on('favorites-login', function(){
			plugin.maybeSyncServer();
			plugin.setDelta();
		});

		plugin.checkIfLoggingIn();

		$( '.page-template-page_myrt .facetwp-checkbox' ).click( plugin.filterList ); // TODO Tied to theme - build a better way!

		// Check every 1:50 minutes for delta changes and sync if they exist.
		$(document).on('favorites-debounced-sync', function(){
			plugin.maybeSyncServer();
		});


		// Only set delta when favorites sync
		$(document).on('favorites-synced', function(){
			// console.log( 'setting delta after successful server sync' );
			plugin.setDelta();
		});

		// Check every 1:50 minutes for delta changes and sync if they exist.
		setInterval( function() {
			// console.log( 'setTimeout callback running' );
			$( document ).trigger( 'favorites-debounced-sync' );
		}, plugin.timeoutInterval );


		//Anytime someone logs out syncToServer, delete local cache
		$( 'a[href*="action=logout"]' ).click( function( e ) {
			e.preventDefault();
			var href = this.href;
			plugin.maybeSyncServer().then(function() {
				Favorites.store.clear().then( function() {
					window.location = href;
				} )
			});

			return false;
		} );


		/**
		// Anytime someone navigates away from user dashboard, sync to server if necessary. Check for shortcode/classname, onbeforeunload, check delta
		$(document).on('favorites-user-dashboard-exit', function(){
			plugin.maybeSyncServer();
		});

		window.addEventListener('beforeunload', function (e) {

			if ( $( 'div#wp-user-favorites' ).length > 0 ) {
				plugin.checkDelta.then( function( delta ) {
					if ( delta ) {
						$( document ).trigger( 'favorites-user-dashboard-exit' );
					}
				} )
			}

		  });

		 */

	}

	/**	As we cannot reliably depend on a wp_login hook, given the HTTP redirect, we simply check if we're on the dashboard page, and the delta has not been set */
	plugin.checkIfLoggingIn = function() {

		if ( $( '#wp-user-favorites' ).length < 1 ) {
			return;
		}

		plugin.getDelta().then( function( delta ) {
			if ( delta === null ) {
				$( document ).trigger( 'favorites-login' );
			}
		} );
	}

	/*
	* If there is a delta, sync to server
	*/
	plugin.maybeSyncServer = function() {

		// Maybe syncing to server
		console.log( 'Maybe sync up with the server' );

		return plugin.checkDelta().then( function( delta ) {
			if ( ! delta ) {
				console.log( 'Too SOON or no changes' );
				console.log( plugin.timeToSync );
				console.log( 'Too soon or no CHANGES' );
				console.log( plugin.hasChanges );
				return false;
			}

			var favorites = Favorites.UserFavorites().getFavorites( true );

			return favorites.then( function( favs ) {

				// User meta expects an array of IDs here, which are mapped/decorated in the response
				if ( typeof favs[0].posts === 'object' ) {
					//favs[0].posts = $.grep( favs[0].posts,function(n){ return parseInt(n) > 0 });
					//favs[0].posts = Object.keys( favs[0].posts );
				}

				return $.post({
					url: Favorites.jsData.api_endpoints.user_favorites,
					datatype: 'json',
					beforeSend: function ( xhr ) {
						xhr.setRequestHeader( 'X-WP-Nonce', favorites_data.restNonce );
					},
					data : {
						favorites : favs
					},
					success: function(data){
						$(document).trigger('favorites-synced');
					},
					error: function(data){
						if ( !Favorites.jsData.dev_mode ) return;
						console.log('The was an error loading the user favorites.');
						console.log(data);
					}
				});
			} );
		} );
	}

	/**
	 * Save posts from database as "database-delta" to compare against.
	 * Should be set anytime we retrieve data from the database.
	 */
	plugin.setDelta = function() {

		var favorites = Favorites.UserFavorites().getFavorites();

		favorites.then( function(favs) {
			var posts = Object.keys( favs[0].posts );

			console.log( 'setting the delta' );

			return Favorites.store.setItem( 'userFavoritesFromServer', posts ).then( function( posts ) {
				console.log( posts );

				var date = new Date();
				var timestamp = date.getTime();

				Favorites.store.setItem( 'userFavoritesLastSyncTime', timestamp );
				return posts;
			} );

		} );
	}

	/**
	 * Gets the delta.
	 */
	plugin.getDelta = function() {
		return Favorites.store.getItem( 'userFavoritesFromServer' ).then( function( delta ) {
			return delta;
		} );
	}

	plugin.arraysEqual = function( a, b ) {
		if (a === b) return true;
		if (a == null || b == null) return false;
		if (a.length != b.length) return false;

		// If you don't care about the order of the elements inside
		// the array, you should sort both arrays here.
		// Please note that calling sort on an array will modify that array.
		// you might want to clone your array first.

		for (var i = 0; i < a.length; ++i) {
			if (a[i] !== b[i]) return false;
		}
		return true;
	}

	/**
	 * Check if delta exists between server-side and client-side, and if enough time has passed
	 */
	plugin.checkDelta = function() {
		var serverData   = plugin.getDelta();
		var localData    = Favorites.UserFavorites().getFavorites();
		var lastSyncTime = Favorites.store.getItem( 'userFavoritesLastSyncTime', function( time ) {
			return time;
		}  );
		var currentDate = new Date();
		var currentTimestamp   = currentDate.getTime();

		console.log( 'checking the delta' );

		return localData.then( function( favs ) {
			return lastSyncTime.then( function( time ) {

				if ( currentTimestamp > time + plugin.deltaCheckInterval ) {
					plugin.timeToSync = true;
				}

				return serverData.then( function( delta ) {

					if ( null === delta ) {
						return true;
					}


					var differences = ! plugin.arraysEqual( Object.keys( favs[0].posts ), delta );
					plugin.hasChanges = differences;

					return plugin.hasChanges && plugin.timeToSync;
				} );

			} );
		} );
	}

	plugin.removeLocalData = function() {
		return Favorites.store.removeItem( 'userFavorites' ).then( function() {
			return Favorites.store.removeItem( 'userFavoritesFromServer', function() {
				return Favorites.store.removeItem( 'userFavoritesLastSyncTime', timestamp );
			} );
		} );
	}

	plugin.loadPostsOnDashboard = function() {
		var post_template = wp.template( 'favorites-post' );
		var siteContent = $( 'div#wp-user-favorites .list' ); //TODO Theme bound, bad.
		var favorites = Favorites.UserFavorites().getFavorites();

		//TODO Abstract messaging away into settings.
		favorites.then( function( favorites ) {
			console.log( favorites );
			if ( ! favorites[0].groups.length || ( favorites[0].groups.length && ! favorites[0].groups[0].posts.length ) ) {
				$( 'div#wp-user-favorites .list, div#wp-user-favorites .pagination' ).remove();
				$( 'div#wp-user-favorites' ).append( "<p>You don't have any saved recipes yet! Click the <strong>floating heart</strong> or <strong>Save Recipe</strong> buttons on a recipe post and it will appear right here.</p><p><a style='color:#f4796c' href='" + window.location.origin + "'>Go to the RecipeTin Eats home page.</a></p>" );
				return;
			}

			var favs = Object.values(favorites[0].posts);

			favs.forEach( function( favorite ) {
				if ( $( '.loading-favorite', siteContent ).length ) {
					$( '.loading-favorite', siteContent ).first().remove();
				}

				console.log( favorite );
				siteContent.append( post_template( favorite ) );
			} );

			$( '.loading-favorite', siteContent ).remove();

			plugin.favoriteList = new List('wp-user-favorites', {
				valueNames: ['entry-title-link', { data: ['quick-easy'] } ],
				page: 20,
				pagination: true
			});

			plugin.favoriteList.sort('entry-title-link', { order: "asc" });

			plugin.favoriteList.on( 'updated', function() {
				window.scrollTo( 0,0 );
			} )

		} );

	}

	plugin.filterList = function() {
		var quick_easy_checked = ! $( '.page-template-page_myrt .facetwp-checkbox' ).hasClass( 'checked' );

		console.log( quick_easy_checked );

		plugin.favoriteList.filter(function (item) {
			console.log( item );
			console.log( quick_easy_checked );

			if ( ! quick_easy_checked ) {
				return true;
			}

			console.log( item.values() );

			  return parseInt( item.values()['quick-easy'] ) > 0;
		  });

			plugin.favoriteList.update();
	}

	return plugin.bindEvents();
}
/**
* Clears all favorites for the user
*
* Events:
* favorites-cleared: The user's favorites have been cleared. Params: clear button
*/
var Favorites = Favorites || {};

Favorites.Clear = function()
{
	var plugin = this;
	var $ = jQuery;

	plugin.activeButton; // The active "clear favorites" button
	plugin.utilities = new Favorites.Utilities;
	plugin.formatter = new Favorites.Formatter;

	plugin.bindEvents = function()
	{
		$(document).on('click', Favorites.selectors.clear_button, function(e){
			e.preventDefault();
			plugin.activeButton = $(this);
			plugin.clearFavorites();
		});
		$(document).on('favorites-updated-single', function(){
			plugin.updateClearButtons();
		});
		$(document).one('favorites-user-favorites-loaded', function(){
			plugin.updateClearButtons();
		});
	}

	/*
	* Submit an AJAX request to clear all of the user's favorites
	*/
	plugin.clearFavorites = function()
	{
		plugin.loading(true);
		var site_id = $(plugin.activeButton).attr('data-siteid');
		$.ajax({
			url: Favorites.jsData.ajaxurl,
			type: 'post',
			datatype: 'json',
			data: {
				action : Favorites.formActions.clearall,
				siteid : site_id
			},
			success : function(data){
				if ( Favorites.jsData.dev_mode ){
					console.log('Favorites list successfully cleared.');
					console.log(data);
				}
				Favorites.userFavorites = data.favorites;
				plugin.formatter.decrementAllCounts();
				plugin.loading(false);
				plugin.clearSiteFavorites(site_id);
				$(document).trigger('favorites-cleared', [plugin.activeButton, data.old_favorites]);
				$(document).trigger('favorites-update-all-buttons');
			},
			error : function(data){
				if ( !Favorites.jsData.dev_mode ) return;
				console.log('There was an error clearing the favorites list.');
				console.log(data);
			}
		});
	}

	/**
	* Toggle the button loading state
	*/
	plugin.loading = function(loading)
	{
		if ( loading ){
			$(plugin.activeButton).addClass(Favorites.cssClasses.loading);
			$(plugin.activeButton).attr('disabled', 'disabled');
			return;
		}
		$(plugin.activeButton).removeClass(Favorites.cssClasses.loading);
	}

	/*
	* Update disabled status for clear buttons
	*/
	plugin.updateClearButtons = function()
	{
		var button;
		var siteid;
		for ( var i = 0; i < $(Favorites.selectors.clear_button).length; i++ ){
			button = $(Favorites.selectors.clear_button)[i];
			siteid = $(button).attr('data-siteid');
			for ( var c = 0; c < Favorites.userFavorites.length; c++ ){
				if ( Favorites.userFavorites[c].site_id !== parseInt(siteid) ) continue;
				if ( plugin.utilities.objectLength(Favorites.userFavorites[c].posts) > 0 ) {
					$(button).attr('disabled', false);
					continue;
				}
				$(button).attr('disabled', 'disabled');
			}
		}
	}

	/**
	* Clear out favorites for this site id (fix for cookie-enabled sites)
	*/
	plugin.clearSiteFavorites = function(site_id)
	{
		$.each(Favorites.userFavorites, function(i, v){
			if ( this.site_id !== parseInt(site_id) ) return;
			Favorites.userFavorites[i].posts = {};
		});
	}

	return plugin.bindEvents();
}
/**
* Favorites List functionality
*/
var Favorites = Favorites || {};

Favorites.Lists = function()
{
	var plugin = this;
	var $ = jQuery;

	plugin.utilities = new Favorites.Utilities;
	plugin.buttonFormatter = new Favorites.ButtonOptionsFormatter;

	plugin.bindEvents = function()
	{
		$(document).on('favorites-update-all-lists', function(){
			plugin.updateAllLists();
		});
		$(document).on('favorites-updated-single', function(){
			plugin.updateAllLists();
		});
		$(document).on('favorites-cleared', function(){
			plugin.updateAllLists();
		});
		$(document).one('favorites-user-favorites-loaded', function(){
			plugin.updateAllLists();
		});
	}

	/**
	* Loop through all the favorites lists
	*/
	plugin.updateAllLists = function()
	{
		if ( typeof Favorites.userFavorites === 'undefined' ) return;
		for ( var i = 0; i < Favorites.userFavorites.length; i++ ){
			var lists = $(Favorites.selectors.list + '[data-siteid="' + Favorites.userFavorites[i].site_id + '"]');
			for ( var c = 0; c < $(lists).length; c++ ){
				var list = $(lists)[c];
				plugin.updateSingleList(list)
			}
		}
	}

	/**
	* Update a specific user list
	*/
	plugin.updateSingleList = function(list)
	{
		var user_id = $(list).attr('data-userid');
		var site_id = $(list).attr('data-siteid');
		var include_links = $(list).attr('data-includelinks');
		var include_buttons = $(list).attr('data-includebuttons');
		var include_thumbnails = $(list).attr('data-includethumbnails');
		var thumbnail_size = $(list).attr('data-thumbnailsize');
		var include_excerpt = $(list).attr('data-includeexcerpts');
		var post_types = $(list).attr('data-posttypes');
		var no_favorites = $(list).attr('data-nofavoritestext');

		$.ajax({
			url: Favorites.jsData.ajaxurl,
			type: 'post',
			dataType: 'json',
			data: {
				action : Favorites.formActions.favoritelist,
				userid : user_id,
				siteid : site_id,
				include_links : include_links,
				include_buttons : include_buttons,
				include_thumbnails : include_thumbnails,
				thumbnail_size : thumbnail_size,
				include_excerpt : include_excerpt,
				no_favorites : no_favorites,
				post_types : post_types
			},
			success : function(data){
				if ( Favorites.jsData.dev_mode ){
					console.log('Favorites list successfully retrieved.');
					console.log($(list));
					console.log(data);
				}
				var newlist = $(data.list);
				$(list).replaceWith(newlist);
				plugin.removeButtonLoading(newlist);
				$(document).trigger('favorites-list-updated', [newlist]);
			},
			error : function(data){
				if ( !Favorites.jsData.dev_mode ) return;
				console.log('There was an error updating the list.');
				console.log(list);
				console.log(data);
			}
		});
	}

	/**
	* Remove loading state from buttons in the list
	*/
	plugin.removeButtonLoading = function(list)
	{
		var buttons = $(list).find(Favorites.selectors.button);
		$.each(buttons, function(){
			plugin.buttonFormatter.format($(this), false);
			$(this).removeClass(Favorites.cssClasses.active);
			$(this).removeClass(Favorites.cssClasses.loading);
		});
	}

	/**
	* Remove unfavorited items from the list
	*/
	plugin.removeInvalidListItems = function(list, favorites)
	{
		var listitems = $(list).find('li[data-postid]');
		$.each(listitems, function(i, v){
			var postid = $(this).attr('data-postid');
			if ( !plugin.utilities.isFavorite(postid, favorites) ) $(this).remove();
		});
	}

	return plugin.bindEvents();
}
/**
* Favorite Buttons
* Favorites/Unfavorites a specific post
*
* Events:
* favorites-updated-single: A user's favorite has been updated. Params: favorites, post_id, site_id, status
*/
var Favorites = Favorites || {};

Favorites.Button = function()
{
	var plugin = this;
	var $ = jQuery;

	plugin.activeButton; // The clicked button
	plugin.allButtons; // All favorite buttons for the current post
	plugin.authenticated = true;

	plugin.formatter = new Favorites.Formatter;
	plugin.data = {};

	plugin.bindEvents = function()
	{
		$(document).on('click', Favorites.selectors.button, function(e){
			e.preventDefault();
			plugin.activeButton = $(this);
			plugin.setAllButtons();
			plugin.submitFavorite();
		});
	}

	/**
	* Set all buttons
	*/
	plugin.setAllButtons = function()
	{
		var post_id = $(plugin.activeButton).attr('data-postid');
		plugin.allButtons = $('button[data-postid="' + post_id + '"]');
	}

	/**
	* Set the Post Data
	*/
	plugin.setData = function()
	{
		plugin.data.post_id = $(plugin.activeButton).attr('data-postid');
		plugin.data.site_id = $(plugin.activeButton).attr('data-siteid');
		plugin.data.status = ( $(plugin.activeButton).hasClass('active') ) ? 'inactive' : 'active';
		var consentProvided = $(plugin.activeButton).attr('data-user-consent-accepted');
		plugin.data.user_consent_accepted = ( typeof consentProvided !== 'undefined' && consentProvided !== '' ) ? true : false;
	}

	/**
	* Submit the button
	*/
	plugin.submitFavorite = function()
	{
		plugin.setData();

		var formData = {
			siteid : plugin.data.site_id,
			user_consent_accepted : plugin.data.user_consent_accepted
		}

		var is_active = 'active' === plugin.data.status;

		// If user isn't logged
		if ( '1' !== Favorites.jsData.logged_in ) {
			window.location = Favorites.jsData.authentication_redirect_url;
			return;
		}

		if ( is_active ) {
			return Favorites.UserFavorites().addFavorite( plugin.data )
		} else {
			return Favorites.UserFavorites().removeFavorite( plugin.data );
		}

		$.ajax({
			url: Favorites.jsData.api_endpoints.user_favorites + '/' + plugin.data.post_id,
			type: type,
			dataType: 'json',
			beforeSend: function ( xhr ) {
				xhr.setRequestHeader( 'X-WP-Nonce', favorites_data.restNonce );
			},
			data: formData,
			success: function(data){
				if ( Favorites.jsData.dev_mode ) {
					console.log('The favorite was successfully saved.');
					console.log(data);
				}
				if ( data.status === 'unauthenticated' ){
					Favorites.authenticated = false;
					plugin.loading(false);
					plugin.data.status = 'inactive';
					$(document).trigger('favorites-update-all-buttons');
					$(document).trigger('favorites-require-authentication', [plugin.data]);
					return;
				}
				if ( data.status === 'consent_required' ){
					plugin.loading(false);
					$(document).trigger('favorites-require-consent', [data, plugin.data, plugin.activeButton]);
					return;
				}
				Favorites.userFavorites = data.favorites;
				plugin.loading(false);
				plugin.resetButtons();
				$(document).trigger('favorites-updated-single', [data.favorites, plugin.data.post_id, plugin.data.site_id, plugin.data.status]);
				$(document).trigger('favorites-update-all-buttons');

				// Deprecated callback
				favorites_after_button_submit(data.favorites, plugin.data.post_id, plugin.data.site_id, plugin.data.status);
			},
			error: function(data){
				if ( !Favorites.jsData.dev_mode ) return;
				console.log('There was an error saving the favorite.');
				console.log(data);
			}
		});
	}

	/*
	* Set the output html
	*/
	plugin.resetButtons = function()
	{
		var favorite_count = parseInt($(plugin.activeButton).attr('data-favoritecount'));

		$.each(plugin.allButtons, function(){
			if ( plugin.data.status === 'inactive' ) {
				if ( favorite_count <= 0 ) favorite_count = 1;
				$(this).removeClass(Favorites.cssClasses.active);
				$(this).attr('data-favoritecount', favorite_count - 1);
				$(this).find(Favorites.selectors.count).text(favorite_count - 1);
				return;
			}
			$(this).addClass(Favorites.cssClasses.active);
			$(this).attr('data-favoritecount', favorite_count + 1);
			$(this).find(Favorites.selectors.count).text(favorite_count + 1);
		});
	}

	plugin.bindEvents();
	return plugin;
}
/**
* Updates Favorite Buttons as Needed
*/
var Favorites = Favorites || {};

Favorites.ButtonUpdater = function()
{
	var plugin = this;
	var $ = jQuery;

	plugin.utilities = new Favorites.Utilities;
	plugin.formatter = new Favorites.Formatter;
	plugin.buttonFormatter = new Favorites.ButtonOptionsFormatter;

	plugin.activeButton;
	plugin.data = {};

	plugin.bindEvents = function()
	{
		$(document).on('favorites-update-all-buttons', function(){
			plugin.updateAllButtons();
		});
		$(document).on('favorites-list-updated', function(event, list){
			plugin.updateAllButtons(list);
		});
	}

	/*
	* Update all favorites buttons to match the user favorites
	* @param list object (optionally updates button in list)
	*/
	plugin.updateAllButtons = function(list)
	{
		var favorites = Favorites.UserFavorites().getFavorites( true );
		var buttons = ( typeof list === undefined && list !== '' )
		? $(list).find(Favorites.selectors.button)
		: $(Favorites.selectors.button);

		favorites.then( function( favs ) {

			for ( var i = 0; i < $(buttons).length; i++ ){

				plugin.activeButton = $(buttons)[i];

				if ( Favorites.authenticated ) {
					plugin.setButtonData( favs );
				}

				if ( Favorites.authenticated && plugin.utilities.isFavorite( plugin.data.postid, plugin.data.site_favorites ) ){
					plugin.buttonFormatter.format($(plugin.activeButton), true);
					$(plugin.activeButton).addClass(Favorites.cssClasses.active);
					$(plugin.activeButton).removeClass(Favorites.cssClasses.loading);
					$(plugin.activeButton).find(Favorites.selectors.count).text(plugin.data.favorite_count);
					continue;
				}

				console.log( 'isFavorite' );
				console.log( plugin.utilities.isFavorite( plugin.data.postid, plugin.data.site_favorites ) );
				console.log( plugin.data.site_favorites );
				console.log( plugin.data.postid );

				plugin.buttonFormatter.format($(plugin.activeButton), false);
				$(plugin.activeButton).removeClass(Favorites.cssClasses.active);
				$(plugin.activeButton).removeClass(Favorites.cssClasses.loading);
				$(plugin.activeButton).find(Favorites.selectors.count).text(plugin.data.favorite_count);
			}
		} );

	}

	/**
	* Set the button data
	*/
	plugin.setButtonData = function( favs )
	{
		plugin.data.postid = $(plugin.activeButton).attr('data-postid');
		plugin.data.siteid = $(plugin.activeButton).attr('data-siteid');
		plugin.data.favorite_count = $(plugin.activeButton).attr('data-favoritecount');
		plugin.data.site_index     = plugin.utilities.siteIndex(plugin.data.siteid, favs);
		plugin.data.site_favorites = favs[0].posts; // TODO: get siteIndex working again
		if ( plugin.data.favorite_count <= 0 ) plugin.data.favorite_count = 0;
	}

	return plugin.bindEvents();
}
/**
* Total User Favorites Count Updates
*/
var Favorites = Favorites || {};

Favorites.TotalCount = function()
{
	var plugin = this;
	var $ = jQuery;

	plugin.bindEvents = function()
	{
		if ( ! Favorites.jsData.logged_in.length ) {
			return;
		}

		$(window).on('load', function(){
			plugin.updateTotal();
		});
		$(document).on('favorites-updated-single', function(){
			plugin.updateTotal();
		});
		$(document).on('favorites-cleared', function(){
			plugin.updateTotal();
		});
		$(document).one('favorites-user-favorites-loaded', function(){
			plugin.updateTotal();
		});
	}

	/*
	* Update Total Number of Favorites
	* TODO: Reintroduce support for sites, multiple post types, etc. Not relevant currently.
	*/
	plugin.updateTotal = function()
	{
		Favorites.UserFavorites().getFavorites().then( function( favorites ) {
			return $( Favorites.selectors.total_favorites ).text( Object.keys( favorites[0].groups[0].posts ).length );
		} );

		return;

		// Loop through all the total favorite elements
		for ( var i = 0; i < $(Favorites.selectors.total_favorites).length; i++ ){
			var item = $(Favorites.selectors.total_favorites)[i];
			var siteid = parseInt($(item).attr('data-siteid'));
			var posttypes = $(item).attr('data-posttypes');
			var posttypes_array = posttypes.split(','); // Multiple Post Type Support
			var count = 0;

			// Loop through all sites in favorites
			for ( var c = 0; c < Favorites.userFavorites.length; c++ ){
				var site_favorites = Favorites.userFavorites[c];
				if ( site_favorites.site_id !== siteid ) continue;
				$.each(site_favorites.posts, function(){
					if ( $(item).attr('data-posttypes') === 'all' ){
						count++;
						return;
					}
					if ( $.inArray(this.post_type, posttypes_array) !== -1 ) count++;
				});
			}
			$(item).text(count);
		}
	}

	return plugin.bindEvents();
}
/**
* Updates the count of favorites for a post
*/
var Favorites = Favorites || {};

Favorites.PostFavoriteCount = function()
{
	var plugin = this;
	var $ = jQuery;

	plugin.bindEvents = function()
	{
		$(document).on('favorites-updated-single', function(event, favorites, post_id, site_id, status){
			if ( status === 'active' ) return plugin.updateCounts();
			plugin.decrementSingle(post_id, site_id);
		});
		$(document).on('favorites-cleared', function(event, button, old_favorites){
			plugin.updateCounts(old_favorites, true);
		});
	}

	/*
	* Update Total Number of Favorites
	*/
	plugin.updateCounts = function(favorites, decrement)
	{
		if ( typeof favorites === 'undefined' || favorites === '' ) favorites = Favorites.userFavorites;
		if ( typeof decrement === 'undefined' || decrement === '' ) decrement = false;

		// Loop through all the total favorite elements
		for ( var i = 0; i < $('[' + Favorites.selectors.post_favorite_count + ']').length; i++ ){

			var item = $('[' + Favorites.selectors.post_favorite_count + ']')[i];
			var postid = parseInt($(item).attr(Favorites.selectors.post_favorite_count));
			var siteid = $(item).attr('data-siteid');
			if ( siteid === '' ) siteid = '1';

			// Loop through all sites in favorites
			for ( var c = 0; c < favorites.length; c++ ){
				var site_favorites = favorites[c];
				if ( site_favorites.site_id !== parseInt(siteid) ) continue; 
				$.each(site_favorites.posts, function(){

					if ( this.post_id === postid ){
						if ( decrement ){
							var count = parseInt(this.total) - 1;
							$(item).text(count);
							return;
						}
						$(item).text(this.total);
					}
				});
			}
		}
	}

	/**
	* Decrement a single post total
	*/
	plugin.decrementSingle = function(post_id, site_id)
	{
		for ( var i = 0; i < $('[' + Favorites.selectors.post_favorite_count + ']').length; i++ ){
			var item = $('[' + Favorites.selectors.post_favorite_count + ']')[i];
			var item_post_id = $(item).attr(Favorites.selectors.post_favorite_count);
			var item_site_id = $(item).attr('data-siteid');
			if ( item_site_id === '' ) item_site_id = '1';
			if ( item_site_id !== site_id ) continue;
			if ( item_post_id !== post_id ) continue;
			var count = parseInt($(item).text()) - 1;
			$(item).text(count);
		}
	}

	return plugin.bindEvents();
}
/**
* Favorites Require Authentication
*/
var Favorites = Favorites || {};

Favorites.RequireAuthentication = function()
{
	var plugin = this;
	var $ = jQuery;

	plugin.bindEvents = function()
	{
		$(document).on('favorites-require-authentication', function(){
			if ( Favorites.jsData.dev_mode ){
				console.log('Unauthenticated user was prevented from favoriting.');
			}
			if ( Favorites.jsData.authentication_redirect ){
				plugin.redirect();
				return;
			}
			plugin.openModal();
		});
		$(document).on('click', '.simplefavorites-modal-backdrop', function(e){
			plugin.closeModal();
		});
		$(document).on('click', '[' + Favorites.selectors.close_modals + ']', function(e){
			e.preventDefault();
			plugin.closeModal();
		});
	}

	/**
	* Redirect to a page
	*/
	plugin.redirect = function()
	{
		window.location = Favorites.jsData.authentication_redirect_url;
	}

	/**
	* Open the Modal
	*/
	plugin.openModal = function()
	{
		plugin.buildModal();
		setTimeout(function(){
			$('[' + Favorites.selectors.modals + ']').addClass('active');
		}, 10);
	}

	/**
	* Build the Modal
	*/
	plugin.buildModal = function()
	{
		var modal = $('[' + Favorites.selectors.modals + ']');
		if ( modal.length > 0 ) return;
		var html = '<div class="simplefavorites-modal-backdrop" ' + Favorites.selectors.modals + '></div>';
		html += '<div class="simplefavorites-modal-content" ' + Favorites.selectors.modals + '>';
		html += '<div class="simplefavorites-modal-content-body">';
		html += Favorites.jsData.authentication_modal_content;
		html += '</div><!-- .simplefavorites-modal-content-body -->';
		html += '</div><!-- .simplefavorites-modal-content -->';
		$('body').prepend(html);
	}

	/**
	* Close the Moda
	*/
	plugin.closeModal = function()
	{
		$('[' + Favorites.selectors.modals + ']').removeClass('active');
		$(document).trigger('favorites-modal-closed');
	}

	return plugin.bindEvents();
}
/**
* Favorites Require Consent Modal Agreement
*/
var Favorites = Favorites || {};

Favorites.RequireConsent = function()
{
	var plugin = this;
	var $ = jQuery;

	plugin.consentData;
	plugin.postData;
	plugin.activeButton;

	plugin.bindEvents = function()
	{
		$(document).on('favorites-require-consent', function(event, consent_data, post_data, active_button){
			plugin.consentData = consent_data;
			plugin.postData = post_data;
			plugin.activeButton = active_button;
			plugin.openModal();
		});
		$(document).on('favorites-user-consent-approved', function(e, button){
			if ( typeof button !== 'undefined' ){
				$(plugin.activeButton).attr('data-user-consent-accepted', 'true');
				$(plugin.activeButton).click();
				plugin.closeModal();
				return;
			}
			plugin.setConsent(true);
		});
		$(document).on('favorites-user-consent-denied', function(){
			plugin.setConsent(false);
		});
		$(document).on('click', '.simplefavorites-modal-backdrop', function(e){
			plugin.closeModal();
		});
		$(document).on('click', '[data-favorites-consent-deny]', function(e){
			e.preventDefault();
			plugin.closeModal();
			$(document).trigger('favorites-user-consent-denied');
		});
		$(document).on('click', '[data-favorites-consent-accept]', function(e){
			e.preventDefault();
			$(document).trigger('favorites-user-consent-approved', [$(this)]);
		});
	}

	/**
	* Open the Modal
	*/
	plugin.openModal = function()
	{
		plugin.buildModal();
		setTimeout(function(){
			$('[' + Favorites.selectors.consentModal + ']').addClass('active');
		}, 10);
	}

	/**
	* Build the Modal
	*/
	plugin.buildModal = function()
	{
		var modal = $('[' + Favorites.selectors.consentModal + ']');
		if ( modal.length > 0 ) return;
		var html = '<div class="simplefavorites-modal-backdrop" ' + Favorites.selectors.consentModal + '></div>';
		html += '<div class="simplefavorites-modal-content" ' + Favorites.selectors.consentModal + '>';
		html += '<div class="simplefavorites-modal-content-body no-padding">';
		html += '<div class="simplefavorites-modal-content-interior">';
		html += plugin.consentData.message;
		html += '</div>';
		html += '<div class="simplefavorites-modal-content-footer">'
		html += '<button class="simplefavorites-button-consent-deny" data-favorites-consent-deny>' + plugin.consentData.deny_text + '</button>';
		html += '<button class="simplefavorites-button-consent-accept" data-favorites-consent-accept>' + plugin.consentData.accept_text + '</button>';
		html += '</div><!-- .simplefavorites-modal-footer -->';
		html += '</div><!-- .simplefavorites-modal-content-body -->';
		html += '</div><!-- .simplefavorites-modal-content -->';
		$('body').prepend(html);
	}

	/**
	* Close the Modal
	*/
	plugin.closeModal = function()
	{
		$('[' + Favorites.selectors.consentModal + ']').removeClass('active');
	}

	/**
	* Submit a manual deny/consent
	*/
	plugin.setConsent = function(consent)
	{
		$.ajax({
			url: Favorites.jsData.ajaxurl,
			type: 'post',
			dataType: 'json',
			data: {
				action : Favorites.formActions.cookieConsent,
				consent : consent
			}
		});
	}

	return plugin.bindEvents();
}
/**
* Primary Favorites Initialization
* @package Favorites
* @author Kyle Phillips - https://github.com/kylephillips/favorites
*
* Events:
* favorites-nonce-generated: The nonce has been generated
* favorites-updated-single: A user's favorite has been updated. Params: favorites, post_id, site_id, status
* favorites-cleared: The user's favorites have been cleared. Params: clear button
* favorites-user-favorites-loaded: The user's favorites have been loaded. Params: intialLoad (bool)
* favorites-require-authentication: An unauthenticated user has attempted to favorite a post (The Require Login & Show Modal setting is checked)
*/
jQuery(document).ready(function(){
	new Favorites.Factory;
});

var Favorites = Favorites || {};

/**
* DOM Selectors Used by the Plugin
*/
Favorites.selectors = {
	button : '.simplefavorite-button', // Favorite Buttons
	list : '.favorites-list', // Favorite Lists
	clear_button : '.simplefavorites-clear', // Clear Button
	total_favorites : '.simplefavorites-user-count', // Total Favorites (from the_user_favorites_count)
	modals : 'data-favorites-modal', // Modals
	consentModal : 'data-favorites-consent-modal', // Consent Modal
	close_modals : 'data-favorites-modal-close', // Link/Button to close the modals
	count : '.simplefavorite-button-count', // The count inside the favorites button
	post_favorite_count : 'data-favorites-post-count-id' // The total number of times a post has been favorited
}

/**
* CSS Classes Used by the Plugin
*/
Favorites.cssClasses = {
	loading : 'loading', // Loading State
	active : 'active', // Active State
}

Favorites.removalCache = {};

/**
* Localized JS Data Used by the Plugin
*/
Favorites.jsData = {
	ajaxurl : favorites_data.ajaxurl, // The WP AJAX URL
	restUrl : favorites_data.restUrl, // The WP REST URL
	maybeGetUserFavorites : favorites_data.maybeGetUserFavorites,
	favorite : favorites_data.favorite, // Active Button Text/HTML
	favorited : favorites_data.favorited, // Inactive Button Text
	include_count : favorites_data.includecount, // Whether to include the count in buttons
	indicate_loading : favorites_data.indicate_loading, // Whether to include loading indication in buttons
	loading_text : favorites_data.loading_text, // Loading indication text
	loading_image_active : favorites_data.loading_image_active, // Loading spinner url in active button
	loading_image : favorites_data.loading_image, // Loading spinner url in inactive button
	cache_enabled : favorites_data.cache_enabled, // Is cache enabled on the site
	authentication_modal_content : favorites_data.authentication_modal_content, // Content to display in authentication gate modal
	authentication_redirect : favorites_data.authentication_redirect, // Whether to redirect unauthenticated users to a page
	authentication_redirect_url : favorites_data.authentication_redirect_url, // URL to redirect to
	button_options : favorites_data.button_options, // Custom button options
	dev_mode : favorites_data.dev_mode, // Is Dev mode enabled
	logged_in : favorites_data.logged_in, // Is the user logged in
	user_id : favorites_data.user_id, // The current user ID (0 if logged out)
	api_endpoints : {
		nonce : favorites_data.restUrl + '/generate-nonce',
		user_favorites : favorites_data.restUrl + '/user-favorites',
		favorite_button : favorites_data.restUrl + '/favorite-button'
	}
};

/**
* The user's favorites
* @var object
*/
Favorites.userFavorites = null;

/**
* Is the user authenticated
* @var object
*/
Favorites.authenticated = true;

/**
 * Local Data Storage for User Favorites
 */
 Favorites.store = window.localforage;

/**
* WP Form Actions Used by the Plugin
*/
Favorites.formActions = {
	favoritesarray : 'favorites_array',
	favorite : 'favorites_favorite',
	clearall : 'favorites_clear',
	favoritelist : 'favorites_list',
	cookieConsent : 'favorites_cookie_consent'
}

Favorites.shouldLoad = function() {

	var admins = [ '10', '7', '1', '24', '103' ];
}

/**
* Primary factory class
*/
Favorites.Factory = function()
{
	var plugin = this;
	var $ = jQuery;

	plugin.build = function()
	{
		new Favorites.UserFavorites;
		new Favorites.Sync;
		new Favorites.Lists;
		new Favorites.Clear;
		new Favorites.Button;
		new Favorites.ButtonUpdater;
		new Favorites.TotalCount;
		new Favorites.PostFavoriteCount;
		new Favorites.RequireAuthentication;
		new Favorites.RequireConsent;
	}

	return plugin.build();
}