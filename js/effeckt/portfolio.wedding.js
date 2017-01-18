$(function(){
	
	$("#wedding-gallery").unitegallery({
		grid_num_rows:2,
		tile_width: 200,	
		tile_height: 130,
		grid_space_between_cols: 50,
		grid_space_between_rows: 50
	});
	
	$('#wedding #play-std-demo').on('click', function(e){
		e.preventDefault();
		$('<div id="backdrop"></div>').appendTo("BODY");
		$('#backdrop').css({
			'height': $(document).height()
		}).animate({'opacity': 1}, 250, function(){
			$('<div id="std-container"><IFRAME src="'+$('#play-std-demo').prop('href')+'" /></div>').appendTo("BODY");
			$('#std-container').animate({'opacity': 1}, 250, function(){
				$('#backdrop').on('click', function(e){
					$('#backdrop, #std-container').animate({'opacity': 0}, 250, function(){
						$('#backdrop, #std-container').detach();
					});
				});						
				$('#std-container').on('click', function(e){
					e.stopPropagation();
				});					
			});
		});					
	});			
});