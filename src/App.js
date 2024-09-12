import React, { Component } from 'react';
import {
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import './App.css';
import Gadgets360News from './components/Gadgets360News';
import Navbar from './components/Navbar';
import News from './components/News';
import TechCrunchNews from './components/TechCrunchNews';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: 'light',
      alert: null
    }
  }

  showAlert = (message, type) => {
    this.setState({
      message: message,
      type: type
    })
    setTimeout(() => {
      this.setState({alert: null});
    }, 3000);
  }

  toggleMode = () =>{
    console.log(`mode: ${this.state.mode}`);
    if (this.state.mode === 'light') {
      this.setState({mode: 'dark'})
      document.body.style.backgroundColor = '#02456b';
      this.showAlert('Dark Mode Enabled', 'success');
    } else {
      this.setState({mode: 'light'})
      document.body.style.backgroundColor = 'white';
      this.showAlert('Light Mode Enabled', 'success');
    }
  }
  
  render() {
    const apiKey = 'afcf913491dd4285b23ec0649d5ea39f';
    return (
      <div>
        <Router>
          <Navbar mode={this.mode} toggleMode={this.toggleMode} />
          <Routes>
            <Route exact path='/' element={<News key='general' mode={this.state.mode} pageSize={12} apiKey={apiKey} country='in' category='general' />} />
            <Route exact path='/business' element={<News key='business' mode={this.state.mode} pageSize={12} apiKey={apiKey} country='in' category='business' />} />
            <Route exact path='/entertainment' element={<News key='entertainment' mode={this.state.mode} pageSize={12} apiKey={apiKey} country='in' category='entertainment' />} />
            <Route exact path='/health' element={<News key='health' mode={this.state.mode} pageSize={12} apiKey={apiKey} country='in' category='health' />} />
            <Route exact path='/science' element={<News key='science' mode={this.state.mode} pageSize={12} apiKey={apiKey} country='in' category='science' />} />
            <Route exact path='/sports' element={<News key='sports' mode={this.state.mode} pageSize={12} apiKey={apiKey} country='in' category='sports' />} />
            <Route exact path='/technology' element={<News key='technology' mode={this.state.mode} pageSize={12} apiKey={apiKey} country='in' category='technology' />} />
            <Route exact path='/techcrunchnews' element={<TechCrunchNews key='techcrunch' mode={this.state.mode} pageSize={12} apiKey={apiKey} category='techcrunch' />} />
            <Route exact path='/gadgetes360' element={<Gadgets360News key='gadgetes360' mode={this.state.mode} pageSize={12} apiKey={apiKey} category='gadgetes360' />} />
          </Routes>
        </Router>
      </div>
    )
  }
}
