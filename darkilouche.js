/** Custom theme code */
var Theme = function(){
  var priv, pub;

  // Private functions (those not accessed outside of the Theme scope)
  priv = {
    /** Add a Digg count to the message */
    addDiggCount: function(message, data) {
      message.html('<p><span class="diggcount">' + data.diggs + '</span><br /><small>diggs</small></p>');
      message.css('display', 'block');
    },

    /** Add a single message to the timeline */
    addMessage: function(data) {
      var html,
          $lastMessage;

      html = [
        '<div id="' + data.gId + '" class="message ' + data.username + data.protocol + ' ' + data.aId + data.bgcolor + '" title="' + data.sender_nick + '">',
        (data.image ? '<a href="' + data.profile_url + '"><span class="imgbox" style="background-image: url(' + data.image + ');"></span></a>' : ''),
        '<div class="diggbox"></div>',
        '<p class="content">',
        '  <span class="title">' + (data.title === undefined ? data.sender : data.title) + '</span>',
        '  <span class="time"> (<a href="' + data.url + '">' + data.time_string + '</a>',
        (data.reply_nick ? ' in reply to <a href="' + data.reply_url + '">' + data.reply_nick + '</a>' : ''),
        ')</span>',
        '<span class="text">' + data.html_string + '</span>',
        '</p>',
        '<div class="toggledupe"></div>',
        '  <div class="dupes"></div>',
        (data.can_thread ? '<a class="thread replybutton" href="gwibber:thread/' + data.message_index + '"></a>' : ''),
        '<a class="reply replybutton" href="gwibber:reply/' + data.message_index + '"></a>',
        (data.is_unread ? '<div class="unread"></div>' : ''),
        '</div>'
      ].join('');

      if (data.is_duplicate) {
        $("#" + data.gId + " .dupes:first").append(html);
        $("#" + data.gId + " .toggledupe:first").show(0).unbind().toggle(function(){
          $(this).parent().find(".dupes").show(100);
        }, function(){
          $(this).parent().find(".dupes").hide(100);
        });
      } else {
        $(".messages").append(html);
      }

      if (data.protocol === "digg") {
        priv.addDiggCount($(".diggbox:last"), data);
      }

      $lastMessage = $('.message:last');

      if (data.is_new) { $lastMessage.addClass("new"); }
      if (data.is_reply) { $lastMessage.addClass("reply"); }
      if (data.is_private) { $lastMessage.addClass("private"); }

      $lastMessage.hover(function() {
        var $buttons = $("a.replybutton"),
            $button  = $("a.replybutton", this);

        $buttons.not($button).fadeOut(125);
        $button.show(200);
      });
    },

    /** Set the message color to a specified RGBA value */
    setMessageColor: function(aId, colorName, r, g, b, a) {
      $('.'+aId+colorName).css('background', 'rgba('+r+','+g+','+b+','+a+')');
    }
  };


  // Public functions, which may be accessed as Theme.functionName()
  // These are automagically exported (below) for Gwibber
  pub = {
    /** Remove messages from the timeline */
    clearMessages: function() {
      $(".messages").empty();
    },

    /** Add messages to the timeline */
    addMessages: function(messages) {
      pub.clearMessages();

      $.each(messages, function() {
        priv.addMessage(this);
      });
    },

    /** Ran right before loading messages with settings data */
    setGtkConfig: function(data) {
      // Hide the loading message
      $("body").css('background-image','none');
    },

    /** Set each comment's background based on Gwibber's account colors */
    setAccountConfig: function(data) {
      var conf;

      $.each(data, function() {
        for (conf in this) {
          if (conf.search("color") > 0) {
            priv.setMessageColor(this.id, conf, this[conf].red, this[conf].green, this[conf].blue, 0.1);
          }
        }
      });
    },

    /** Add header information to user views */
    addUserHeader: function(data) {
      var html;

      html = [
        '<div id="' + data.gId + '" class="message ' + data.username + data.protocol,
        data.aId + data.bgcolor + '" title="' + data.sender_nick + '">',
        '<p class="content" style="text-align: center;">',
        '<span class="title">' + data.sender + '</span><br />',
        '<span class="text">' + data.sender_followers_count + ' followers</span><br />',
        '<span class="text">' + data.sender_location + '</span><br />',
        '<span class="text"><a href="' + data.external_profile_url  + '">' + data.external_profile_url + '</a></span>',
        '</p>',
        '</div>'
      ].join('');

      $(".header").html(html);
    }

  };

  return pub;
}();


/** map Theme's public functions to Gwibber's standard functions */
for (var i in Theme) {
  if (typeof Theme[i] === 'function') {
    window[i] = Theme[i];
  }
}
