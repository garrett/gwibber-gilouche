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

    html = '<div id="'+ data.gId +'" class="message '+ data.username + data.protocol + ' ' + data.aId + data.bgcolor +'">';
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
    html += (data.is_unread ? '<div class="unread"></div>' : '');
    html += '</div>';

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

    $(".message:last").hover(function() {
      var $buttons = $("a.replybutton"),
          $button  = $("a.replybutton", this);

      $buttons.not($button).fadeOut(125);
      $button.show(200);
    });
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

    //$("body").css({'color': fgcolor, 'background-color': bgcolor, 'background-image': 'none'});
    $("body").css('background-image','none');
  } 

  function setMessageColor(aId, colorName, r, g, b, a) {
    $('.'+aId+colorName).css('background', 'rgba('+r+','+g+','+b+','+a+')');
  }
  
  function addUserHeader(data) {
    html = '<div id="'+ data.gId +'" class="message '+ data.username + data.protocol + 
    data.aId + data.bgcolor +'" title="'+ data.sender_nick +'">' +
  	'<p class="content" style="text-align: center;"> \
  	<span class="title">'+ data.sender +'</span><br /> \
  	<span class="text">'+ data.sender_followers_count +' followers</span><br /> \
  	<span class="text">'+ data.sender_location +'</span><br /> \
  	<span class="text"><a href="'+ data.external_profile_url  +'">'+ data.external_profile_url +'</a></span> \
  	</p> \
	</div>'
		$(".header").html(html);
      }
