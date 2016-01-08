package;

import js.html.Element;

class Compliments extends Update implements IUpdate
{	

	private var morningArr = [
		'Good morning, handsome!',
		'Enjoy your day!',
		'How was your sleep?'
	];

	private var afternoonArr = [
		'Hello, beauty!',
		'You look sexy!',
		'Looking good today!'
	];
	private var eveningArr = [
		'Wow, you look hot!',
		'You look nice!',
		'Hi, sexy!'
	];

	private var element:Element;

	public function new (el:Element) 
	{
		element = el;		
		super(30000);
	}

	override private function updateHandler():Void
	{
		var _list = [];

		var date = Date.now();
		var hour = date.getHours();

		if (hour >= 3 && hour < 12) {
			// Morning compliments
			_list = morningArr;
		} else if (hour >= 12 && hour < 17) {
			// Afternoon compliments
			_list = afternoonArr;
		} else if (hour >= 17 || hour < 3) {
			// Evening compliments
			_list = eveningArr;
		} else {
			// Edge case in case something weird happens
			// This will select a compliment from all times of day
			_list = afternoonArr;
		}

		var html = _list[Math.floor(Math.random() * _list.length)];

	
		element.innerHTML = html;

	}
}