/*************************************************
 * Site Name: IU Template (Responsive)
 *
 * Description: Site-wide scripts
 * Version: 1.0
 * Author: IU Communications
 * Author URI: http://communications.iu.edu
 ************************************************/

/****************************************
* Add class to <html>
****************************************/

(function (h) {
    // h.className = h.className.replace('no-js', 'js');
    h.className = 'js';
}(document.documentElement));


var IU = (function ($, IU, window, document, undefined) {

    // Sitewide fallback
    IU.fallbackUrl = "http://avr-mbp.local:5757";

    IU.utils = {};

    IU.helpers = {};

    IU.plugins = {};

    //IU.fallbackAssetURL = "https://www.iu.edu/~iuwebdev/projects/iu_template/build";
    IU.fallbackAssetURL = "https://www.iu.edu/~soic2";

    IU.assetUrls = {
        mediaelement: {
            js: IU.fallbackAssetURL + '/_global/js/mediaelement/mediaelement-and-player.min.js',
            css: IU.fallbackAssetURL + '/_global/js/mediaelement/mediaelementplayer.min.css'
        },
        lightboxes: {
            js: IU.fallbackAssetURL + '/_global/js/fancybox/jquery.fancybox-1.3.4.pack.js',
            css: IU.fallbackAssetURL + '/_global/js/fancybox/jquery.fancybox-1.3.4.css'
        },
        adgallery: {
            js: IU.fallbackAssetURL + '/_global/js/adgallery/jquery.ad-gallery.js',
            css: IU.fallbackAssetURL + '/_global/js/adgallery/jquery.ad-gallery.css'
        },
        slideshow: {
            js: IU.fallbackAssetURL + '/_global/js/slideshow.js'
        },
        oldIE: {
            css: IU.fallbackAssetURL + '/_global/css/oldie.css'
        }
    };

    /****************************************
     * Utility Functions
     ****************************************/

    // Universal log
    IU.utils.log = function () {
        // Safely log things, if need be.
        if (console && typeof console.log === 'function') {
            for (var i = 0, ii = arguments.length; i < ii; i++) {
                console.log(arguments[i]);
            }
        }
    };

    // Get hostname
    IU.utils.getHostname = function () {
        var i = window.location.host;
        return i;
    };

    // Detect CMS
    IU.utils.detectCMS = function () {
        var i = false;
        if (window.location.host.indexOf("author.wcms.iu.edu") !== -1) {
            i = true;
        }
        return i;
    };

    // Get siteroot
    IU.utils.getSiteRoot = function(fallbackUrl) {
        var localpath = "";
        var siteroot = "";
        var isCMS = this.detectCMS();

        if (isCMS === true){
            siteroot = fallbackUrl;
        }
        else {
            localpath = $("h1 a").attr("href");
            localpath = localpath.split("/");
            var localpathLength = localpath.length;
            if(localpathLength>1){
                for(var i=0; i<localpathLength-1; i++){
                    siteroot += localpath[i]+"/";
                }
            }
        }
        return siteroot;
    };

    // Detect homepage
    IU.utils.detectHome = function() {
        return ($("body").attr("id") === "home");
    };

    // Detect old IE
    IU.utils.detectIE = function() {
        var i = false;
        if("\v" === "v") {
            i = true;
        }
        return i;
    };

    // Detect IE8
    IU.utils.detectIE8 = function() {
        var i = false;
        var checkIE = '';
        (checkIE = document.createElement("b")).innerHTML = "<!--[if IE 8]><i></i><![endif]-->";
        if(checkIE.getElementsByTagName("i").length === 1) {
            i = true;
        }
        return i;
    };

    // Detect IE7
    IU.utils.detectIE7 = function() {
        var i = false;
        var checkIE = '';
        (checkIE = document.createElement("b")).innerHTML = "<!--[if IE 7]><i></i><![endif]-->";
        if(checkIE.getElementsByTagName("i").length === 1) {
            i = true;
        }
        return i;
    };

    // Detect IE6
    IU.utils.detectIE6 = function() {
        var i = false;
        var checkIE = '';
        (checkIE = document.createElement("b")).innerHTML = "<!--[if IE 6]><i></i><![endif]-->";
        if(checkIE.getElementsByTagName("i").length === 1) {
            i = true;
        }
        return i;
    };

    // Detect Mobile
    IU.utils.detectMobile = function() {
        var i = false;
        (function(a) {
            if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) {
                i = true;
            }
            })(navigator.userAgent||navigator.vendor||window.opera);
        return i;
    };

    // Detect Touch Devices
    IU.utils.detectTouch = function(){
        var isTouch = (('ontouchstart' in window) || (navigator.msMaxTouchPoints > 0));
        if (isTouch) {
            $('html').addClass('touch');
            return true;
        } else {
            $('html').addClass('no-touch');
            return false;
        }
    };

    // Get breakpoints from CSS
    IU.utils.getMQ = function() {
        var activeMediaQuery = "";
        if (IU.isIE === false) {

            activeMediaQuery = window.getComputedStyle(document.body,':after').getPropertyValue('content');
            activeMediaQuery = activeMediaQuery.replace("min-width-","");
            activeMediaQuery = activeMediaQuery.replace(/\"/g,"");

            // Fix for bug in Chrome 33:
            // https://code.google.com/p/chromium/issues/detail?id=345653
            if (activeMediaQuery === '') {
                var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
                if (w < 480) {
                    activeMediaQuery = 480;
                }
                else if ((w > 480) && (w < 600)) {
                    activeMediaQuery = 480;
                }
                else if ((w > 600) && (w < 768)) {
                    activeMediaQuery = 600;
                }
                else if ((w > '768') && (w < 960)) {
                    activeMediaQuery = 768;
                }
                else {
                    activeMediaQuery = 960;
                }
            }
        }
        return activeMediaQuery;
    };

    // Fix
    IU.utils.isOldieLoaded = function() {
        var ss = document.styleSheets;
        for (var i = 0, max = ss.length; i < max; i++) {
            if (ss[i].href.indexOf("css/oldie.css") !== -1) {
                return true;
            }
        }
        return false;
    };

    IU.utils.oldIE = function() {
        if (IU.isIE === false && IU.isMobile === false && IU.activeMediaQuery === "") {
            IU.activeMediaQuery = 960;
            var IECss = IU.assetUrls.oldIE.css;
            $("head").append("<link href='" + IECss + "' rel='stylesheet' type='text/css' media='screen' />");
        }
    };

    /****************************************
     * Helpers
     ****************************************/

    // IE Classes
    IU.helpers.IEClasses = function() {
        var isIE8 = IU.utils.detectIE8();
        var isIE7 = IU.utils.detectIE7();
        var isIE6 = IU.utils.detectIE6();

        var $html = $("html");

        if (isIE8 === true || isIE7 === true || isIE6 === true){
            $html.addClass("oldie");
        }
        else {
            $html.addClass("modern");
        }

        if (isIE8 === true){
            $html.addClass("ie8");
        }
        if (isIE7 === true){
            $html.addClass("ie7");
        }
        if (isIE6 === true){
            $html.addClass("ie6");
        }
    };

    // Email obfuscation
    IU.helpers.obfuscation = function() {
        var rot13 = function(c){
            return String.fromCharCode((c<='Z'?90:122)>=(c=c.charCodeAt(0)+13)?c:c-26);
        };
    function rot5(str) {
  var s = [];
  for (i = 0; i < str.length; i ++)
  {
    idx = str.charCodeAt(i);
    if ((idx >= 48) && (idx <= 57))
    {
      if (idx <= 52)
      {
        s[i] = String.fromCharCode(((idx + 5)));
      }
      else
      {
        s[i] = String.fromCharCode(((idx - 5)));
      }
    } 
    else
    {
      s[i] = String.fromCharCode(idx);
    }
  }
  return s.join('');
};

        $("a[ery='absbyybj'], span[ery='absbyybj']").each(function() {
            var $this = $(this);
            var h = $this.attr("uers").replace(/[a-zA-Z]/g, rot13);
            var a = $this.html();
            var c = $this.attr("class");
            $this.before("<a rel='nofollow' href='"+h+"' class='"+c+"'></a>").prev("a").html(a).end().remove();
        });
/*
	$("span[ery='hredu']").each(function() {
           var $this = $(this);
		var p=$(this).text();
		$(this).replaceWith(p.replace(/^.*$/, rot5));
		
	});
    */
    };

    // Open external links in new window/tab - DISABLED

    IU.helpers.externalLinks = function() {
        $("a").not("a[href^='mailto:'], a[uers^='znvygb:'], .lightbox, .lightbox-event, .local").each(function(){
            var href = decodeURI(this.href);

            if (IU.isCMS === false) {
                var pathname = window.location.pathname;
                pathname = pathname.split("/");
                
            }
        });
    };

    // Set Current Page
    IU.helpers.setCurrentPage = function() {
        if (IU.isCMS === false) {
            var pageUrl = window.location.toString();
            var pageUrlParts = pageUrl.split("/");
            var pageUrlLength = pageUrlParts.length;
            var pageUrlName = pageUrlParts[pageUrlLength-1];
            var thisLink;

            $("#nav-vertical li a").each(function(){
                var $this = $(this);
                thisLink = $this.attr("href");
                if (pageUrlName === thisLink){
                    $this.parents("li").addClass("current");
                }
                else {
                    thisLink = thisLink.replace("index.shtml","").replace(/\//g,"").replace(/\./g,"");

                    if (thisLink.length === 0) {
                        $this.parents("li").addClass("current");
                    }
                }
            });

            if (IU.isHome === false){
                $("#nav-horizontal li > a, #nav-audience li > a").each(function(){
                    thisLink = $(this).attr("href");
                    thisLink = thisLink.replace("index.shtml","");
                    if (thisLink !== '#' && pageUrl.indexOf(thisLink) !== -1){
                        $(this).parents("li").addClass("current");
                    }
                });
            }
        }
    };


    // Remove document icons from links with inline img
    IU.helpers.removeIcons = function() {
        $("#content-wrap a[href$='.pdf'] img, #content-wrap a[href$='.doc'] img, #content-wrap a[href$='.docx'] img, #content-wrap a[href$='.xls'] img, #content-wrap a[href$='.xlsx'] img").each(function(){
            $(this).parent("a").addClass("disable-icon");
        });
    };

    // Open events in lightboxes
    IU.helpers.eventsInLightboxes = function() {
        if (IU.isMobile === false && IU.activeMediaQuery >= 768 || IU.isIE === true && $(".news-events").length || $(".events").length){
            $(".news-events a, .events a").each(function(){
                var eventFeedLink = $(this).attr("href");
                if(eventFeedLink.indexOf("https://onestart.iu.edu") !== -1 && !$(this).hasClass("rss") && !$(this).parent().hasClass("more")){
                    $(this).addClass("lightbox-event");
                }
            });
        }
    };

    // Feature transition
    IU.helpers.featureTransition = function(thisIndex) {
        $("#feature #feature-images li").not($("#feature #feature-images li:eq("+thisIndex+")")).hide();
        $("#feature #feature-buttons li").not($("#feature #feature-buttons li:eq("+thisIndex+")")).removeClass("active");
        $("#feature #feature-images li:eq("+thisIndex+")").stop(true, true).fadeIn(500);
        $("#feature #feature-buttons li:eq("+thisIndex+")").addClass("active");
    };

    // External feeds
    IU.helpers.externalFeed = function(fallbackUrl) {
        var siteroot = this.getSiteRoot(fallbackUrl);
        var isCMS = this.detectCMS();

        if (isCMS === true && $(".external-feed").length) {
            $(".external-feed").each(function(i, o){
                var externalFeedScript = siteroot + $(this).attr("data-script");
                $.getJSON(externalFeedScript, function (data) {
                    $(o).replaceWith(data);
                });
            });
        }
    };

    IU.helpers.accordions = function() {
        if ($(".accordion").length) {

            $("ul.accordion > li").each(function(){
                var $children = $(this).children();
                $children.first().addClass("accordion-heading").wrapInner("<a href='#'></a>");
                $children.not(".accordion-heading").wrapAll("<div class='accordion-content'></div>");
                $(".accordion-content").hide();
            });

            $("ul.accordion .accordion-heading a").on('click', function(event){
                event.preventDefault();

                var $this = $(this);

                if ($this.closest("li").hasClass("accordion-open")) {
                    $this.closest(".accordion-heading").siblings(".accordion-content").slideUp("slow", function(){
                        $this.closest("li").removeClass("accordion-open");
                    });
                } else {
                    $this.closest("li").siblings("li").removeClass("accordion-open").children().not(".accordion-heading").slideUp("slow");
                    $this.closest(".accordion-heading").siblings(".accordion-content").slideDown("slow", function() {
                        $this.closest("li").addClass("accordion-open");
                        // The location of the current item after it's finished animating
                        $('html,body').animate({
                              scrollTop: $this.offset().top
                        }, 1000);
                    });
                }
            });
        }
    };

    // Lightboxes
    IU.plugins.ligthboxes = function() {

        if ($(".lightbox, .lightbox-event").length && IU.isMobile === false){

            var fancyBoxJS = IU.assetUrls.lightboxes.js;
            var fancyBoxCSS = IU.assetUrls.lightboxes.css;

            $("head").append("<link href='" + fancyBoxCSS + "' rel='stylesheet' type='text/css' media='screen' />");

            $(".lightbox-hidden").hide();

            $.getScript(fancyBoxJS, function() {
                if(IU.isCMS === false){
                    $(".lightbox").fancybox({
                        centerOnScroll: true,
                        titlePosition: 'over'
                    });
                    $(".lightbox-event").fancybox({
                        centerOnScroll: true,
                        height: 480,
                        titlePosition: 'over',
                        type: 'iframe',
                        width: 680
                    });
                }
                else {
                    $(".lightbox").fancybox({
                        titlePosition: 'over'
                    });
                    $(".lightbox-event").fancybox({
                        height: 480,
                        titlePosition: 'over',
                        type: 'iframe',
                        width: 680
                    });
                }
            });
        }
    };

    // Audio/Video
    IU.plugins.mediaelement = function() {
        if ($("audio, video").length) {
            var mediaElementJS = IU.assetUrls.mediaelement.js;
            var mediaElementCSS = IU.assetUrls.mediaelement.css;

            $("head").append("<link href='" + mediaElementCSS + "' rel='stylesheet' type='text/css' media='screen' />");

            $.getScript(mediaElementJS, function() {
                $("video, audio").mediaelementplayer();
            });
        }
    };

    // Content Galleries
    IU.plugins.contentGalleries = function() {
        if ($(".ad-gallery").length){
            var adGalleryContent;

            var galleryJS = IU.assetUrls.adgallery.js;
            var galleryCSS = IU.assetUrls.adgallery.css;

            $("head").append("<link href='" + galleryCSS + "' rel='stylesheet' type='text/css' media='screen' />");

            $.getScript(galleryJS, function() {
                $(".ad-gallery").each(function(){
                    adGalleryContent = $(this).html();
                    $(this).before("<div class='ad-gallery ad-gallery-js'><div class='ad-image-wrapper'></div><div class='ad-controls'></div><div class='ad-nav'><div class='ad-thumbs'></div></div></div>");
                    $(this).prev(".ad-gallery").children(".ad-nav").children(".ad-thumbs").html("<ul class='ad-thumb-list'>"+adGalleryContent+"</ul>");
                    $(this).remove();
                });

                $(".ad-gallery").adGallery();

            });
        }
    };

    // Homepage Slideshow
    IU.plugins.homeSlideshow = function() {

        function slideshowButtons() {
            $("#slideshow-wrap").attr("style","");
            var slideshowHeight = $("#slideshow-wrap").height();

            $("#slideshow-wrap").height(slideshowHeight);

            var slideshowImgHeight = $("#slideshow li.active img").height();
            var slideshowButtonsHeight = $("#slideshow-buttons").height();
            var slideshowButtonsOffset = slideshowImgHeight - slideshowButtonsHeight;

            if (IU.activeMediaQuery < 768){
                $("#slideshow-buttons").css("top",slideshowButtonsOffset+"px");
            }
            if (IU.activeMediaQuery >= 768){
                $("#slideshow-buttons").css("top","");
            }
        }

        if ($("#slideshow").length && $("#slideshow li").length > 1) {
            var slideshowJS = IU.assetUrls.slideshow.js;

            if ($("#slideshow-wrap").length === 0){

                $.getScript(slideshowJS, function() {
                    $("#slideshow li").first().siblings("li").hide();
                    $("#slideshow").slideshow({
                        delay: 5000
                    });

                    if (IU.isIE === false) {
                        $(window).load(function(){
                            slideshowButtons(IU.activeMediaQuery);
                        });
                        $(window).resize(function(){
                            slideshowButtons(IU.activeMediaQuery);
                        });
                    }
                });
            }
        }
    };

    // This function should be called in the local JS
    // By calling it there, we allow the methods to be
    // overriden before calling init()
    IU.init = function(IU) {

        // Create namespaced vars
        IU.siteroot = IU.utils.getSiteRoot(IU.fallbackUrl);
        IU.hostname = IU.utils.getHostname();
        IU.isTouch = IU.utils.detectTouch();
        IU.isIE = IU.utils.detectIE();
        IU.isCMS = IU.utils.detectCMS();
        IU.isHome = IU.utils.detectHome();
        IU.isMobile = IU.utils.detectMobile();
        IU.activeMediaQuery = IU.utils.getMQ();

        // Run functions
        IU.helpers.IEClasses();
        IU.helpers.obfuscation();
        IU.helpers.externalLinks();
        IU.helpers.setCurrentPage();
        IU.helpers.removeIcons();
        IU.helpers.navigation();
        IU.helpers.accordions();

        // Plugins
        IU.plugins.mediaelement();
        IU.plugins.ligthboxes();
        IU.plugins.contentGalleries();

        if (IU.isHome === true){
            IU.plugins.homeSlideshow();
        }
    };

    return IU;

}(jQuery, IU || {}, this, this.document));

var IUB = (function ($, IU, window, document, undefined) {

    var IUB = IU.helpers = IU.helpers || {};

    IUB.homepage = {};

    IUB.homepage.contentHeight = function() {
        var contentHeight = 0;
        var sidebarHeight = 0;

        $("#content-wrap").children().each(function(){
            if($(this).attr("id") !== "sidebar"){
                contentHeight += $(this).outerHeight();
            }
        });

        sidebarHeight = $("#sidebar").outerHeight();

        if(contentHeight < sidebarHeight){
            $("#content-wrap").css({minHeight: sidebarHeight});
        }
    };

    IUB.homepage.feature = function() {

        /* Feature */
        if ($("#feature").length && $("#feature #feature-images li").length>1){
            $("#feature").append("<ul id='feature-nav'><li class='feature-nav-previous'><a href='#'>Previous</a></li><li class='feature-nav-next'><a href='#'>Next</a></li></ul>");
            var numSlides = $("#feature #feature-buttons li").length;
            var buttonWidthPercent = 100/numSlides;
            var windowWidth = $(window).width();
            var buttonWidthPixels;
            var thisIndex;
            var touchNum = 0;

            if (windowWidth<980){
                buttonWidthPixels = windowWidth/numSlides;
            }
            else {
                buttonWidthPixels = 680/numSlides;
            }
            if (IU.activeMediaQuery >= 768 || IU.isIE === true){
                $("#feature #feature-buttons li").width(buttonWidthPercent+"%").children("a").width(buttonWidthPixels+"px");
            }

            $("#feature #feature-images li").not($("#feature #feature-images li:first-child")).hide();
            $("#feature #feature-buttons li:first-child").addClass("active");



            if (IU.isTouchDevice === true) {
                $("#feature #feature-buttons li a").click(function(event){
                    touchNum = touchNum + 1;
                    $(this).click(function(){
                        touchNum += 1;
                    });
                    if (touchNum === 1) {
                        event.preventDefault();
                    }
                    thisIndex = $(this).parent("li").index();
                    IU.featureTransition(thisIndex);
                });
            }
            else {
                $("#feature #feature-buttons li a").bind("hover focus", function(){
                    thisIndex = $(this).parent("li").index();
                    IU.featureTransition(thisIndex);
                });
            }

            var nextIndex;

            $("#feature #feature-nav li a").click(function(event){
                event.preventDefault();
                thisIndex = $("#feature #feature-buttons li.active").index();
                if($(this).parent("li").hasClass("feature-nav-previous")){
                    nextIndex = thisIndex-1;
                    if(nextIndex<0){
                        nextIndex = numSlides-1;
                    }
                }
                else {
                    nextIndex = thisIndex + 1;
                    if(nextIndex>numSlides-1){
                        nextIndex = 0;
                    }
                }
                IU.featureTransition(nextIndex);
            });

            $(window).resize(function(){
                windowWidth = $(window).width();
                if (windowWidth<980){
                    buttonWidthPixels = windowWidth/numSlides;
                }
                else {
                    buttonWidthPixels = 680/numSlides;
                }
                if (IU.activeMediaQuery < 768 && IU.isIE === false){
                    $("#feature #feature-buttons li").width("").children("a").width("");
                }
                if (IU.activeMediaQuery >= 768 || IU.isIE === true){
                    $("#feature #feature-buttons li a").width(buttonWidthPixels+"px");
                }
            });
        }
    };

    /* Horizontal Navigation Check & Content Height */
    IUB.homepage.nav = function() {

        if ($("#nav-horizontal").length) {
            $("body").addClass("nav-horizontal");

            if ($("#sidebar").length && IU.activeMediaQuery>=960 || IU.isIE==true){
                if (IU.isCMS === true){
                    $(window).load(function(){
                        IUB.homepage.contentHeight();
                    });
                }
                else {
                    IUB.homepage.contentHeight();
                    $(window).load(function(){
                        $("#content-wrap").height("");
                        IUB.homepage.contentHeight();
                    });
                }
            }
            $(window).resize(function(){
                if($("#sidebar").length && IU.activeMediaQuery >= 960 || IU.isIE === true) {
                   IUB.homepage.contentHeight();
                }
                if($("#sidebar").length && IU.activeMediaQuery < 960){
                    $("#content-wrap").height("");
                }
            });
        }
    };

    IUB.homepage.init = function() {
        IUB.homepage.feature();
        IUB.homepage.nav();
    }

    // Navigation
    IUB.navigation = function() {

        if (IU.isIE === false){

            var navAudienceHtml;
            var mobileNavAudience = 0;

            if ($("#nav-audience").length && $("#nav-horizontal").length === 0 && IU.activeMediaQuery < 768){
                $("#nav-audience li").addClass("audience");
                navAudienceHtml = $("#nav-audience").html();
                $("#nav").hide();
                $("#nav-vertical > ul").append(navAudienceHtml);
                mobileNavAudience = 1;
            }

            $(window).resize(function(){
                if($("#nav-audience").length && $("#nav-horizontal").length === 0 && IU.activeMediaQuery < 768 && mobileNavAudience === 0){
                    $("#nav-audience li").addClass("audience");
                    navAudienceHtml = $("#nav-audience").html();
                    $("#nav").hide();
                    $("#nav-vertical > ul").append(navAudienceHtml);
                    mobileNavAudience = 1;
                }
                if($("#nav-audience").length && $("#nav-horizontal").length === 0 && IU.activeMediaQuery >= 768 && mobileNavAudience === 1){
                    $("#nav").show();
                    $("#nav-vertical .audience").remove();
                    mobileNavAudience = 0;
                }
            });

            if ($("#nav").length || $("#nav-vertical").length){
                $("#header h1").after("<div id='search-menu'><h2 class='menu open'><a href='#nav-vertical'>Menu</a></h2></div>");
            }
            if ($("#nav").length === 0 || $("#nav-horizontal").length === 0 && $("#nav-vertical").length){
                $("#header h2.menu").addClass("jump");
            }
            if ($("#nav").length && $("#nav-vertical").length){
                $("#nav").append("<p class='submenu'><a href='#nav-vertical'>Jump to Submenu ▼</a></p>");
            }
        }

        if($("#nav-horizontal").length){
            $("#header h2.menu a").click(function(event){
                event.preventDefault();
                if($(this).parent().hasClass("open")){
                    $(this).parent("h2").removeClass("open");
                    $("#nav").children().addClass("show");
                }
                else {
                    $(this).parent("h2").addClass("open");
                    $("#nav").children().removeClass("show");
                }
            });
        }
    };

    return IU;

}(jQuery, IU || {}, this, this.document));
