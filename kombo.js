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

function count_li( str ){
	//Считает кол-во товаров с разными id
	let last_pos = 0;
	let count = 0;

	while( str.indexOf('<li', last_pos) != -1 ){
		count++;
		last_pos = str.indexOf('<li', last_pos) + 3;
	}

	return count;
}

function total_price( object ){
	//Считает цену до применения комбо
	let new_object = object['my_id'];
	let total_price = 0;

	for( let key in new_object ){
		let curent_price =  Number(new_object[key]['price_one']);
		let curent_count = new_object[key]['count'];

		total_price += curent_price * curent_count;
	}

	return total_price;
}

function create_object_product( str ){
	//Получет на вход сторку в которой описан каждый товар и пробразует его в объект
	const arr_start = ['data-product_id=', 'data-cart_item_key=', '<bdi>', 'quantity'];
	const arr_end = ['"', '"', '<span', ' &times'];
	let arr = [];//Масси значений

	let count = count_li( str );
	//let count = get_elem( str, '"jet-blocks-cart__count-val', '</span>"}', 3);
	//count = Number(count);//Кол-во элементов

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
		arr[3] = get_elem( str, arr_start[3], arr_end[3], 3, 0, 3);

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
		object['my_id'][i]['price_one'] = arr[2];
		object['my_id'][i]['count'] = arr[3];

		//Создание подобъеткта с id_combo для каждого товара
		object['my_id'][i]['id_combo'] = {};
		for(let j = 0; j < arr[3]; j++){
			object['my_id'][i]['id_combo'][j] = -1;
		}
	}

	object['total_price'] = total_price( object );

	//Считате стоимость доп. опций
	let all_price = get_elem( str, '"jet-blocks-cart__total-val', '&#8372;</span>', 3, 0);
	all_price = Number(all_price.replace(',',''));
	price_product = Number(object['total_price']);

	object['option_price'] = all_price - price_product;
	//object['option_price'] = Number(all_price) - Number(object['total_price']);

	return object;
}

function define_categor( categor ){
	//Определение категории
	let arr = [];
	let j = 0;

	for(let i = 0; i < combo_item.length; i++){
		if( categor == combo_item[i] ) continue;
		arr[j] = combo_item[i];
		j++ 
	}

	return arr;
}

function establish_price( elem1, elem2){
	//Установление цены для комбо
	let price = 0;

	for(let i = 0; i < combo_set.length; i++){
		if( ((elem1 == combo_set[i][0]) && (elem2 == combo_set[i][1])) ||
				((elem1 == combo_set[i][1])  && (elem2 == combo_set[i][0])) ){
			price = set_price[i];
			break;
		}
	}

	return price;
}

function find_item( object, key_item, inside_key_item, arr_categor, categor_item ){
	//Поиска элемента с для создания combo

	let price_1 = Number(object[key_item]['price_one']);// Цена товара для которого был вызов
	//Проверка на Крем суп
	if (categor_item == 'Крем'){
		object[key_item]['id_combo'][inside_key_item] = count_combo;
		count_combo++;
		object_combo[count_object_combo] = {};
		object_combo[count_object_combo]['combo_name'] = "Крем суп дня";
		object_combo[count_object_combo]['price'] = set_price[3];
		object_combo[count_object_combo]['price_old'] = price_1;
		object_combo[count_object_combo]['id_product_1'] = object[key_item]['id'];

		count_object_combo++;

		return;
	}

	for( let key in object ){
		let inside_object = object[key]['id_combo'];
		if( object[key]['combo_flag'] == false) continue;

		let categor = object[key]['categor'];//Категория товара
		let price_2 = Number(object[key]['price_one']);//Цена товара для которого выполняется проверка

		for( inside_key in inside_object){
			let combo_id = inside_object[inside_key];//Значение combo

			if( combo_id == -1 && ((categor == arr_categor[0]) || (categor == arr_categor[1])) ){
				//Если нашли элемент для создания combo
				object[key_item]['id_combo'][inside_key_item] = count_combo;//Элемент для которого выполнялся запрос
				inside_object[inside_key] = count_combo;// Найденный элемент
				count_combo++;

				object_combo[count_object_combo] = {};

				if(categor == arr_categor[0]){
					object_combo[count_object_combo]['combo_name'] = categor_item + '+' + arr_categor[0];
					object_combo[count_object_combo]['price'] = establish_price(categor_item, arr_categor[0]);
				}else{
					object_combo[count_object_combo]['combo_name'] = categor_item + '+' + arr_categor[1];
					object_combo[count_object_combo]['price'] = establish_price(categor_item, arr_categor[1]);
				}

				object_combo[count_object_combo]['price_old'] = price_1 + price_2;

				object_combo[count_object_combo]['id_product_1'] = object[key_item]['id'];
				object_combo[count_object_combo]['id_product_2'] = object[key]['id'];

				count_object_combo++;

				return;
			}
		}
	}
}

function change_combo( object ){
	//Разбиение какегорий на группы object_item 
	let new_object = {};

	//Проход по всем знаяениям
	object = object['my_id'];
	for( let key in object ){
		let inside_object = object[key]['id_combo'];
		if( object[key]['combo_flag'] == false) continue;

		let categor = object[key]['categor'];//Категория товара
		let arr_categor = define_categor(categor);

		for( inside_key in inside_object){
			let combo_id = inside_object[inside_key];//Значение combo

			if(combo_id == -1){
				find_item(object, key, inside_key, arr_categor, categor);
			}
		}

	}

	return;
}

function count_combo_price( object ){
	//Подсчет разницы с учетом combo
	let defer = 0;

	for( let key in object ){
		defer += object[key]['price_old'] - object[key]['price'];
	}

	return defer;
}

const Storage = window.sessionStorage;//Взятие sessionStorage
const combo_item = ['Суп', 'Салат', 'Паста', 'Крем'];//Категории комбо
const combo_set = [['Суп', 'Салат'],
									 ['Салат', 'Паста'],
									 ['Суп', 'Паста']];
const set_price = [175, 195, 170, 75];
const arr_img = ['http://salalat.com.ua/wp-content/uploads/2019/05/Mask-Group-7-300x300.png', 'hreh2', 'href3', 'href4'];//Массив src img
let last_arr = [0, 0, 0, 0];//Массив индексов прошлого нахождения
let count_combo = 0;// Счетчик кол-ва combo 
let count_object_combo = 0;
let object_combo = {};

let all_item = string_items(); //Строка со всеми объектами
let object_item = create_object_product(all_item);//Объет всех товаров

change_combo(object_item);

object_item['combo_price'] = object_item['total_price'] - count_combo_price(object_combo);//Вывод цены с учетом combo

console.log(object_item);
console.log(object_combo);