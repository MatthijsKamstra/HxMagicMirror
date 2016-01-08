package ;


import js.html.Element;

class Time extends Update implements IUpdate
{

	private var dayArr = ["zondag","maandag","dinsdag","woensdag","donderdag","vrijdag","zaterdag"];
	private var monthArr = ["januari","februari","maart","april","mei","juni","juli","augustus","september","oktober", "november", "december"];

	private var element:Element;

	public function new (el:Element) 
	{
		element = el;		
		super(1000);
	}

	override private function updateHandler():Void
	{
		var date = Date.now();

		var html = '';

		html += '<div class="date small dimmed">' + dayArr[date.getDay()] + ', ' + date.getDate() + ' ' + monthArr[date.getMonth()] + ' ' + date.getFullYear() + '</div>';
		html += '<div class="time">'+ lpad(date.getHours()) + ':' + lpad(date.getMinutes()) + ':' + lpad(date.getSeconds()) + '</div>';

		element.innerHTML = html;
	}

	/**
	 * pad the time < 10
	 * 
	 * @param  d 	
	 * @return   padded Int example "00"
	 */
	private function lpad(d:Int):String
	{
		return StringTools.lpad (Std.string(d), "0", 2);
	}

}		