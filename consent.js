/**
 * ContentJS: JavaScript library for managing user's consent
 * @file Exposes previously saved consent data and javascript functions for use by a tag manager. Place this code BEFORE any tag managers on every page of your website.
 * @author Markus Gut
 * @copyright gut.digital 2018
 * @license Apache-2.0
 */

(function (trackers){
    if (!window.localStorage) {
        window.localStorage = {
            getItem: function (sKey) {
                if (!sKey || !this.hasOwnProperty(sKey)) { return null; }
                return unescape(document.cookie.replace(new RegExp("(?:^|.*;\\s*)" + escape(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*((?:[^;](?!;))*[^;]?).*"), "$1"));
            },
            key: function (nKeyId) {
                return unescape(document.cookie.replace(/\s*\=(?:.(?!;))*$/, "").split(/\s*\=(?:[^;](?!;))*[^;]?;\s*/)[nKeyId]);
            },
            setItem: function (sKey, sValue) {
                if(!sKey) { return; }
                document.cookie = escape(sKey) + "=" + escape(sValue) + "; expires=Tue, 19 Jan 2038 03:14:07 GMT; path=/";
                this.length = document.cookie.match(/\=/g).length;
            },
            length: 0,
            removeItem: function (sKey) {
                if (!sKey || !this.hasOwnProperty(sKey)) { return; }
                document.cookie = escape(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
                this.length--;
            },
            hasOwnProperty: function (sKey) {
                return (new RegExp("(?:^|;\\s*)" + escape(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
            }
        };
        window.localStorage.length = (document.cookie.match(/\=/g) || window.localStorage).length;
    }

    /* read whatever data we find */
    window.ConsentJS = JSON.parse(localStorage.getItem('ConsentJS')) || {};

    /* make sure all expected properties do exist */
    window.ConsentJS.consent = window.ConsentJS.consent || {};
    for (var index = 0; index < trackers.length; ++index) {
        window.ConsentJS.consent[trackers[index]] = window.ConsentJS.consent[trackers[index]] || {};
        window.ConsentJS.consent[trackers[index]].optout = window.ConsentJS.consent[trackers[index]].optout || 0;
    }
}(['analytics', 'conversion', 'remarketing']));

function getDNT() {
    var DNT = (navigator.doNotTrack || window.doNotTrack || navigator.msDoNotTrack || '');
    return (DNT.indexOf('1') === 0) || (DNT.indexOf('yes') === 0);
}

function getConsent(tracker) {
    var timestamp = 1;
    try {
        timestamp = window.ConsentJS.consent[tracker].optout;
    }
    catch(err) {
        console.log('ConsentJS: Undefined tracker type \''+ tracker + '\'');
    }
    return !(getDNT() || timestamp);
}

function saveConsent() {
    localStorage.setItem('ConsentJS', JSON.stringify(window.ConsentJS));
}

function setOptout(tracker) {
    window.ConsentJS.consent[tracker] = window.ConsentJS.consent[tracker] || {};
    window.ConsentJS.consent[tracker].optout = Date.now();
    saveConsent();
}
function removeOptout(tracker) {
    window.ConsentJS.consent[tracker] = window.ConsentJS.consent[tracker] || {};
    window.ConsentJS.consent[tracker].optout = 0;
    saveConsent();
}
