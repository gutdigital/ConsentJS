/**
 * ContentJS: JavaScript library for managing user's consent
 * @file Exposes previously saved consent data and javascript functions for use by a tag manager. Place this code BEFORE any tag managers on every page of your website.
 * @author Markus Gut
 * @copyright gut.digital 2018
 * @license Apache-2.0
 */

var ConsentJS = {
    'init': function(trackers) {
        /* read whatever data we find */
        this.consent = JSON.parse(localStorage.getItem('ConsentJS')) || {};

        /* make sure all expected properties do exist */
        this.consent = this.consent || {};
        for (var index = 0; index < trackers.length; ++index) {
            this.consent[trackers[index]] = this.consent[trackers[index]] || {};
            this.consent[trackers[index]].optout = this.consent[trackers[index]].optout || 0;
        }        
    },
    'getDNT': function() {
        var DNT = (navigator.doNotTrack || window.doNotTrack || navigator.msDoNotTrack || '');
        return (DNT.indexOf('1') === 0) || (DNT.indexOf('yes') === 0);
    },
    'getConsent': function(tracker) {
        if (!this.consent[tracker]) { // no consent data for tracker
            console.log('ConsentJS: Undefined tracker \''+ tracker + '\'');
            return false;
        } else {
            return !this.getDNT() || (this.consent[tracker].optout > 0);
        }
    },
    'consent': {}
};
