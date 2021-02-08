var Entry = {
	init: _entry_init,
    ele: null,
    isEditNode: false
}

function _entry_init(){
    Entry.ele = $('#entry');
    Entry.ele.focus();
    Entry.ele.on('keyup', _entry_Keyup);
}

function _entry_Keyup(e){
	var e  = e ||  window.e;          
　　	var key = e.keyCode || e.which;

	console.log(key)
    // shift + enter
    if(key == '13' && event.shiftKey){
        _entry_shiftEnter();
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
    	_entry_text(e.key);
    }
}

function _entry_text(text){
    Board.update();
	// if(tempNode.posX != windowWidth * 0.5 || tempNode.posY != windowHeight * 0.5){
	// 	Nodes.adjustNodesPos({
	// 		x : windowWidth * 0.5 - tempNode.posX,
	// 		y : windowHeight * 0.5 - tempNode.posY
	// 	});
	// }
	// tempNode.refresh();
}

function _entry_shiftEnter(){
    var v = Entry.ele.val();
    if(!Entry.isEditNode){
        Entry.isEditNode = true;
        v = v.substr(0,v.length-1);
        Entry.ele.val(v + '/:')
    }else{
        Entry.isEditNode = false;
        v = v.substr(0,v.length-1);
        Entry.ele.val(v + ':/')
        //update node
        Nodes.syncBoard();
    }
    Board.update();
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