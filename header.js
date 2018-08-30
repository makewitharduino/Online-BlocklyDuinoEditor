var filepath = { media: 'media/', msg_ja:"msg/js/ja.js", msg_en: "msg/js/en.js", msg_ja_kids: "msg/js/ja_kids.js"};

(function(){
  var html = "";
  html += '<meta charset="utf-8">';
  html += '<link rel="stylesheet" type="text/css" href="css/style.css">';
  html += '<title>BlocklyDuino</title>';
  html += '<script type="text/javascript" src="js/blockly_compressed.js"></script>';
  html += '<script type="text/javascript" src="js/blocks_compressed.js"></script>';
  html += '<script type="text/javascript" src="js/arduino_compressed.js"></script>';
  html += '<script type="text/javascript" src="/msg/js/en.js"></script>';
  html += '<script type="text/javascript" src="js/Blob.js"></script>';
  html += '<script type="text/javascript" src="js/spin.js"></script>';
  html += '<script type="text/javascript" src="js/FileSaver.min.js"></script>';
  html += '<script type="text/javascript" src="js/blockly_helper.js"></script>';
  html += '<script type="text/javascript" src="js/jquery-2.1.3.min.js"></script>';
  html += '<script type="text/javascript" src="js/materialize.min.js"></script>';
  html += '<script type="text/javascript" src="js/jquery.xdomainajax.js"></script>';
  html += '<script type="text/javascript" src="js/jquery.cookie.js"></script>';
  html += '<script type="text/javascript" src="js/setCategoryCharacter.js"></script>';
  html += '<script type="text/javascript" src="js/init.js"></script>';
  html += '<script type="text/javascript" src="js/my_materialize.js"></script>';
  html += '<script type="text/javascript" src="js/clipboard.min.js"></script>';
  document.write(html);
})();

