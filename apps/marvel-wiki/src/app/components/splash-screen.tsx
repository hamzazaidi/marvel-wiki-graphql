import { makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import One from '../../assets/splash/1.jpeg';
import Two from '../../assets/splash/2.jpeg';
import Three from '../../assets/splash/3.jpeg';
import Four from '../../assets/splash/4.jpeg';
import Five from '../../assets/splash/5.jpeg';
import Six from '../../assets/splash/6.jpeg';
import Seven from '../../assets/splash/7.jpeg';
import Eight from '../../assets/splash/8.jpeg';
import Nine from '../../assets/splash/9.jpeg';
import Ten from '../../assets/splash/10.jpeg';
import Eleven from '../../assets/splash/11.jpeg';
import Twelve from '../../assets/splash/12.jpeg';
import Thirteen from '../../assets/splash/13.jpeg';
import Fourteen from '../../assets/splash/14.jpeg';
import Fifteen from '../../assets/splash/15.jpeg';
import Sixteen from '../../assets/splash/16.jpeg';
export interface SplashScreenProps {}
const useStyles =  makeStyles(theme => ({
    '@global':{ 
        '@keyframes marvel': {
            '0%': {
                opacity: 0,
                fontSize: '205vh',
                color: 'rgba(255,255,255,0)',
                '-webkit-text-stroke-color': '#000'
            },
            '20%': {
                opacity: 1,
                color: 'rgba(255,255,255,0)',
                '-webkit-text-stroke-color': '#000'
            },
            '60%': {
                color: 'rgba(255,255,255,0.5)',
                '-webkit-text-stroke-color': '#000'
            },
            '100%': {
                opacity: 1,
                fontSize: '17vh',
                color: 'rgba(255,255,255,1)',
                '-webkit-text-stroke-color': 'transparent'
            }
        },
        '@keyframes hideBg': {
            '0%': {
                opacity: 1
            },
            '60%': {
                opacity: 0.5
            },
            '100%': {
                opacity: 0
            }
        }
    },
    root: {
        height: '100vh',
        fontFamily: 'Roboto Condensed',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 0,
        backgroundImage: 'radial-gradient(#730801, #1f0100)',
        overflow: 'hidden',
        '& #marvel': {
            color: 'transparent',
            fontSize: '205vh',
            '-webkit-text-stroke': '2px #000',
            letterSpacing: '-1vh',
            animation: `$marvel 6s ease 2s forwards`
        },
        '& #bg': {
            position: 'fixed',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            opacity: 1,
            backgroundAttachment: 'fixed',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repea',
            zIndex: 1,
            transform: 'scale(1.8)',
            animation: `$hideBg 7s ease 0s forwards`
        }
    },
}));
const SplashScreen: React.SFC<SplashScreenProps> = () => {
    const classes = useStyles();
    let bgNum = 0;
    const images = [One, Two, Three, Four, Five, Six, Seven, Eight, Nine, Ten, Eleven, Twelve, Thirteen, Fourteen, Fifteen, Sixteen];
    const [ image, setImage ] = useState(images[0])

    useEffect(() => {
        const interval = setInterval(() => {
            bgNum = Math.floor(Math.random() * 15) + 1;
            setImage(images[bgNum]);
        }, 130);

        setTimeout(() => {
            clearInterval(interval);
        }, 7000)
    })

    return (
        <div className={ classes.root }>
            <div id="marvel">MARVEL</div>
            <div id="bg" style={{ backgroundImage: `url(${image})`, }}></div>
        </div>
    );
}
 
export default SplashScreen;