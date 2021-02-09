var Nodes = {
	nodeIndex: 0,
	path: [],
	ele: null,
	init: _nodes_init,
	addNode: _nodes_addNode,
	releaseNodes: _nodes_releaseNodes,
	getNodeByUid: _nodes_getNodeByUid
	
}

function _nodes_init() {
	Nodes.ele = $('#nodecontainer').css({
        width: windowWidth + 'px',
        height: windowHeight + 'px'
    });
}

function _nodes_addNode(ele) {
	var text = ele.text();
	var id = Model.addNode(text);
	ele.attr('nid', id);
	var node = new Node({ele:ele});
	Nodes.path.push(node)
}

function _nodes_releaseNodes() {
	Nodes.path.forEach(function(n){
		if(n.ele){
			n.release();
		}
	})
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
	return _.find(Nodes.path, function(n){
		return n.uid == uid;
	})
}