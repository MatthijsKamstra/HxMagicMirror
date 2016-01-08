(function (console) { "use strict";
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var IUpdate = function() { };
IUpdate.__name__ = true;
var Update = function(delay) {
	this.DELAY = 1000;
	this.DELAY = delay;
	this.updateHandler();
	this.update();
};
Update.__name__ = true;
Update.__interfaces__ = [IUpdate];
Update.prototype = {
	update: function() {
		this.time = new haxe_Timer(this.DELAY);
		this.time.run = $bind(this,this.updateHandler);
	}
	,updateHandler: function() {
		console.log("override function updateHandler():Void {}");
	}
};
var Compliments = function(el) {
	this.eveningArr = ["Wow, you look hot!","You look nice!","Hi, sexy!"];
	this.afternoonArr = ["Hello, beauty!","You look sexy!","Looking good today!"];
	this.morningArr = ["Good morning, handsome!","Enjoy your day!","How was your sleep?"];
	this.element = el;
	Update.call(this,30000);
};
Compliments.__name__ = true;
Compliments.__interfaces__ = [IUpdate];
Compliments.__super__ = Update;
Compliments.prototype = $extend(Update.prototype,{
	updateHandler: function() {
		var _list = [];
		var date = new Date();
		var hour = date.getHours();
		if(hour >= 3 && hour < 12) _list = this.morningArr; else if(hour >= 12 && hour < 17) _list = this.afternoonArr; else if(hour >= 17 || hour < 3) _list = this.eveningArr; else _list = this.afternoonArr;
		var html = _list[Math.floor(Math.random() * _list.length)];
		this.element.innerHTML = html;
	}
});
var EReg = function(r,opt) {
	opt = opt.split("u").join("");
	this.r = new RegExp(r,opt);
};
EReg.__name__ = true;
EReg.prototype = {
	match: function(s) {
		if(this.r.global) this.r.lastIndex = 0;
		this.r.m = this.r.exec(s);
		this.r.s = s;
		return this.r.m != null;
	}
};
var HxOverrides = function() { };
HxOverrides.__name__ = true;
HxOverrides.dateStr = function(date) {
	var m = date.getMonth() + 1;
	var d = date.getDate();
	var h = date.getHours();
	var mi = date.getMinutes();
	var s = date.getSeconds();
	return date.getFullYear() + "-" + (m < 10?"0" + m:"" + m) + "-" + (d < 10?"0" + d:"" + d) + " " + (h < 10?"0" + h:"" + h) + ":" + (mi < 10?"0" + mi:"" + mi) + ":" + (s < 10?"0" + s:"" + s);
};
var Lambda = function() { };
Lambda.__name__ = true;
Lambda.exists = function(it,f) {
	var $it0 = it.iterator();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		if(f(x)) return true;
	}
	return false;
};
var List = function() {
	this.length = 0;
};
List.__name__ = true;
List.prototype = {
	iterator: function() {
		return new _$List_ListIterator(this.h);
	}
};
var _$List_ListIterator = function(head) {
	this.head = head;
	this.val = null;
};
_$List_ListIterator.__name__ = true;
_$List_ListIterator.prototype = {
	hasNext: function() {
		return this.head != null;
	}
	,next: function() {
		this.val = this.head[0];
		this.head = this.head[1];
		return this.val;
	}
};
var Main = function() {
	this.doc = window.document;
	var _g = this;
	this.doc.addEventListener("DOMContentLoaded",function(event) {
		_g.init();
	});
};
Main.__name__ = true;
Main.main = function() {
	var main = new Main();
};
Main.prototype = {
	init: function() {
		this.divTopLeft = window.document.getElementById("tl");
		this.divTopRight = window.document.getElementById("tr");
		this.divCenter = window.document.getElementById("cc");
		this.divBottomLeft = window.document.getElementById("bl");
		this.divBottomRight = window.document.getElementById("br");
		var time = new Time(this.divTopLeft);
		var compliments = new Compliments(this.divCenter);
		var weather = new Weather(this.divTopRight);
		this.divBottomLeft.innerHTML = "";
		this.divBottomRight.innerHTML = "";
	}
};
Math.__name__ = true;
var Std = function() { };
Std.__name__ = true;
Std.string = function(s) {
	return js_Boot.__string_rec(s,"");
};
var StringTools = function() { };
StringTools.__name__ = true;
StringTools.lpad = function(s,c,l) {
	if(c.length <= 0) return s;
	while(s.length < l) s = c + s;
	return s;
};
var Time = function(el) {
	this.monthArr = ["januari","februari","maart","april","mei","juni","juli","augustus","september","oktober","november","december"];
	this.dayArr = ["zondag","maandag","dinsdag","woensdag","donderdag","vrijdag","zaterdag"];
	this.element = el;
	Update.call(this,1000);
};
Time.__name__ = true;
Time.__interfaces__ = [IUpdate];
Time.__super__ = Update;
Time.prototype = $extend(Update.prototype,{
	updateHandler: function() {
		var date = new Date();
		var html = "";
		html += "<div class=\"date small dimmed\">" + this.dayArr[date.getDay()] + ", " + date.getDate() + " " + this.monthArr[date.getMonth()] + " " + date.getFullYear() + "</div>";
		html += "<div class=\"time\">" + this.lpad(date.getHours()) + ":" + this.lpad(date.getMinutes()) + ":" + this.lpad(date.getSeconds()) + "</div>";
		this.element.innerHTML = html;
	}
	,lpad: function(d) {
		return StringTools.lpad(d == null?"null":"" + d,"0",2);
	}
});
var Weather = function(el) {
	this.CITY = "Amsterdam,Netherlands";
	this.API_KEY = "ab210136cff24e09e6cc9a5950491839";
	this.element = el;
	Update.call(this,6000);
};
Weather.__name__ = true;
Weather.__interfaces__ = [IUpdate];
Weather.__super__ = Update;
Weather.prototype = $extend(Update.prototype,{
	updateHandler: function() {
		this.loadData();
	}
	,loadData: function() {
		var _g = this;
		var req = new haxe_Http("http://api.openweathermap.org/data/2.5/weather?q=" + this.CITY + "&appid=" + this.API_KEY + "&units=metric&lang=nl");
		req.onData = function(data) {
			_g._json = JSON.parse(data);
			_g._wjson = JSON.parse(data);
			_g.createList();
		};
		req.onError = function(error) {
			console.log("error: " + error);
		};
		req.request(true);
	}
	,createList: function() {
		var _Date = new Date();
		var _currentDate;
		var d = new Date();
		d.setTime(this._wjson.dt * 1000);
		_currentDate = d;
		var _sunrise;
		var d1 = new Date();
		d1.setTime(this._wjson.sys.sunrise * 1000);
		_sunrise = d1;
		var _sunset;
		var d2 = new Date();
		d2.setTime(this._wjson.sys.sunset * 1000);
		_sunset = d2;
		var _html = "<b>Weather</b>";
		_html += "<p>current time: " + _currentDate.getHours() + ":" + _currentDate.getMinutes() + "</p>";
		_html += "<p>sunrise: " + _sunrise.getHours() + ":" + _sunrise.getMinutes() + "</p>";
		_html += "<p>sunset: " + _sunset.getHours() + ":" + _sunset.getMinutes() + "</p>";
		_html += "<p>temp: " + this._wjson.main.temp + "°C</p>";
		_html += "<p>temp_min: " + this._wjson.main.temp_min + "°C</p>";
		_html += "<p>temp_max: " + this._wjson.main.temp_max + "°C</p>";
		_html += "<p>" + this._json.weather[0].description + "</p>";
		_html += "<p>" + "</p>";
		_html += "<p>" + "</p>";
		_html += "<p>" + Std.string(_Date) + "</p>";
		_html += "<p>" + Std.string(_currentDate) + "</p>";
		_html += "<p>" + Std.string(_sunrise) + "</p>";
		_html += "<p>" + Std.string(_sunset) + "</p>";
		_html += "<p>" + "</p>";
		_html += "<p>" + "</p>";
		_html += "<p>" + "</p>";
		_html += "<p>" + "</p>";
		_html += "<p>" + "</p>";
		_html += "<p>" + "</p>";
		this.element.innerHTML = _html;
	}
});
var haxe_Http = function(url) {
	this.url = url;
	this.headers = new List();
	this.params = new List();
	this.async = true;
};
haxe_Http.__name__ = true;
haxe_Http.prototype = {
	request: function(post) {
		var me = this;
		me.responseData = null;
		var r = this.req = js_Browser.createXMLHttpRequest();
		var onreadystatechange = function(_) {
			if(r.readyState != 4) return;
			var s;
			try {
				s = r.status;
			} catch( e ) {
				if (e instanceof js__$Boot_HaxeError) e = e.val;
				s = null;
			}
			if(s != null) {
				var protocol = window.location.protocol.toLowerCase();
				var rlocalProtocol = new EReg("^(?:about|app|app-storage|.+-extension|file|res|widget):$","");
				var isLocal = rlocalProtocol.match(protocol);
				if(isLocal) if(r.responseText != null) s = 200; else s = 404;
			}
			if(s == undefined) s = null;
			if(s != null) me.onStatus(s);
			if(s != null && s >= 200 && s < 400) {
				me.req = null;
				me.onData(me.responseData = r.responseText);
			} else if(s == null) {
				me.req = null;
				me.onError("Failed to connect or resolve host");
			} else switch(s) {
			case 12029:
				me.req = null;
				me.onError("Failed to connect to host");
				break;
			case 12007:
				me.req = null;
				me.onError("Unknown host");
				break;
			default:
				me.req = null;
				me.responseData = r.responseText;
				me.onError("Http Error #" + r.status);
			}
		};
		if(this.async) r.onreadystatechange = onreadystatechange;
		var uri = this.postData;
		if(uri != null) post = true; else {
			var _g_head = this.params.h;
			var _g_val = null;
			while(_g_head != null) {
				var p;
				p = (function($this) {
					var $r;
					_g_val = _g_head[0];
					_g_head = _g_head[1];
					$r = _g_val;
					return $r;
				}(this));
				if(uri == null) uri = ""; else uri += "&";
				uri += encodeURIComponent(p.param) + "=" + encodeURIComponent(p.value);
			}
		}
		try {
			if(post) r.open("POST",this.url,this.async); else if(uri != null) {
				var question = this.url.split("?").length <= 1;
				r.open("GET",this.url + (question?"?":"&") + uri,this.async);
				uri = null;
			} else r.open("GET",this.url,this.async);
		} catch( e1 ) {
			if (e1 instanceof js__$Boot_HaxeError) e1 = e1.val;
			me.req = null;
			this.onError(e1.toString());
			return;
		}
		if(!Lambda.exists(this.headers,function(h) {
			return h.header == "Content-Type";
		}) && post && this.postData == null) r.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		var _g_head1 = this.headers.h;
		var _g_val1 = null;
		while(_g_head1 != null) {
			var h1;
			h1 = (function($this) {
				var $r;
				_g_val1 = _g_head1[0];
				_g_head1 = _g_head1[1];
				$r = _g_val1;
				return $r;
			}(this));
			r.setRequestHeader(h1.header,h1.value);
		}
		r.send(uri);
		if(!this.async) onreadystatechange(null);
	}
	,onData: function(data) {
	}
	,onError: function(msg) {
	}
	,onStatus: function(status) {
	}
};
var haxe_Timer = function(time_ms) {
	var me = this;
	this.id = setInterval(function() {
		me.run();
	},time_ms);
};
haxe_Timer.__name__ = true;
haxe_Timer.prototype = {
	run: function() {
	}
};
var js__$Boot_HaxeError = function(val) {
	Error.call(this);
	this.val = val;
	this.message = String(val);
	if(Error.captureStackTrace) Error.captureStackTrace(this,js__$Boot_HaxeError);
};
js__$Boot_HaxeError.__name__ = true;
js__$Boot_HaxeError.__super__ = Error;
js__$Boot_HaxeError.prototype = $extend(Error.prototype,{
});
var js_Boot = function() { };
js_Boot.__name__ = true;
js_Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__) {
				if(o.length == 2) return o[0];
				var str2 = o[0] + "(";
				s += "\t";
				var _g1 = 2;
				var _g = o.length;
				while(_g1 < _g) {
					var i1 = _g1++;
					if(i1 != 2) str2 += "," + js_Boot.__string_rec(o[i1],s); else str2 += js_Boot.__string_rec(o[i1],s);
				}
				return str2 + ")";
			}
			var l = o.length;
			var i;
			var str1 = "[";
			s += "\t";
			var _g2 = 0;
			while(_g2 < l) {
				var i2 = _g2++;
				str1 += (i2 > 0?",":"") + js_Boot.__string_rec(o[i2],s);
			}
			str1 += "]";
			return str1;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			if (e instanceof js__$Boot_HaxeError) e = e.val;
			return "???";
		}
		if(tostr != null && tostr != Object.toString && typeof(tostr) == "function") {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str.length != 2) str += ", \n";
		str += s + k + " : " + js_Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str += "\n" + s + "}";
		return str;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
	}
};
var js_Browser = function() { };
js_Browser.__name__ = true;
js_Browser.createXMLHttpRequest = function() {
	if(typeof XMLHttpRequest != "undefined") return new XMLHttpRequest();
	if(typeof ActiveXObject != "undefined") return new ActiveXObject("Microsoft.XMLHTTP");
	throw new js__$Boot_HaxeError("Unable to create XMLHttpRequest object.");
};
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; }
String.__name__ = true;
Array.__name__ = true;
Date.__name__ = ["Date"];
Main.main();
})(typeof console != "undefined" ? console : {log:function(){}});

//# sourceMappingURL=Weather.js.map