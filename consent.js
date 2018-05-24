/**
 * ContentJS: JavaScript library for managing user's consent
 * @file Exposes previously saved consent data and javascript functions for use by a tag manager. Place this code BEFORE any tag managers on every page of your website.
 * @author Markus Gut
 * @copyright gut.digital 2018
 * @license Apache-2.0
 */

var ConsentJS = {
    'consent': // read previously stored data
        JSON.parse(localStorage.getItem('ConsentJS')) || {},

    'init': function(trackers) { // initialize trackers
        for (var index = 0, length = trackers.length; index < length; ++index) {
            this.consent[trackers[index]] = this.consent[trackers[index]] || {}; // add tracker if there was no saved data about it
            // add tracker's properties
            this.consent[trackers[index]].optout = this.consent[trackers[index]].optout || 0;
        }
    },

    'getDNT': function() {
        // Get DNT header values from different browsers. See:
        // https://developer.mozilla.org/en-US/docs/Web/API/Navigator/doNotTrack#Browser_compatibility
        var DNT = (navigator.doNotTrack || window.doNotTrack || navigator.msDoNotTrack || '');

        // DNT is active if header value starts with '1' or 'yes'. See:
        // https://developer.mozilla.org/en-US/docs/Web/API/Navigator/doNotTrack#Browser_compatibility
        return (DNT.indexOf('1') === 0) || (DNT.indexOf('yes') === 0);
    },

    'getConsent': function(tracker) {
        // do we know this tracker?
        if (!this.consent[tracker]) {
            // If we don't know this tracker, maybe you forgot to update your init() statement.
            console.log('ConsentJS: \'' + tracker + '\'' + ' unknown');
            // Play safe: don't let an unknown tracker stalk your visitors
            return false;
        } else {
            // no DNT? no optout, either? there you go!
            return !this.getDNT() && (this.consent[tracker].optout === 0);
        }
    }
};
