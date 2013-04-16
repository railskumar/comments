// -*- Mode: SCSS; tab-width: 8; indent-tabs-mode: true; c-basic-offset: 8 -*-

var Juvia, toMarkdown, RawDeflate, Base64;
if (!Juvia) {
	Juvia = {
    user_logged_in: false,
    restrict_comment_length: false,
    sorting_order: 'oldest',
    current_page: 1,
    total_pages: 1,
    site_key: '',
    topic_key: '',
    topic_url: '',
    topic_title: '',
    username: '',
    user_email: '',
    use_my_user: 'false',
    root_url: '',
    juvia_jquery: '',
    perma_link_comment_id: ''
	};
}

(function(Juvia) {
  var $ = Juvia.$ = window.jQuery.noConflict(true);
  
  Juvia.juvia_jquery = $;
  
  Juvia.set_cookie = function(the_cookie, the_value, options){
    $.cookie(the_cookie, the_value, options);
  }
  
  Juvia.get_cookie = function(the_cookie){
    return $.cookie(the_cookie);
  }
  
  Juvia.remove_cookie = function(the_cookie){
    $.removeCookie(the_cookie);
    $.removeCookie(the_cookie, { path: '/' });
  }
	
	if (Date.now) {
		Juvia.now = Date.now;
	} else {
		Juvia.now = function() {
			return new Date().getTime();
		}
	}
	
	/********* Initialization *********/
	
	if (!('_juviaRequestCounter' in window)) {
		window._juviaRequestCounter = 0;
	}
	
	// Checks whether browser supports Cross-Origin Resource Sharing.
	if (!('supportsCors' in Juvia)) {
		if (window.XMLHttpRequest) {
			var xhr = new XMLHttpRequest();
			Juvia.supportsCors = 'withCredentials' in xhr;
		} else {
			Juvia.supportsCors = false;
		}
	}	
	
	for (var name in Juvia) {
		if (name != '$' && typeof(Juvia[name]) == 'function') {
			Juvia[name] = $.proxy(Juvia[name], Juvia);
		}
	}
})(Juvia);
