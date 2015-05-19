/**
 * List of tab names.
 * @private
 */

'use strict';

var TABS_ = ['blocks', 'arduino'];

var selected = 'blocks';

/**
 * Switch the visible pane when a tab is clicked.
 * @param {string} clickedName Name of tab clicked.
 */
function tabClick(clickedName) {
  // Deselect all tabs and hide all panes.
  for (var i = 0; i < TABS_.length; i++) {
    var name = TABS_[i];
    document.getElementById('tab_' + name).className = 'taboff';
    document.getElementById('content_' + name).style.visibility = 'hidden';
  }

  // Select the active tab.
  selected = clickedName;
  document.getElementById('tab_' + clickedName).className = 'tabon';
  // Show the selected pane.
  document.getElementById('content_' + clickedName).style.visibility = 'visible';
  renderContent();
  Blockly.fireUiEvent(window, 'resize');
}

/**
 * Populate the currently selected pane with content generated from the blocks.
 */
function renderContent() {
  var content = document.getElementById('content_' + selected);
  var button = document.getElementById('copy-button');
  // Initialize the pane.
  if (content.id == 'content_blocks') {
    // If the workspace was changed by the XML tab, Firefox will have performed
    // an incomplete rendering due to Blockly being invisible.  Rerender.
    Blockly.mainWorkspace.render();
    button.style.display = "none";
  } else if (content.id == 'content_arduino') {
    //content.innerHTML = Blockly.Arduino.workspaceToCode();
    var arduinoTextarea = document.getElementById('content_arduino');
    arduinoTextarea.value = Blockly.Arduino.workspaceToCode();
    arduinoTextarea.focus();
    button.style.display = "";
  }
}

/**
 * Compute the absolute coordinates and dimensions of an HTML element.
 * @param {!Element} element Element to match.
 * @return {!Object} Contains height, width, x, and y properties.
 * @private
 */
function getBBox_(element) {
  var height = element.offsetHeight;
  var width = element.offsetWidth;
  var x = 0;
  var y = 0;
  do {
    x += element.offsetLeft;
    y += element.offsetTop;
    element = element.offsetParent;
  } while (element);
  return {
    height: height,
    width: width,
    x: x,
    y: y
  };
}

/**
 * Initialize Blockly.  Called on page load.
 */
function init() {
  //window.onbeforeunload = function() {
  //  return 'Leaving this page will result in the loss of your work.';
  //};
  var container = document.getElementById('content_area');
  var onresize = function (e) {
    var bBox = getBBox_(container);
    for (var i = 0; i < TABS_.length; i++) {
      var el = document.getElementById('content_' + TABS_[i]);
      el.style.top = bBox.y + 'px';
      el.style.left = bBox.x + 'px';
      // Height and width need to be set, read back, then set again to
      // compensate for scrollbars.
      el.style.height = bBox.height + 'px';
      el.style.height = (2 * bBox.height - el.offsetHeight) + 'px';
      el.style.width = bBox.width + 'px';
      el.style.width = (2 * bBox.width - el.offsetWidth) + 'px';
    }
    // Make the 'Blocks' tab line up with the toolbox.
    if (Blockly.mainWorkspace.toolbox_.width) {
      document.getElementById('tab_blocks').style.minWidth =
        (Blockly.mainWorkspace.toolbox_.width - 38) + 'px';
      // Account for the 19 pixel margin and on each side.
    }
  };
  window.addEventListener('resize', onresize, false);

  var toolbox = document.getElementById('toolbox');
  Blockly.inject(document.getElementById('content_blocks'),{
    grid:
    {spacing: 25,
     length: 3,
     colour: '#ccc',
     snap: true},
    //media: 'media/',
    media: filepath.media,
    toolbox: toolbox});

    auto_save_and_restore_blocks();

  //load from url parameter (single param)
  //http://stackoverflow.com/questions/2090551/parse-query-string-in-javascript
  var dest = unescape(location.search.replace(/^.*\=/, '')).replace(/\+/g, " ");
  if (dest) {
    //load_by_url(dest);
  }
}

function setCharacter() {
  $('#category_initializes').attr('name',Blockly.Msg.CATEGORY_INITIALIZES);
  $('#category_inout').attr('name',Blockly.Msg.CATEGORY_INOUT);
  $('#category_serial').attr('name',Blockly.Msg.CATEGORY_SERIAL);
  $('#category_servo').attr('name',Blockly.Msg.CATEGORY_SERVO);
  $('#category_logic').attr('name',Blockly.Msg.CATEGORY_LOGIC);
  $('#category_ultrasonic').attr('name',Blockly.Msg.CATEGORY_ULTRA_SONIC);
  $('#category_lcd').attr('name',Blockly.Msg.CATEGORY_LCD);
  $('#category_rgbled').attr('name',Blockly.Msg.CATEGORY_RGBLED);
  $('#category_other_sensor').attr('name',Blockly.Msg.CATEGORY_OTHER_SENSOR);
  $('#category_loops').attr('name',Blockly.Msg.CATEGORY_LOOPS);
  $('#category_time').attr('name',Blockly.Msg.CATEGORY_TIME);
  $('#category_array').attr('name',Blockly.Msg.CATEGORY_ARRAY);
  $('#category_math').attr('name',Blockly.Msg.CATEGORY_MATH);
  $('#category_text').attr('name',Blockly.Msg.CATEGORY_TEXT);
  $('#category_variables').attr('name',Blockly.Msg.CATEGORY_VARIABLES);
  $('#category_functions').attr('name',Blockly.Msg.CATEGORY_FUNCTIONS);
//  $('#category_involt').attr('name',Blockly.Msg.CATEGORY_INVOLT);

  $("#tab_blocks").text(Blockly.Msg.BLOCKS);
  $("#tab_arduino").text(Blockly.Msg.ARDUINO);

  $("#get-app").attr("data-tooltip",Blockly.Msg.DOWNLOAD_CHROME_APP);
  $("#go-to-sample").attr("data-tooltip",Blockly.Msg.GO_TO_SAMPLE);
  $("#change-lang").attr("data-tooltip",Blockly.Msg.CHANGE_LANG);
  $("#dialog-lang-title").text(Blockly.Msg.DIALOG_LANG_TITLE);

  $("#copy-button").attr("data-tooltip",Blockly.Msg.COPY_BUTTON);
  $("#discard").attr("data-tooltip",Blockly.Msg.DISCARD);
  $("#save").attr("data-tooltip",Blockly.Msg.SAVE_XML);
  $("#fakeload").attr("data-tooltip",Blockly.Msg.LOAD_XML);
}

function loadxml(){
  var id = getParam()["id"];
  if(typeof id === "undefined") return;
  id = id.replace("#","");
  var url = 'https://raw.githubusercontent.com/makewitharduino/ArduinoSample/master/' + id +'/' + id + '.xml';
  if(!sendChrome(url)){
    setXmlContent(url);
  }
};

function setXmlContent(url){
  $.ajax({
    url: url,
    type: "GET",
    dataType: 'text',
    success: function(res) {
      var xml = res.responseText;
      if(xml.length >0){
        Blockly.mainWorkspace.clear();
        xml = xml.replace("<html><head/><body><xml>",'');
        xml = xml.replace("</body></html>",'');
        xml = '<xml xmlns="http://www.w3.org/1999/xhtml">' + xml;
        var xmlDoc = Blockly.Xml.textToDom(xml);
        Blockly.Xml.domToWorkspace(Blockly.mainWorkspace, xmlDoc);
      }
    }
  });
}

function sendChrome(url){
  var userAgent = window.navigator.userAgent.toLowerCase();
  if (userAgent.indexOf('chrome') != -1){
    // 確認ボタン付きのダイアログボックスを表示する
    var result = confirm("Send XML for ChromeApp.");
    if(result){
      var extId = "ohncgafccgdbigbbikgkfbkiebahihmb";
      chrome.runtime.sendMessage(extId, {url : url});
      return true;
    }
  }
  return false;
}

function clipboard() {
  var client = new ZeroClipboard(document.getElementById("copy-button"));
  client.on("ready", function (readyEvent) {
    client.on("aftercopy", function (event) {
      alert("copy done");
    });
  });
};

function getParam() {
  var categoryKey = "en";
  var url = location.href;
  var parameters = url.split("?");
  var paramsArray = [];
  if (parameters.length > 1) {
    var params = parameters[1].split("&");
    var paramsArray = [];
    for (var i = 0; i < params.length; i++) {
      var neet = params[i].split("=");
      paramsArray.push(neet[0]);
      paramsArray[neet[0]] = neet[1];
    }
  }
  return paramsArray;
}

function setScript() {
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.id = 'msg';
  var c = $.cookie("lang");
  if(c) var param = c;
  else {
    param = getParam()["lang"];
    if(typeof param === "undefined") param = "en";
    param = param.replace("#","");
  }
  script.src = filepath["msg_"+param];
  var str = "#select-lang-"+ param;
  $(str).prop('checked', true);

  var firstScript = document.getElementsByTagName('head')[0].appendChild(script);
  firstScript.parentNode.insertBefore(script, firstScript);
  script.onload = function (e) {
    setCharacter();
    clipboard();
    init();
    loadxml();
  }
}

function getFiles() {
  // return {"sketch.ino": Blockly.Generator.workspaceToCode('Arduino') }
  //$('textarea#textarea_arduino').val() //&lt; et &lt;
  var code = $('textarea#textarea_arduino').val();

  code = code.replace(/</g, '&lt;').replace(/>/g, '&gt;');
  //code=code.replace(">","&gt;");
  //code = "<![CDATA[" + code + "]]>";
  //document.write (code);
  return {
    "sketch.ino": code
  }
}

function change_lang(){
  var val = $('[class="with-gap"]:checked').map(function(){
    //$(this)でjQueryオブジェクトが取得できる。val()で値をvalue値を取得。
    return $(this).val();
  }).get();
  //mapの結果がjQueryオブジェクトの配列で返ってくるので、get()で生配列を取得する。
  $.cookie("lang", val, {
    expires: 7
  });
  var loc = window.location;
  window.location = loc.protocol + '//' + loc.host + loc.pathname + '?lang=' + val;

}

function upload() {
  var arduinoTextarea = document.getElementById('textarea_arduino');
  arduinoTextarea.value = Blockly.Generator.workspaceToCode('Arduino');
}

window.onload = function () {
  setScript();
}
