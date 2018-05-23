/**
 * ContentJS: JavaScript library for managing user's consent
 * @file Exposes javascript functions to alter consent data. Use this code on your website's privacy settings page, after consent.js.
 * @author Markus Gut
 * @copyright gut.digital 2018
 * @license Apache-2.0
 */

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
