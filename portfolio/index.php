<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>Landon Shumway Portfolio</title>
		<meta name="apple-mobile-web-app-capable" content="yes">
		<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
		<link rel="stylesheet" type="text/css" href="../css/portfolio.preload.css"/>
		<link href='http://fonts.googleapis.com/css?family=Open+Sans|Merriweather' rel='stylesheet' type='text/css'>
		<?php include './icons.php';?>
		<?php include './css.php';?>
		<script type='text/javascript' src='../unitegallery/js/jquery-11.0.min.js'></script>
		<script type='text/javascript' src='../js/jquery.color.js'></script>
	</head>
	<body id="portfolio" class="pre-load show-menu">
		<div id="load-throbber"></div>
		<div id="isTablet"></div>
		<div id="isPhone"></div>
		<div id="content">
			<?php
				include './header-bar.php';
				include './menu.php';
				include './iboats-responsive/section.php';
				include './maverik-video-kiosk/section.php';
				include './propfinder/section.php';
				include './videocatapult/section.php';
				include './coverfinder/section.php';
				include './wedding/section.php';
				include './proofpoint/section.php';
				include './ui-tools/section.php';
			?>
		</div>
		<script type='text/javascript' src='../unitegallery/js/unitegallery.min.js'></script>
		<script type="text/javascript" src="../unitegallery/themes/tilesgrid/ug-theme-tilesgrid.js"></script>
		<script type='text/javascript'>
			if ($(window).width() > 1024){
				$.getScript("../js/effeckt/core.js");
				$.getScript("../js/effeckt/modules/page-transitions.js");
				$.getScript("../js/effeckt/modules/captions.js");			
			}
		</script>
		<script type='text/javascript' src='../js/portfolio.combined.js'></script>
	</body>
</html>
