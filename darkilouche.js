  function addMessages(messages) {
    clearMessages()
    $.each(messages, function() {addMessage(this)});
  }

  function clearMessages() {
    $(".messages").html("");
  }

  function addDiggCount(message, data) {
    message.html('<p><span class="diggcount">' + data.diggs + '</span><br /><small>diggs</small></p>');
    message.css('display', 'block');
  }

  function setAccountConfig(data) {
    var conf;

    $.each(data, function() {
      for (conf in this) {
        if (conf.search("color") > 0)
          setMessageColor(this.id, conf, this[conf].red, this[conf].green, this[conf].blue, 0.6);
      }
    });
  }

  function setGtkConfig(data) {

  }

  function addMessage(data) {
    var html;

    html = '<div id="'+ data.gId +'" class="message '+ data.username + data.protocol + ' ' + data.aId + data.bgcolor +'" title="'+ data.sender_nick +'">';
    html += (data.image ? '<a href="' + data.profile_url +'"><span class="imgbox" style="background-image: url('+ data.image +');"></span></a>' : '');
    html += '<div class="diggbox"></div>';
    html += '<p class="content">'
    html += '  <span class="title">' + (data.title == undefined ? data.sender : data.title) + '</span>';
    html += '  <span class="time"> (<a href="'+ data.url +'">'+ data.time_string +'</a>';
    html += (data.reply_nick ? ' in reply to <a href="'+ data.reply_url +'">' + data.reply_nick +'</a>' : '');
    html += ')</span>';
    html += '<span class="text">'+ data.html_string +'</span>';
    html += '</p>';
    html += '<div class="toggledupe"></div>';
    html += '  <div class="dupes"></div>';
    html += (data.can_thread ? '<a class="thread replybutton" href="gwibber:thread/' + data.message_index + '"></a>' : '');
    html += '<a class="reply replybutton" href="gwibber:reply/'+ data.message_index +'"></a>';

    html += '</div>';

    if (data.is_duplicate) {
      $("#" + data.gId + " .dupes:first").append(html);
      $("#" + data.gId + " .toggledupe:first").show(0).unbind().toggle(
        function() {$(this).parent().find(".dupes").show(100)},
        function() {$(this).parent().find(".dupes").hide(100)});
    } else $(".messages").append(html);

    if (data.protocol == "digg")
      addDiggCount($(".diggbox:last"), data);

    if (data.is_new)
      $(".message:last").addClass("new");

    if (data.is_reply)
      $(".message:last").addClass("reply");
    if (data.is_private)
      $(".message:last").addClass("private");

    $(".message:last").hover(
      function() {$(this).find(".replybutton").show(200)},
      function() {$(this).find(".replybutton").hide()});
  }

  function setMessageColor(aId, colorName, r, g, b, a) {
//        $('.'+aId+colorName).css('background', '-webkit-gradient(linear, left top, left 220%, from(rgba('+r+','+g+','+b+','+a+')), to(black))')
  }
