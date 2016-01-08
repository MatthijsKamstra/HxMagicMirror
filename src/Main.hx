package ;

import js.Browser;
import js.html.Element;

/**
 * @author Matthijs Kamstra  aka [mck]
 * MIT
 * http://www.matthijskamstra.nl
 */
class Main
{
	private var doc = js.Browser.document;
	private var win = js.Browser.window;

	private var divTopRight : Element;
	private var divTopLeft : Element;
	private var divCenter : Element;
	private var divBottomRight : Element;
	private var divBottomLeft : Element;

	public function new()
	{
		doc.addEventListener("DOMContentLoaded", function(event) 
		{ 
			init();
		});
	}

	private function init():Void
	{
		// get the div
		divTopLeft = js.Browser.document.getElementById("tl");
		divTopRight = js.Browser.document.getElementById("tr");
		divCenter = js.Browser.document.getElementById("cc");
		divBottomLeft = js.Browser.document.getElementById("bl");
		divBottomRight = js.Browser.document.getElementById("br");

		// reset
		divBottomLeft.innerHTML = "";
		divBottomRight.innerHTML = "";

		// start 
		var time = new Time(divTopLeft);
		var compliments = new Compliments(divCenter);
		var weather = new Weather(divTopRight);
		var quote = new Quote(divBottomRight);

	}

	static public function main()
	{
		var main = new Main();
	}
}
