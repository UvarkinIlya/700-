function string_items(){
	//Получение строки, в которой есть значения категорий, id, цены
	const keys = Object.keys(Storage);
	const key_word = 'wc_fragments';

	let propery = '';//Ключ от для всех обектов

	for (let i = 0; i < keys.length; i++){
		if(keys[i].indexOf(key_word) != -1){
			propery = keys[i];
		}
	}

	let all_item = Storage[propery];

	return all_item;
}

function get_elem( str, str_start, str_end, start_plus = 0, end_munus = 0, index = -1){
	//Получает на вход исходную стркоку, и граничные строки. Выводит то что находится между ними
	let start = str.indexOf(str_start, last_arr[index]) + start_plus + str_start.length;
	let end = str.indexOf(str_end, start) - end_munus;

	if(index != -1){
		last_arr[index] =  str.indexOf(str_end, start) + str_end.length;
	}

	let ans = str.slice(start, end);

	return ans;
}

function create_object( str ){
	//Получет на вход сторку в которой описан каждый товар и пробразует его в объект
	const arr_start = ['data-product_id=', 'data-cart_item_key=', '<bdi>'];
	const arr_end = ['"', '"', '<span'];
	let arr = [];//Масси значений

	let count = get_elem( str, '"jet-blocks-cart__count-val', '</span>"}', 3);
	count = Number(count);//Кол-во элементов

	//Создание объекта
	let object = {};
	object['my_id'] = {};
	//Проход по каждому товару и занесение его в объект
	for(let i = 0; i < count; i++){
		object['my_id'][i] = {};

		//Заносим в массив arr значене свойств для каждого объекта
		for(let j = 0; j < 2; j++){
			arr[j] = get_elem( str, arr_start[j], arr_end[j], 2, 1, j);
		}
		arr[2] = get_elem( str, arr_start[2], arr_end[2], 0, 0, 2);

		//Занесение свойств товара
		object['my_id'][i]['id'] = arr[0];

		if( arr[1].indexOf('Комбо') != -1 )
		{
			object['my_id'][i]['combo_flag'] = true;// true - если товар принадлежит комбо
			for(let j = 0; j < combo_item.length; j++) // Поиск к какому иммено комбо относится товар
			{
				if( arr[1].indexOf(combo_item[j]) != -1)
				{
					object['my_id'][i]['categor'] = combo_item[j];
				}
			}
		}
		else
		{
			object['my_id'][i]['combo_flag'] = false;
			object['my_id'][i]['categor'] = 'Не комбо';
		}
		object['my_id'][i]['price'] = arr[2];
	}

	return object;
}

const Storage = window.sessionStorage;//Взятие sessionStorage
const combo_item = ['Суп', 'Салат' , 'Паста'];//Категории комбо
let last_arr = [0, 0, 0];//Массив индексов прошлого нахождения
let all_item = string_items(); //Строка со всеми объектами
let object = create_object(all_item);//Объет всех товаров

console.log(object);