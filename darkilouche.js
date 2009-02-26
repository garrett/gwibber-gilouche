  function addMessages(messages) {
    clearMessages();

    $.each(messages, function() {
      addMessage(this);
    });
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

    html = [
      '<div id="'+ data.gId +'" class="message '+ data.username + data.protocol + ' ' + data.aId + data.bgcolor +'">',
      (data.image ? '<a href="' + data.profile_url +'"><span class="imgbox" style="background-image: url('+ data.image +');"></span></a>' : ''),
      '<div class="diggbox"></div>',
      '<p class="content">',
      '  <span class="title">' + (data.title == undefined ? data.sender : data.title) + '</span>',
      '  <span class="time"> (<a href="'+ data.url +'">'+ data.time_string +'</a>',
      (data.reply_nick ? ' in reply to <a href="'+ data.reply_url +'">' + data.reply_nick +'</a>' : ''),
      ')</span>',
      '<span class="text">'+ data.html_string +'</span>',
      '</p>',
      '<div class="toggledupe"></div>',
      '  <div class="dupes"></div>',
      (data.can_thread ? '<a class="thread replybutton" href="gwibber:thread/' + data.message_index + '"></a>' : ''),
      '<a class="reply replybutton" href="gwibber:reply/'+ data.message_index +'"></a>',
      '</div>'
    ].join('');

    if (data.is_duplicate) {
      $("#" + data.gId + " .dupes:first").append(html);
      $("#" + data.gId + " .toggledupe:first").show(0).unbind().toggle(
        function() {$(this).parent().find(".dupes").show(100);},
        function() {$(this).parent().find(".dupes").hide(100);});
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
      function() {$(this).find(".replybutton").show(200);},
      function() {$(this).find(".replybutton").hide();});
  }

  function setAccountConfig(data) {
    $.each(data, function() {
      for (var conf in this) {
        if (conf.search("color") > 0)
          setMessageColor(this.id, conf, this[conf].red, this[conf].green, this[conf].blue, .1);
        }
      });
    } 

  function setGtkConfig(data) {
    var fgcolor = "rgba("+data.fg.red+","+data.fg.green+","+data.fg.blue+",1)";
    var bgcolor = "rgba("+data.bg.red+","+data.bg.green+","+data.bg.blue+",1)";
/*    var debugit = '';
    for (key in data) {
      debugit += "key: "+key+" value: "+data[key]+"<br>";
    }
    $("body").append("<h1>"+debugit+"</h1>");
  */  

    $("body").css({'color': fgcolor, 'background-color': bgcolor, 'background-image': 'none'});
  } 

  function setMessageColor(aId, colorName, r, g, b, a) {
    $('.'+aId+colorName).css('background', 'rgba('+r+','+g+','+b+','+a+')');
  }
