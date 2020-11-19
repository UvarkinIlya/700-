//Вывод комбо внизу
function creat_simple( elem ){
  //Создание комбо для вывода
  let img = elem.getElementsByClassName('product-thumbnail')[0];
  let title = elem.getElementsByClassName('product-name')[0];

  img.getElementsByTagName('a')[0].href = "#";//Удаление ссылки с img
  title.getElementsByTagName('a')[0].href = "#";//Удаление ссылки с названия

  let price = elem.getElementsByClassName('product-price')[0];
  price = price.getElementsByClassName('woocommerce-Price-amount amount')[0];
  let quantity = elem.getElementsByClassName('product-quantity')[0];
  quantity = quantity.getElementsByClassName('quantity')[0];

  price.remove();
  quantity.remove();

  //return elem;
}

function find_index(key_word){
  //Находит index комбо
  let arr = key_word.split('+');//Разбор key_word на части
  let arr_set = [];//Массив combo_set с отсоритровонными под массивами
  let flag = true;
  let index = 3;//Если не нашел совпадений => это крем суп

  for(let i = 0; i < combo_set.length; i++){
    arr_set[i] = combo_set[i];
    arr_set[i].sort();
  }

  arr.sort();

  for(let i = 0; i < arr_set.length; i++){
    flag = true;

    for(let j = 0; j < arr.length; j++){
      if(arr[j] != arr_set[i][j]){
        flag = false;
      }
    }

    if(flag){
      index = i;
      break;
    }
  }

  return index;
}

function get_title(id){
  //Получить название товара по его id
  let elem_id = parent.querySelectorAll("a[data-product_id='"+ id +"']")[0];

  let elem_id_parent = elem_id.parentElement.parentElement;
  let title_parent = elem_id_parent.getElementsByClassName('product-name')[0];
  let title = title_parent.getElementsByTagName('a')[0];
  title = title.innerHTML;

  return title;
}

function establish_title(title_1 , title_2, name_option){
  //Устанавливает название товара
  let title = "";
  let option = '';

  if(name_option != undefined){
    option = ' + ' + name_option;
  }

  if(title_2 != ''){
    title = '<p style="line-height: 28px;">' + title_1 + ' + ' + title_2 + option +'</p>';
  }else{
    title = '<p style="line-height: 28px;">' + title_1 + option + '</p>';
  }

  return title;
}

function delit_href(elem, index){
  //Убирает с href с кнопкок удалить изменяет id combo
  let remove_elem = elem.getElementsByClassName('product-remove')[0];
  remove_elem = remove_elem.getElementsByTagName('a')[0];

  remove_elem.href = "";

  let id_1 = object_combo[index]['id_product_1'];
  let id_2 = '';
  if(object_combo[index]['combo_name'] != 'Крем суп дня'){
    id_2 = object_combo[index]['id_product_2'];
  }

  remove_elem.dataset.product_id = id_1 + '+' + id_2;
}

function create_combo(elem, key, flag){
  //Создание elem
  let img = elem.getElementsByClassName('product-thumbnail')[0].getElementsByTagName('a')[0].getElementsByTagName('img')[0];
  let img_word = object_combo[key]['combo_name'];
  let img_src_index = find_index(img_word);

  img.src = arr_img[img_src_index];//Установка src img

  let title = elem.getElementsByClassName('product-name')[0].getElementsByTagName('a')[0];

  let title_word_1 = object_combo[key]['id_product_1'];
  let title_word_2 = object_combo[key]['id_product_2'];

  let title_1 = get_title(title_word_1);
  let title_2 = "";

  if(title_word_2 != undefined){
    title_2 = get_title(title_word_2);
  }else{
    title_2 = '';
  }

  title.innerHTML = establish_title(title_1 , title_2, object_combo[key]['name_option']);

  let price_combo = elem.getElementsByClassName('product-subtotal')[0].getElementsByTagName('span')[0].getElementsByTagName('bdi')[0];
  let price_combo_span = price_combo.getElementsByTagName('span')[0].innerHTML;
  let price_combo_new = object_combo[key]['price'];

  let price_option = 0;
  if(object_combo[key]['price_option'] != undefined){
    price_option = object_combo[key]['price_option'];
    price_option = Number(price_option);
  }

  price_combo.innerHTML = (price_combo_new + price_option) + '.00' + price_combo_span;

  delit_href(elem, key);//Убирает с href с кнопкок удалить

  if(flag){
    elem.style.display = 'none';
  }
}

function del_count_price(){
  let dom_count = document.querySelectorAll('th.product-quantity')[0];
  dom_count.innerHTML = '';

  let dom_price = document.querySelectorAll('th.product-price')[0];
  dom_price.innerHTML = '';
}

function count_item( object, index ){
  //Считает кол-во товаров не входяших в комбо
  let nest_object = object['my_id'][index]['id_combo'];
  let count = 0;

  for(let key in nest_object){
    if(nest_object[key] == -1){
      count++;
    }
  }

  return count;
}

function change_price( object, index, count, elem_price){
  //Устанвавливает новую цену
  let nest_object = object['my_id'][index]['id_combo'];
  let price = Number(object['my_id'][index]['price_one']);//Цена одного товара
  let count_residue = Object.keys(nest_object).length - count;//Сколько удалили товаров
  let old_price = elem_price.innerText;

  let sepater = old_price.indexOf('₴');
  old_price = old_price.slice(0, sepater);

  let new_price = Number(old_price) - (count_residue * price);

  elem_price.innerText = new_price + '.00₴';
}

/*function establish_delit_seting(str){
  //Применение данных из session['dilit']
  let arr = str.split(',');
  let elem1_id = '';
  let elem2_id = '';

  for(let i = 0; i < arr.length - 1; i++){
    elem1_id = arr[i].slice(arr[i].indexOf('{') + 1, arr[i].indexOf('+'));

    if(arr[i].indexOf('+') != -1){
      elem2_id = arr[i].slice(arr[i].indexOf('+') + 1, arr[i].indexOf('}'));
    }

    elem1 = parent.getElementsByClassName('woocommerce-cart-form__cart-item')[elem1_id];
    elem2 = parent.getElementsByClassName('woocommerce-cart-form__cart-item')[elem2_id];

    elem1 = elem1.getElementsByClassName('quantity')[0];
    elem2 = elem2.getElementsByClassName('quantity')[0];

    elem1 = elem1.getElementsByTagName('input')[0];
    elem2 = elem2.getElementsByTagName('input')[0];

    elem1.setAttribute('value', elem1.value - 1);
    elem2.setAttribute('value', elem2.value - 1);
  }
}*/

function delit_item( object ){
  //Удаляет товары, которые уже есть в комбо и устанвливает новое кол-во товоров, если кол-во != 0
  let nest_object = object['my_id'];
  let elem = '';
  let elem_input = '';
  let elem_price = '';
  let count = 0;
  let flag = true;

  for(key in nest_object){
    elem = document.getElementsByClassName('woocommerce-cart-form__cart-item')[key];

    elem_price = elem.getElementsByClassName('product-subtotal')[0];
    elem_price = elem_price.getElementsByTagName('bdi')[0];

    elem_input = elem.getElementsByClassName('product-quantity')[0];
    elem_input = elem_input.getElementsByTagName('input')[0];

    count = count_item(object, key);

    elem_input.value = count;

    if(count == 0){
      elem.style.display = 'none';
    }else{
      change_price(object_item, key, count, elem_price);//Изменят подытог
      flag = false;
    }
  }

  if(flag){
    del_count_price();
  }
}

function emyl_click( elem ){
  //Симулирует click
  let item = elem.getElementsByClassName('product-remove')[0].getElementsByTagName('a')[0];
  let click = new MouseEvent("click");

  item.dispatchEvent(click);
}

/*function count_price(){
  //Устнавливает цену для вывоа
  let enter_price = object_item['total_price'];
  let price_del_combo = 0;//Суммарная цена удаленных комбо, которые еще есть в enter_price

  let len = Object.keys(object_combo).length;
  for(let i = 0; i < len; i++){
    let flag = false;

    for(let j = 1; j < arr_delit_combo.length; j++){
      if(Number(arr_delit_combo[j]) === i){
        flag = true;
      }
    }

    if(flag){
      price_del_combo += object_combo[i]['price'];
    }
  }

  enter_price -= price_del_combo;

  return enter_price;
}*/

function enter_price_fun(){
  //Вывод цены на страницу
  enter_price = count_price();//Устанавливает новую цену
  if(enter_price == 0){
    enter_price = Number(localStorage['sum_price']);
  }
  //let elem_1 = document.getElementsByClassName('jet-blocks-cart__total-val')[0];
  //elem_1.innerHTML = enter_price + '.00₴';

  //if(link == 'http://salalat.com.ua/cart/'){
    //let elem_1 = document.getElementsByClassName('jet-blocks-cart__total-val')[0];
    let parent_elem_2 = document.getElementsByClassName('cart-subtotal')[0];
    let elem_2 = parent_elem_2.getElementsByTagName('bdi')[0];
    let parent_elem_3 = document.getElementsByClassName('order-total')[0];
    let elem_3 = parent_elem_3.getElementsByTagName('bdi')[0];

    let develory_parent = document.getElementById('shipping_method');
    let develory = develory_parent.getElementsByTagName('input')[2];
    let develory_flag = develory.checked;

    //elem_1.innerHTML = enter_price + '.00₴';
    elem_2.innerText = enter_price + '.00₴';

    if(develory_flag){
      if(Number(enter_price) >= MAX_DELIVERY_PRICE){
        elem_3.innerText = enter_price + '.00₴';
      }else{
        elem_3.innerText = Number(enter_price + DELIVERY_PRICE) + '.00₴';
      }
    }else{
      elem_3.innerText = enter_price + '.00₴';
    }
  //}
}

function count_option(){
  //Считываем цену доп. опций если она есть. Обновляем цену товара, подытог. Записываем стоимость доп опций в object_item
  //Запускаем большой цикл по всем элементам из начального списка
  let len = Object.keys(object_item['my_id']).length;
  for(let i = 0; i < len; i++){
    let elem = parent.getElementsByClassName('woocommerce-cart-form__cart-item')[i];//Взяли определленный товар из начального списка

    let elem_option = elem.getElementsByClassName('variation')[0];

    if(elem_option == undefined){
      continue;//Если не нашли доп. опций переходи на следующую итерацию
    }

    elem_option = elem_option.getElementsByTagName('p')[0].innerHTML;// Строка, кототорая содержит цену доп. опций выделенного товара

    //Получение из строки нужной цену опции
    let start = elem_option.indexOf('+') + 1;
    let end = elem_option.indexOf('₴');
    let option = elem_option.slice(start, end);// Цена доп. опций

    option = Number(option);//Привод переменной к типу int

    //Записываем стоимость в object_item
    object_item['my_id'][i]['option'] = option;

    //Добавляем option в combo. Установка названий доп. опций в object_combo
    let len_j = Object.keys(object_item['my_id'][i]['id_combo']).length;// Кол-во элэментов у которых данное доп.опция
    for(let j = 0; j < len_j; j++){

      let object = object_item['my_id'][i]['id_combo'];

      index = object[j];//Порядок комбо

      if(index == -1){
        continue;
      }

      //Устнавока имени доп. опции для всех элементов combo у которых данное опция
      if(object_combo[index]['name_option'] === undefined){
        object_combo[index]['name_option'] = elem_option;
      }else{
        object_combo[index]['name_option'] = object_combo[index]['name_option'] + '+' + elem_option;
      }

      //Добавляем option в combo
      if(object_combo[index]['price_option'] === undefined){
        object_combo[index]['price_option'] = option;
      }else{
        object_combo[index]['price_option'] = object_combo[index]['price_option'] + option;
      }

    }

    //Обновляем цену товара и подытог у начального списка
    let product_price = elem.getElementsByClassName('product-price')[0];
    product_price = product_price.getElementsByTagName('bdi')[0];// Элементт в котором записана цена одного товара

    let price = Number(object_item['my_id'][i]['price_one']) + option;// Цена одного товара вместе доп. опциями
    product_price.innerHTML = price + '.00₴';// Устанавливаем цену одного товара

    let product_subtotal = elem.getElementsByClassName('product-subtotal')[0];
    product_subtotal = product_subtotal.getElementsByTagName('bdi')[0];// Элемент в котором записан подытог

    product_subtotal.innerHTML = (price * object_item['my_id'][i]['count']) + '.00₴';//Устанавливаем подытог
  }
}

function count_price(){
  //Считает общую цену
  //Считываем цену со страницы
  let sum_price = 0;//Суммарная цена
  if(link == 'http://salalat.com.ua/cart/'){
    let elems = parent.getElementsByClassName('woocommerce-cart-form__cart-item');//Все элементы

    for(let i = 0; i < elems.length; i++){
      if(elems[i].style.display != 'none'){
        //Если элемент есть на страницу
        let elem = elems[i].getElementsByClassName('product-subtotal')[0];
        elem = elem.getElementsByClassName('woocommerce-Price-amount')[0];
        elem = elem.getElementsByTagName('bdi')[0].innerHTML;

        elem = elem.slice( 0, elem.indexOf('₴') );//Взятие только цены
        elem = Number(elem);

        sum_price += elem;
      }
    }

    localStorage['sum_price'] = sum_price;//Заносим суммарную цену в localStorage
  }/*else{
    //Если мы находимся не на странице оформления заказа. И не можем посчитать цену, по странице
    let elem = document.getElementsByClassName('jet-blocks-cart__total-val')[0];
    elem = elem.innerHTML;
    elem = elem.slice( 0, elem.indexOf('₴') );
    elem = elem.slice( 0, elem.indexOf(',') ) + elem.slice( elem.indexOf(',') + 1);
    elem = Number(elem);

    if(localStorage['old_price'] == undefined || localStorage['old_price'] == ""){
      localStorage['old_price'] = elem;
      //reloud_2();
    }else{
      sum_price =  Number(localStorage['sum_price']) + Number(elem - Number(localStorage['old_price']));
      localStorage['old_price'] = "";
    }
  }*/

  //Вывод на цены на страницу
  return sum_price;
}

//Устанавливает "в корзину" вместо цены корзины на всех страницах
function establish_backet(){
  let parent = document.getElementsByClassName('jet-blocks-cart__total')[0];
  let elem = document.getElementsByClassName('jet-blocks-cart__total-val')[0];

  let new_elem = elem.cloneNode(true);//Создает копию elem с глубоким клонированием
  new_elem.innerHTML = 'Корзина'
  new_elem.className = "";//Удаляем все классы, т.к цена задается по классам

  parent.append(new_elem);//Добавляем новый элемент в конец

  elem.remove();//Удаление страрового узла с ценой, т.к код wordpress изменяет его и выводит на страницу
}

function creat_output(){
  //Создаем обект для вывода его на странице оплаты и заносим его в LocalStorage
  //Считываем товары со страницы
  let object = {};// объект в который будем все заносить
  let new_elems = [];//Массив в котором храняться элемент выведенные на странице

  let elems = parent.getElementsByClassName('woocommerce-cart-form__cart-item');//Массив со всеми элементами

  for(let i = 0; i < elems.length; i++){
    //Фильтрация
    if(elems[i].style.display != 'none'){
      new_elems.push(elems[i]);
    }
  }

  //Добавлене в object нужных свойств
  for(let i = 0; i < new_elems.length; i++){
    let name = new_elems[i].getElementsByClassName('product-name')[0];//Название товара + доп опции
    name = name.getElementsByTagName('a')[0].innerText;

    let count = new_elems[i].getElementsByClassName('quantity')[0];//Кол-во товаров, елси комбо то 1

    if(count == undefined){
      count = 1;
    }else{
      count = count.getElementsByTagName('input')[0];
      count = Number(count.value);
    }

    let price = new_elems[i].getElementsByClassName('product-subtotal')[0];//Подытог
    price = price.getElementsByTagName('bdi')[0].innerHTML;

    establish_output(object, name, count, price, i);//Заносим все данные в object

  }

  let json = JSON.stringify(object);//Преобразуем object в string для передачи в localstorage

  localStorage['out_object'] = json;//Передаем в localstorage
}

function establish_output(object, name, count, price, index){
  //Заносим все данные в object
  object[index] = {};//Создаем подобъект

  object[index]['name'] = name;
  object[index]['count'] = count;
  object[index]['price'] = price;
}

function output_checkout(object){
  //Функия для вывода новых(измененных товаров на страницу офрмелния заказа)
  let simle = document.getElementsByClassName('cart_item')[0];//Берем товар для образца
  simle = simle.cloneNode(true);//Создаем его копию, чтобы он не менялся при измении страницы

  let parent = document.getElementsByClassName('shop_table')[0];//Родительский элмент, где храняться все товары
  parent = parent.getElementsByTagName('tbody')[0];

  //Удаляем стартовые элементы со страницы
  let elems = document.getElementsByClassName('cart_item');
  for(let i = 0; i < elems.length; i++){
    elems[i].style.display = 'none';
  }

  let sum_price = 0;//Общая цена всех новых товаров

  //Выводим новые товары
  let len = Object.keys(object).length;
  for(let i = 0; i < len; i++){
    //Задаем в переменные свойства object
    let name = object[i]['name'];
    let count = object[i]['count'];
    let price = object[i]['price'];
    let count_price = price.slice(0, price.indexOf('₴'));

    sum_price += Number(count_price);

    let elem = simle.cloneNode(true);//Создаем новый элемент

    //Устанававливаем свойства из object
    let elem_name = elem.getElementsByClassName('product-name')[0];
    elem_name.innerHTML = name + '<strong class="product-quantity">×&nbsp;1</strong>';

    let elem_count = elem.getElementsByClassName('product-quantity')[0];
    elem_count.innerHTML = '× ' + count;

    let elem_price = elem.getElementsByTagName('bdi')[0];
    elem_price.innerText = price;

    parent.append(elem);//Добавляем новый элемент в конец родителя
  }

  //Устанавливаем новую цену
  let elem_sum_price = document.getElementsByClassName('cart-subtotal')[0];
  elem_sum_price = elem_sum_price.getElementsByTagName('bdi')[0];

  elem_sum_price.innerHTML = sum_price + '.00₴';

  let order_total = document.getElementsByClassName('order-total')[0];
  order_total = order_total.getElementsByTagName('bdi')[0];

  order_total.innerHTML = sum_price + '.00₴';
}

let link, arr_delit_combo, enter_price, parent, output_object; //Глобальные переменные

//Главная функция для вывода данных на страницу
function main_enter(){
  link = window.location.href;
  arr_delit_combo = localStorage['delit'];// Получаем массив indexов удаленных комбо
  enter_price = 0;//Цена для вывода
  parent = '';

  change_buy_name();

  setTimeout(enter_price_fun, 2000);//Вывод цены на страницу пауза нужна чтобы не изменилась цена в верхнем правом углу
  establish_backet();//Устанавливает "в корзину" вместо цены корзины на всех страницах

  if(link == 'http://salalat.com.ua/cart/'){
    let big_parent = document.getElementsByClassName('woocommerce-cart-form__contents')[0];
    parent = big_parent.getElementsByTagName('tbody')[0];//Куда будем добовлять элементы

    const simple_child_1 = document.getElementsByClassName('woocommerce-cart-form__cart-item')[0];
    const simple_child = simple_child_1.cloneNode(true);//Образец элемента
    creat_simple(simple_child);//Создание примера

    count_option();

    count_combo = Object.keys(object_combo).length;//Подсчет кол-ва комбо
    for(let i = 0; i < count_combo; i++ ){
      let flag = false;//Флаг явлеться ли i удаленным индексом?

      if(arr_delit_combo === undefined){
        arr_delit_combo = [];//Что бы не ломался следующий ццкл при не опрделенным массиве
      }

      //Проверка на это
      for(let j = 1; j < arr_delit_combo.length; j++){
        if(Number(arr_delit_combo[j]) === i){
          flag = true;
        }
      }

      //Вывод каждого комбо
      let elem = simple_child.cloneNode(true);

      create_combo(elem, i, flag);

      parent.append(elem);//Добавление элемента
    }

    delit_item(object_item);//Удаляет из исходного списка товары, которые есть в комбо

    creat_output();//Создает и передает object для вывода на странице оформления заказа
  }else if(link == 'http://salalat.com.ua/checkout/'){
    let object = localStorage['out_object'];
    output_object = JSON.parse(object);

    output_checkout(output_object);//Функия для вывода новых(измененных товаров на страницу офрмелния заказа)
  }

  main_reloud();
}



