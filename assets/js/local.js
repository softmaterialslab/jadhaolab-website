/*************************************************
 * Site Name: SOIC
 *
 * Description: Site-wide scripts
 * Author: IU Communications
 * Author URI: http://communications.iu.edu
 ************************************************/

/****************************************
* jQuery
****************************************/

$(document).ready(function() {

    IU.helpers.navigation = function() {
        return null;
    };

    IU.init(IU);
    //IUComm.init(IUComm);
    IU.helpers.homepage.init();


    /****************************************
     * Get breakpoints from CSS
     ****************************************/

    $(window).resize(function(){
        IU.activeMediaQuery = IU.utils.getMQ();
    });

    /****************************************
     * Search
     ****************************************/

    // var searchUrl = IU.siteroot + "_global/js/googlesearchtoggles.js";

    // $.getScript(searchUrl, function() {
    //  googleSearchToggles(IU.siteroot);
    // });

    var connect = $("#connect");
    var nav = $("#nav");
    var section = $(".section-nav");

    function toggleNav(items) {
        for (var i in items) {
            if (items[i].hasClass('open')) {
                items[i].removeClass('open');

                $('> ul', items[i]).slideUp();
            }
        }
    }

    if ( $("body:not(#home)").length && $("#sidebar").length && $("#content").length ) {
        $("body").addClass("two-column");
    }

    $("#mobile-nav .connect-menu").on('click', function() {
        toggleNav([nav, section]);
        $(".nav-social", connect).slideToggle();
        connect.toggleClass('open');
    });

    $("#mobile-nav .main-menu").on('click', function() {
        toggleNav([connect, section]);
        $("> ul", nav).slideToggle();
        nav.toggleClass('open');
    });

    $(".section-nav > a").on('click', function() {
        toggleNav([nav,  connect]);
        $("> ul", section).slideToggle();
        section.toggleClass('open');
    });

    // Set a default state for nav items
    $("#nav-horizontal a").data('state', 'closed');

    $('#nav-horizontal > li > a').on('touchstart', function(e) {
        var $this = $(this);

        // We want to open the item and prevent default on initial touch
        if ($this.data('state') === 'closed') {
            e.preventDefault();
            $this.data('state', 'open');
            $this.addClass('hover');
        } else {
            return;
        }
    });

    // Add 'has-children' to vertical nav
    $("#nav-vertical li").each(function() {
        if ($(this).children('ul').length) {
            $(this).addClass('has-children');
        }
    });

    // DL Dropdown
    $("dl.dropdown dd").hide();

    $("dl.dropdown dt").on('click', function() {
        var $this = $(this);
        $this.siblings('dd').toggle();
    });

    // Masonry Plugin for Department Landing Page

    if ($("#grid").length) {
        //var gridUrl = './masonry.min.js';
        if (window.location.host == "webtest.iu.edu") {
                var gridUrl = "http://webtest.iu.edu/~soic2/js/masonry.min.js";
        }else{
                var gridUrl = '/js/masonry.min.js';
        }
        //var gridUrl = IU.siteroot + 'js/masonry.min.js';
        
        $.getScript(gridUrl, function() {
            var container = document.querySelector('#grid');

            imagesLoaded(container, function() {
                var msnry = new Masonry( container, {
                    itemSelector: '.item',
                    columnWidth: container.querySelector('.grid-sizer'),
                });
            });
        })

    }

    /****************************************
     * Tooltips
     ****************************************/


    if ($('#home ul.features').length) {

        var tooltipUrl = IU.utils.getSiteRoot() + 'js/tooltip.min.js';

        $.getScript(tooltipUrl, function() {
            var isVisible = false;

            var hideAllPopovers = function() {
                $('.features li a').each(function() {
                    $(this).popover('hide');
                });
            };

            $('.features li a').popover({
                content: function() {
                    // console.log($(this));
                    return $(this).siblings('.content').html();
                },
                html: true,
                placement: function() {
                    // Show the popover on top if the items are last in the list.
                    var position = 'top';
                    if ($('#home').length < 1) {
                        var parentPos = this.$element.parent().index();
                        var items = $('.features li').length;
                        var lastRow = items % 3;
                        var diff = items - parentPos;

                        if (lastRow && (diff <= lastRow)) {
                            position = 'top';
                        }
                        if (!lastRow && diff <= 3) {
                            position = 'top';
                        }
                    }
                    return position;
                },
                template: '<div class="popover" role="tooltip"><div class="arrow"></div><div class="popover-content"></div></div>',
                title: function() {
                    return null;
                },
                trigger: 'manual',
                viewport: {selector: '#content', padding: 2}
            }).on('click', function(e) {
                // if any other popovers are visible, hide them
                if (isVisible) {
                    hideAllPopovers();
                }

                $(this).popover('show');

                $('.popover .close').on('click', function() {
                    hideAllPopovers();
                    isVisible = false;
                });

                // handle clicking on the popover itself
                $('.popover').off('click').on('click', function(e) {
                    e.stopPropagation(); // prevent event for bubbling up => will not get caught with document.onclick
                });

                isVisible = true;
                e.stopPropagation();
                e.preventDefault();
            });


            $(document).on('click', function(e) {
                hideAllPopovers();
                isVisible = false;
            });

            $('.features li a').on('shown.bs.popover', function() {
                var content = $(this).siblings().find('.popover-content');
                content.append('<span class="close">&times;</span>');
            });
        });
    }
    
    // Tabs sizing
    $('ul.tabs').each(function() {
		var tabItems = $(this).children('li');

		tabItems.css({
			width: (100/tabItems.length).toFixed(2) + "%"
		});
	});
    
    

//Tab Content - faculty pages;
    setupTabs();
    setupdropdown();
    registerClickEventTabContentLinks('.alpha li a');
    registerClickEventTabContentLinks('.dropdown a');
    setupajaxfacultysearch();
    
    
    // displaying content inside cascade server
    
    
    var url = $('div.external-feed').attr('data-script');
    $.getJSON(url, function (data) {
        $('div.content').append(data);
    }); 
        
    $.ajax({
     url: url
    }).done(function(html) {
     $('.external-feed').append(html);
    });


   $('a[href*=\'mailto\']').each(function(){
        var $this = $(this);
        var href = $this.attr('href').split('mailto:')[1];
        $this.attr('href', 'mailto:' + href);
    });

  $('#content .search-box form input[type=text]').keyup(function(){

        $('#content .search-box form').submit();

    });
         
});



function setupTabs()
{
    $("ul.tabs li a").click(function(event){
        event.preventDefault();
        // get tab id and tab url
        tabId = $(this).parent('li').attr("id");
        tabUrl = $(this).attr("href");
        $('ul.tabs li').removeClass("current");
        $("ul.tabs li#"+tabId).addClass("current");
        loadTabContent(tabUrl);

        return false;

    });
}

function getQueryVariable(variable, source)
{
    var query = source.split("?");
    var vars = query[1].split("&");
    for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        if(pair[0] == variable){return pair[1];}
    }
    return(false);
}

function saveResearchHistory(tabUrl) {
    if (addToHistory) {
        var title = getQueryVariable('researchName', tabUrl);
        if(title===false){
            var title = getQueryVariable('method', tabUrl);
        }
        var titleDashes = title.replace(/ /g,'-');
        var area = getQueryVariable('researchArea', tabUrl);
        if(area===false){
            area='all';
        }
        History.pushState({_index: History.getCurrentIndex()}, title + ' : Browse by Research Area: ' +
            'Faculty Directory: Faculty &amp; Research: School of Informatics and Computing: Indiana University',
            '?researchArea=' + area + '&tabId=5&researchName=' + titleDashes);
        addToHistory=true;
    }
    loadTabContent(tabUrl);
}

function saveDepartmentHistory(tabUrl) {
    if (addToHistory) {
        var dept = getQueryVariable('department', tabUrl);
        var name = getQueryVariable('name', tabUrl);
        if(name) {
        var nameDashes = name.replace(/ /g,'-');
            History.pushState({_index: History.getCurrentIndex()}, name + ' : Browse by Unit: Faculty Directory: ' +
                'Faculty & Research: School of Informatics and Computing: Indiana University',
                '?tabId=4&department=' + dept + '&name=' + nameDashes);
            addToHistory=true;
        }
    }
    loadTabContent(tabUrl);
}

function loadTabContent(tabUrl){

   $.getJSON(tabUrl+"&callback=?", 
function(data ) {
 $(".tab-content").empty().append(data.html);
    registerClickEventTabContentLinks('.alpha li a');
            registerClickEventTabContentLinks('.dropdown a');
            setupdropdown();

});

}

function setupajaxfacultysearch(){
$('.search-box form').on('submit',function(event){
    event.preventDefault();
    $.getJSON($(this).attr('action')+"&callback=?", $(this).serialize(), 
    function(data ) {
    $(".tab-content").empty();
             $(".tab-content").html(data.html);
             });

return false;

});
}

function setupdropdown(){

        // DL Dropdown
    $("dl.dropdown dd").hide();

    $("dl.dropdown dt").off('click');
    $("dl.dropdown dt").on('click', function() {
        var $this = $(this);
        $this.siblings('dd').toggle();
    });

}

function registerClickEventTabContentLinks(element) {
    $(element).bind('click',function(evt) {
        evt.preventDefault();
        tabUrl = $(this).attr('href');
        if(tabUrl.toLowerCase().indexOf('research')>0){
            saveResearchHistory(tabUrl);
        }else if(tabUrl.toLowerCase().indexOf('department')>0){
            saveDepartmentHistory(tabUrl);
        }else{
            loadTabContent(tabUrl);
        }
        return false;
    });
}

// Front page event tracking
$(document).ready(function() {
$('#action a[href$="graduate/degrees/masters-degrees.html"]').on('click', function() {
  ga('send', 'event', 'Front Page', 'click', 'I want a masters degree');
});

$('#action a[href$="undergraduate/degrees-certificates/index.html"]').on('click', function() {
  ga('send', 'event', 'Front Page', 'click', 'I want an undergraduate degree');
});

$('#action a[href$="graduate/degrees/phd-degrees.html"]').on('click', function() {
  ga('send', 'event', 'Front Page', 'click', 'I want a PhD');
});

$('.local>.icon-computer-science').on('click', function() {
  ga('send', 'event', 'Front Page', 'click', 'CS Circle opened');
});

$('.local>.icon-informatics').on('click', function() {
  ga('send', 'event', 'Front Page', 'click', 'INFO  Circle opened');
});

$('.local>.icon-info-and-lib-science').on('click', function() {
  ga('send', 'event', 'Front Page', 'click', 'ILS  Circle opened');
});

$('.local>.icon-engineering').on('click', function() {
  ga('send', 'event', 'Front Page', 'click', 'ISE  Circle opened');
});

$('img[src$="/NewGiveNowbutton.gif"]').on('click', function() {
  ga('send', 'event', 'A&G', 'click', 'Give Now button clicked');
});

$('.accordion-heading a').on('click', function() {
        var pageTitle = $('title').text()
        pageTitle = pageTitle.replace("School of Informatics and Computing: ", "");
        pageTitle = pageTitle.replace("Indiana University", "");
        pageTitle = pageTitle.replace("Information & Library Science", "ILS");
        pageTitle = pageTitle.replace("Computer Science", "CS");
        pageTitle = pageTitle.replace("Informatics", "INFO");
        var accordText = $(this).text();

  ga('send', 'event', 'Accordion', 'click', 'Accordion: ' + pageTitle + ' ' + accordText );

});

$('#sidebar a').on('click', function() {
        var pageTitle = $('title').text();
        pageTitle = pageTitle.replace("School of Informatics and Computing: ", "");
        pageTitle = pageTitle.replace("Indiana University", "");
        pageTitle = pageTitle.replace("Information & Library Science", "ILS");
        pageTitle = pageTitle.replace("Computer Science", "CS");
        pageTitle = pageTitle.replace("Informatics", "INFO");

        if ($(this).text()!=''){
                var containText = $(this).text();
        }else if ($(this).children('img').attr('alt')!='') {
                var containText = $(this).find('img').attr('alt');
        }else{
                var containText = 'Unknown Type';
        }

  ga('send', 'event', 'Sidebar', 'click', 'Sidebar ' + pageTitle + ' ' + containText);
});

//for site accordion auto open
//use url + ?open=Exact text of Accordion H4>a
$.urlParam = function(name){
    var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(window.location.href);
        if(results){
                return results[1] || 0;
        }
}
if ($.urlParam('open')) {  
$('ul.accordion .accordion-heading a').filter(function(){
   return $(this).html() == decodeURI($.urlParam('open'));
}).trigger('click');
}

});