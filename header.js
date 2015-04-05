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
  html += '<script type="text/javascript" src="js/jquery-1.11.2.min.js"></script>';
  html += '<script type="text/javascript" src="js/jquery.xdomainajax.js"></script>';
  html += '<script type="text/javascript" src="js/jquery.cookie.js"></script>';
  html += '<script type="text/javascript" src="js/compilerflasher.js"></script>';
  html += '<script type="text/javascript" src="js/init.js"></script>';
  html += '<script type="text/javascript" src="js/ZeroClipboard.js"></script>';
  html += "<script>(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})(window,document,'script','//www.google-analytics.com/analytics.js','ga');ga('create', 'UA-280456-16', 'auto');ga('send', 'pageview');</script>";
  document.write(html);
})();

