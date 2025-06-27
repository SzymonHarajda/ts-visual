"use client";
import { useEffect } from 'react';
import LocomotiveScroll from 'locomotive-scroll';

const useLocomotiveScroll = () => {
    useEffect(() => {
        const scroll = new LocomotiveScroll({
            el: document.querySelector('[data-scroll-container]'),
            smooth: true,
            smartphone: {
                smooth: true
            },
            tablet: {
                smooth: true
            }
        });
        document.body.style.cursor = "default";
        return () => {
            if (scroll) scroll.destroy();
        };
    }, []);
};

export default useLocomotiveScroll;