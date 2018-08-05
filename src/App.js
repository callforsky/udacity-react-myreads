import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Link, Route } from 'react-router-dom'
import Search from './Search'
import Bookshelf from './Bookshelf'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    books: []
  }

  /** componentDidMount is the lifecycle hook that is run right after
  the component is added to the DOM and should be used if you're fetching
  remote data or doing an Ajax request. This is used here to get all books
  from the database
  **/
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
        this.setState(() => ({ books }))
    })
  }

  render() {
    return (
      <div className="app">
        <Route path='/search' component={Search} />

        <Route exact path='/' render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <Bookshelf />
              </div>
            </div>
            {/* the round button in the lower right corner, it directs to the Search page if clicked */}
            <div className="open-search">
              {/* <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a> */}
              <Link to="/search">Search</Link>
            </div>
          </div>
        )} />
      </div>
    )
  }
}

export default BooksApp
