/**
 * ContentJS: JavaScript library for managing user's consent
 * @file Exposes javascript functions to alter consent data. Use this code on your website's privacy settings page, after consent.js.
 * @author Markus Gut
 * @copyright gut.digital 2018
 * @license Apache-2.0
 */

ConsentJS.saveConsent = function() {
    localStorage.setItem('ConsentJS', JSON.stringify(window.ConsentJS.consent));
};
ConsentJS.setOptout = function(tracker) {
    console.log('yay!')
    this.consent[tracker] = this.consent[tracker] || {};
    this.consent[tracker].optout = Date.now();
    ConsentJS.saveConsent();
};
ConsentJS.removeOptout = function(tracker) {
    console.log('yay!')
    this.consent[tracker] = this.consent[tracker] || {};
    this.consent[tracker].optout = 0;
    ConsentJS.saveConsent();
};
