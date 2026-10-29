// Copyright (c) 2016-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import classNames from 'classnames';
import React from 'react';

import Logo from 'renderer/components/Images/Logo';
import LoadingIcon from 'renderer/components/LoadingAnimation/LoadingIcon';

import useAnimationEnd from '../../hooks/useAnimationEnd';

import './LoadingAnimation.scss';

const LOADING_STATE = {
    INITIALIZING: 'initializing', // splash graphics are hidden
    LOADING: 'loading', // splash graphics animate in and the progress bar runs
    LOADED: 'loaded', // splash graphics fade out
};

// The intro has to finish before the splash may fade out, so it never just flashes
const INTRO_ANIMATION = 'LoadingAnimation__intro';
const EXIT_ANIMATION = 'LoadingAnimation__exit';
const ANIMATION_COMPLETION_DELAY = 300;

type Props = {
    loading: boolean;
    onLoadAnimationComplete?: () => void;
}

/**
 * The Amaze One splash: app icon and wordmark with an indeterminate progress bar
 * @param {boolean} loading - Prop that indicates whether currently loading or not
 * @param {function} onLoadAnimationComplete - Callback function to update when internal loading animation is complete
 */
function LoadingAnimation({
    loading = false,
    onLoadAnimationComplete = undefined}: Props,
) {
    const containerRef = React.useRef(null);
    const [animationState, setAnimationState] = React.useState(LOADING_STATE.INITIALIZING);
    const [introComplete, setIntroComplete] = React.useState(false);

    React.useEffect(() => {
        if (loading) {
            setAnimationState(LOADING_STATE.LOADING);
            setIntroComplete(false);
        }
    }, [loading]);

    React.useEffect(() => {
        // only fade out once loading has finished and the intro has played through
        if (!loading && introComplete) {
            setAnimationState(LOADING_STATE.LOADED);
        }
    }, [loading, introComplete]);

    useAnimationEnd<HTMLDivElement>(containerRef, () => {
        setTimeout(() => {
            setIntroComplete(true);
        }, ANIMATION_COMPLETION_DELAY);
    }, INTRO_ANIMATION);

    useAnimationEnd<HTMLDivElement>(containerRef, () => {
        if (onLoadAnimationComplete) {
            onLoadAnimationComplete();
        }
        setAnimationState(LOADING_STATE.INITIALIZING);
    }, EXIT_ANIMATION, false);

    return (
        <div
            ref={containerRef}
            className={classNames('LoadingAnimation', {
                'LoadingAnimation--loading': animationState === LOADING_STATE.LOADING,
                'LoadingAnimation--loaded': animationState === LOADING_STATE.LOADED,
            })}
        >
            <LoadingIcon/>
            <div className='LoadingAnimation__wordmark'>
                <Logo height={30}/>
            </div>
            <div className='LoadingAnimation__progress'>
                <span className='LoadingAnimation__progress-bar'/>
            </div>
        </div>
    );
}

export default LoadingAnimation;
