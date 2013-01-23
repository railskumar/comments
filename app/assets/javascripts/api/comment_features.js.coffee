Juvia.showMoreComments = (this_obj) ->
  $ = @juvia_jquery
  page_num = @current_page
  page_num = page_num + 1
  @current_page = page_num
  current_sorting_order = @sorting_order
  $(".load_more_contain img").show()
  $this = $(this_obj)
  $this.hide()
  form = $("#juvia-sort-select")
  $container = $(form).closest(".juvia-container")
  @loadJsScript "/api/show_comments",
    site_key: $container.data("site-key")
    topic_key: $container.data("topic-key")
    topic_url: $container.data("topic-url")
    page: page_num
    sorting_order: current_sorting_order


Juvia.showMoreUserComments = (this_obj) ->
  $ = @juvia_jquery
  page_num = @current_page
  page_num = page_num + 1
  @current_page = page_num
  $(".load_more_contain img").show()
  $this = $(this_obj)
  $this.hide()
  @loadJsScript "/api/append_user_comments",
    site_key: $this.attr("data-site-key")
    username: $this.attr("data-user-name")
    user_email: $this.attr("data-user-email")
    container: "#show_user_comments"
    page: page_num


Juvia.replyToComment = ($comment) ->
  #$ = @juvia_jquery
  $container = $comment.closest(".juvia-container")
  text = $(".juvia-comment-pure-content", $comment).text()
  lines = text.split("\n")
  i = undefined
  i = 0
  while i < lines.length
    lines[i] = "> " + lines[i]
    i++
  $textarea = $("textarea", $container)
  
  #var authorName = $('input[name="author_name"]', $container).val(); 
  authorName = $.trim($(".juvia-author-name", $comment).text())
  newContent = "*In reply to [#" + $comment.data("comment-number") + "](#" + $comment.attr("id") + "') by " + authorName + ":*\n" + lines.join("\n")
  unless $textarea.val() is ""
    newContent += "\n\n"
    newContent += $textarea.val()
  $textarea.val newContent
  @smoothlyScrollTo $textarea.offset().top
  $textarea.focus()


Juvia.sortComments = (event, this_obj) ->
  $ = @juvia_jquery
  $("#show_more_comments").hide()
  @sorting_order = this_obj.value
  @set_cookie "sorting_order", this_obj.value,
    path: "/"

  @current_page = 1
  form = event.target
  $container = $(form).closest(".juvia-container")
  @loadScript "/api/sort_comment",
    site_key: $container.data("site-key")
    topic_key: $container.data("topic-key")
    topic_title: $container.data("topic-title")
    topic_url: $container.data("topic-url")
    author_name: $("input[name=\"author_name\"]", $container).val()
    author_email: $("input[name=\"author_email\"]", $container).val()
    sort: this_obj.value

  $("#juvia-comments-box").html ""
  $(".load_more_contain img").show()


Juvia.voteComment = (event, this_obj) ->
  #$ = @juvia_jquery
  $this = $(this_obj)
  form = event.target
  $container = $(form).closest(".juvia-container")
  up_down = 1
  $vote_icon = $this.find("i")
  $vote_text = $this.find("span")
  if $vote_icon.hasClass("icon-thumbs-up")
    $vote_icon.removeClass "icon-thumbs-up"
    $vote_icon.addClass "icon-thumbs-down"
    $vote_text.html " Liked"
    up_down = 1
  else
    $vote_icon.removeClass "icon-thumbs-down"
    $vote_icon.addClass "icon-thumbs-up"
    $vote_text.html " Like"
    up_down = 0
  a_name = $("input[name=\"author_name\"]", $container).val()
  a_email = $("input[name=\"author_email\"]", $container).val()
  opt1 =
    site_key: $container.data("site-key")
    topic_key: $container.data("topic-key")
    topic_url: $container.data("topic-url")
    comment_key: $this.data("comment-id")
    vote: up_down

  opt2 = {}
  unless typeof a_email is "undefined"
    opt2 =
      author_name: a_name
      author_email: a_email
  @loadJsScript "/api/post/vote", $.extend(opt1, opt2)


Juvia.voteTopic = (event, this_obj) ->
  $ = @$
  $this = $(this_obj)
  form = event.target
  $container = $(form).closest(".juvia-container")
  $unlike = $("#vote_for_unlike")
  $unlike_text = $("#vote_for_unlike").find("span")
  $like = $("#vote_for_like")
  $like_text = $("#vote_for_like").find("span")
  $vote_icon = $this.find("i")
  $vote_text = $this.find("span")
  if $vote_icon.hasClass("icon-thumbs-up")
    if $this.hasClass("votes-up-active")
      up_down = 0
      $this.removeClass "votes-up-active"
      $vote_text.html " Like"
    else
      up_down = 1
      if $unlike.hasClass("votes-down-active")
        $unlike.removeClass "votes-down-active"
        $unlike_text.html " Unlike"
      else
        $this.addClass "votes-up-active"
        $vote_text.html " Liked"
  else
    if $this.hasClass("votes-down-active")
      up_down = 1
      $this.removeClass "votes-down-active"
      $vote_text.html " Unlike"
    else
      up_down = 0
      if $like.hasClass("votes-up-active")
        $like.removeClass "votes-up-active"
        $like_text.html " Like"
      else
        $this.addClass "votes-down-active"
        $vote_text.html " Unliked"
  a_name = $("input[name=\"author_name\"]", $container).val()
  a_email = $("input[name=\"author_email\"]", $container).val()
  opt1 =
    site_key: $container.data("site-key")
    topic_key: $container.data("topic-key")
    topic_url: $container.data("topic-url")
    topic_title: $container.data("topic-title")
    vote: up_down

  opt2 = {}
  unless typeof a_email is "undefined"
    opt2 =
      author_name: a_name
      author_email: a_email
  @loadJsScript "/api/topic/vote", $.extend(opt1, opt2)


Juvia.reportComment = (event, this_obj) ->
  $this = $(this_obj)
  form = event.target
  $container = $(form).closest(".juvia-container")
  @loadScript "/api/post/flag",
    site_key: $container.data("site-key")
    topic_key: $container.data("topic-key")
    topic_title: $container.data("topic-title")
    topic_url: $container.data("topic-url")
    comment_key: $this.data("comment-id")
    author_name: $("input[name=\"author_name\"]", $container).val()
    author_email: $("input[name=\"author_email\"]", $container).val()

  false
