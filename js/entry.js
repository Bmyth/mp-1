var entry = null;

var Entry = {
	init: _entry_init
}

function _entry_init(){
	entry = $("#entry");
	entry.focus();
    entry.keyup(_entry_Keyup);
}

function _entry_Keyup(e){
	var e  = e ||  window.e;          
　　	var key = e.keyCode || e.which;

	console.log(key)
    // esc: cancel edit
    if(key == '27'){
        
    }
    // left
    else if(key == '37'){
        _entry_direction('left', event.shiftKey);
    }
    // right
    else if(key == '39'){
        _entry_direction('right', event.shiftKey);
    }
    // up
    else if(key == '38'){
        _entry_direction('up', event.shiftKey);
    }
    // down
    else if(key == '40'){
        _entry_direction('down', event.shiftKey);
    }

    else{
    	_entry_text();
    }
}

function _entry_text(){
	if(tempNode.posX != windowWidth * 0.5 || tempNode.posY != windowHeight * 0.5){
		Nodes.adjustNodesPos({
			x : windowWidth * 0.5 - tempNode.posX,
			y : windowHeight * 0.5 - tempNode.posY
		});
	}
	tempNode.refresh();
}

function _entry_direction(direction, shiftKey) {
	var step = 40;
	var mode = shiftKey ? 'Parallel' : 'Serial';
	if(entry.val()){
		Nodes.createNode({direction:direction, mode:mode});
	}else{
		var dx = DirectionConfig[direction].iX * step;
		var dy = DirectionConfig[direction].iY * step;
		tempNode && tempNode.adjustPos({x:dx, y:dy});
	}
}