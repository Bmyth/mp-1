var Model = {
	init : _model_init,
	addNode : _model_add,
	nodes: []
}

function _model_init() {
	
}

function _model_add(node, linkTexts) {
	linkTexts = linkTexts || []
	var matched = _model_getNodeByText(node.content.text());
	if(!matched){
		var id = (new Date()).valueOf();
		matched = {
			id : id,
			t: node.content.text(),
			links: []
		}
		Model.nodes.push(matched);
	}
	linkTexts.forEach(function(t){
		var n = _model_getNodeByText(t);
		if(n){
			$.merge( matched.links, [n.id]);
			$.merge( n.links, [matched.id]);
		}
	})
	localStorage.setItem('nodelist', JSON.stringify(Model.nodes));
}

function _model_getNodeByText(t){
	return _.find(Model.nodes, function(n) {
		return n.t == t;
	})
}

function _model_getNodeById(id){
	return _.find(Model.nodes, function(n) {
		return n.id == id;
	})
}