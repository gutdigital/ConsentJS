/**
 * ContentJS: JavaScript library for managing user's consent
 * @file Exposes functions needed to manipulate consent data. Use this code on your website's privacy settings page.
 * @author Markus Gut
 * @copyright gut.digital 2018
 * @license Apache-2.0
 */

(function(obj) {
    var setters = {
            saveConsent: function() {
                localStorage.setItem('ConsentJS', JSON.stringify(window.ConsentJS.consent));
            },

            setOptout: function(tracker) {
                this.consent[tracker] = this.consent[tracker] || {};
                this.consent[tracker].optout = Date.now();
                ConsentJS.saveConsent();
            },

            removeOptout: function(tracker) {
                this.consent[tracker] = this.consent[tracker] || {};
                this.consent[tracker].optout = 0;
                ConsentJS.saveConsent();
            }
        },
        extend = function(obj, src) {
            for (var key in src) {
                if (src.hasOwnProperty(key)) obj[key] = src[key];
            }
            return obj;
        };

    // Extend main object
    ConsentJS = extend(obj, setters);

})(ConsentJS);

