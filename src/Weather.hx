package;

import js.html.Element;

class Weather extends Update implements IUpdate
{

	private var element:Element;

	private var API_KEY : String = "ab210136cff24e09e6cc9a5950491839";
	private var URL : String  = "http://api.openweathermap.org/data/2.5/weather";
	private var CITY : String  = "Amsterdam,Netherlands";

	/**
	apiVersion: '2.5',
	apiBase: 'http://api.openweathermap.org/data/',
	weatherEndpoint: 'weather',
	forecastEndpoint: 'forecast/daily'
	 */


	private var _json : Dynamic;
	private var _wjson : WeatherType;

	public function new (el:Element) 
	{
		element = el;		
		super(6000);
	}

	override private function updateHandler():Void
	{
		loadData();
	}

	private function loadData():Void
	{
   		var req = new haxe.Http("http://api.openweathermap.org/data/2.5/weather?q=" + CITY + "&appid=" + API_KEY + "&units=metric&lang=nl");
		req.onData = function (data : String)
		{
			_json = haxe.Json.parse(data);
			_wjson = haxe.Json.parse(data);
			// trace ("_json: " + _json);
			createList();
		}
		req.onError = function (error)
		{
			trace('error: $error');
		}
		req.request(true);
	}

	private function createList():Void
	{
		// trace ("_wjson " + _wjson);

		var _Date = Date.now();
		var _currentDate = Date.fromTime(_wjson.dt * 1000);
		var _sunrise = Date.fromTime(_wjson.sys.sunrise * 1000);
		var _sunset = Date.fromTime(_wjson.sys.sunset * 1000);

	    var _html = "<b>Weather</b>";

	    _html += "<p>current time: " + _currentDate.getHours() + ":" + _currentDate.getMinutes() + "</p>";
	    _html += "<p>sunrise: " + (_sunrise.getHours()) + ":" + _sunrise.getMinutes() + "</p>";
	    _html += "<p>sunset: " + (_sunset.getHours()) + ":" + _sunset.getMinutes() + "</p>";

	    _html += "<p>temp: " + _wjson.main.temp +  "°C</p>";
	    _html += "<p>temp_min: "  +  _wjson.main.temp_min + "°C</p>";
	    _html += "<p>temp_max: "  +  _wjson.main.temp_max + "°C</p>";
	    _html += "<p>" + _json.weather[0].description + "</p>";
	    _html += "<p>" + "</p>";
	    _html += "<p>" + "</p>";
	    _html += "<p>" + _Date + "</p>";
	    _html += "<p>" + _currentDate + "</p>";
	    _html += "<p>" + _sunrise + "</p>";
	    _html += "<p>" + _sunset + "</p>";
	    _html += "<p>" + "</p>";
	    _html += "<p>" + "</p>";
	    _html += "<p>" + "</p>";
	    _html += "<p>" + "</p>";
	    _html += "<p>" + "</p>";
	    _html += "<p>" + "</p>";

	    element.innerHTML = _html;
	}
	
}


// http://openweathermap.org/current
typedef WeatherType = 
{
	var coord : {
		var lon : Float; //145.77
		var lat : Float; //-16.92},
	};
	var weather : Array <WWeather>;
	var base : String; //":"cmc stations",
	var main : {
		var temp : Float; //":293.25
		var pressure : Float; //1019
		var humidity : Float; //83
		var temp_min : Float; //289.82
		var temp_max : Float; //295.37},
	};
	var wind : {
		var speed : Float; //5.1
		var deg : Float; //150
	};
	var clouds : { 
		var all : Int; //75
	};
	// var rain : {
	// 	@:optional var 1h : Float;//3
	// 	@:optional var 2h : Float;//3
	// 	@:optional var 3h : Float;//3
	// };
	var dt : Int; //1435658272,
	var sys : {
		var type : Int;//":1
		var id:Int; //8166
		var message:Float; //0.0166
		var country:String;//"AU"
		var sunrise : Int; //1435610796
		var sunset : Int; //1435650870
	};
	var id : Int; //:2172797,
	var name : String; //":"Cairns",
	var cod : Int; //":200
}

typedef WWeather = {
	var id : Int; //":803,
	var main : String; //Clouds",
	var description : String; //":"broken clouds","
	var icon : String ; //":"04n"}],
}