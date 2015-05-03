$(document).ready(function () {
  // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
  $('.modal-trigger').leanModal();
  $('select').material_select();
  $(".button-collapse").sideNav();
  $('.tooltipped').tooltip({delay: 800});

//  str.textContent = Blockly.Msg.COPY_BUTTON;
//  str.textContent = Blockly.Msg.DISCARD;
//  str.textContent = Blockly.Msg.SAVE_XML;
//  str.textContent = Blockly.Msg.LOAD_XML;

});
