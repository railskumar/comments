Juvia.editComment = (this_obj) ->
  self = this
  $ = @$
  self.uniq_edit_id = self.uniq_edit_id or 123
  self.uniq_edit_id = self.uniq_edit_id + 1
  return  if $(this_obj).find("textarea").length > 0
  $textarea = $("<textarea class=\"juvia-text-area\" name=\"edit_area\" />")
  $textarea.delayedObserver ->
    self.previewEditComment this

  $buttons = $("<div class=\"edit-buttons\"><button class=\"btn update_comment\" type=\"button\">"+@translated_locale.ok+"</button><button class=\"btn\" type=\"button\" onclick=\"Juvia.resumeEdit($(this).parent().parent())\">"+@translated_locale.cancel+"</button></div>")
  edit_preview_help = $("<div class='row row-markdown'><div class='span'>" + @translated_locale.markdown_help + " <a href='#markdowncollapse_" + self.uniq_edit_id + "'data-toggle='jcollapse'>" + @translated_locale.click_here + "</a></div></div><div id='markdowncollapse_" + self.uniq_edit_id + "'class='edit_markdown_div jcollapse'><div class='edit_markdown_child_div'><div class='edit_markdown_upper_div'><div class='row'><div class='span pull-right'><a href='#markdowncollapse_" + self.uniq_edit_id + "'data-toggle='jcollapse'>X</a></div></div><div class='format_list_div'><h4>" + @translated_locale.format_text + "</h4><p>" + @translated_locale.headers + "</p><pre>#" + @translated_locale.h1_header + "<br>##" + @translated_locale.h2_header + "</pre><p>" + @translated_locale.text_styles + "</p><pre>*" + @translated_locale.for_italic + "*<br>**" + @translated_locale.for_bold + "**</pre></div><div class='format_list_div'><h4>" + @translated_locale.lists + "</h4><p>" + @translated_locale.unordered + "</p><pre>*" + @translated_locale.item_1 + "<br>*" + @translated_locale.item_2 + "</pre><p>" + @translated_locale.ordered + "</p><pre>1."+ @translated_locale.item_1 + "<br>2." + @translated_locale.item_2 + "</pre></div><div class='format_list_div edit_miscell'><h4>" + @translated_locale.miscellaneous + "</h4><p>" + @translated_locale.images + "</p><pre>" + @translated_locale.format + ":![Alt Text](url)<br>" + @translated_locale.example + ": ![rdf richard](http://rdfrs.com/assets/richard.png)</pre><p>" + @translated_locale.links + "</p><pre>" + @translated_locale.example + ": [Google](http://google.com)</pre><p class='pull-right'><a href='http://daringfireball.net/projects/markdown/basics'target='_blank'>" + @translated_locale.more_help_on_markdown_home_page + "</a></p></div></div></div></div>")
  htmlContent = $(this_obj).html()
  markdwonContent = toMarkdown(htmlContent)
  $textarea.val markdwonContent
  $edit_dom = $("<div></div>")
  $edit_dom.addClass "juvia-preview-content margin-edit"
  $edit_dom.html htmlContent
  $(this_obj).html("<br/>").append($textarea).append($buttons).append($edit_dom).append edit_preview_help
  $buttons.find(".update_comment").bind "click", ->
    self.updateComment this

  $textarea.focus()


Juvia.updateComment = (this_obj) ->
  $ = @$
  $this = $(this_obj)
  $comment_input = $this.parent().parent().find("textarea")
  comment_id = $this.closest(".juvia-data").attr("id")
  comment_id = comment_id.replace("divid", "")
  form = $(".juvia-add-comment-form")
  $container = $(".juvia-add-comment-form").closest(".juvia-container")
  @loadScript "/api/comments/update_comment",
    site_key: $container.data("site-key")
    restrict_comment_length: @restrict_comment_length
    comment_id: comment_id
    content: @compress($comment_input.val())


Juvia.resumeEdit = ($main_edit) ->
  $edit_dom = $main_edit.find(".juvia-preview-content")
  original_html = $edit_dom.html()
  $main_edit.html original_html
  false


Juvia.previewEditComment = (this_obj) ->
  $ = @$
  $textarea = $(this_obj)
  input_value = $textarea.val()
  input_value = input_value.substring(0, 140)  if @restrict_comment_length and input_value.length > 140
  html_output = markdown.toHTML(input_value)
  $preview_dom = $textarea.parent().find(".juvia-preview-content")
  $preview_dom.html(html_output).show()
  false


Juvia.handleUpdateComment = (options) ->
  self = this
  $ = @$
  if options.status is "ok"
    self.resumeEdit $("#divid" + options.comment_id).find(".juvia-comment-pure-content")
  else
    alert "something went wrong"


Juvia.findContainer = (options) ->
  $ = @$
  $ ".juvia-container[data-site-key=\"" + options.site_key + "\"][data-topic-key=\"" + options.topic_key + "\"]"


Juvia.appendComment = (dom_element) ->
  $ = @$
  $("#juvia-comments-box").append dom_element


Juvia.prependComment = (dom_element) ->
  $ = @$
  $(dom_element).prependTo $("#juvia-comments-box")


Juvia.rdf_comment_box = (option) ->
  $ = @$
  comment_number = (if (not (option.comment_number?)) then "" else option.comment_number + "")
  comment_id = option.comment_id
  user_image = option.user_image
  user_name = option.user_name
  comment_text = option.comment_text
  creation_date = option.creation_date
  comment_votes = option.comment_votes
  user_like_comment = option.user_like_comment
  liked = option.liked
  flagged = option.flagged
  comment_permalink = option.permalink
  comment_user_email = option.user_email
  author_email = " "
  unless comment_user_email is null
    author_email = @compress(comment_user_email)
  editable = ->
    return true  if option.can_edit is "true"
    false

  a = document.createElement("div")
  a.className = "juvia-comment"
  a.id = "comment-box-" + comment_number  unless comment_number is ""
  a.setAttribute "data-comment-number", comment_number
  a.setAttribute "data-comment-id", comment_id
  
  # Start Header creation 
  $(a).html "<div class='row-fluid'><div class='span1'><div class='row-fluid'><div class='span10 juvia-avatar'><img width='64'height='38'class='img-circle'data-user-email='" + author_email + "'src='" + user_image + "'></div></div></div><div class='span11 rdf-comment-header'><div class='row-fluid'><div class='span10 author-span'><span class='header-user-name juvia-author-name'>" + user_name + "</span></div><div class='span2 permalink-span'><div class='row-fluid'><div class='span3'></div><div class='span3 permalink' id = 'permalink-" + comment_number + "' onclick=Juvia.permalinkToComment(\"" + comment_permalink + "\");><i class='icon-tag'></i></div><div class='span3'><span class='pull-right'>" + comment_number + "</span></div><div class='span1'></div><div class='span2'><span data-divid='divid" + comment_id + "'class='collapse_link_class'href='#divid" + comment_id + "'data-toggle='jcollapse'><i class='icon-minus'id='comment_sign_divid" + comment_id + "'></i></span></div></div></div></div></div></div>"
  
  # end Comment Header Bar
  ab = document.createElement("div")
  ab.className = "juvia-data in jcollapse"
  ab.setAttribute "id", "divid" + comment_id
  a.appendChild ab
  aba = document.createElement("div")
  aba.className = "juvia-comment-content"
  ab.appendChild aba
  abaa = document.createElement("div")
  if editable()
    abaa.className = "juvia-comment-pure-content juvia-comment-editable-content"
  else
    abaa.className = "juvia-comment-pure-content"
  
  $(abaa).html comment_text

  aba.appendChild abaa
  abab = document.createElement("div")
  abab.className = "row-fluid juvia-comment-function"
  aba.appendChild abab
  ababa = document.createElement("div")
  if @user_logged_in and editable() or @user_logged_in
    ababa.className = "span7"
  else
    ababa.className = "span8"
  abab.appendChild ababa
  abba_row = document.createElement("div")
  abba_row.className = "row-fluid"
  ababa.appendChild abba_row
  abba_div5 = document.createElement("div")
  
  abba_div5.className = "span5 minimum-width"
  abba_row.appendChild abba_div5
  ababaa_p = document.createElement("p")
  abba_div5.appendChild ababaa_p
  ababaaa_span = document.createElement("span")
  ababaaa_span.appendChild document.createTextNode(creation_date)
  ababaa_p.appendChild ababaaa_span
  abba_div7 = document.createElement("div")
  
  abba_div7.className = "span7 minimum-width"
  abba_row.appendChild abba_div7
  ababbaa_p = document.createElement("p")
  abba_div7.appendChild ababbaa_p
  ababaab_span = document.createElement("span")
  ababaab_span.id = "comment-vote-" + comment_id
  if user_like_comment is "true"
    ababaab_span.className = "comment-vote user_like"
  else
    ababaab_span.className = "comment-vote guest_like"
  ababaab_span.setAttribute "data-comment-id", comment_id
  ababaab_span.appendChild document.createTextNode(comment_votes)
  ababbaa_p.appendChild ababaab_span
  bottom_second_colm = document.createElement("div")
  if @user_logged_in and editable() or @user_logged_in
    bottom_second_colm.className = "span5 minimum-width"
  else
    bottom_second_colm.className = "span4 minimum-width"
  abab.appendChild bottom_second_colm
  function_links = document.createElement("div")
  function_links.className = "row-fluid text-alignment"
  bottom_second_colm.appendChild function_links
  ababb_flag = document.createElement("div")
  if editable() and @user_logged_in
    ababb_flag.className = "span4"
  else if @user_logged_in and @user_email != comment_user_email
    ababb_flag.className = "span4"
  else if @user_logged_in
    ababb_flag.className = "span4"
  else
    ababb_flag.className = "span6"
  flag_comment_tag = document.createElement("flagcomment")
  flag_comment_tag.setAttribute "data-comment-id", comment_id
  ababb_flag_p = document.createElement("i")
  flag_span = document.createElement("span")
  flag_span.id = "flag-" + comment_id
  if flagged is "Flagged"
    flag_span.appendChild document.createTextNode(" " + @translated_locale.flagged)
    flag_comment_tag.className = "flagged"
  else
    flag_span.appendChild document.createTextNode(" " + @translated_locale.flag)
  ababb_flag_p.className = "icon-flag"
  flag_comment_tag.appendChild ababb_flag_p
  flag_comment_tag.appendChild flag_span
  ababb_flag.appendChild flag_comment_tag
  function_links.appendChild ababb_flag
  ababb = document.createElement("div")
  if @user_logged_in
    ababb.className = "span4"
  else
    ababb.className = "span6"
  unless @user_email is comment_user_email    
    function_links.appendChild ababb  
    vote_comment_tag = document.createElement("votecomment")
    vote_comment_tag.className = "juvia-vote-to-comment"
    vote_comment_tag.id = "comment-vote-icon-" + comment_id
    vote_comment_tag.setAttribute "data-comment-id", comment_id
    ababba = document.createElement("i")
    like_span = document.createElement("span")
    if liked is "liked"
      ababba.className = "icon-thumbs-up down-active"
      like_span.appendChild document.createTextNode(" " + @translated_locale.liked)
    else
      ababba.className = "icon-thumbs-up up-active"
      like_span.appendChild document.createTextNode(" " + @translated_locale.like)
    vote_comment_tag.appendChild ababba
    vote_comment_tag.appendChild like_span
    ababb.appendChild vote_comment_tag
  if @user_logged_in and not @restrict_comment_length
    ababc = document.createElement("div")
    if editable() and @user_logged_in
      ababc.className = "span4"
    else if @user_logged_in and @user_email != comment_user_email
      ababc.className = "span4"
    else if @user_logged_in
      ababc.className = "span4"
    else
      ababc.className = "span6"
    function_links.appendChild ababc
    reply_comment_tag = document.createElement("replycomment")
    reply_comment_tag.className = "rdf-reply-to-comment"
    reply_comment_tag.setAttribute "data-comment-id", comment_id
    ababc.appendChild reply_comment_tag
    ababb_reply_p = document.createElement("i")
    ababb_reply_p.className = "icon-share-alt"
    reply_comment_tag.appendChild ababb_reply_p
    ababca = document.createElement("span")
    reply_comment_tag.appendChild ababca
    ababca.appendChild document.createTextNode(" " + @translated_locale.reply)
  if @user_email is comment_user_email 

    edit_comment_dom = document.createElement("div")
    edit_comment_dom.className = "span4 right"
    function_links.appendChild edit_comment_dom

    btn_group_dom = document.createElement("div")
    btn_group_dom.className = "dropdown"
    edit_comment_dom.appendChild btn_group_dom

    btn_dom = document.createElement("a")
    btn_dom.className = "dropdown-toggle more-options"
    btn_dom.setAttribute 'data-toggle', 'dropdown'
    btn_dom.setAttribute "data-wrapper", "divid" + comment_id

    text_span = document.createElement("span")
    text_span.appendChild document.createTextNode(" " + @translated_locale.more)
    caret_span = document.createElement("span")
    caret_span.className = "caret"
    btn_dom.appendChild text_span
    btn_dom.appendChild caret_span
    btn_group_dom.appendChild btn_dom

    ul_dom = document.createElement("ul")
    ul_dom.className = "dropdown-menu pull-right left"
    if editable()
      li_edit = document.createElement("li")
      li_edit.className = "editcomment juvia-edit-to-comment"
      li_edit.setAttribute "data-comment-id", comment_id
      a_edit = document.createElement("a")
      edit_icon = document.createElement("i")
      edit_icon.className = "icon-edit margin_right"
      a_edit.appendChild edit_icon 
      a_edit.appendChild document.createTextNode(" " + @translated_locale.edit)
      li_edit.appendChild a_edit
      ul_dom.appendChild li_edit
      li_divider = document.createElement("li")
      li_divider.className = "divider"
      ul_dom.appendChild li_divider
    li_delete = document.createElement("li")
    li_delete.className = "deletecomment"
    li_delete.setAttribute "data-comment-id", comment_id
    a_delete = document.createElement("a")
    delete_icon = document.createElement("i")
    delete_icon.className = "icon-trash margin_right"
    a_delete.appendChild delete_icon
    a_delete.appendChild document.createTextNode(" " + @translated_locale.delete)
    li_delete.appendChild a_delete
    ul_dom.appendChild li_delete
    btn_group_dom.appendChild ul_dom
  a
