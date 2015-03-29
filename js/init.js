/**
 * List of tab names.
 * @private
 */

'use strict';

var TABS_ = ['blocks', 'arduino', 'term', 'xml'];

var selected = 'blocks';

/**
 * Switch the visible pane when a tab is clicked.
 * @param {string} clickedName Name of tab clicked.
 */
function tabClick(clickedName) {
  // If the XML tab was open, save and render the content.
  if (document.getElementById('tab_xml').className == 'tabon') {
    var xmlTextarea = document.getElementById('content_xml');
    var xmlText = xmlTextarea.value;
    var xmlDom = null;
    try {
      xmlDom = Blockly.Xml.textToDom(xmlText);
    } catch (e) {
      var q =
        window.confirm('Error parsing XML:\n' + e + '\n\nAbandon changes?');
      if (!q) {
        // Leave the user on the XML tab.
        return;
      }
    }
    if (xmlDom) {
      Blockly.mainWorkspace.clear();
      Blockly.Xml.domToWorkspace(Blockly.mainWorkspace, xmlDom);
    }
  }

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
  } else if (content.id == 'content_xml') {
    var xmlTextarea = document.getElementById('content_xml');
    var xmlDom = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
    var xmlText = Blockly.Xml.domToPrettyText(xmlDom);
    xmlTextarea.value = xmlText;
    xmlTextarea.focus();
    button.style.display = "none";
  } else if (content.id == 'content_arduino') {
    //content.innerHTML = Blockly.Arduino.workspaceToCode();
    var arduinoTextarea = document.getElementById('textarea_arduino');
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
  var category;
  category = document.getElementById('category_inout');
  category.setAttribute("name", Blockly.Msg.CATEGORY_INOUT);
  category = document.getElementById('category_serial');
  category.setAttribute("name", Blockly.Msg.CATEGORY_SERIAL);
  category = document.getElementById('category_logic');
  category.setAttribute("name", Blockly.Msg.CATEGORY_LOGIC);
  category = document.getElementById('category_ultrasonic');
  category.setAttribute("name", Blockly.Msg.CATEGORY_ULTRA_SONIC);
  category = document.getElementById('category_lcd');
  category.setAttribute("name", Blockly.Msg.CATEGORY_LCD);
  category = document.getElementById('category_loops');
  category.setAttribute("name", Blockly.Msg.CATEGORY_LOOPS);
  category = document.getElementById('category_time');
  category.setAttribute("name", Blockly.Msg.CATEGORY_TIME);
  category = document.getElementById('category_math');
  category.setAttribute("name", Blockly.Msg.CATEGORY_MATH);
  category = document.getElementById('category_text');
  category.setAttribute("name", Blockly.Msg.CATEGORY_TEXT);
  category = document.getElementById('category_variables');
  category.setAttribute("name", Blockly.Msg.CATEGORY_VARIABLES);
  category = document.getElementById('category_functions');
  category.setAttribute("name", Blockly.Msg.CATEGORY_FUNCTIONS);
  category = document.getElementById('category_involt');
  category.setAttribute("name", Blockly.Msg.CATEGORY_INVOLT);

  var str;
  str = document.getElementById('tab_blocks');
  str.textContent = Blockly.Msg.BLOCKS;
  str = document.getElementById('tab_arduino');
  str.textContent = Blockly.Msg.ARDUINO;
  str = document.getElementById('tab_xml');
  str.textContent = Blockly.Msg.XML;
  str = document.getElementById('copy-button');
  str.textContent = Blockly.Msg.COPY_BUTTON;
  str = document.getElementById('discard');
  str.textContent = Blockly.Msg.DISCARD;
  str = document.getElementById('save');
  str.textContent = Blockly.Msg.SAVE_XML;
  str = document.getElementById('fakeload');
  str.textContent = Blockly.Msg.LOAD_XML;
}

function loadfile() {
  var obj1 = document.getElementById("load");
  var obj2 = document.getElementById("content_xml");
  obj1.addEventListener("change", function (evt) {
    var file = evt.target.files;
    //FileReaderの作成
    var reader = new FileReader();
    // 読み込み成功時に実行されるイベント
    reader.onload = function (e) {
      obj2.value = reader.result;
    };
    // 読み込みを開始する（テキスト文字列を得る）
    reader.readAsText(file[0]);
    alert(file[0].name + "を取得しました。");
  }, false);
};

function loadxml(){
  var id = getid();
  if(typeof id === "undefined") return;
  var pass = 'https://raw.githubusercontent.com/makewitharduino/ArduinoSample/master/' + id +'/' + id + '.xml';
  $.ajax({
    url: pass,
    type: "GET",
    dataType: 'text',
    success: function(res) {
      var obj = document.getElementById("content_xml");
      var xml = res.responseText;
      if(xml.length >0){
        document.getElementById('tab_xml').className = 'tabon';
        document.getElementById('tab_blocks').className = 'taboff';
        document.getElementById('content_xml').style.visibility = 'visible';
        renderContent();
        xml = xml.replace("<html><head/><body><xml>",'');
        xml = xml.replace("</body></html>",'');
        xml = '<xml xmlns="http://www.w3.org/1999/xhtml">' + xml;
        obj.value = xml;
      }
    }
  });
};


function getid() {
  var categoryKey;
  var url = location.href;
  var parameters = url.split("?");
  if(parameters.length > 1){
    var params = parameters[1].split("&");
    var paramsArray = [];
    for (var i = 0; i < params.length; i++) {
      var neet = params[i].split("=");
      paramsArray.push(neet[0]);
      paramsArray[neet[0]] = neet[1];
    }
    categoryKey = paramsArray["id"];
  }
  return categoryKey;
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
  if (Number(parameters.length) == 1) {
    return categoryKey;
  }
  var params = parameters[1].split("&");
  var paramsArray = [];
  for (var i = 0; i < params.length; i++) {
    var neet = params[i].split("=");
    paramsArray.push(neet[0]);
    paramsArray[neet[0]] = neet[1];
  }
  categoryKey = paramsArray["lang"];
  return categoryKey;
}

function setScript() {
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.id = 'msg';
  var c = $.cookie("lang");
  if(c) var param = c;
  else param = getParam();
  script.src = filepath["msg_"+param];
  /*
  if (param == "ja") {
    script.src = "/msg/js/ja.js";
  } else if(param == "ja_kids"){
    script.src = "/msg/js/ja_kids.js";
  }else{
    script.src = "/msg/js/en.js";
  }
  */

  var options = document.getElementById('languageMenu');
  for(var i=0;i<options.length;i++){
    if(options[i].value == param){
      options[i].selected=true;
    }
  }
  var firstScript = document.getElementsByTagName('head')[0].appendChild(script);
  firstScript.parentNode.insertBefore(script, firstScript);
  script.onload = function (e) {
    setCharacter();
    loadfile();
    clipboard();
    init();
    loadxml();
  }
}

$(document).ready(function () {
  compilerflasher = new compilerflasher(getFiles);
  compilerflasher.on("pre_verify", function () {
    $("#event_msg").append('pre_verify event fired!<br/><br/>')
    $("#debug_arduino").html('verification');
  });
  compilerflasher.on("verification_succeed", function (binary_size) {
    $("#event_msg").append('verification_succeed event fired! Sketch size: ' + binary_size + "<br/><br/>")
    $("#debug_arduino").html('Verification Complete : ' + binary_size);
  });
  compilerflasher.on("verification_failed", function (error_output) {
    $("#event_msg").append("verification_failed event fired! \nCompilation error: <pre>" + error_output + "</pre><br/><br/>")
    $("#debug_arduino").html(error_output);
  });
});

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

function change_lang(obj){
  var val = obj.options[obj.selectedIndex].value;
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
