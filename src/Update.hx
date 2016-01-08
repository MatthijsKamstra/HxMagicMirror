package;

import haxe.Timer;

class Update implements IUpdate 
{
	// default delay timer in ms
	private var DELAY : Int = 1000;

	private var time:Timer;

	/**
	 * update stuff
	 * 
	 * @param  delay  	in ms
	 */
	public function new (delay:Int):Void
	{
		DELAY = delay;
		updateHandler();
		update();
	}

	/**
	 * update starts the timer, every class extended needs a update timer
	 */
	private function update():Void
	{
		time = new haxe.Timer(DELAY);
		time.run = updateHandler;
	}

	/**
	 * override this function 
	 */
	private function updateHandler():Void
	{
		trace("override function updateHandler():Void {}");
	}

}