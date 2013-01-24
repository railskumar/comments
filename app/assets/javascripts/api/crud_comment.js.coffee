Juvia.editComment = (this_obj) ->
  self = this
  $ = @$
  self.uniq_edit_id = self.uniq_edit_id or 123
  self.uniq_edit_id = self.uniq_edit_id + 1
  return  if $(this_obj).find("textarea").length > 0
  $textarea = $("<textarea class=\"juvia-text-area\" />")
  $textarea.delayedObserver ->
    self.previewEditComment this

  $buttons = $("<div class=\"edit-buttons\"><button class=\"btn update_comment\" type=\"button\">OK</button><button class=\"btn\" type=\"button\" onclick=\"Juvia.resumeEdit($(this).parent().parent())\">Cancel</button></div>")
  edit_preview_help = $("<div class='row row-markdown'><div class='span'>Help with formatting  <a href='#markdowncollapse_" + self.uniq_edit_id + "'data-toggle='jcollapse'>click here</a></div></div><div id='markdowncollapse_" + self.uniq_edit_id + "'class='edit_markdown_div jcollapse'><div class='edit_markdown_child_div'><div class='edit_markdown_upper_div'><div class='row'><div class='span pull-right'><a href='#markdowncollapse_" + self.uniq_edit_id + "'data-toggle='jcollapse'>X</a></div></div><div class='format_list_div'><h4>Format Text</h4><p>Headers</p><pre>#H1 Header<br>##H2 Header</pre><p>Text styles</p><pre>*For italic*<br>**For bold**</pre></div><div class='format_list_div'><h4>Lists</h4><p>Unordered</p><pre>*Item 1<br>*Item 2</pre><p>Ordered</p><pre>1.Item 1<br>2.Item 2</pre></div><div class='format_list_div edit_miscell'><h4>Miscellaneous</h4><p>Images</p><pre>Format:![Alt Text](url)<br>Example: ![rdf richard](http://rdfrs.com/assets/richard.png)</pre><p>Links</p><pre>Example: [Google](http://google.com)</pre><p class='pull-right'><a href='http://daringfireball.net/projects/markdown/basics'target='_blank'>More help on markdown home page</a></p></div></div></div></div>")
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
  @loadScript "/api/update_comment",
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
  liked = option.liked
  flagged = option.flagged
  comment_user_email = option.user_email
  editable = ->
    return true  if option.can_edit is "true"
    false

  a = document.createElement("div")
  a.className = "juvia-comment"
  a.id = "comment-box-" + comment_number  unless comment_number is ""
  a.setAttribute "data-comment-number", comment_number
  
  # Start Header creation 
  $(a).html "<div class='row-fluid'><div class='span1'><div class='row-fluid'><div class='span10 juvia-avatar'><img width='64'height='38'class='img-circle'data-user-email='" + comment_user_email + "'src='" + user_image + "'></div></div></div><div class='span11 rdf-comment-header'><div class='row-fluid'><div class='span10'><span class='header-user-name juvia-author-name'>" + user_name + "</span></div><div class='span2'><div class='row-fluid'><div class='span8'><span class='pull-right'>" + comment_number + "</span></div><div class='span1'></div><div class='span3'><span data-divid='divid" + comment_id + "'class='collapse_link_class'href='#divid" + comment_id + "'data-toggle='jcollapse'><i class='icon-minus'id='comment_sign_divid" + comment_id + "'></i></span></div></div></div></div></div></div>"
  
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
  if editable()
    ababa.className = "span7"
  else
    ababa.className = "span7"
  abab.appendChild ababa
  ababaa_p = document.createElement("p")
  ababa.appendChild ababaa_p
  ababaaa_span = document.createElement("span")
  ababaaa_span.appendChild document.createTextNode(creation_date)
  ababaa_p.appendChild ababaaa_span
  ababaab_span = document.createElement("span")
  ababaab_span.id = "comment-vote-" + comment_id
  ababaab_span.setAttribute "style", "margin-left:15px"
  ababaab_span.appendChild document.createTextNode(comment_votes)
  ababaa_p.appendChild ababaab_span
  bottom_second_colm = document.createElement("div")
  bottom_second_colm.className = "span5"
  abab.appendChild bottom_second_colm
  function_links = document.createElement("div")
  function_links.className = "row-fluid"
  $(function_links).css "text-align", "right"
  bottom_second_colm.appendChild function_links
  ababb_flag = document.createElement("div")
  if editable()
    ababb_flag.className = "span4"
  else
    ababb_flag.className = "span6"
  flag_comment_tag = document.createElement("flagcomment")
  flag_comment_tag.setAttribute "data-comment-id", comment_id
  ababb_flag_p = document.createElement("i")
  flag_span = document.createElement("span")
  flag_span.id = "flag-" + comment_id
  if flagged is "Flagged"
    flag_span.appendChild document.createTextNode(" Flagged")
    ababb_flag_p.className = "icon-flag"
  else
    flag_span.appendChild document.createTextNode(" Flag")
    $(flag_comment_tag).css "visibility", "hidden"
    ababb_flag_p.className = "icon-flag"
    flag_comment_tag.className = "blink_text"
  flag_comment_tag.appendChild ababb_flag_p
  flag_comment_tag.appendChild flag_span
  ababb_flag.appendChild flag_comment_tag
  function_links.appendChild ababb_flag
  ababb = document.createElement("div")
  ababb.className = "span3"
  function_links.appendChild ababb
  vote_comment_tag = document.createElement("votecomment")
  vote_comment_tag.className = "juvia-vote-to-comment"
  vote_comment_tag.id = "comment-vote-icon-" + comment_id
  vote_comment_tag.setAttribute "data-comment-id", comment_id
  ababba = document.createElement("i")
  like_span = document.createElement("span")
  if liked is "liked"
    ababba.className = "icon-thumbs-down"
    like_span.appendChild document.createTextNode(" Liked")
  else
    ababba.className = "icon-thumbs-up"
    like_span.appendChild document.createTextNode(" Like")
  vote_comment_tag.appendChild ababba
  vote_comment_tag.appendChild like_span
  ababb.appendChild vote_comment_tag
  ababc = document.createElement("div")
  ababc.className = "span3"
  function_links.appendChild ababc
  ababca = document.createElement("span")
  ababca.className = "rdf-reply-to-comment"
  ababc.appendChild ababca
  ababca.appendChild document.createTextNode("Reply")  if @user_logged_in and not @restrict_comment_length
  if editable()
    edit_comment_dom = document.createElement("div")
    edit_comment_dom.className = "span2"
    function_links.appendChild edit_comment_dom
    edit_comment_dom_p = document.createElement("p")
    edit_comment_dom_p.className = "juvia-edit-to-comment"
    edit_comment_dom.appendChild edit_comment_dom_p
    edit_comment_dom_p_a = document.createElement("a")
    edit_comment_dom_p_a.setAttribute "href", "javascript:void(0)"
    edit_comment_dom_p_a.appendChild document.createTextNode("Edit")
    edit_comment_dom_p.appendChild edit_comment_dom_p_a
  a
