<?php
/**
 * The template for displaying the footer.
 *
 * Contains the closing of the #content div and all content after.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package Kava
 */

?>

	</div><!-- #content -->

	<footer id="colophon" <?php echo kava_get_container_classes( 'site-footer' ); ?>>
		<?php kava_theme()->do_location( 'footer', 'template-parts/footer' ); ?>
	</footer><!-- #colophon -->

</div><!-- #page -->

<?php wp_footer(); ?>
	<script src="http://salalat.com.ua/wp-content/themes/kava/kombo.js"></script>
	<script src="http://salalat.com.ua/wp-content/themes/kava/reloud.js"></script>
	<script src="http://salalat.com.ua/wp-content/themes/kava/enter.js"></script>
</body>
</html>
