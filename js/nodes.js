var nodeMap = null;
var nodeContentContainer = null;
var nodes = [];
var tempNode = null; 

var Nodes = {
	init: _nodes_init,
	createNode: _nodes_createNode,
	createTempNode: _nodes_createTempNode,
	getNodeByUid: _nodes_getNodeByUid,
	adjustNodesPos: _nodes_adjustNodesPos
}

function _nodes_init() {
	nodeMap = $("#nodemap");
	nodeContentContainer = $('#nodecontent').css({
        width: windowWidth + 'px',
        height: windowHeight + 'px'
    });

	if(!tempNode){
		_nodes_createTempNode();
    }
}

function _nodes_createTempNode(params) {
	params = params || {};
	params.temp = true;
	var node = new Node(params);
	nodes.push(node);
	tempNode = node;
	tempNode.refresh();
}

function _nodes_createNode(params){
	params = params || {};
	params.parentNode = params.mode == 'Parallel' ? (tempNode ? _nodes_getNodeByUid(tempNode.parentUid) : null) : tempNode;
	params.anchorNode = tempNode;
	tempNode.unTemp();
	_nodes_createTempNode(params)
}

function _nodes_adjustNodesPos(adjust, ele) {
	ele = ele || nodeMap;
	if(ele.attr('uid')){
		var node = _nodes_getNodeByUid(ele.attr('uid'));
		node.adjustPos(adjust);
	}
	ele.children('.n').each(function(){
		_nodes_adjustNodesPos(adjust, $(this));
	})
}

function _nodes_getNodeByUid(uid) {
	return _.find(nodes, function(n){
		return n.uid == uid;
	})
}