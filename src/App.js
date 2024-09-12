import React, { Component } from 'react';
import {
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';
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
      alert: null,
      progress: 10,
    }
  }

  showAlert = (message, type) => {
    this.setState({
      message: message,
      type: type
    })
    setTimeout(() => {
      this.setState({ alert: null });
    }, 3000);
  }

  toggleMode = () => {
    console.log(`mode: ${this.state.mode}`);
    if (this.state.mode === 'light') {
      this.setState({ mode: 'dark' })
      document.body.style.backgroundColor = '#02456b';
      this.showAlert('Dark Mode Enabled', 'success');
    } else {
      this.setState({ mode: 'light' })
      document.body.style.backgroundColor = 'white';
      this.showAlert('Light Mode Enabled', 'success');
    }
  }

  setProgress = (progress) => {
    this.setState({progress: progress})
  }

  render() {
    const apiKey = 'afcf913491dd4285b23ec0649d5ea39f';
    return (
      <div>
        <Router>
          <Navbar mode={this.mode} toggleMode={this.toggleMode} />
          <LoadingBar
            // color='#f11946'
            color='#076696'
            height={3}
            progress={this.state.progress}
            // onLoaderFinished={() => setProgress(0)}
          />
          <Routes>
            <Route exact path='/' element={<News setProgress={this.setProgress} key='general' mode={this.state.mode} pageSize={12} apiKey={apiKey} country='in' category='general' />} />
            <Route exact path='/business' element={<News setProgress={this.setProgress} key='business' mode={this.state.mode} pageSize={12} apiKey={apiKey} country='in' category='business' />} />
            <Route exact path='/entertainment' element={<News setProgress={this.setProgress} key='entertainment' mode={this.state.mode} pageSize={12} apiKey={apiKey} country='in' category='entertainment' />} />
            <Route exact path='/health' element={<News setProgress={this.setProgress} key='health' mode={this.state.mode} pageSize={12} apiKey={apiKey} country='in' category='health' />} />
            <Route exact path='/science' element={<News setProgress={this.setProgress} key='science' mode={this.state.mode} pageSize={12} apiKey={apiKey} country='in' category='science' />} />
            <Route exact path='/sports' element={<News setProgress={this.setProgress} key='sports' mode={this.state.mode} pageSize={12} apiKey={apiKey} country='in' category='sports' />} />
            <Route exact path='/technology' element={<News setProgress={this.setProgress} key='technology' mode={this.state.mode} pageSize={12} apiKey={apiKey} country='in' category='technology' />} />
            <Route exact path='/techcrunchnews' element={<TechCrunchNews setProgress={this.setProgress} key='techcrunch' mode={this.state.mode} pageSize={12} apiKey={apiKey} category='techcrunch' />} />
            <Route exact path='/gadgetes360' element={<Gadgets360News setProgress={this.setProgress} key='gadgetes360' mode={this.state.mode} pageSize={12} apiKey={apiKey} category='gadgetes360' />} />
          </Routes>
        </Router>
      </div>
    )
  }
}
