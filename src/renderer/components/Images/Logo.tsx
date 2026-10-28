// Copyright (c) 2016-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React from 'react';
import amazeOneDark from 'renderer/assets/amaze_one_dark.png';
import amazeOneLight from 'renderer/assets/amaze_one_light.png';

type Props = {
    width?: number | string;
    height?: number | string;
};

export default ({
    width,
    height = 36,
}: Props) => (
    <div className='AmazeOneLogo' style={{display: 'inline-flex', alignItems: 'center'}}>
        <img
            src={amazeOneLight}
            alt='Amaze One'
            className='AmazeOneLogo__light'
            style={{
                height: typeof height === 'number' ? `${height}px` : height,
                width: width ? (typeof width === 'number' ? `${width}px` : width) : 'auto',
                maxWidth: '100%',
                objectFit: 'contain',
                display: 'block',
            }}
        />
        <img
            src={amazeOneDark}
            alt='Amaze One'
            className='AmazeOneLogo__dark'
            style={{
                height: typeof height === 'number' ? `${height}px` : height,
                width: width ? (typeof width === 'number' ? `${width}px` : width) : 'auto',
                maxWidth: '100%',
                objectFit: 'contain',
                display: 'none',
            }}
        />
        <style>{`
            .AmazeOneLogo .AmazeOneLogo__dark { display: none !important; }
            .AmazeOneLogo .AmazeOneLogo__light { display: block !important; }
            body.darkMode .AmazeOneLogo .AmazeOneLogo__dark,
            .darkMode .AmazeOneLogo .AmazeOneLogo__dark { display: block !important; }
            body.darkMode .AmazeOneLogo .AmazeOneLogo__light,
            .darkMode .AmazeOneLogo .AmazeOneLogo__light { display: none !important; }
            @media (prefers-color-scheme: dark) {
                :root:not(.lightMode) .AmazeOneLogo .AmazeOneLogo__dark { display: block !important; }
                :root:not(.lightMode) .AmazeOneLogo .AmazeOneLogo__light { display: none !important; }
            }
        `}</style>
    </div>
);
