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
    "by" : "by",
    "cancel" : "Cancel",
    "click_here": "click here",
    "delete_confirm_msg": "Are you sure you wish to delete this comment?",
    "edit"    : "Edit",
    "example":"Example",
    "first_confirm_msg": "Are you sure you wish to flag this comment?",
    "flagged" : "Flagged",
    "flag"    : "Flag",
    "format":"Format",
    "format_text": "Format Text",
    "for_bold":"For bold",
    "for_italic": "For italic",
    "h1_header": "H1 Header",
    "h2_header": "H2 Header",
    "headers" : "Headers",
    "item_1":"Item 1",
    "item_2":"Item 2",
    "images":"Images",
    "in_reply_to" : "In reply to",
    "liked"   : "Liked",
    "like"    : "Like",
    "like_this_topic" : "Like this topic",
    "liked_this_topic" : "Liked this topic",
    "links": "Links",
    "lists":"Lists",
    "markdown_help": "Help with formatting",
    "miscellaneous":"Miscellaneous",
    "more_help_on_markdown_home_page": "More help on markdown home page",
    "ok" : "OK",
    "ordered":"Ordered",
    "reply"   : "Reply",
    "second_confirm_msg": "Thank you. This comment has been flagged for moderator attention.",
    "text_styles": "Text styles",
    "unordered":"Unordered",
  },
  
de: {
    "by" : "von",
    "cancel" : "abbrechen",
    "click_here": "hier klicken",
    "delete_confirm_msg": "Sind Sie sicher, dass Sie diesen Kommentar löschen?",
    "edit"    : "bearbeiten",
    "example":"Beispiel",
    "first_confirm_msg": "Sind Sie sicher, dass Sie diesen Kommentar melden möchten?",
    "flagged" : "gemeldet",
    "flag"    : "melden",
    "format":"Format",
    "format_text": "Text formatieren",
    "for_bold":"Fett",
    "for_italic": "Kursiv",
    "h1_header": "H1 Kopfzeile",
    "h2_header": "H2 Kopfzeile",
    "headers" : "Kopfzeilen",
    "item_1":"Objekt 1",
    "item_2":"Objekt 2",
    "images":"Bilder",
    "in_reply_to" : "Antwort auf",
    "liked"   : "hat gefallen",
    "like"    : "gefällt mir",
    "like_this_topic" : "Thema gefällt mir",
    "liked_this_topic" : "Thema hat Ihnen gefallen",
    "links": "Links",
    "lists":"Listen",
    "markdown_help": "Hilfe mit der Formatierung",
    "miscellaneous":"Diverses",
    "more_help_on_markdown_home_page": "Mehr Hilfe auf der Markdown Homepage",
    "ok" : "OK",
    "ordered":"geordnet",
    "reply"   : "antworten",
    "second_confirm_msg": "Vielen Dank. Dieser Kommentar wurde zur Begutachtung durch die Moderatoren gemeldet.",
    "text_styles": "Schriftarten",
    "unordered":"ungeordnet",
  },

es: {
    "by" : "por",
    "cancel" : "Cancelar",
    "click_here": "haga clic aquí",
    "delete_confirm_msg": "¿Está seguro de querer eliminar este comentario?",
    "edit"    : "Editar",
    "example":"Ejemplo",
    "first_confirm_msg": "¿Está seguro de querer marcar este comentario?",
    "flagged" : "Marcado",
    "flag"    : "Notificar",
    "format":"Formato",
    "format_text": "Formato de Texto",
    "for_bold":"Para negritas",
    "for_italic": "Para itálicas",
    "h1_header": "Título T1",
    "h2_header": "Título T2",
    "headers" : "Títulos",
    "item_1":"Elemento 1",
    "item_2":"Elemento 2",
    "images":"Imágenes",
    "in_reply_to" : "En respuesta a",
    "liked"   : "Me gustó",
    "like"    : "Me gusta",
    "like_this_topic" : "Me gusta este tópico",
    "liked_this_topic" : "Me gustó este tópico",
    "links": "Enlaces",
    "lists":"Listas",
    "markdown_help": "Para ayuda con el formato",
    "miscellaneous":"Misceláneos",
    "more_help_on_markdown_home_page": "Más ayuda en la página de inicio de markdown",
    "ok" : "OK",
    "ordered":"Numerada",
    "reply"   : "Contestar",
    "second_confirm_msg": "Gracias. El comentario ha sido marcado para la atención del moderador.",
    "text_styles": "Estilos de texto",
    "unordered":"Con viñetas",
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
