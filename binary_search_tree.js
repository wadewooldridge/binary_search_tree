/*
 *  binary_search_tree.js - Implementation of BST in JavaScript.
 *  Featuring abstract BinarySearchTree class with numeric and string parents.
 *  Copyright (C) 2016 by Wade Wooldridge
 */

/* Constants. */

/* Global data */

/* Abstract class. */

function BinarySearchTree() {
    // Constructor function for overall tree.
    console.log('BinarySearchTree: constructor');
    this.root = null;

    this.addWord = function(newWord) {
        console.log('BinarySearchTree.addWord: ' + newWord);
        if (this.root === null) {
            // Handle first add to root.
            console.log('BinarySearchTree.addWord: new root: ' + newWord);
            this.root = new wordNode(newWord);
        } else {
            // Walk the tree and find either a match, or a place to insert the new word.
            var currentNode = this.root;
            while (true) {
                if (newWord === currentNode.value) {
                    // Match: just increment the counter.
                    currentNode.count++;
                    console.log('BinarySearchTree.addWord: incrementing count of "' + newWord + '" to ' + currentNode.count);
                    break;
                } else if (newWord <= currentNode.value) {
                    // Follow left node for less.
                    if (currentNode.left === null) {
                        // Add new left node.
                        console.log('BinarySearchTree.addWord: adding new left node from "' + currentNode.value +
                            '" to "' + newWord + '"' );
                        currentNode.left = new wordNode(newWord);
                        break;
                    } else {
                        // Follow down left node.
                        currentNode = currentNode.left;
                    }
                }
                else {
                    // Follow right node for greater.
                    if (currentNode.right === null) {
                        // Add new right node.
                        console.log('BinarySearchTree.addWord: adding new right node from "' + currentNode.value +
                            '" to "' + newWord + '"');
                        currentNode.right = new wordNode(newWord);
                        break;
                    } else {
                        // Follow down right node.
                        currentNode = currentNode.right;
                    }
                }
            }
        }
    };

    // Print a node in the tree.
    this.printNode = function(currentNode) {
        // Print the left side.
        if (currentNode.left !== null) {
            this.printNode(currentNode.left);
        }

        // Print the node itself.
        console.log('Word: "' + currentNode.value + '", count: ' + currentNode.count);

        // Print the right side.
        if (currentNode.right !== null) {
            this.printNode(currentNode.right);
        }
    };

    // Print the overall tree.
    this.printTree = function() {
        if (this.root === null) {
            console.log('printTree: tree empty.');
        } else {
            console.log('printTree:');
            this.printNode(this.root);
        }
    }
}

// Constructor function for node on the tree.
function wordNode(word) {
    // console.log('wordNode: constructor: ' + word);
    this.value = word;
    this.count = 1;
    this.left = null;
    this.right = null;
}

