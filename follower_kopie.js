// namespacing!
if (!com) {
    var com = { };
    if (!com.modestmaps) {
        com.modestmaps = { };
    }
}

(function(MM){
MM.Follower = function(map, location, content, dimensions, name, web) {
    this.coord = map.locationCoordinate(location);
    
    this.offset = new MM.Point(0, 0);
    this.dimensions = dimensions || new MM.Point(100, 50);
    this.padding = new MM.Point(10, 10);
    this.offset = new MM.Point(0, -this.dimensions.y);

    var follower = this;
    
    var callback = function(m, a) { return follower.draw(m); };
    map.addCallback('drawn', callback);
    
    this.div = document.createElement('div');
    this.div.title = name
    this.div.style.position = 'absolute';
    this.div.style.width = this.dimensions.x + 'px';
    this.div.style.height = this.dimensions.y + 'px';
    //this.div.style.backgroundColor = 'white';
    this.div.style.border = 'solid black 1px';
    
    this.div.innerHTML = content;

	


		

    
    
    MM.addEvent(this.div, 'mousedown', function(e) {
        if(!e) e = window.event;
        return MM.cancelEvent(e);
    });
    

    MM.addEvent(this.div, 'mouseover', function(e){
		
	
	//console.debug("mouseOver")	

	});

    MM.addEvent(this.div, 'mouseout', function(e){
		//var labeltje = document.getElementById(name);
		//console.debug(labeltje);

		//this.removeChild(labeltje);	
	});
    
    map.parent.appendChild(this.div);
    
    this.draw(map);
    
			

}


MM.Follower.prototype = {

    div: null,
    coord: null,
    
    offset: null,
    dimensions: null,
    padding: null,

    draw: function(map)
    {
        try {
            var point = map.coordinatePoint(this.coord);

        } catch(e) {
            // too soon?
            return;
        }
        
        if(point.x + this.dimensions.x + this.offset.x < 0) {
            // too far left
            this.div.style.display = 'none';
        
        } else if(point.y + this.dimensions.y + this.offset.y < 0) {
            // too far up
            this.div.style.display = 'none';
        
        } else if(point.x + this.offset.x > map.dimensions.x) {
            // too far right
            this.div.style.display = 'none';
        
        } else if(point.y + this.offset.y > map.dimensions.y) {
            // too far down
            this.div.style.display = 'none';

        } else {
            this.div.style.display = 'block';
            MM.moveElement(this.div, {
                x: Math.round(point.x + this.offset.x),
                y: Math.round(point.y + this.offset.y),
                scale: 1,
                width: this.dimensions.x,
                height: this.dimensions.y
            });
        }
    }

};

})(com.modestmaps);
