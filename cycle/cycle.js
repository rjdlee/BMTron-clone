/*

Cycle class, contains all methods required for the transformation of a lightcycle

*/

var Cycle = function(id, x, y, colour)
{
	this.idNum = id;
	this.isActive = true;
	this.controls = [];

	this.radius = screenWidth > 1920 ? 7 : screenWidth < 480 ? 20 : Math.round(1280 / screenWidth) * 5;
	
	this.diameter = this.radius << 1;
	this.colour = colour;

	this.initSpeed = this.diameter;
	this.speed = this.initSpeed;
	this.pos = 
	{
		x : x,
		y : y
	}

	this.nodes = [new Node("nodeHead node", x, y, this.diameter, this.diameter, this.colour, true)];
	this.next = 
	{
		x : 0,
		y : -this.speed
	};
	this.prev = 
	{
		x : 0,
		y : 0
	};
}

Cycle.prototype.setSpeed = function(multiplier)
{
	var prevSpeed = this.speed;

	//speed compensates with power for unknown reason
	this.speed = Math.round(this.initSpeed * Math.pow(multiplier, 3/5));
	this.next.x = (this.next.x / prevSpeed) * this.speed;
	this.next.y = (this.next.y / prevSpeed) * this.speed;
	this.prev.x = (this.prev.x / prevSpeed) * this.speed;
	this.prev.y = (this.prev.y / prevSpeed) * this.speed;
}

Cycle.prototype.translateUp = function()
{
	this.next = {
		x : 0,
		y : -this.speed
	};
}

Cycle.prototype.translateDown = function()
{
	this.next = {
		x : 0,
		y : this.speed
	};
}

Cycle.prototype.translateLeft = function()
{
	this.next = {
		x : -this.speed,
		y : 0
	};
}

Cycle.prototype.translateRight = function()
{
	this.next = {
		x : this.speed,
		y : 0
	};
}

Cycle.prototype.reset = function()
{
	if(this.nodes != null)
	{
		for(var i = this.nodes.length - 1; i >= 0; i--)
		{
			screenGame.removeChild(this.nodes[i].obj);
			this.nodes[i] = null;
		}

		this.nodes = null;
	}
}

Cycle.prototype.draw = function()
{
	this.pos.x += this.next.x
	this.pos.y += this.next.y

	// If no change in direction, expand the current node
	// Else create a new element for the new direction
	if(this.next.x == this.prev.x && this.next.y == this.prev.y)
	{
		var tail = this.nodes[this.nodes.length - 1];

		if(this.next.x < 0) 		tail.transform(tail.pos.x + this.next.x, tail.pos.y, tail.len.width - this.next.x, tail.len.height + this.next.y);
		else if(this.next.y < 0) 	tail.transform(tail.pos.x, tail.pos.y + this.next.y, tail.len.width + this.next.x, tail.len.height - this.next.y);
		else 						tail.transform(tail.pos.x, tail.pos.y, tail.len.width + this.next.x, tail.len.height + this.next.y);
	}
	else
	{
		this.nodes.push(new Node("node", this.pos.x, this.pos.y, this.diameter, this.diameter, this.colour));
	}
	
	// Transform the head of the cycle
	this.nodes[0].transform(this.pos.x, this.pos.y, this.speed, this.speed);

	if(this.collision()) return false;

	this.prev.x = this.next.x;
	this.prev.y = this.next.y;

	return true;
}

Cycle.prototype.collision = function()
{
	if(this.pos.x <= -this.radius || this.pos.y <= -this.radius || this.pos.x >= screenWidth - this.radius || this.pos.y >= screenHeight - this.radius)
	{
		return true;
	}

	for(var i = 0; i < cycles.length; i++)
	{
		var nodesLength = cycles[i].nodes.length;

		if(cycles[i].idNum == this.idNum && (this.prev.x == this.next.x && this.prev.y == this.next.y || this.prev.x == 0 && this.next.y == 0 || this.prev.y == 0 && this.next.x == 0))
		{
			nodesLength -= 3;
		}

		for(var j = 1; j < nodesLength; j++)
		{
			var posX = cycles[i].nodes[j].pos.x,
				posY = cycles[i].nodes[j].pos.y,
				width = cycles[i].nodes[j].len.width,
				height = cycles[i].nodes[j].len.height;

			if(this.pos.x + this.radius >= posX && this.pos.x + this.radius <= posX + width && this.pos.y + this.radius >= posY && this.pos.y + this.radius <= posY + height)
			{
				return true;
			}
		}
	}

	return false;
}