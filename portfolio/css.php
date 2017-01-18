<?php
    $cssFiles = array(
    	"../css/resume.css",
		"../css/portfolio.css",
		"../css/portfolio.themes.css",
		"../css/portfolio.sections.css",
		"../css/effeckt-modules/page-transitions.css",
		"../css/effeckt-modules/tooltips.css",
		"../css/effeckt-modules/captions.css",
		"../unitegallery/css/unite-gallery.css"
    );

    if ($_REQUEST['build'] == 1){
    	$url = 'http://cssminifier.com/raw';
		$css = '';
    	foreach ($cssFiles as $file){    		
    		$css.= file_get_contents($file, FILE_USE_INCLUDE_PATH);    		
    	}    	
    	
    	print $css;

    	$data = array('input' => $css);
    	$ch = curl_init($url);

    	curl_setopt($ch, CURLOPT_POST, 1);
    	curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
    	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    	$minified = curl_exec($ch);
    	
    	print $minified;
		file_put_contents('../css/portfolio.min.css', $minified);

    	curl_close($ch);

    	
    }
    else{
    	foreach ($cssFiles as $file){    		    		
    		if (preg_match('/effeckt/',$file)){
    			print '<link rel="stylesheet" type="text/css" href="'.$file.'" media="only screen and (min-width: 1025px)">';	
    		}
    		else{
    			print '<link rel="stylesheet" type="text/css" href="'.$file.'">';
    		}
		}
    }
?>
