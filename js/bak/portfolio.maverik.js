$(function(){
	$("#maverik-gallery").unitegallery({		
		tile_width: 260,	
		tile_height: 175,
		grid_space_between_cols: 50,
		grid_space_between_rows: 50
					
	});
	
	$('#maverik #play-kiosk-demo').on('click', function(e){
		e.preventDefault();
		$('<div id="backdrop"></div>').appendTo("BODY");
		$('#backdrop').css({
			'height': $(document).height()
		}).animate({'opacity': 1}, 250, function(){
			$('<div id="player-container"><IFRAME src="'+$('#play-kiosk-demo').prop('href')+'" /></div>').appendTo("BODY");
			$('#player-container').animate({'opacity': 1}, 250, function(){
				$('#backdrop').on('click', function(e){
					$('#backdrop, #player-container').animate({'opacity': 0}, 250, function(){
						$('#backdrop, #player-container').detach();
					});
				});						
				$('#player-container').on('click', function(e){
					e.stopPropagation();
				});					
			});
		});					
	});			
});