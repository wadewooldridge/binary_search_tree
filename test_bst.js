/*
 *  test_bst.js - Test implementation of BST in JavaScript.
 *  Featuring abstract BinarySearchTree class with numeric and string parents.
 *  Copyright (C) 2016 by Wade Wooldridge
 */

/* Constants. */
var DATATYPE_NUMBER = 0;
var DATATYPE_STRING = 1;
var DATATYPE_PERSON = 2;

var DATATYPE_NAME = ['Number', 'String', 'Person'];

/* Global data */

// Global data: the tree and its datatype.
var gTree = null;
var gDataType = DATATYPE_NUMBER;        // Default checked box in HTML.

// Test data to operate on.
var words = ['now', 'is', 'the', 'time', 'for', 'all', 'good', 'men', 'to', 'come',
    'to', 'the', 'aid', 'of', 'their', 'party' ];

/* Document ready function to kick everyting off. */
$(document).ready( function() {
    console.log('Document ready.');

    initProgram();
    initTree();

});

/* Add handlers to all of the control panel items. */
function addControlPanelHandlers() {
    console.log('addControlPanelHandlers');

    $('#datatype-buttons').change(onDataTypeButtons);

    $('#clear-button').click(onClearButton);
    $('#graph-button').click(onGraphButton);
    $('#print-button').click(onPrintButton);

    $('#add-file-button').click(onAddFileButton);
    $('#add-manual-button').click(onAddManualButton);
    $('#add-random-button').click(onAddRandomButton);
    $('#add-url-button').click(onAddUrlButton);
}

/* Add prototypes to the control panel text input items, based on data type. */
function addControlPanelPrototypes() {
    console.log('addControlPanelPrototypes');
}

/* Change to a new data type and clear out the old data. */
function changeDataType(newDataType) {
    console.log('changeDataType: ' + DATATYPE_NAME[newDataType]);

    // Clear out any of the old data.
    clearInputData();
    clearOutputData();

    // Build a new tree with the new data type.
    gTree = new BinarySearchTree();
}

/* Clear out the input-data area. */
function clearInputData() {
    console.log('clearInputData');
}

/* Clear out the output-data area. */
function clearOutputData() {
    console.log('clearOutputData');
}

/* Main program initialization. */
function initProgram() {
    console.log('initProgram');

    addControlPanelHandlers();
    addControlPanelPrototypes();

}

/* Initialize the BinarySearchTree structure that we are going to use. */
function initTree() {
    console.log('initTree');

    gTree = new BinarySearchTree();

    // NOTE: This is the old manual list of words that we started with.
    // Process through our list of words and build the tree.
    for (var i = 0; i < words.length; i++) {
        var word = words[i];
        // console.log('Adding word: ' + word);
        gTree.addWord(word);
    }

    // Now print the ordered tree.
    gTree.printTree();
}

/* Button handler: add-file-button */
function onAddFileButton() {
    console.log('onAddFileButton');
}

/* Button handler: add-manual-button */
function onAddManualButton() {
    console.log('onAddManualButton');
}

/* Button handler: add-random-button */
function onAddRandomButton() {
    console.log('onAddRandomButton');
}

/* Button handler: add-url-button */
function onAddUrlButton() {
    console.log('onAddUrlButton');
}

/* Button handler: clear-button */
function onClearButton() {
    console.log('onClearButton');
}

/* Button handler: datatype-buttons */
function onDataTypeButtons() {
    var newDataType = $(this).find('input:checked').val();
    console.log('onDataTypeButtons: ' + DATATYPE_NAME[newDataType]);

    if (newDataType != gDataType) {
        changeDataType(newDataType);
    }

}

/* Button handler: graph-button */
function onGraphButton() {
    console.log('onGraphButton');
}

/* Button handler: print-button */
function onPrintButton() {
    console.log('onPrintButton');
}

