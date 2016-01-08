package;

import js.html.Element;

class Quote extends Update implements IUpdate
{

	private var element:Element;

	// http://api.theysaidso.com/qod?category=inspire

	private var END_POINT : String = "http://api.theysaidso.com/";
	private var QUOTE : String = "qod.json";
	private var CATEGORY : String = "?category=inspire";
	
	/**
		<inspire>Inspiring Quote of the day</inspire>
		<management>Management Quote of the day</management>
		<sports>Sports Quote of the day</sports>
		<life>Quote of the day about life</life>
		<funny>Funny Quote of the day</funny>
		<love>Quote of the day about Love</love>
		<art>Art quote of the day</art>
	 */


	private var NEW_END_POINT : String = "http://quotesondesign.com/api/3.0/api-3.0.json";


	private var _json : Dynamic;
	private var _wjson : QuoteType;

	public function new (el:Element) 
	{
		element = el;		
		super(720000);
	}

	override private function updateHandler():Void
	{
		loadData();
	}

	private function loadData():Void
	{
   		// var req = new haxe.Http(END_POINT + QUOTE + CATEGORY);
   		var req = new haxe.Http(NEW_END_POINT);
		req.onData = function (data : String)
		{
			_json = haxe.Json.parse(data);
			_wjson = haxe.Json.parse(data);
			trace ("_json: " + _json);
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
	    var _html = "<b>Quote</b>";

	    _html += "<p class='quote'>" + _wjson.quote + "</p>";
	    _html += "<p class='author'>" + _wjson.author + "</p>";

	    element.innerHTML = _html;
	}
	
}



typedef QuoteType = 
{
	var id:Int; //944
	var quote : String; //"No great thing is created suddenly.  "
	var author : String; //"Epictetus"
	var permalink : String ; // "http:\/\/quotesondesign.com\/?p=944"
}