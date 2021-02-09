var minNodeDistance = 100;
function Node(params){
	params = params || {};
	this.uid = generateUid();
	this.ele = params.ele.attr('uid', this.uid);
	this.id = this.ele.attr('nid');
	this.prevUid = this.ele.attr('prevuid');

	var rect = this.ele[0].getBoundingClientRect();
	this.posX = rect.left + rect.width * 0.5;
	this.posY = rect.top + rect.height * 0.5;

	this.uiGroup = new Group();

	this.refresh = _node_refresh;
	this.release = _node_release;
	this.adjustPos = _node_adjustPos;

	this.refresh();
}

function _node_refresh() {
	_node_refreshText(this);

	if(this.prevUid){
		var prevNode = Nodes.getNodeByUid(this.prevUid);
		var link = this.uiGroup.children['link'];
		if(link){
			link.remove();	
		}
		link = new Path.Line({
		    from: [this.posX, this.posY],
		    to: [prevNode.posX, prevNode.posY],
		    strokeColor: '#333',
		    strokeWidth: 0.5
		});
		link.dashArray = [10, 4];
		link.name = 'link';
		link.sendToBack();
		this.uiGroup.addChild(link);
	}
}

function _node_release() {
	var ele = $("<p class='node'></p>").attr('uid',this.uid).appendTo(Nodes.ele);
	this.ele = ele;

	var p = Board.getMapPos({x:this.posX, y:this.posY});
	this.posX = p.x;
	this.posY = p.y;
	this.refresh();
}

function _node_refreshText(node){
	if(node.ele.hasClass('node')){
		node.ele.text(Model.getText(node.id));
		var w = node.ele.width();
		var h = node.ele.height();
		var l = node.posX - w * 0.5;
		var t = node.posY - h * 0.5;
		node.ele.css({'left':l, 'top':t})
	}
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