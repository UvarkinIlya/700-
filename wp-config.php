<?php
/**
 * Основные параметры WordPress.
 *
 * Скрипт для создания wp-config.php использует этот файл в процессе
 * установки. Необязательно использовать веб-интерфейс, можно
 * скопировать файл в "wp-config.php" и заполнить значения вручную.
 *
 * Этот файл содержит следующие параметры:
 *
 * * Настройки MySQL
 * * Секретные ключи
 * * Префикс таблиц базы данных
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

// ** Параметры MySQL: Эту информацию можно получить у вашего хостинг-провайдера ** //
/** Имя базы данных для WordPress */
define('DB_NAME', 'Salalat');

/** Имя пользователя MySQL */
define('DB_USER', 'Salalat1');

/** Пароль к базе данных MySQL */
define('DB_PASSWORD', 'Zapakovano-Salalat12345#');

/** Имя сервера MySQL */
define('DB_HOST', 'localhost');

/** Кодировка базы данных для создания таблиц. */
define('DB_CHARSET', 'utf8mb4');

/** Схема сопоставления. Не меняйте, если не уверены. */
define('DB_COLLATE', '');

/*Отключение автоматического обновления плагинов */
define( 'WP_AUTO_UPDATE_CORE', false );

/**#@+
 * Уникальные ключи и соли для аутентификации.
 *
 * Смените значение каждой константы на уникальную фразу.
 * Можно сгенерировать их с помощью {@link https://api.wordpress.org/secret-key/1.1/salt/ сервиса ключей на WordPress.org}
 * Можно изменить их, чтобы сделать существующие файлы cookies недействительными. Пользователям потребуется авторизоваться снова.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         'lZPe8r6Lfref.W,4[;A4^NKm;`}Q&?%`DfuS0^=lC|*2gB<O1p7=~@v~)0A(FV25');
define('SECURE_AUTH_KEY',  'S8a<WX~y&fxx*_Mpg<{P RgG/AQIE-0%73g&I7g;EP,#BIA/7~##MY93UtL!n$Rw');
define('LOGGED_IN_KEY',    'o$%z(-s_9l`:_eCs&@Z(E)so]x3}#4(A:#S~qR}KHa-Odn$TK8)V9-r.#` Dw{Ro');
define('NONCE_KEY',        'mzE3KoXSsAWy/EpSX_8f{v+@OBfg<iKG0[YE~[B[.1/[p&.o>n KQ[nh9gTeK^3>');
define('AUTH_SALT',        'BO,*+?:=,Y!Ex*j5athGxuqP/Iw3M&(yY^TU<yn;}]HZfxW#Prt{=y6b-2[)H6 |');
define('SECURE_AUTH_SALT', 'J`z(4z_T8X<x~b14?iU}2]9n;0UtMw*~}`K$%7#3*cm)MT%ufu;dmS%3l(W%VV5T');
define('LOGGED_IN_SALT',   '4.R[=c5G!ex/{{;3cYwV,yPp_?DOuIV`5uELrfsPQHRG11O}=<Ouu)po_hpX:W&r');
define('NONCE_SALT',       'ZD(hq_5c] B4S3bwo}T7TP5x*ZJt85kl4fz.KOl1j)<SML#4rM&c*K+#pt~H1bcE');

/**#@-*/

/**
 * Префикс таблиц в базе данных WordPress.
 *
 * Можно установить несколько сайтов в одну базу данных, если использовать
 * разные префиксы. Пожалуйста, указывайте только цифры, буквы и знак подчеркивания.
 */
$table_prefix  = 'wp_';

/**
 * Для разработчиков: Режим отладки WordPress.
 *
 * Измените это значение на true, чтобы включить отображение уведомлений при разработке.
 * Разработчикам плагинов и тем настоятельно рекомендуется использовать WP_DEBUG
 * в своём рабочем окружении.
 *
 * Информацию о других отладочных константах можно найти в Кодексе.
 *
 * @link https://codex.wordpress.org/Debugging_in_WordPress
 */
define('WP_DEBUG', true);

/* Это всё, дальше не редактируем. Успехов! */

/** Абсолютный путь к директории WordPress. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Инициализирует переменные WordPress и подключает файлы. */
require_once(ABSPATH . 'wp-settings.php');
