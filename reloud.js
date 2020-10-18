function reloud(){
	location.reload(true);
}

function reloud_1(){
	setTimeout(reloud, 500);//Ждать нужно чтобы успел прогрузится sessionstorage
}

function reloud_2(){
	setTimeout(reloud, 3000);//Ждать нужно чтобы успел прогрузится sessionstorage
}

const item_qty = document.getElementsByClassName('qty');
const item_remove = document.getElementsByClassName('product-remove');

for(let i = 0; i < item_qty.length; i++){
	item_qty[i].onchange = reloud_1;//Обновляет страницу при измении кол-ва
}

for(let i = 0; i < item_remove.length; i++){
	item_remove[i].onclick = reloud_2;//Обновляет страницу при удалении товара
}


