//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Portfolio - The JS Code that runs my portfolio
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var ls_portfolio = {
	gallerySettings	: {tile_width: 260,	tile_height: 175,	grid_space_between_cols: 50,	grid_space_between_rows: 50,	grid_num_rows:4},
	loadingDelay	: 1250,
	doEffeckt		: true,
	urlHasAnchor 	: /^.+#(.*)$/,
	portfolioPages	: [],
	lastPage		: -1,
	currentTheme	: 'default-theme',
	currentPage		: 0,
	currentPageName	: 'portfolio-index',

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	initUniteGalleries : function(){
		$("#catapult-gallery").unitegallery(this.gallerySettings); // each one has to be called individually. Not sure why unitegallery doesnt like #id1, #id2, etc selectors
		$("#catapult-gallery-mobile").unitegallery(this.gallerySettings);
		$("#coverfinder-mobile-gallery").unitegallery(this.gallerySettings);
		$("#coverfinder-gallery").unitegallery(this.gallerySettings);
		$("#coverfinder-admin-gallery").unitegallery(this.gallerySettings);
		$("#iboats-gallery-mobile").unitegallery(this.gallerySettings);
		$("#iboats-gallery").unitegallery(this.gallerySettings);
		$("#maverik-gallery").unitegallery(this.gallerySettings);
		$("#propfinder-mobile-gallery").unitegallery(this.gallerySettings);
		$("#propfinder-gallery").unitegallery(this.gallerySettings);
		$("#autosuggest-gallery").unitegallery(this.gallerySettings);
		$("#tabs-gallery").unitegallery(this.gallerySettings);
		$("#wedding-gallery").unitegallery({
			grid_num_rows:2,
			tile_width: 200,
			tile_height: 130,
			grid_space_between_cols: 50,
			grid_space_between_rows: 50
		});
		return true;
	},

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	initWeddingModal : function(){
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
	},

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	initResumeModal : function(){
		$('#resume-link').on('click', function(e){
			if ( ($('#isTablet').css('display') == 'inline' || $('#isPhone').css('display') == 'inline' ) ){
				window.location.href = $('#resume-link').data('href');
				return true;
			}
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
		return true;
	},

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	initMaverikModal	: function(){
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
		return true;
	},

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	toggleFullScreen : function() { // from Stackoverflow
	  if ((document.fullScreenElement && document.fullScreenElement !== null) ||
	   (!document.mozFullScreen && !document.webkitIsFullScreen)) {
	    if (document.documentElement.requestFullScreen) {
	      document.documentElement.requestFullScreen();
	    } else if (document.documentElement.mozRequestFullScreen) {
	      document.documentElement.mozRequestFullScreen();
	    } else if (document.documentElement.webkitRequestFullScreen) {
	      document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
	    }
	  } else {
	    if (document.cancelFullScreen) {
	      document.cancelFullScreen();
	    } else if (document.mozCancelFullScreen) {
	      document.mozCancelFullScreen();
	    } else if (document.webkitCancelFullScreen) {
	      document.webkitCancelFullScreen();
	    }
	  }
	  return true;
	},

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	nextPageIndex	: function(){
		return (this.currentPage >= this.lastPage) ? 1 : this.currentPage + 1;
	},

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	nextPageData	: function(){
		return ls_portfolio.portfolioPages[this.nextPageIndex()];
	},

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	prevPageIndex	: function(){
		return (this.currentPage <= 1) ? this.lastPage : this.currentPage - 1;
	},

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	prevPageData	: function(){
		return ls_portfolio.portfolioPages[this.prevPageIndex()];
	},

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	getPageFromAnchor: function(){
		var anchorMatches = ls_portfolio.urlHasAnchor.exec(window.location.href);
		if (anchorMatches != null){
			var pageIndex = ls_portfolio.getPageIndexByName(anchorMatches[1]);
			if (pageIndex){
				ls_portfolio.currentPage = pageIndex;
				ls_portfolio.currentPageName = anchorMatches[1];
				return true;
			}
		}
		return false;
	},

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	getPageIndexByName: function(pageName){
		var foundIndex = -1;
		$.each(ls_portfolio.portfolioPages, function(ind, ref){
			if (ref.id == pageName){
				foundIndex = ind;
				return false;
			}
		});

		return foundIndex;
	},

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	setHeaderBar: function(animateHeader){
		if (animateHeader && ls_portfolio.doEffeckt){
			$('.header-bar').animate({backgroundColor: ls_portfolio.portfolioPages[ls_portfolio.currentPage].barcolor}, 500);
		}
		else{
			$('.header-bar').css({backgroundColor: ls_portfolio.portfolioPages[ls_portfolio.currentPage].barcolor});
		}
		return true;
	},

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	setCurrentTheme	: function(){
		$('.header-bar, HTML').removeClass(ls_portfolio.currentTheme);
		ls_portfolio.currentTheme = ls_portfolio.portfolioPages[ls_portfolio.currentPage].theme;
		$('.header-bar, HTML').addClass(ls_portfolio.currentTheme);
		return true;
	},

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	setPageTitle	: function(){
		$('.header-bar h1').text(ls_portfolio.portfolioPages[ls_portfolio.currentPage].title);
		$('HEAD TITLE').text(ls_portfolio.portfolioPages[ls_portfolio.currentPage].title+' - Landon Shumway Portfolio');
		return true;
	},

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	showMenu		: function(){
		$('#portfolio').addClass('show-menu');
		return true;
	},

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	hideMenu		: function(){
		$('#portfolio').removeClass('show-menu');
		return true;
	},

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	setActivePage	: function(pageIndex, animateHeader){
		if (typeof animateHeader == 'undefined'){
			animateHeader = true;
		}

		if (pageIndex == 0){
			this.showMenu();
		}
		else{
			this.hideMenu();
		}

		this.currentPage = pageIndex;
		this.currentPageName = this.portfolioPages[pageIndex].id;
		$('#nav-button-left, #nav-button-right').off('click');

		if (!this.doEffeckt){
			this.refreshEffecktClasses();
		}

		if (animateHeader && this.doEffeckt){
			$('.header-bar h1').animate({'opacity': 0}, 500, function(){
				ls_portfolio.setCurrentTheme();
				ls_portfolio.setPageTitle();
				$('.header-bar h1').animate({'opacity': 1}, 500);
			});
			setTimeout(function(){ls_portfolio.setHeaderBar(true)}, 250);

		}
		else{
			this.setCurrentTheme();
			this.setHeaderBar(false);
			this.setPageTitle();
		}

		if (!this.doEffeckt){
			$('body').animate({scrollTop: 0}, 10);
		}

		$('#nav-button-left')
			.off('click')
			.on('click', function(){
				if (EffecktPageTransitions.isAnimating){	return false;	}
				EffecktPageTransitions.transitionPage( ls_portfolio.prevPageData().id, 'slide-from-left', 'slide-to-right' );
				ls_portfolio.setActivePage(ls_portfolio.prevPageIndex());
			});

		$('#nav-button-right')
			.off('click')
			.on('click', function(){
				if (EffecktPageTransitions.isAnimating){	return false;	}
				EffecktPageTransitions.transitionPage( ls_portfolio.nextPageData().id, 'slide-from-right', 'slide-to-left' );
				ls_portfolio.setActivePage(ls_portfolio.nextPageIndex());
			});

		return true;
	},

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	refreshEffecktClasses: function(){
		$('[data-effeckt-page].effeckt-page-active').removeClass('effeckt-page-active');
		$('[data-effeckt-page="'+this.currentPageName+'"]').addClass('effeckt-page-active');
		return true;
	},

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	init: function(){
		this.doEffeckt = ($('#isTablet').css('display') == 'inline' || $('#isPhone').css('display') == 'inline' ) ? false : true;
		jQuery.fx.interval = 53; // slow down jquery-based animations so the css animations are even smoother
		$('[data-portfolio-order]').each(function(i, elem){
			ls_portfolio.portfolioPages[$(this).data('portfolio-order')] = {
				'title'		: $(this).data('title'),
				'id'		: $(this).data('effeckt-page'),
				'theme'		: $(this).data('page-theme'),
				'barcolor'	: $(this).data('header-bar-color')
			}
			ls_portfolio.lastPage++;
		});

		// Preload nav hover images
		$('<img/>')[0].src = '../img/arrow-left-big-shadow.png';
		$('<img/>')[0].src = '../img/arrow-right-big-shadow.png';

		$('.fullscreen-toggle').on('click', function(){
			ls_portfolio.toggleFullScreen();
		});

		$('#portfolio-index .effeckt-page-transition-button')
			.off('click')
			.on('click', function(){
				if (ls_portfolio.doEffeckt){
					if (EffecktPageTransitions.isAnimating){	return false;	}
					EffecktPageTransitions.transitionPage( $(this).data('effeckt-transition-page'), 'rotate-to-front', 'rotate-to-behind' );
				}
				ls_portfolio.setActivePage(ls_portfolio.getPageIndexByName($(this).data('effeckt-transition-page')), true);
			});

		$('.portfolio-back, #portfolio-headline')
			.off('click')
			.on('click', function(e){
				if (ls_portfolio.currentPage == 0){
					return false;
				}
				e.preventDefault();
				if (ls_portfolio.doEffeckt){
					if (EffecktPageTransitions.isAnimating){	return false;	}
					EffecktPageTransitions.transitionPage( 'portfolio-index', 'slide-from-bottom', 'slide-to-top' );
				}
				ls_portfolio.setActivePage(0, true);
				return false;
			});


		$('body').animate({scrollTop: 0}, 10);

		if (ls_portfolio.doEffeckt){
			EffecktPageTransitions.init();
		}

		this.getPageFromAnchor();
		this.refreshEffecktClasses();
		this.setActivePage(ls_portfolio.currentPage, false);
		this.initMaverikModal();
		this.initResumeModal();
		this.initWeddingModal();
		this.initUniteGalleries();

		$('body').removeClass('pre-load').addClass('loaded');

		return true;
	}
};

$(function(){
	setTimeout(function(){ls_portfolio.init()}, ls_portfolio.loadingDelay);
});