// Copyright (c) 2016-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import fs from 'fs';
import path from 'path';

import {app, type WebContents} from 'electron';

import {Logger} from 'common/log';

const log = new Logger('BrandStyles');

// Brand wordmark artwork is 1024x341 with the lettering at x 15-1003, y 91-236.
// Background sizing below shows the lettering 40px tall with the padding trimmed.
const WORDMARK = 'width: 273px; height: 40px; background-size: 282px 94px; background-position: -4px -25px; background-repeat: no-repeat;';

const NO_HEADING = '.login-body .login-body-content .login-body-message.custom-branding:not(:has(.login-body-message-title))';

function dataURI(file: string) {
    const brandDir = path.resolve(app.getAppPath(), 'assets/brand');
    return `data:image/png;base64,${fs.readFileSync(path.join(brandDir, file)).toString('base64')}`;
}

function buildCSS() {
    const whiteWordmark = dataURI('amaze-one-dark-text.png');
    const navyWordmark = dataURI('amaze-one-light-text.png');
    const mark = dataURI('amaze-logo.png');

    return `
/* Header: Amaze One wordmark in place of the server's logo / site name */
.hfroute-header .header-main .header-logo-link { font-size: 0 !important; }
.hfroute-header .header-main .header-logo-link > * { display: none !important; }
.hfroute-header .header-main .header-logo-link::before {
    content: ""; display: block; ${WORDMARK}
    background-image: url(${navyWordmark});
}
.header-footer-route-container:has(.login-body) .hfroute-header .header-main .header-logo-link::before {
    background-image: url(${whiteWordmark});
}

/* Signed-in global header: Amaze One wordmark in place of the product name (18px lettering) */
#global-header [class*="ProductBrandingContainer"] > * { display: none !important; }
#global-header [class*="ProductBrandingContainer"]::before {
    content: ""; display: block; width: 123px; height: 18px; margin-left: 4px;
    background: url(${navyWordmark}) no-repeat -2px -11px / 127px 42px;
}

/* Footer copyright set by the server's own branding */
.hfroute-footer .footer-copyright { font-size: 0 !important; }
.hfroute-footer .footer-copyright::after { content: "© ${new Date().getFullYear()} Amaze One"; font-size: 11px; }

/* Login: navy brand panel on the left, card in brand colours on the right */
.header-footer-route-container:has(.login-body) {
    position: relative;
    background: linear-gradient(90deg, #01122C 0, #01122C 50%, #F4F6FA 50%, #F4F6FA 100%) !important;
}
.header-footer-route-container:has(.login-body)::before {
    content: ""; position: absolute; left: 40px; bottom: 110px; width: 220px; height: 210px;
    background: url(${mark}) no-repeat center / contain; opacity: 0.12; pointer-events: none;
}
.header-footer-route-container:has(.login-body) > * { position: relative; }
.login-body .login-body-content .login-body-message .login-body-custom-branding-image { display: none !important; }
.login-body .login-body-content .login-body-message.custom-branding.with-brand-image { align-self: flex-start; }
.header-footer-route-container:has(.login-body) .login-body-message-title { color: #FFFFFF !important; }
.header-footer-route-container:has(.login-body) .login-body-message::before {
    content: ""; display: block; width: 56px; height: 5px; border-radius: 3px; margin-bottom: 28px; background: #FA5000;
}
.header-footer-route-container:has(.login-body) .login-body-message .login-body-custom-branding-markdown p,
.header-footer-route-container:has(.login-body) .login-body-message .login-body-message-subtitle {
    color: rgba(255, 255, 255, 0.78) !important;
}
.header-footer-route-container:has(.login-body) .hfroute-footer .footer-copyright,
.header-footer-route-container:has(.login-body) .hfroute-footer .footer-link { color: rgba(255, 255, 255, 0.72) !important; }

/* Servers whose own branding has no heading get the Amaze One heading and card title */
${NO_HEADING} .login-body-custom-branding-markdown { font-size: 0 !important; }
${NO_HEADING} .login-body-custom-branding-markdown > * { display: none !important; }
${NO_HEADING} .login-body-custom-branding-markdown::before {
    content: "Log in to your account"; display: block; padding-right: 24px; color: #FFFFFF;
    font-family: Metropolis, sans-serif; font-size: 80px; font-weight: 600; letter-spacing: -0.01em; line-height: 88px;
}
${NO_HEADING} .login-body-custom-branding-markdown::after {
    content: "Amaze One"; display: block; margin-top: 12px; color: rgba(255, 255, 255, 0.78);
    font-family: "Open Sans", sans-serif; font-size: 18px; line-height: 28px;
}
.login-body .login-body-card.custom-branding .login-body-card-content .login-body-card-title { font-size: 0 !important; }
.login-body .login-body-card.custom-branding .login-body-card-content .login-body-card-title::before {
    content: "Amaze One Sovereign Collaboration Platform"; font-size: 22px; line-height: 28px;
}
.login-body .login-body-content .login-body-card {
    --button-bg: #FA5000; --button-bg-rgb: 250, 80, 0;
    --link-color: #C2410C; --link-color-rgb: 194, 65, 12;
    border: none; border-top: 4px solid #FA5000; border-radius: 16px;
    box-shadow: 0 24px 60px rgba(1, 18, 44, 0.16);
}
.login-body .login-body-content .login-body-card .login-body-card-content .login-body-card-title { color: #01122C !important; }
.login-body .login-body-card-form-button-submit { border-radius: 8px; }
@media screen and (max-width: 1199px) {
    .header-footer-route-container:has(.login-body) {
        background: linear-gradient(180deg, #01122C 0, #01122C 120px, #F4F6FA 120px, #F4F6FA 100%) !important;
    }
    .header-footer-route-container:has(.login-body)::before { display: none; }
    .header-footer-route-container:has(.login-body) .hfroute-footer .footer-copyright,
    .header-footer-route-container:has(.login-body) .hfroute-footer .footer-link { color: rgba(1, 18, 44, 0.72) !important; }
    .login-body .login-body-content .login-body-card { border-top: none; box-shadow: none; }
}
`;
}

let css: string | undefined;

/**
 * Applies the Amaze One login/branding styles to a server's web contents on every
 * page load, so the look is the same whichever server (and server version) is used.
 */
export function applyBrandStyles(webContents: WebContents) {
    webContents.on('dom-ready', () => {
        try {
            css = css ?? buildCSS();
            webContents.insertCSS(css).catch((err) => log.warn('insertCSS failed', err));
        } catch (err) {
            log.warn('brand styles unavailable', err);
        }
    });
}
