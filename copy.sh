#!/bin/sh
cp ../BlocklyDuino/blockly/arduino_compressed.js ./js/
cp ../BlocklyDuino/blockly/blockly_compressed.js ./js/
cp ../BlocklyDuino/blockly/blocks_compressed.js ./js/
cp ../BlocklyDuino/blockly/apps/blocklyduino/base.html ./
cp ../BlocklyDuino/blockly/apps/blocklyduino/category.xml ./
cp ../BlocklyDuino/blockly/apps/blocklyduino/js/* ./js/
cp ../BlocklyDuino/blockly/msg/js/* ./msg/js/
cp ../BlocklyDuino/blockly/media/* ./media/
cp ../BlocklyDuino/blockly/apps/blocklyduino/css/*  ./css/
python joint.py
