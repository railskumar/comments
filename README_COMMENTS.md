# About Commenting App
    <div id="comments"></div>
    <link type="text/css" rel="stylesheet" media="screen" href="http://localhost:3001/assets/api.css">
    <script type="text/javascript" src="http://localhost:3001/assets/api.js"></script>
    <script type="text/javascript" class="juvia" >
      Juvia.$(document).ready(function($) {

        var options = {
          container   : '#comments',
          site_key    : '(your site key)',
          topic_key   : '(unique topic key)',
          topic_url   : location.href,
          topic_title : document.title || location.href,
          include_base: !window.Juvia,
          include_css : !window.Juvia,
          restrict_comment_length : '(set true or false)',
          use_my_user : '(set true or false)',
          user_logged_in : '(set true or false)',
          logged_in_message : 'Please <a href="/login">Login</a> to comment',
          username : '(put username)>',
          user_email : '(put user email)',
          user_image : '(put user image url)'
        };

        function makeQueryString(options) {
          var key, params = [];
          for (key in options) {
            params.push(
              encodeURIComponent(key) +
              '=' +
              encodeURIComponent(options[key]));
          }
          return params.join('&');
        }

        function makeApiUrl(options) {
          // Makes sure that each call generates a unique URL, otherwise
          // the browser may not actually perform the request.
          if (!('_juviaRequestCounter' in window)) {
            window._juviaRequestCounter = 0;
          }
          var result =
            'http://localhost:3001/api/comments/show_topic.js' +
            '?_c=' + window._juviaRequestCounter +
            '&' + makeQueryString(options);
          window._juviaRequestCounter++;
          return result;
        }

        function loadCommentScript(src, focusCurrentHash){
          var s       = document.createElement('script');
          s.async     = true;
          s.type      = 'text/javascript';
          s.className = 'juvia';
          s.src       = makeApiUrl(options);
          (document.getElementsByTagName('head')[0] ||
           document.getElementsByTagName('body')[0]).appendChild(s);
           s.onload = focusCurrentHash;
           s.onreadystatechange = function() {
             if (this.readyState == 'complete') {
               focusCurrentHash;
             }
          }
        }
  
        loadCommentScript('src', focusCurrentHash);
      
        function focusCurrentHash(){ 
          window.location.hash = window.location.hash.replace('#', '');
        }
  
    });
    </script>


# Introduction

In Juvia, comments are contained in two hierarchical layers. Comments are contained within topics. Topics are are contained within sites. A site is owned by exactly one user who can administer everything within it. This is similar to how many web forums works.

Sites must be registered (created) manually, but topics are automatically created upon posting a comment to a particular topic.

Embedding a Juvia comments page only involves embedding some JavaScript code. Embedding happens entirely in the browser: the page in which Juvia comments are embedded does not require any server-side modifications. Juvia uses various cross-domain request techniques in order to pull this off.
