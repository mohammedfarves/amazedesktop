// Copyright (c) 2016-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React from 'react';

import amazeOneDarkText from 'renderer/assets/amaze-one-dark-text.png';
import amazeOneLightText from 'renderer/assets/amaze-one-light-text.png';

import './Logo.scss';

// The brand wordmark artwork is 1024x341 with the lettering at y 91-236, x 15-1003.
const ARTWORK_HEIGHT = 341;
const LETTERING_TOP = 91;
const LETTERING_HEIGHT = 145;
const LETTERING_LEFT = 15;
const ARTWORK_WIDTH = 1024;

type Props = {

    /** Height of the visible lettering, in px */
    height?: number;
};

export default ({
    height = 36,
}: Props) => {
    const scale = height / LETTERING_HEIGHT;
    const imgStyle: React.CSSProperties = {
        height: `${ARTWORK_HEIGHT * scale}px`,
        width: `${ARTWORK_WIDTH * scale}px`,
        maxWidth: 'none',
        marginTop: `${-LETTERING_TOP * scale}px`,
        marginBottom: `${-(ARTWORK_HEIGHT - LETTERING_TOP - LETTERING_HEIGHT) * scale}px`,
        marginLeft: `${-LETTERING_LEFT * scale}px`,
        objectFit: 'contain',
    };

    return (
        <div className='AmazeOneLogo'>
            <img
                src={amazeOneLightText}
                alt='Amaze One'
                className='AmazeOneLogo__light'
                style={imgStyle}
            />
            <img
                src={amazeOneDarkText}
                alt='Amaze One'
                className='AmazeOneLogo__dark'
                style={imgStyle}
            />
        </div>
    );
};
