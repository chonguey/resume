$(function(){
	$('#resume-link').on('click', function(e){
		$('.effeckt-caption.active').removeClass('active');
		e.preventDefault();
		$('<div id="backdrop"></div>').appendTo("BODY");
		$('#backdrop').css({
			'height': $(document).height()
		}).animate({'opacity': 1}, 250, function(){
			$('<div id="resume-container"><IFRAME src="'+$('#resume-link').data('href')+'" /></div>').insertBefore("#backdrop");
			$('#resume-container').animate({'opacity': 1}, 250, function(){
				$('#backdrop').on('click', function(e){
					$('#backdrop, #resume-container').animate({'opacity': 0}, 250, function(){
						$('#backdrop, #resume-container').detach();						 
					});
				});						
				$('#resume-container').on('click', function(e){
					e.stopPropagation();
				});					
			});
		});					
	});			
});