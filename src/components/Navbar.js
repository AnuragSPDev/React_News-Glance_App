import React, { useState } from 'react';
import { Link } from "react-router-dom";

export default function Navbar(props) {
    const [category, setCategory] = useState('Select Top News Category');

    const handleSelectCategory = (category) => {
        console.log(category);
        setCategory(category)
    }

    return (
        <div>
            <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">News@Glance</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item mx-2">
                                <Link className="nav-link" aria-current="page" to="/">Home - Top Headlines</Link>
                            </li>
                            <div className="dropdown mx-2">
                                <button className="btn btn-secondary dropdown-toggle" type="button"
                                    data-bs-toggle="dropdown" aria-expanded="false" style={{ backgroundColor: '#2e322e' }}>
                                    {category}
                                </button>
                                <ul className="dropdown-menu" style={{ backgroundColor: '#2e322e' }}>
                                    <li><Link className="dropdown-item" to="/business" style={{ color: 'white' }} onClick={() => handleSelectCategory('Business')}>Business</Link></li>
                                    <li><Link className="dropdown-item" to="/entertainment" style={{ color: 'white' }} onClick={() => handleSelectCategory('Entertainment')}>Entertainment</Link></li>
                                    <li><Link className="dropdown-item" to="/" style={{ color: 'white' }} onClick={() => handleSelectCategory('General')}>General</Link></li>
                                    <li><Link className="dropdown-item" to="/health" style={{ color: 'white' }} onClick={() => handleSelectCategory('Health')}>Health</Link></li>
                                    <li><Link className="dropdown-item" to="/science" style={{ color: 'white' }} onClick={() => handleSelectCategory('Science')}>Science</Link></li>
                                    <li><Link className="dropdown-item" to="/sports" style={{ color: 'white' }} onClick={() => handleSelectCategory('Sports')}>Sports</Link></li>
                                    <li><Link className="dropdown-item" to="/technology" style={{ color: 'white' }} onClick={() => handleSelectCategory('Technology')}>Technology</Link></li>
                                </ul>
                            </div>
                            <li className="nav-item mx-2">
                                <Link className="nav-link" aria-current="page" to="/techcrunchnews">TechCrunchNews</Link>
                            </li>
                            <li className="nav-item mx-2">
                                <Link className="nav-link" aria-current="page" to="/gadgetes360">Gadgetes360</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="form-check form-switch">
                        <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked"
                            onClick={props.toggleMode} />
                        <label className="form-check-label" htmlFor="flexSwitchCheckChecked" style={{ color: 'white' }}
                        >Dark Mode</label>
                    </div>
                </div>
            </nav>
        </div>
    )
}
