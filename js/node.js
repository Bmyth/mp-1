var minNodeDistance = 100;
function Node(params){
	params = params || {};
	this.temp = params.temp;
	this.uid = generateUid();	

	this.refresh = _node_Refresh;
	this.unTemp = _node_unTemp;
	this.adjustPos = _node_adjustPos;

	var parentEle = params.parentNode ? nodeMap.find('.n[uid=' + params.parentNode.uid + ']') : nodeMap;
	this.parentUid = parentEle.attr('uid');
	var ele = $('<div class="n"></div>').attr({'uid':this.uid}).appendTo(parentEle);
	this.ele = ele;
	var content = $('<div class="nc space-break absolute"></div>').attr({'uid':this.uid}).appendTo(nodeContentContainer);
	this.content = content;
	this.parentUid = parentEle.attr('uid');
	var anchorNode = params.anchorNode || params.parentNode;
	if(anchorNode && params.direction){
		var x = anchorNode.posX;
		var y = anchorNode.posY;
		var dx = minNodeDistance * DirectionConfig[params.direction].iX;
		var dy = minNodeDistance * DirectionConfig[params.direction].iY;
		this.posX = x + dx;
		this.posY = y + dy; 
	}else{
		this.posX = windowWidth * 0.5;
		this.posY = windowHeight * 0.5;
	}
	var uiGroup = new Group();
	this.uiGroup = uiGroup;
}

function _node_Refresh() {
	if(this.temp){
		var text = entry.val() + '_';
		this.content.html(text);
	}
	var w = this.content.width();
	var h = this.content.height();
	var x = this.posX - w * 0.5;
	var y = this.posY - h * 0.5;
	this.content.css({'left': x, 'top': y})

	var shape = this.uiGroup.children['shape'];
	if(shape){
		shape.remove();	
	}
	var r = Math.max(w,h,30);
	this.r = r;
	shape = new Shape.Circle({
		    center: [this.posX, this.posY],
		    radius: r,
		    fillColor: '#ddd'
		});
	shape.name = 'shape';
	this.uiGroup.addChild(shape);

	if(this.parentUid){
		var parentNode = Nodes.getNodeByUid(this.parentUid);
		var link = this.uiGroup.children['link'];
		if(link){
			link.remove();	
		}
		link = new Path.Line({
		    from: [this.posX, this.posY],
		    to: [parentNode.posX, parentNode.posY],
		    strokeColor: '#ddd',
		    strokeWidth: 5
		});
		link.name = 'link';
		link.sendToBack();
		this.uiGroup.addChild(link);
	}
}

function _node_unTemp() {
	if(this.temp){
		var text = entry.val();
		entry.val('')
		this.content.html(text);
		delete this.temp;
	}
	this.refresh();
}

function _node_adjustPos(adjust){
	this.posX += adjust.x;
	this.posY += adjust.y;
	this.refresh();
}

function generateUid(){
	var _uidLength = 12;
	var _uidSoup = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  	var soupLength = _uidSoup.length;
  	var id = []
  	for (var i = 0; i < _uidLength; i++) {
    	id[i] = _uidSoup.charAt(Math.random() * soupLength);
  	}
  	return id.join('')
}