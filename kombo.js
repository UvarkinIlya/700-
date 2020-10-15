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

function create_object( str ){
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

	return object;
}

const Storage = window.sessionStorage;//Взятие sessionStorage
const combo_item = ['Суп', 'Салат' , 'Паста'];//Категории комбо
let last_arr = [0, 0, 0, 0];//Массив индексов прошлого нахождения

let all_item = string_items(); //Строка со всеми объектами
let object = create_object(all_item);//Объет всех товаров

//<div class="widget_shopping_cart_content">↵↵	<ul class="woocommerce-mini-cart cart_list product_list_widget ">↵						<li class="woocommerce-mini-cart-item mini_cart_item">↵					<a href="http://salalat.com.ua/cart/?remove_item=f855bdbd2e05b3cffe13b731825fc566&#038;_wpnonce=c26f097d63" class="remove remove_from_cart_button" aria-label="Удалить эту позицию" data-product_id="179" data-product_categor="f855bdbd2e05b3cffe13b731825fc566" data-cart_item_key="Комбо меню Паста" data-product_sku="">&times;</a>											<a href="http://salalat.com.ua/product/white-paper-coffee-hot-cups-with-black-travel-lids-and-sleeves/">↵							<img width="300" height="300" src="http://salalat.com.ua/wp-content/uploads/2019/05/1BFC9DF3-229E-4C67-AB8E-4D69E84C2682-300x300.jpg" class="attachment-woocommerce_thumbnail size-woocommerce_thumbnail" alt="" loading="lazy" srcset="http://salalat.com.ua/wp-content/uploads/2019/05/1BFC9DF3-229E-4C67-AB8E-4D69E84C2682-300x300.jpg 300w, http://salalat.com.ua/wp-content/uploads/2019/05/1BFC9DF3-229E-4C67-AB8E-4D69E84C2682-150x150.jpg 150w, http://salalat.com.ua/wp-content/uploads/2019/05/1BFC9DF3-229E-4C67-AB8E-4D69E84C2682-230x230.jpg 230w, http://salalat.com.ua/wp-content/uploads/2019/05/1BFC9DF3-229E-4C67-AB8E-4D69E84C2682-400x400.jpg 400w, http://salalat.com.ua/wp-content/uploads/2019/05/1BFC9DF3-229E-4C67-AB8E-4D69E84C2682-640x640.jpg 640w, http://salalat.com.ua/wp-content/uploads/2019/05/1BFC9DF3-229E-4C67-AB8E-4D69E84C2682-100x100.jpg 100w" sizes="(max-width: 300px) 100vw, 300px" />Овочева паста ( 300 г )						</a>↵															<span class="quantity">1 &times; <span class="woocommerce-Price-amount amount"><bdi>95.00<span class="woocommerce-Price-currencySymbol">&#8372;</span></bdi></span></span>				</li>↵								<li class="woocommerce-mini-cart-item mini_cart_item">↵					<a href="http://salalat.com.ua/cart/?remove_item=7504adad8bb96320eb3afdd4df6e1f60&#038;_wpnonce=c26f097d63" class="remove remove_from_cart_button" aria-label="Удалить эту позицию" data-product_id="881" data-product_categor="7504adad8bb96320eb3afdd4df6e1f60" data-cart_item_key="Комбо меню Салати" data-product_sku="">&times;</a>											<a href="http://salalat.com.ua/product/%d1%81%d0%b0%d0%bb%d0%b0%d1%82-%d1%81%d0%b8%d1%80-%d0%ba%d1%83%d1%80%d0%ba%d0%b0-%d1%88%d0%bf%d0%b8%d0%bd%d0%b0%d1%82-300-%d0%b3/">↵							<img width="300" height="300" src="http://salalat.com.ua/wp-content/uploads/2020/10/5D7BB62B-7B58-4CF4-A3FD-247651ED59AD-2-300x300.jpg" class="attachment-woocommerce_thumbnail size-woocommerce_thumbnail" alt="" loading="lazy" srcset="http://salalat.com.ua/wp-content/uploads/2020/10/5D7BB62B-7B58-4CF4-A3FD-247651ED59AD-2-300x300.jpg 300w, http://salalat.com.ua/wp-content/uploads/2020/10/5D7BB62B-7B58-4CF4-A3FD-247651ED59AD-2-150x150.jpg 150w, http://salalat.com.ua/wp-content/uploads/2020/10/5D7BB62B-7B58-4CF4-A3FD-247651ED59AD-2-230x230.jpg 230w, http://salalat.com.ua/wp-content/uploads/2020/10/5D7BB62B-7B58-4CF4-A3FD-247651ED59AD-2-400x400.jpg 400w, http://salalat.com.ua/wp-content/uploads/2020/10/5D7BB62B-7B58-4CF4-A3FD-247651ED59AD-2-640x640.jpg 640w, http://salalat.com.ua/wp-content/uploads/2020/10/5D7BB62B-7B58-4CF4-A3FD-247651ED59AD-2-100x100.jpg 100w" sizes="(max-width: 300px) 100vw, 300px" />Салат сир - курка - шпинат ( 300 г )						</a>↵															<span class="quantity">3 &times; <span class="woocommerce-Price-amount amount"><bdi>105.00<span class="woocommerce-Price-currencySymbol">&#8372;</span></bdi></span></span>				</li>↵								<li class="woocommerce-mini-cart-item mini_cart_item">↵					<a href="http://salalat.com.ua/cart/?remove_item=2a084e55c87b1ebcdaad1f62fdbbac8e&#038;_wpnonce=c26f097d63" class="remove remove_from_cart_button" aria-label="Удалить эту позицию" data-product_id="859" data-product_categor="2a084e55c87b1ebcdaad1f62fdbbac8e" data-cart_item_key="Комбо меню Паста" data-product_sku="">&times;</a>											<a href="http://salalat.com.ua/product/%d1%82%d0%b5%d0%bb%d1%8f%d1%82%d0%b8%d0%bd%d0%b0-%d1%82%d0%be%d0%bc%d0%b0%d1%82%d0%b8-%d0%bd%d0%b0-%d1%80%d1%83%d0%ba%d0%be%d0%bb%d0%b0-300-%d0%b3/">↵							<img width="300" height="300" src="http://salalat.com.ua/wp-content/uploads/2020/09/AC131106-D8A3-439C-81C8-2D634C716AFF-300x300.jpg" class="attachment-woocommerce_thumbnail size-woocommerce_thumbnail" alt="" loading="lazy" srcset="http://salalat.com.ua/wp-content/uploads/2020/09/AC131106-D8A3-439C-81C8-2D634C716AFF-300x300.jpg 300w, http://salalat.com.ua/wp-content/uploads/2020/09/AC131106-D8A3-439C-81C8-2D634C716AFF-150x150.jpg 150w, http://salalat.com.ua/wp-content/uploads/2020/09/AC131106-D8A3-439C-81C8-2D634C716AFF-230x230.jpg 230w, http://salalat.com.ua/wp-content/uploads/2020/09/AC131106-D8A3-439C-81C8-2D634C716AFF-400x400.jpg 400w, http://salalat.com.ua/wp-content/uploads/2020/09/AC131106-D8A3-439C-81C8-2D634C716AFF-640x640.jpg 640w, http://salalat.com.ua/wp-content/uploads/2020/09/AC131106-D8A3-439C-81C8-2D634C716AFF-100x100.jpg 100w" sizes="(max-width: 300px) 100vw, 300px" />Телятина томати та рукола ( 300 г )						</a>↵															<span class="quantity">1 &times; <span class="woocommerce-Price-amount amount"><bdi>100.00<span class="woocommerce-Price-currencySymbol">&#8372;</span></bdi></span></span>				</li>↵								<li class="woocommerce-mini-cart-item mini_cart_item">↵					<a href="http://salalat.com.ua/cart/?remove_item=8f53295a73878494e9bc8dd6c3c7104f&#038;_wpnonce=c26f097d63" class="remove remove_from_cart_button" aria-label="Удалить эту позицию" data-product_id="179" data-product_categor="8f53295a73878494e9bc8dd6c3c7104f" data-cart_item_key="Комбо меню Паста" data-product_sku="">&times;</a>											<a href="http://salalat.com.ua/product/white-paper-coffee-hot-cups-with-black-travel-lids-and-sleeves/">↵							<img width="300" height="300" src="http://salalat.com.ua/wp-content/uploads/2019/05/1BFC9DF3-229E-4C67-AB8E-4D69E84C2682-300x300.jpg" class="attachment-woocommerce_thumbnail size-woocommerce_thumbnail" alt="" loading="lazy" srcset="http://salalat.com.ua/wp-content/uploads/2019/05/1BFC9DF3-229E-4C67-AB8E-4D69E84C2682-300x300.jpg 300w, http://salalat.com.ua/wp-content/uploads/2019/05/1BFC9DF3-229E-4C67-AB8E-4D69E84C2682-150x150.jpg 150w, http://salalat.com.ua/wp-content/uploads/2019/05/1BFC9DF3-229E-4C67-AB8E-4D69E84C2682-230x230.jpg 230w, http://salalat.com.ua/wp-content/uploads/2019/05/1BFC9DF3-229E-4C67-AB8E-4D69E84C2682-400x400.jpg 400w, http://salalat.com.ua/wp-content/uploads/2019/05/1BFC9DF3-229E-4C67-AB8E-4D69E84C2682-640x640.jpg 640w, http://salalat.com.ua/wp-content/uploads/2019/05/1BFC9DF3-229E-4C67-AB8E-4D69E84C2682-100x100.jpg 100w" sizes="(max-width: 300px) 100vw, 300px" />Овочева паста ( 300 г )						</a>↵															<span class="quantity">1 &times; <span class="woocommerce-Price-amount amount"><bdi>95.00<span class="woocommerce-Price-currencySymbol">&#8372;</span></bdi></span></span>				</li>↵								<li class="woocommerce-mini-cart-item mini_cart_item">↵					<a href="http://salalat.com.ua/cart/?remove_item=96da2f590cd7246bbde0051047b0d6f7&#038;_wpnonce=c26f097d63" class="remove remove_from_cart_button" aria-label="Удалить эту позицию" data-product_id="177" data-product_categor="96da2f590cd7246bbde0051047b0d6f7" data-cart_item_key="" data-product_sku="">&times;</a>											<a href="http://salalat.com.ua/product/amazonfresh-just-bright-whole-bean-coffee-light-roast/">↵							<img width="300" height="300" src="http://salalat.com.ua/wp-content/uploads/2019/05/3FC24E67-ADED-4128-B9F8-46F48750C247-300x300.jpg" class="attachment-woocommerce_thumbnail size-woocommerce_thumbnail" alt="" loading="lazy" srcset="http://salalat.com.ua/wp-content/uploads/2019/05/3FC24E67-ADED-4128-B9F8-46F48750C247-300x300.jpg 300w, http://salalat.com.ua/wp-content/uploads/2019/05/3FC24E67-ADED-4128-B9F8-46F48750C247-150x150.jpg 150w, http://salalat.com.ua/wp-content/uploads/2019/05/3FC24E67-ADED-4128-B9F8-46F48750C247-230x230.jpg 230w, http://salalat.com.ua/wp-content/uploads/2019/05/3FC24E67-ADED-4128-B9F8-46F48750C247-400x400.jpg 400w, http://salalat.com.ua/wp-content/uploads/2019/05/3FC24E67-ADED-4128-B9F8-46F48750C247-640x640.jpg 640w, http://salalat.com.ua/wp-content/uploads/2019/05/3FC24E67-ADED-4128-B9F8-46F48750C247-100x100.jpg 100w" sizes="(max-width: 300px) 100vw, 300px" />Паста прошуто песто ( 300 г )						</a>↵															<span class="quantity">1 &times; <span class="woocommerce-Price-amount amount"><bdi>120.00<span class="woocommerce-Price-currencySymbol">&#8372;</span></bdi></span></span>				</li>↵								<li class="woocommerce-mini-cart-item mini_cart_item">↵					<a href="http://salalat.com.ua/cart/?remove_item=170c944978496731ba71f34c25826a34&#038;_wpnonce=c26f097d63" class="remove remove_from_cart_button" aria-label="Удалить эту позицию" data-product_id="884" data-product_categor="170c944978496731ba71f34c25826a34" data-cart_item_key="Комбо меню Салати" data-product_sku="">&times;</a>											<a href="http://salalat.com.ua/product/%d1%81%d0%b0%d0%bb%d0%b0%d1%82-%d0%ba%d1%83%d1%80%d0%ba%d0%b0-%d1%88%d0%bf%d0%b8%d0%bd%d0%b0%d1%82-300-%d0%b3/">↵							<img width="300" height="300" src="http://salalat.com.ua/wp-content/uploads/2020/10/1428C5C3-4921-4446-82F3-5051494F1B69-2-300x300.jpg" class="attachment-woocommerce_thumbnail size-woocommerce_thumbnail" alt="" loading="lazy" srcset="http://salalat.com.ua/wp-content/uploads/2020/10/1428C5C3-4921-4446-82F3-5051494F1B69-2-300x300.jpg 300w, http://salalat.com.ua/wp-content/uploads/2020/10/1428C5C3-4921-4446-82F3-5051494F1B69-2-150x150.jpg 150w, http://salalat.com.ua/wp-content/uploads/2020/10/1428C5C3-4921-4446-82F3-5051494F1B69-2-230x230.jpg 230w, http://salalat.com.ua/wp-content/uploads/2020/10/1428C5C3-4921-4446-82F3-5051494F1B69-2-400x400.jpg 400w, http://salalat.com.ua/wp-content/uploads/2020/10/1428C5C3-4921-4446-82F3-5051494F1B69-2-640x640.jpg 640w, http://salalat.com.ua/wp-content/uploads/2020/10/1428C5C3-4921-4446-82F3-5051494F1B69-2-100x100.jpg 100w" sizes="(max-width: 300px) 100vw, 300px" />Салат курка шпинат ( 300 г )						</a>↵															<span class="quantity">4 &times; <span class="woocommerce-Price-amount amount"><bdi>105.00<span class="woocommerce-Price-currencySymbol">&#8372;</span></bdi></span></span>				</li>↵					</ul>↵↵	<p class="woocommerce-mini-cart__total total">↵		<strong>Подытог:</strong> <span class="woocommerce-Price-amount amount"><bdi>1,165.00<span class="woocommerce-Price-currencySymbol">&#8372;</span></bdi></span>	</p>↵↵	↵	<p class="woocommerce-mini-cart__buttons buttons"><a href="http://salalat.com.ua/cart/" class="button wc-forward">Просмотр корзины</a><a href="http://salalat.com.ua/checkout/" class="button checkout wc-forward">Оформление заказа</a></p>↵↵	↵↵</div>

console.log(object);