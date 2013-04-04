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

// Juvia localization 

var juvia_locale = {
  
  t: {
    "flagged" : "Flagged",
    "flag"    : "Flag",
    "liked"   : "Liked",
    "like"    : "Like",
    "reply"   : "Reply",
    "edit"    : "Edit",
    "like_this_topic" : "Like this topic",
    "liked_this_topic" : "Liked this topic",
    "ok" : "OK",
    "cancel" : "Cancel",
    "markdown_help": "Help with formatting",
    "click_here": "click here",
    "format_text": "Format Text",
    "headers" : "Headers",
    "h1_header": "H1 Header",
    "h2_header": "H2 Header",
    "text_styles": "Text styles",
    "for_italic": "For italic",
    "for_bold":"For bold",
    "lists":"Lists",
    "unordered":"Unordered",
    "item_1":"Item 1",
    "item_2":"Item 2",
    "ordered":"Ordered",
    "miscellaneous":"Miscellaneous",
    "images":"Images",
    "format":"Format",
    "example":"Example",
    "more_help_on_markdown_home_page": "More help on markdown home page",
    "in_reply_to" : "In reply to",
    "by" : "by",
    "links": "Links",
    "first_confirm_msg": "Are you sure you wish to flag this comment?",
    "second_confirm_msg": "Thank you. This comment has been flagged for moderator attention.",
    "delete_confirm_msg": "Are you sure you wish to delete this comment?",
  },
  
de: {
    "flagged" : "gemeldet",
    "flag"    : "melden",
    "liked"   : "hat gefallen",
    "like"    : "gefällt mir",
    "reply"   : "antworten",
    "edit"    : "bearbeiten",
    "like_this_topic" : "Thema gefällt mir",
    "liked_this_topic" : "Thema hat Ihnen gefallen",
    "ok" : "OK",
    "cancel" : "abbrechen",
    "markdown_help": "Hilfe mit der Formatierung",
    "click_here": "hier klicken",
    "format_text": "Text formatieren",
    "headers" : "Kopfzeilen",
    "h1_header": "H1 Kopfzeile",
    "h2_header": "H2 Kopfzeile",
    "text_styles": "Schriftarten",
    "for_italic": "Kursiv",
    "for_bold":"Fett",
    "lists":"Listen",
    "unordered":"ungeordnet",
    "item_1":"Objekt 1",
    "item_2":"Objekt 2",
    "ordered":"geordnet",
    "miscellaneous":"Diverses",
    "images":"Bilder",
    "format":"Format",
    "example":"Beispiel",
    "in_reply_to" : "Antwort auf",
    "by" : "von",
    "links": "Links",
    "first_confirm_msg": "Sind Sie sicher, dass Sie diesen Kommentar melden möchten?",
    "second_confirm_msg": "Vielen Dank. Dieser Kommentar wurde zur Begutachtung durch die Moderatoren gemeldet.",
    "more_help_on_markdown_home_page": "Mehr Hilfe auf der Markdown Homepage",
    "delete_confirm_msg": "Sind Sie sicher, dass Sie diesen Kommentar löschen?",
  },

es: {
    "flagged" : "Marcado",
    "flag"    : "Notificar",
    "liked"   : "Me gustó",
    "like"    : "Me gusta",
    "reply"   : "Contestar",
    "edit"    : "Editar",
    "like_this_topic" : "Me gusta este tópico",
    "liked_this_topic" : "Me gustó este tópico",
    "ok" : "OK",
    "cancel" : "Cancelar",
    "markdown_help": "Para ayuda con el formato",
    "click_here": "haga clic aquí",
    "format_text": "Formato de Texto",
    "headers" : "Títulos",
    "h1_header": "Título T1",
    "h2_header": "Título T2",
    "text_styles": "Estilos de texto",
    "for_italic": "Para itálicas",
    "for_bold":"Para negritas",
    "lists":"Listas",
    "unordered":"Con viñetas",
    "item_1":"Elemento 1",
    "item_2":"Elemento 2",
    "ordered":"Numerada",
    "miscellaneous":"Misceláneos",
    "images":"Imágenes",
    "format":"Formato",
    "example":"Ejemplo",
    "more_help_on_markdown_home_page": "Más ayuda en la página de inicio de markdown",
    "in_reply_to" : "En respuesta a",
    "by" : "por",
    "links": "Enlaces",
    "first_confirm_msg": "¿Está seguro de querer marcar este comentario?",
    "second_confirm_msg": "Gracias. El comentario ha sido marcado para la atención del moderador.",
    "delete_confirm_msg": "¿Está seguro de querer eliminar este comentario?",
  },

  setLocale: function(lang){
    var locale = typeof lang == 'undefined' ? 'en' : lang;
    if (locale == "es" ){
      this.t = this.es;
    }
    else if(locale == "de" ){
      this.t = this.de;
    }
  }
  
};

// Juvia localization 

(function(Juvia) {
  var $ = Juvia.$ = window.jQuery.noConflict(true);
  
  Juvia.juvia_jquery = $;
  
  Juvia.juvia_jquery.extend(Juvia, juvia_locale);

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
