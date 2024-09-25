import React, { useState } from 'react';
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
import ScrollToTopButton from './components/ScrollToTopButton';
import TechCrunchNews from './components/TechCrunchNews';


export default function App() {
  const apiKey = process.env.REACT_APP_NEWS_API_KEY;
  const [mode, setMode] = useState('light');
  const [alert, setAlert] = useState(null);
  const [progress, setProgress] = useState(10);
  const [message, setMessage] = useState('');
  const [type, setType] = useState('');

  const showAlert = (message, type) => {
    setMessage(message);
    setType(type);
    setTimeout(() => {
      setAlert(null);
    }, 3000);
  }

  const toggleMode = () => {
    if (mode === 'light') {
      setMode('dark')
      document.body.style.backgroundColor = '#02456b';
      showAlert('Dark Mode Enabled', 'success');
    } else {
      setMode('light')
      document.body.style.backgroundColor = 'white';
      showAlert('Light Mode Enabled', 'success');
    }
  }

  return (
    <div>
      <Router>
        <Navbar mode={mode} toggleMode={toggleMode} />
        <LoadingBar
          color='#076696'
          height={3}
          progress={progress}
        />
        <Routes>
          <Route exact path='/' element={<News setProgress={setProgress} key='general' mode={mode} pageSize={12} apiKey={apiKey} country='in' category='general' />} />
          <Route exact path='/business' element={<News setProgress={setProgress} key='business' mode={mode} pageSize={12} apiKey={apiKey} country='in' category='business' />} />
          <Route exact path='/entertainment' element={<News setProgress={setProgress} key='entertainment' mode={mode} pageSize={12} apiKey={apiKey} country='in' category='entertainment' />} />
          <Route exact path='/health' element={<News setProgress={setProgress} key='health' mode={mode} pageSize={12} apiKey={apiKey} country='in' category='health' />} />
          <Route exact path='/science' element={<News setProgress={setProgress} key='science' mode={mode} pageSize={12} apiKey={apiKey} country='in' category='science' />} />
          <Route exact path='/sports' element={<News setProgress={setProgress} key='sports' mode={mode} pageSize={12} apiKey={apiKey} country='in' category='sports' />} />
          <Route exact path='/technology' element={<News setProgress={setProgress} key='technology' mode={mode} pageSize={12} apiKey={apiKey} country='in' category='technology' />} />
          <Route exact path='/techcrunchnews' element={<TechCrunchNews setProgress={setProgress} key='techcrunch' mode={mode} pageSize={12} apiKey={apiKey} category='techcrunch' />} />
          <Route exact path='/gadgetes360' element={<Gadgets360News setProgress={setProgress} key='gadgetes360' mode={mode} pageSize={12} apiKey={apiKey} category='gadgetes360' />} />
        </Routes>
        <ScrollToTopButton />
      </Router>
    </div>
  )
}
