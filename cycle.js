// Represents an individual light cycle.

var Cycle = function(id, x, y, colour)
{
	this.idNum = id;
	this.controls = [];

	//Qualitative
	this.radius = 5;
	this.colour = colour;

	//Speeds
	this.initSpeed = this.radius << 1;
	this.speed = this.initSpeed;
	this.pos = {
		x : x,
		y : y
	}

	//Nodes
	this.nodeList = [this.newNode("node", x, y)];
	this.next = {
		x : 0,
		y : -this.speed
	};
	this.prev = {
		x : 0,
		y : 0
	};
}

Cycle.prototype.setSpeed = function(multiplier)
{
	var prevSpeed = this.speed;

	//speed compensates with power for unknown reason
	this.speed = Math.round(this.initSpeed * Math.sqrt(multiplier));
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
	if(this.nodeList != null)
	{
		for(var i = this.nodeList.length - 1; i >= 0; i--)
		{
			screenGame.removeChild(this.nodeList[i]);
		}

		this.nodeList = null;
	}
}

// Create a new line segment
Cycle.prototype.newNode = function(className, x, y)
{
	var node = document.createElement("div");

	node.className = className;
	this.transformNode(node, x, y, this.radius << 1, this.radius << 1, this.colour);
	screenGame.appendChild(node);

	return node;
}

Cycle.prototype.draw = function()
{
	this.pos.x += this.next.x
	this.pos.y += this.next.y

	// If no change in direction, expand the current node
	// Else create a new element for the new direction
	if(this.next.x == this.prev.x && this.next.y == this.prev.y)
	{
		var tail = this.nodeList[this.nodeList.length - 1];

		if(this.next.x < 0) 		this.transformNode(tail, tail.offsetLeft + this.next.x, tail.offsetTop, tail.offsetWidth - this.next.x, tail.offsetHeight + this.next.y, this.colour);
		else if(this.next.y < 0) 	this.transformNode(tail, tail.offsetLeft, tail.offsetTop + this.next.y, tail.offsetWidth + this.next.x, tail.offsetHeight - this.next.y, this.colour);
		else 						this.transformNode(tail, tail.offsetLeft, tail.offsetTop, tail.offsetWidth + this.next.x, tail.offsetHeight + this.next.y, this.colour);
	}
	else
	{
		this.nodeList.push(this.newNode("node", this.nodeList[0].offsetLeft, this.nodeList[0].offsetTop));
	}

	// Transform the head of the cycle
	this.transformNode(this.nodeList[0], this.pos.x, this.pos.y, this.radius << 1, this.radius << 1, this.colour);
	if(this.collision(this.nodeList[0])) return false;

	this.prev.x = this.next.x;
	this.prev.y = this.next.y;

	return true;
}

Cycle.prototype.collision = function()
{
	if(this.pos.x <= -this.radius || this.pos.y <= -this.radius || this.pos.x >= screenWidth - this.radius || this.pos.y >= screenHeight - this.radius)
	{
		this.reset();
		return true;
	}

	for(var i = 0; i < cycles.length; i++)
	{
		var nodeListLength = cycles[i].nodeList.length;

		if(cycles[i].idNum == this.idNum && (this.prev.x == this.next.x && this.prev.y == this.next.y || this.prev.x == 0 && this.next.y == 0 || this.prev.y == 0 && this.next.x == 0))
		{
			nodeListLength -= 3;
		}

		for(var j = 1; j < nodeListLength; j++)
		{
			var posX = cycles[i].nodeList[j].offsetLeft,
				posY = cycles[i].nodeList[j].offsetTop,
				width = cycles[i].nodeList[j].offsetWidth,
				height = cycles[i].nodeList[j].offsetHeight;

			if(this.pos.x + this.radius >= posX && this.pos.x + this.radius <= posX + width && this.pos.y + this.radius >= posY && this.pos.y + this.radius <= posY + height)
			{
				this.reset();
				return true;
			}
		}
	}

	return false;
}

// Transform (size and position) an individual element of the cycle tail
Cycle.prototype.transformNode = function(node, x, y, width, height, hexColour)
{
	var data = 
		"left: " + x + "px;" +
		" top: " + y + "px;" +
		" width: " + width + "px;" + 
		" height: " + height + "px;"

	if(hexColour != null) data += " background-color: " + hexColour;

	node.setAttribute("style", data);
}