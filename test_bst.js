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
gaInputData = [];                       // Just an array of numbers, strings, or objects.
gaOutputData = null;                    // Not sure yet how this will be stored or expressed.

// Global data: the datatype of the tree, and the tree itself.
var gDataType = DATATYPE_STRING;        // Default checked box in HTML.
var gTree = null;

// Global data: control settings.
var gForceLowerCase = false;

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
    $('#lower-case-checkbox input').change(onLowerCaseCheckbox);

    $('#clear-button').click(onClearButton);
    $('#graph-button').click(onGraphButton);
    $('#print-button').click(onPrintButton);

    $('#add-file-button button').click(onAddFileButton);
    $('#add-manual-button button').click(onAddManualButton);
    $('#add-random-button button').click(onAddRandomButton);
    $('#add-url-button button').click(onAddUrlButton);
}

/* Change placeholders to the control panel text input items, based on data type. */
function changeControlPanelPlaceholders() {
    console.log('changeControlPanelPlaceholders');
    var dataTypeName = DATATYPE_NAME[gDataType].toLowerCase();

    $('#add-file-button input').attr('placeholder', 'File to parse for ' + dataTypeName + 's');
    $('#add-manual-button input').attr('placeholder', 'Manual ' + dataTypeName + '(s) to add');
    $('#add-random-button input').attr('placeholder', 'Count of random ' + dataTypeName + 's');
    $('#add-url-button input').attr('placeholder', 'URL to parse for ' + dataTypeName + 's');
}

/* Change to a new data type and clear out the old data. */
function changeDataType(newDataType) {
    console.log('changeDataType: ' + DATATYPE_NAME[newDataType]);
    gDataType = parseInt(newDataType);

    // Enable or disable the 'lower case' checkbox based on new data type.
    var elem = $('#lower-case-checkbox input');
    if (newDataType == DATATYPE_STRING) {
        elem.removeAttr('disabled');
    } else {
        elem.attr('disabled', true);
    }

    // Change the placeholders to match the data type.
    changeControlPanelPlaceholders();

    // Clear out any of the old data.
    clearInputData();
    clearOutputData();

    // Build a new tree with the new data type.
    gTree = new BinarySearchTree();
}

/* Clear out the input-data area. */
function clearInputData() {
    console.log('clearInputData');
    gaInputData = [];
    updateInputDataDisplay();
}

/* Clear out the output-data area. */
function clearOutputData() {
    console.log('clearOutputData');
    gaOutputData = null;
}

/* Generate some random numbers to gaInputData. */
function generateRandomNumbersToInputData(count) {
    console.log('generateRandomNumbersToInputData: ' + count);

    // Pick numbers from -1,000,000 to +1,000,000.
    for (i = 0; i < count; i++) {
        var num = Math.floor(Math.random() * 2000000) - 1000000;
        gaInputData.push(num);
    }
    updateInputDataDisplay();
}

/* Generate some random strings to gaInputData. */
function generateRandomStringsToInputData(count) {
    console.log('generateRandomStringsToInputData: ' + count);

    // Generate random character string from 3 to 8 characters long.
    var chars = 'aaaabcddeeeefghiiijklmmnnoooopqrrrssstttuuvwxyz'.split('');

    for (i = 0; i < count; i++) {
        var len = Math.floor(Math.random() * 6) + 3;
        var str = '';
        for (var j = 0; j < len; j++) {
            str += chars[Math.floor(Math.random() * chars.length)];
        }
        gaInputData.push(str);
    }
    updateInputDataDisplay();

}

/* Main program initialization. */
function initProgram() {
    console.log('initProgram');

    addControlPanelHandlers();
    changeControlPanelPlaceholders();
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
    var s = $('#add-manual-button input').val();
    console.log('onAddManualButton: ', s);

    if (s.length) {
        parseStringToInputData(s);
    }
}

/* Button handler: add-random-button */
function onAddRandomButton() {
    var s = $('#add-random-button input').val();
    console.log('onAddRandomButton: ' + s);

    var count = parseInt(s);
    if (isNaN(count)) {
        count = 10;
    }

    switch (gDataType) {
        case DATATYPE_NUMBER:
            generateRandomNumbersToInputData(count);
            break;
        case DATATYPE_STRING:
            generateRandomStringsToInputData(count);
            break;
        default:
            console.log('onAddRandomButton: datatype not supported');
            break;
    }
}

/* Button handler: add-url-button */
function onAddUrlButton() {
    console.log('onAddUrlButton');
}

/* Button handler: clear-button */
function onClearButton() {
    console.log('onClearButton');
    clearInputData();
    updateInputDataDisplay();
    clearOutputData();
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

/* Checkbox handler: lower-case-checkbox. */
function onLowerCaseCheckbox() {
    var checked = $(this).prop('checked');
    console.log('onLowerCaseCheckbox: ' + checked);
    gForceLowerCase = checked;
}

/* Button handler: print-button */
function onPrintButton() {
    console.log('onPrintButton');
}

/* Parse input string looking for numbers or strings, and add those to the gaInputData array. */
function parseStringToInputData(s) {
    console.log('parseStringToInputData: ' + s.length + ' bytes');

    if (gForceLowerCase) {
        s = s.toLowerCase();
    }

    // Allow decimal points in numeric input, but filter periods out of string input.
    switch (gDataType) {
        case DATATYPE_NUMBER:
            var numbers = s.split(/[ :;,?!'"&|{}\[\]\r\n\t\\A-Za-z]+/);
            // Don't allow invalid 'numbers' such as '.' to slip through.
            for (var i = 0; i < numbers.length; i++) {
                if (!isNaN(numbers[i])) {
                    gaInputData.push(numbers[i]);
                }
            }
            break;

        case DATATYPE_STRING:
        case DATATYPE_PERSON:
            var words = s.split(/[ .:;,?!'"&|{}\[\]\r\n\t\\0-9]+/);
            gaInputData = gaInputData.concat(words);
            break;

        default:
            break;
    }

    updateInputDataDisplay();
}

/* Update the input data display based on the current value of gaInputData. */
function updateInputDataDisplay() {
    console.log('updateInputDataDisplay');

    var s = '';
    for (var i = 0; i < gaInputData.length; i++) {
        s += (gaInputData[i] + ', ');
    }

    $('#input-data').text(s);
}