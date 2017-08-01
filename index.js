/*
 * cfpb-analytics
 *
 * A work of the public domain from the Consumer Financial Protection Bureau.
 */

'use strict';

/**
 * @param {object} opts The options object
 * @param {int} opts.something Here's an optional integer parameter
 * @param {string} opts.anotherThing This one is a string
 * @returns {string} Hopefully omething really useful
 */
function doTheThing( opts ) {
  // If no options were provided, assign it an empty object.
  opts = opts || {};

  // This pointless module just returns the user provided arguments.
  return Object.keys( opts ).map( function( key ) {
    return key + ' is ' + opts[ key ] + '!';
  });
};

module.exports = doTheThing;
