// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

//http://stackoverflow.com/questions/9244748/how-do-i-make-page-action-appear-for-specific-pages

// Called when the url of a tab changes.
function checkForValidUrl(tabId, changeInfo, tab) {
	// If the tabs url starts with...
	if (tab.url.indexOf('www.neopets.com/') >= 0) {
		// ... show the page action.
		chrome.pageAction.show(tabId);
	}
};

// Listen for any changes to the URL of any tab.
chrome.tabs.onUpdated.addListener(checkForValidUrl);