/**
 * Copyright (c) 2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * DM: This was based on the file here:  https://github.com/reactjs/react-docgen/blob/master/example/generateMarkdown.js
 * but has been modified to output github-flavored markdown and output props as
 * tables rather than lists.
 */
"use strict";

function generateTitle(name) {
  return name + '\n===\n';
}

function generateDesciption(description) {
  return description + '\n';
}

function generateMarkdown(reactAPI) {
  var markdownString = generateTitle(reactAPI.displayName) + '\n' + generateDesciption(reactAPI.description);

  return markdownString;
}

module.exports = generateMarkdown;