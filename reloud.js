function reloud(){
	location.reload(true);
}

function reloud_1(){
	setTimeout(reloud, 500);//Ждать нужно чтобы успел прогрузится sessionstorage
}

function reloud_2(){
	setTimeout(reloud, 3000);//Ждать нужно чтобы успел прогрузится sessionstorage
}

function upgrade_price(){
	setTimeout(enter_price_fun, 3000);//Ждаьб чтобы перезаписалась цена в верхнем правом углу
}

function remember_delit_combo(){
	//Запоминаем какое комбо удалено

}

function emyl_enter(elem){
	let key = new KeyboardEvent('keydown', {key:"Enter", code:"Enter", altKey:false, bubbles: true, cancelBubble: false, cancelable: true, ctrlKey:false, returnValue:true, });

	elem.dispatchEvent(key);
}

function munus_count_by_id(index){
	//let my_lenght = Object.keys(object_item);
	//let id = -1;

	let elem = parent.getElementsByClassName('woocommerce-cart-form__cart-item')[index];
	elem = elem.getElementsByClassName('quantity')[0];

	elem_input = elem.getElementsByTagName('input')[0];

	let input_value = Number(elem_input.value) - 1;

	elem_input.setAttribute('value', input_value);
}

function find_item_by_id( object, id ){
	let nest_object = object['my_id'];
	let index = -1;
	id = Number(id);

	for(let key in nest_object){
		if(nest_object[key]['id'] == id){
			index = Number(key);
			break;
		}
	}

	munus_count_by_id(index);

	return index;
}

function set_session(item1 = '', item2 = ''){
	let item = '';

	if(item2 != ''){
		item = '{' + item1 + '+' + item2 + '},';
	}else{
		item = '{' + item1 + '},';
	}

  sessionStorage.setItem('delit', Storage['delit'] + item);
}

/*function reloud_3(elem){
	//Удалить combo
	let elem_a = elem.getElementsByTagName('a')[0];
	let id = elem_a.dataset.product_id;
	let arr_id = id.split('+');// Массив из 1-2 id
	let arr_index = [];//Массив индексов, которые нужно уменьшить на 1

	arr_index[0] = find_item_by_id( object_item, arr_id[0] );
	if( arr_id[1] != ''){
		arr_index[1] = find_item_by_id( object_item, arr_id[1] );
	}

	//emyl_enter(elem_input);
	set_session(arr_index[0], arr_index[1])
}*/

function reloud_3(elem, index){
	let elem_parent = elem.parentNode;//Весь товар
	let elem_a = elem.getElementsByTagName('a')[0];

	let combo_index = index - Object.keys(object_item['my_id']).length - 1;//Индекс комбо, который удалили

	sessionStorage.setItem('delit', Storage['delit'] + ',' + combo_index);//Установка в sessionStorage индексы удаланных комбо

	localStorage.setItem('delit', Storage['delit'] + ',' + combo_index);
	elem_parent.style.display = 'none';//Удаляем комбо со страницы

	reloud_2();

	//Обновление цены
}

function listen_remove_combo(){
	let a_href = '';

	for(let i = 0; i < item_remove.length; i++){
		a_href = item_remove[i]/*.getElementsByTagName('a')[0].href*/;
		a_href = a_href.getElementsByTagName('a')[0];
		if(a_href == undefined){
			continue;
		}

		let total_price = document.getElementsByClassName('jet-blocks-cart__total-val')[0];
		//total_price.input = () => reload2();

		if(a_href.href == 'http://salalat.com.ua/cart/'){
			item_remove[i].onclick = () => reloud_3(item_remove[i], i);//Обновляет страницу при удалении combo
		}else{
			item_remove[i].onclick = reloud_2;//Обновляет страницу при удалении товара
		}
	}
}

const item_qty = document.getElementsByClassName('qty');
const item_remove = document.getElementsByClassName('product-remove');


if(link == 'http://salalat.com.ua/cart/'){

	for(let i = 0; i < item_qty.length; i++){
		item_qty[i].onchange = reloud_1;//Обновляет страницу при измении кол-ва
	}

	listen_remove_combo();

	elem_input = '';

	//Установка функции обновления цены на страницые при выборе другого селектора
	let develory_parent = document.getElementById('shipping_method');
	for(let i = 0; i < 3; i++){
		let develory = develory_parent.getElementsByTagName('input')[i];
		develory.onclick = reloud_2; 
	}
}


