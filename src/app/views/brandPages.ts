// Copyright (c) 2016-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {BrowserWindow} from 'electron';

import {Logger} from 'common/log';
import {openExternalSafely} from 'main/utils';

const log = new Logger('BrandPages');

// Servers that still carry the stock About / Privacy / Terms / Help links get the
// Amaze One pages bundled with the app instead.
const PAGE_FOR_PATH: Record<string, string> = {
    '/pl/about-mattermost': 'about.html',
    '/pl/help': 'about.html',
    '/pl/privacy-policy': 'privacy.html',
    '/pl/terms-of-use': 'terms.html',
};

const LABEL_FOR_PAGE: Record<string, string> = {
    'about.html': 'Amaze One · About',
    'privacy.html': 'Amaze One · Privacy Policy',
    'terms.html': 'Amaze One · Terms of Service',
};

let pageWindow: BrowserWindow | undefined;

function getBrandPage(url: URL) {
    if (url.hostname !== 'mattermost.com' && url.hostname !== 'www.mattermost.com') {
        return undefined;
    }
    return PAGE_FOR_PATH[url.pathname.replace(/\/+$/, '')];
}

/**
 * What the link preview shows instead of the stock mattermost.com address, if the URL is one we replace
 */
export function getBrandPageLabel(url: URL) {
    const page = getBrandPage(url);
    return page ? LABEL_FOR_PAGE[page] : undefined;
}

/**
 * Opens the bundled Amaze One page for a stock Mattermost legal/help link.
 * @returns true when the link was handled here
 */
export function openBrandPage(url: URL) {
    const page = getBrandPage(url);
    if (!page) {
        return false;
    }

    // Served by the app's own scheme; file:// is not loadable in the packaged app
    const pageURL = `mattermost-desktop://renderer/brand/pages/${page}`;
    if (!pageWindow || pageWindow.isDestroyed()) {
        pageWindow = new BrowserWindow({
            width: 1000,
            height: 760,
            title: 'Amaze One',
            autoHideMenuBar: true,
            webPreferences: {sandbox: true, contextIsolation: true, nodeIntegration: false},
        });

        // Stay on the bundled pages; anything else (e.g. mailto:) goes to the system
        pageWindow.webContents.on('will-navigate', (event, target) => {
            if (target.startsWith('mattermost-desktop://renderer/brand/pages/')) {
                return;
            }
            event.preventDefault();
            openExternalSafely(target);
        });
        pageWindow.webContents.on('render-process-gone', (_, details) => log.warn('brand page renderer gone', details.reason));
        pageWindow.webContents.setWindowOpenHandler(({url: target}) => {
            openExternalSafely(target);
            return {action: 'deny'};
        });
    }

    pageWindow.loadURL(pageURL).catch((err) => log.warn('failed to open brand page', page, err));
    pageWindow.show();
    pageWindow.focus();
    return true;
}
