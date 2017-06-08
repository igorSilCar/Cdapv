function closeInput() {
	document.getElementById('spoiler').style.display = 'none';
}
var app = {
	el : document.getElementById('corpo'),
	rows : [['coisa','coisa','coisa','coisa']],
	fetchAll : function() {
		var data = '';
		if (this.rows.length > 0) {
			for (i = 0; i < this.rows.length; i++) {
				data += '<tr>';
				for (j = 0; j < this.rows[i].length; j++) {
					data += '<td>' + this.rows[i][j] + '</td>';
				}
				data += '<td><button onclick="app.edit(' + i + ')">Alterar</button></td>';
				data += '<td><button onclick="app.del(' + i + ')">Excluir</button></td>';
				data += '</tr>';
			}
		}
		return this.el.innerHTML = data;
	},
	addrow : function () {
		var elem = document.getElementById('add-row'); 
		var row = elem.value.split(',', 4);
		this.rows.push(row);
		this.fetchAll();
		elem.value = '';
	},
	edit : function (item) {
		//alert(item);
		var elem = document.getElementById('edit-row');
		elem.value = this.rows[item];
		document.getElementById('spoiler').style.display = 'block';
		self = this;
		document.getElementById('saveEdit').onsubmit = function() {
			var row = elem.value;
			if (row) {
				self.rows.splice(item, 1, row.split(',', 4));
				self.fetchAll();
				closeInput();
			}
		}
	},
	del : function (item) {
		this.rows.splice(item, 1);
		this.fetchAll();
	}
};

var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
    if (xhr.readyState == XMLHttpRequest.DONE) {
        alert(xhr.responseText);
    }
}
xhr.open('GET', 'data', true)

app.fetchAll();