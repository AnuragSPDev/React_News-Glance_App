import React, { useEffect, useState } from 'react';
import '../ScrollToTopButton.css';

export default function ScrollToTopButton() {
    const [isVisible, setIsVisible] = useState(false);

    const handleScroll = () => {
        if (window.scrollY > 200) {
            console.log(`scrollY: ${window.scrollY}`);
            setIsVisible(true);
        } else {
            console.log(`scrollY: ${window.scrollY}`);
            setIsVisible(false);
        }
    }

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };
    
    
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        
        // Cleanup function to remove the event listener
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []); 
    
    return (
        <div>
            <button
                className={`scroll-to-top-btn ${isVisible ? 'show' : 'hide'}`}
                onClick={scrollToTop}>&uarr; Back To Top</button>
        </div>
    )
}
