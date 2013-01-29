###
UTF-8 encodes the given string.
###
Juvia.encodeUtf8 = (string) ->
  string = string.replace(/\r\n/g, "\n")
  utftext = ""
  n = 0

  while n < string.length
    c = string.charCodeAt(n)
    if c < 128
      utftext += String.fromCharCode(c)
    else if (c > 127) and (c < 2048)
      utftext += String.fromCharCode((c >> 6) | 192)
      utftext += String.fromCharCode((c & 63) | 128)
    else
      utftext += String.fromCharCode((c >> 12) | 224)
      utftext += String.fromCharCode(((c >> 6) & 63) | 128)
      utftext += String.fromCharCode((c & 63) | 128)
    n++
  utftext


###
Casts the given integer as unsigned 32-bit.
###
Juvia.uint32 = (i) ->
  i >>> 0


###
Casts the given integer as unsigned 8-bit.
###
Juvia.uint8 = (i) ->
  i & 0xff


Juvia.adler32 = (data) ->
  a = 1
  b = 0
  index = undefined
  index = 0
  while index < data.length
    a = (a + data.charCodeAt(index)) % 65521
    b = (b + a) % 65521
    index++
  @uint32 (b << 16) | a


###
Converts a 32-bit unsigned integer into a 32-bit binary string, big endian encoding.
###
Juvia.uintToBinary = (i) ->
  buf = []
  buf[0] = String.fromCharCode(@uint8((i & 0xff000000) >> 24))
  buf[1] = String.fromCharCode(@uint8((i & 0xff0000) >> 16))
  buf[2] = String.fromCharCode(@uint8((i & 0xff00) >> 8))
  buf[3] = String.fromCharCode(@uint8(i & 0xff))
  buf.join ""


Juvia.compress = (str) ->
  if str.length is 0
    Base64.encode "x\u0003\u0000\u0000\u0000\u0000\u0001"
  else
    data = @encodeUtf8(str)
    data = "x" + RawDeflate.deflate(data) + @uintToBinary(@adler32(data))
    Base64.encode data


Juvia.showFormError = (container, message) ->
  $ = @$
  div = $(".juvia-form-actions .juvia-error", container)
  if message is `undefined` or not message? or message is ""
    div.hide()
  else
    div.text(message).show()


Juvia.loadScript = (path, options) ->
  $ = @$
  url = @root_url
  url += path
  if @supportsCors
    url += ".json"
    $.post url, options, ((response) ->
      Juvia.handleResponse response
    ), "json"
  else
    url += ".js"
    
    # Makes sure that each loadScript() call generates a unique URL,
    # otherwise the browser may not actually perform the request.
    url += "?_c=" + window._juviaRequestCounter
    window._juviaRequestCounter++
    paramString = $.param(options)
    if paramString.length > 0
      url += "&"
      url += paramString
    $("script.juvia").remove()
    s = document.createElement("script")
    s.async = true
    s.type = "text/javascript"
    s.className = "juvia"
    s.src = url
    (document.getElementsByTagName("head")[0] or document.getElementsByTagName("body")[0]).appendChild s


Juvia.loadJsScript = (path, options) ->
  $ = @$
  url = @root_url
  url += path
  url += ".js"
  
  # Makes sure that each loadScript() call generates a unique URL,
  # otherwise the browser may not actually perform the request.
  url += "?_c=" + window._juviaRequestCounter
  window._juviaRequestCounter++
  paramString = $.param(options)
  if paramString.length > 0
    url += "&"
    url += paramString
  $("script.juvia").remove()
  s = document.createElement("script")
  s.async = true
  s.type = "text/javascript"
  s.className = "juvia"
  s.src = url
  (document.getElementsByTagName("head")[0] or document.getElementsByTagName("body")[0]).appendChild s


Juvia.previewComment = (formElement) ->
  $ = @$
  $container = $(formElement).closest(".juvia-container")
  @saveCommentBox $container
  input_value = $("textarea[name=\"content\"]", $container).val()
  input_value = input_value.substring(0, 140)  if @restrict_comment_length and input_value.length > 140
  html_output = markdown.toHTML(input_value)
  preview = $(".juvia-preview", $container)
  @showFormError $container, `undefined`
  if html_output.length is 0
    preview.find(".juvia-preview-empty").show()
    preview.find(".juvia-preview-content").hide()
  else
    preview.find(".juvia-preview-empty").hide()
    preview.find(".juvia-preview-content").html(html_output).show()
  false


Juvia.setSubmitting = (container, val) ->
  if val
    container.find(".juvia-submit-button").hide()
    container.find(".juvia-submitting-button").show()
  else
    container.find(".juvia-submit-button").show()
    container.find(".juvia-submitting-button").hide()


Juvia.virtualAnimate = (options) ->
  $ = @$
  options = $.extend(
    duration: 1000
  , options or {})
  animation_start = @now()
  animation_end = @now() + options.duration
  interval = animation_end - animation_start
  @_virtualAnimate_step animation_start, animation_end, interval, options


Juvia._virtualAnimate_step = (animation_start, animation_end, interval, options) ->
  self = this
  now = new Date()
  progress = (now - animation_start) / interval
  progress = 1  if progress > 1
  progress = (1 + Math.sin(-Math.PI / 2 + progress * Math.PI)) / 2
  options.step progress
  if now < animation_end
    setTimeout (->
      self._virtualAnimate_step animation_start, animation_end, interval, options
    ), 15
  else
    options.step 1
    options.finish()  if options.finish


Juvia.smoothlyScrollTo = (top) ->
  self = this
  $ = @$
  $document = $(document)
  current = $document.scrollTop()
  @virtualAnimate
    duration: 300
    step: (x) ->
      $document.scrollTop Math.floor(top + (1 - x) * (current - top))

    finish: ->
      self.setScrollTop top


Juvia.setScrollTop = (top, element) ->
  
  # Browsers don't always scroll properly so work around
  # this with a few timers.
  self = this
  $ = @$
  element = element or $(document)
  element = $(element)
  element.scrollTop top
  setTimeout (->
    element.scrollTop top
  ), 1
  setTimeout (->
    element.scrollTop top
  ), 20


Juvia.handleResponse = (response) ->
  this["handle" + response.action] response
  @reinstallBehavior()


Juvia.handleResponsOffCallback = (response) ->
  this["handle" + response.action] response


Juvia.handleLoadTopic = (options) ->
  $ = @$
  $container = $(options.container)
  $container.html options.html
  @restoreCommentBox $container.find("> .juvia-container")
  if options.css and $("style.juvia").length is 0
    style = document.createElement("style")
    extend_css = ".juvia-container [class^=\"icon-\"],.juvia-container [class*=\" icon-\"] {background-image: url( this.root_url + \"/assets/glyphicons-halflings.png\" %>);}"
    options.css += extend_css
    rules = document.createTextNode(options.css)
    style.type = "text/css"
    style.className = "juvia"
    if style.styleSheet
      style.styleSheet.cssText = rules.nodeValue
    else
      style.appendChild rules
    $(style).appendTo document.head or $("head")[0] or document.body


Juvia.handleAppendUserComment = (options) ->
  $ = @$
  $container = $(options.container)
  $container.append options.html


Juvia.handleLoadUserComment = (options) ->
  $ = @$
  $container = $(options.container)
  $container.html options.html
  @restoreCommentBox $container.find("> .juvia-container")
  if options.css and $("style.juvia").length is 0
    style = document.createElement("style")
    rules = document.createTextNode(options.css)
    style.type = "text/css"
    style.className = "juvia"
    if style.styleSheet
      style.styleSheet.cssText = rules.nodeValue
    else
      style.appendChild rules
    $(style).appendTo document.head or $("head")[0] or document.body


Juvia.handleLoadComment = (options) ->
  dom_ele = @rdf_comment_box(options)
  @appendComment dom_ele


Juvia.handleAddComment = (options) ->
  $ = @$
  container = @findContainer(options)
  comments = $(".juvia-comments", container)
  comment_obj = options.comment_option
  dom_ele = @rdf_comment_box(comment_obj)
  comment = $(dom_ele)
  if comments.hasClass("juvia-no-comments")
    comments.removeClass "juvia-no-comments"
    comments.html ""
  @prependComment comment
  $(".juvia-preview-empty", container).show()
  $(".juvia-preview-content", container).hide()
  container.find("form")[0].reset()
  @setSubmitting container, false
  @saveCommentBox container
  @smoothlyScrollTo comment.offset().top - 20
  comment.hide().fadeIn 2000


Juvia.handlePreviewComment = (options) ->
  $ = @$
  container = @findContainer(options)
  preview = $(".juvia-preview", container)
  @showFormError container, `undefined`
  if options.html.length is 0
    preview.find(".juvia-preview-empty").show()
    preview.find(".juvia-preview-content").hide()
  else
    preview.find(".juvia-preview-empty").hide()
    preview.find(".juvia-preview-content").html(options.html).show()


Juvia.handleShowError = (options) ->
  $ = @$
  if options.container
    $container = $(options.container)
    $container.html options.html
  else if options.site_key and options.topic_key
    container = @findContainer(options)
    container.parent().html options.html
  else if options.message
    alert options.message
  else if options.html
    
    # Convert HTML to text and display it in a dialog box.
    div = $("<div></div>")
    div.html options.html
    alert $.trim(div.text())
  else
    alert "Juvia unknown error"


Juvia.handleShowFormError = (options) ->
  container = @findContainer(options)
  @showFormError container, options.text
  @setSubmitting container, false


Juvia.handleSortComments = (options) ->
  $ = @$
  $("#show_more_comments").show()  if @total_pages > 1
  $(".load_more_contain img").hide()
  juvia_cls = this
  container = juvia_cls.findContainer(options)
  $("#juvia-comments-box").html ""
  $.each options.comments, (k, v) ->
    juvia_cls.handleLoadComment options.comments[k]


Juvia.handleReportComment = (options) ->
  $ = @$
  if options.status is "ok"
    alert "Thank you. This comment has been flagged for moderator attention. "
    tempFlagsElement = $("#flag-" + options.comment_id)
    tempFlagsElement.html " " + options.flagged
    flag_comment = tempFlagsElement.parent()
    flag_comment.removeClass "blink_text"
    flag_comment.css "visibility", "visible"
  else
    alert "Something went wrong!"


Juvia.submitComment = (event) ->
  $ = @$
  form = event.target
  $container = $(form).closest(".juvia-container")
  @setSubmitting $container, true
  @saveCommentBox $container
  @loadScript "/api/comments/add_comment",
    site_key: $container.data("site-key")
    topic_key: $container.data("topic-key")
    topic_title: $container.data("topic-title")
    topic_url: $container.data("topic-url")
    restrict_comment_length: @restrict_comment_length
    author_name: $("input[name=\"author_name\"]", form).val()
    author_email: $("input[name=\"author_email\"]", form).val()
    content: @compress($("textarea[name=\"content\"]", form).val())


# The browser does not save the content of the Juvia comments box when
#     * the user reloads the page. In order to prevent data loss we implement
#	 * our own saving capabilities. The text box is saved into sessionStorage
#	 * with a key that depends on the site key and the topic key.
#	 
Juvia.getTextBoxStorageKey = (container) ->
  "juvia_text/" + container.data("site-key") + "/" + container.data("topic-key")


Juvia.clearAllTextBoxStorage = (container) ->
  i = undefined
  key = undefined
  keysToRemove = []
  for key of window.sessionStorage
    keysToRemove.push key  if key.match(/^juvia_text\//)
  i = 0
  while i < keysToRemove.length
    window.sessionStorage.removeItem keysToRemove[i]
    i++


Juvia.saveCommentBox = (container) ->
  $ = @$
  if window.sessionStorage
    key = @getTextBoxStorageKey(container)
    value = $("textarea[name=\"content\"]", container).val()
    if value is ""
      window.sessionStorage.removeItem key
    else
      try
        window.sessionStorage.setItem key, value
      catch e
        console.warn e  if console
        
        # It looks like we're hitting the quota limit.
        #					 * Try to free up some space and try again.
        #					 *
        #					 * Even though the standard says that it's supposed to
        #					 * throw QuotaExceededError, browsers currently don't
        #					 * actually do that. Instead they throw some kind of
        #					 * internal exception type. So we don't bother checking
        #					 * for the exception type.
        #					 * http://stackoverflow.com/questions/3027142/calculating-usage-of-localstorage-space
        #					 
        @clearAllTextBoxStorage container
        try
          window.sessionStorage.setItem key, value
        catch e
          console.warn e


Juvia.restoreCommentBox = (container) ->
  $ = @$
  if window.sessionStorage
    key = @getTextBoxStorageKey(container)
    value = window.sessionStorage.getItem(key)
    if value isnt `undefined` and value isnt null
      textarea = $("textarea[name=\"content\"]", container)
      textarea.val value
      @previewComment textarea
