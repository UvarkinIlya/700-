function hide_tbod(flag){
	//Запреещает клик
	let link = window.location.href;

	if(link != 'http://salalat.com.ua/cart/'){
		return
	}

	let elem = document.getElementsByTagName('body')[0];
	if(flag){
		elem.style.display = 'none';
	}else{
		//elem.style.display = 'table-row-group';
		elem.style.display = 'block';
	}
}

hide_tbod(true);