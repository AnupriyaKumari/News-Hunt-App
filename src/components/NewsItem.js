import { getByTitle } from '@testing-library/react'
import React, { Component } from 'react'

export class NewsItem extends Component {


    render() {
        let { title, description, imageUrl, newsUrl, author, date, source } = this.props;

        return (
            <div className='my-3'>
                <div className="card">
                    <img src={!imageUrl ? "https://c.ndtvimg.com/2022-01/6o87k574_fatima-sheikh-doodle_625x300_09_January_22.jpg" : imageUrl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <div style={
                            {
                                display: 'flex',
                                justifyContent: 'flex=end',
                                position: 'absolute',
                                right: '0'
                            }
                        }></div>
                        <h5 className="card-title">{title} <span className="position-absolute top-0  translate-middle badge rounded-pill bg-danger" style={{ left: '86%', zIndex: '1' }}>
                            {source}
                        </span></h5>
                        <p className="card-text">{description}</p>
                        <p className="card-text"><small className="text-danger"  >By {author ? author : "Anonymous"} on {new Date(date).toGMTString()}</small></p>
                        <a href={newsUrl} className="btn btn-sm btn-dark">Read More</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsItem
