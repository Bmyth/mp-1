var Board = {
	init: _board_init,
	update: _board_update,
	ele: null,
	entryNode: null
}

function _board_init(){
	Board.ele = $('#board').empty();
}

function _board_update(){
	var v = Entry.ele.val();
	var html = v;
	console.log(html)
	html = html.replace(new RegExp("/:","g"),"<span>");
	html = html.replace(new RegExp(":/","g"),"</span>");
	html = html + '_'
	Board.ele.html(html);
	_board_syncNodes();
}

function _board_syncTree(){

}