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

function establish_title(title_1 , title_2){
  //Устанавливает название товара
  let title = "";

  if(title_2 != ''){
    title = '<p style="line-height: 28px;">' + title_1 + ' + <br>' + title_2 + '</p>';
  }else{
    title = '<p style="line-height: 28px;">' + title_1 + '</p>';
  }

  return title
}

function set_price_fun(){
  //Устанавливает цену

}

function create_combo(elem, key){
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

  title.innerHTML = establish_title(title_1 , title_2);

  let price_combo = elem.getElementsByClassName('product-subtotal')[0].getElementsByTagName('span')[0].getElementsByTagName('bdi')[0];
  let price_combo_span = price_combo.getElementsByTagName('span')[0].innerHTML;
  let price_combo_new = object_combo[key]['price'];

  price_combo.innerHTML = price_combo_new + '.00' + price_combo_span;
}


let big_parent = document.getElementsByClassName('woocommerce-cart-form__contents')[0];
let parent = big_parent.getElementsByTagName('tbody')[0];//Куда будем добовлять элементы

const simple_child_1 = document.getElementsByClassName('woocommerce-cart-form__cart-item')[0];
const simple_child = simple_child_1.cloneNode(true);//Образец элемента
creat_simple(simple_child);//Создание примера

count_combo = Object.keys(object_combo).length;//Подсчет кол-ва комбо
for(let i = 0; i < count_combo; i++ ){
  //Вывод каждого комбо
  let elem = simple_child.cloneNode(true);

  create_combo(elem, i);

  parent.append(elem);//Добавление элемента
}



//console.log(elem);
//console.log(elem_1);
