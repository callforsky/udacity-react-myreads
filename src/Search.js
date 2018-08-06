import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'

class Search extends Component {
  state = {
    query: '',
    booksFound: []
  }

  searchBook = (query) => {
    if (query === '') {
      this.setState({query: '', booksFound: []})
    } else {
      this.setState({query: query.trim()})
      BooksAPI.search(query).then((booksFound) => {
        // use if else to catch the error when booksFound is empty
        if (booksFound && booksFound.length) {
          // loop through returned result and assign them the self value if already on a shelf
          booksFound.map(book => (this.props.existingBooks.filter(existingBook => existingBook.id === book.id).map(existingBook => book.shelf = existingBook.shelf)))
          // assign shelf "none" to the rest of books who are not on a shelf
          // the tricky part is that the shelf property is missing in their objects
          // so I have to check and assign a new property of shelf
          booksFound.map(book => {
            if (!book.hasOwnProperty('shelf')) {
              book.shelf="none"
            }
          })
          this.setState({booksFound})
        } else {
          booksFound = []
        }
      })
    }
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          {/* The back arrow that directs to the homepage */}
          <Link className="close-search" to="/">Close</Link>
          {/* The search bar */}
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={(event) => this.searchBook(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.booksFound.map(book =>
              <li key={book.id}>
                <div className="book">
                  <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks !== undefined ? book.imageLinks.thumbnail : ''})` }}></div>
                    <div className="book-shelf-changer">
                      {/*
                        add attributes in <select> to make the bookshelf switch working
                        the key is to set the default value for shelf
                      */}
                      <select value={book.shelf} onChange={(event) => {
                        this.props.changeShelf(book, event.target.value)}
                      }>
                        <option value="move" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                      </select>
                    </div>
                  </div>
                  <div className="book-title">{book.title}</div>
                  <div className="book-authors">{book.authors}</div>
                </div>
              </li>
            )}
          </ol>
        </div>
      </div>
    )
  }
}

export default Search
