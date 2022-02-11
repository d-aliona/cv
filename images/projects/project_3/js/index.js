function visitLink(path) {
	if (localStorage.hasOwnProperty(path)) {
		localStorage.setItem(path, parseInt(localStorage.getItem(path))+1);
	} else {
		localStorage.setItem(path, 1); 
	} 
}

function viewResults() {
	const divElem = document.getElementById('content');
	const list = document.createElement('ul');
	const numberLi = 3;

	for (let i = 1; i <= numberLi; i++) {
		let listItem = document.createElement('li');
		let count = localStorage.getItem(`Page${i}`);
		
		if (count === null) {
			count = 0;
		}

		let node = document.createTextNode(`You visited Page${i} ${count} time(s)`);
		listItem.appendChild(node); 
		list.appendChild(listItem);
	}

	divElem.appendChild(list);
	localStorage.clear();
}