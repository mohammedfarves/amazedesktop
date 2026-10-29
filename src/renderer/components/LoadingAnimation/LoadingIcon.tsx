// Copyright (c) 2016-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React from 'react';

import appIconDark from 'renderer/assets/app_icon_dark.png';
import appIconLight from 'renderer/assets/app_icon_light.png';

/**
 * The Amaze One app icon for the splash; the light or dark artwork is picked by
 * the `darkMode` body class (see LoadingAnimation.scss).
 */
function LoadingIcon() {
    return (
        <div className='LoadingAnimation__icon'>
            <img
                className='LoadingAnimation__icon-light'
                src={appIconLight}
                alt='Amaze One'
            />
            <img
                className='LoadingAnimation__icon-dark'
                src={appIconDark}
                alt='Amaze One'
            />
        </div>
    );
}

export default LoadingIcon;
