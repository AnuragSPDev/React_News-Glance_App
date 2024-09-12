import PropTypes from 'prop-types';
import React, { Component } from 'react';


export default class NewsItem extends Component {

  static propTypes = {
    mode: PropTypes.string
  }

  // static defaultProps = {
  //   mode: 'light'
  // }

  render() {
    let { title, description, imageUrl, newsUrl, author, source, date, mode } = this.props;
    return (
      <div>
        <div className="card" style={{ width: "18rem" }}>
          <img src={imageUrl} className="card-img-top" alt="..." />
          <div className="card-body" style={{backgroundColor: mode==='light'?'#a7a9bc': '#dbe2ea'}}>
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}...</p>
            <p className="card-text"><small className="text-body-secondary">By <strong>{author}</strong> Updated at &nbsp;
              {new Date(date).toLocaleString()}</small>&nbsp;<span className="badge rounded-pill text-bg-dark">
                Source: {source}</span></p>
            <a rel="noreferrer" href={newsUrl} target='_blank' className="btn btn-sm btn-primary">Read More</a>
          </div>
        </div>
      </div>
    )
  }
}
