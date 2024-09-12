import React, { Component } from 'react';
import '../ScrollToTopButton.css';

export default class ScrollToTopButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isVisible: false
        }
    }

    handleScroll = () => {
        if (window.scrollY > 200) {
            console.log(`scrollY: ${window.scrollY}`);
            this.setState({isVisible: true});
        } else {
            console.log(`scrollY: ${window.scrollY}`);
            this.setState({isVisible: false});
        }
    }

    scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    componentDidMount = () => {
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount = () => {
        window.removeEventListener('scroll', this.handleScroll);
    }

    render() {
        const {isVisible} = this.state;
        return (
            <div>
                <button 
                className={`scroll-to-top-btn ${isVisible ? 'show' : 'hide'}`}
                onClick={this.scrollToTop}>&uarr; Back To Top</button>
            </div>
        )
    }
}
