var ls_portfolio = {	
	loadingDelay	: 1250,
	animateTransitions	: true,
	urlHasAnchor 	: /^.+#(.*)$/,
	portfolioPages	: [],
	lastPage		: -1,
	currentTheme	: 'default-theme',
	currentPage		: 0,
	currentPageName	: 'portfolio-index',
	
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
		if (animateHeader && ls_portfolio.animateTransitions){			
			$('.header-bar').animate({backgroundColor: ls_portfolio.portfolioPages[ls_portfolio.currentPage].barcolor}, 500);
		}
		else{
			$('.header-bar').css({backgroundColor: ls_portfolio.portfolioPages[ls_portfolio.currentPage].barcolor});
		}
	},	
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	setCurrentTheme	: function(){				
		$('.header-bar, HTML').removeClass(ls_portfolio.currentTheme);
		ls_portfolio.currentTheme = ls_portfolio.portfolioPages[ls_portfolio.currentPage].theme;
		$('.header-bar, HTML').addClass(ls_portfolio.currentTheme);	
	},
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	setPageTitle	: function(){
		$('.header-bar h1').text(ls_portfolio.portfolioPages[ls_portfolio.currentPage].title);	
		$('HEAD TITLE').text(ls_portfolio.portfolioPages[ls_portfolio.currentPage].title+' - Landon Shumway Portfolio');	
	},
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	showMenu		: function(){
		$('#portfolio').addClass('show-menu');
	},
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	hideMenu		: function(){
		$('#portfolio').removeClass('show-menu');
	},
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	setActivePage	: function(pageIndex, animateHeader){
		if (typeof animateHeader == 'undefined'){
			animateHeader = true;	
		}
		
		if (pageIndex == 0){		
			ls_portfolio.showMenu();
		}
		else{		
			ls_portfolio.hideMenu();
		}
				
		ls_portfolio.currentPage = pageIndex;
		ls_portfolio.currentPageName = ls_portfolio.portfolioPages[pageIndex].id;
		$('#nav-button-left, #nav-button-right').off('click');		
		
		if (!ls_portfolio.animateTransitions){
			ls_portfolio.refreshEffecktClasses();	
		}
		
		if (animateHeader && ls_portfolio.animateTransitions){					
			$('.header-bar h1').animate({'opacity': 0}, 500, function(){				
				ls_portfolio.setCurrentTheme();			
				ls_portfolio.setPageTitle();				
				$('.header-bar h1').animate({'opacity': 1}, 500);
			});
			setTimeout(function(){ls_portfolio.setHeaderBar(true)}, 250);
			
		}
		else{			
			ls_portfolio.setCurrentTheme();	
			ls_portfolio.setHeaderBar(false);
			ls_portfolio.setPageTitle();			
		}
		
		if (!ls_portfolio.animateTransitions){
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
	},
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	refreshEffecktClasses: function(){
		$('[data-effeckt-page].effeckt-page-active').removeClass('effeckt-page-active');
		$('[data-effeckt-page="'+ls_portfolio.currentPageName+'"]').addClass('effeckt-page-active');
		return true;
	},
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	init: function(){
		ls_portfolio.animateTransitions = ($('#isTablet').css('display') == 'inline' || $('#isPhone').css('display') == 'inline' ) ? false : true;		
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
		
		$('.fullscreen-toggle').on('click', function(){
			ls_portfolio.toggleFullScreen();
		});
		
		$('#portfolio-index .effeckt-page-transition-button')
			.off('click')
			.on('click', function(){
				if (ls_portfolio.animateTransitions){
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
				if (ls_portfolio.animateTransitions){
					if (EffecktPageTransitions.isAnimating){	return false;	}				
					EffecktPageTransitions.transitionPage( 'portfolio-index', 'slide-from-bottom', 'slide-to-top' );
				}
				ls_portfolio.setActivePage(0, true);					  
				return false;
			});			
		
				
		$('body').animate({scrollTop: 0}, 10).removeClass('pre-load').addClass('loaded'); // jump to the top and hide our loader
		if (ls_portfolio.animateTransitions){
			EffecktPageTransitions.init();
		}
		ls_portfolio.getPageFromAnchor();
		ls_portfolio.refreshEffecktClasses();		
		ls_portfolio.setActivePage(ls_portfolio.currentPage, false);	
			   
	}	
};

$(function(){
	setTimeout(function(){ls_portfolio.init();}, ls_portfolio.loadingDelay);	
});