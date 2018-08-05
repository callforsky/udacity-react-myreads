import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Link, Route } from 'react-router-dom'
import Search from './Search'
import Bookshelf from './Bookshelf'

class BooksApp extends React.Component {
  state = {
    allBooks: [],
    currentlyReading: [],
    wantToRead: [],
    read: []
  }

  /**
    componentDidMount is the lifecycle hook that is run right after
    the component is added to the DOM and should be used if you're fetching
    remote data or doing an Ajax request. This is used here to get all books
    from the database
  **/
  componentDidMount() {
    this.loadBooksFromDatabase()
  }

  // the function below was once defined inside componentDidMount, which is
  // not a very good practice, according to stackoverflow. So I moved the below
  // function outside.
  loadBooksFromDatabase() {
    BooksAPI.getAll().then((books) => {
        this.setState({
          existingBooks: books,
          currentlyReading: books.filter(book => book.shelf==='currentlyReading'),
          wantToRead: books.filter(book => book.shelf==='wantToRead'),
          read: books.filter(book => book.shelf==='read')
        })
    })
  }

  changeShelf = (selectedBook, newShelf) => {
    BooksAPI.update(selectedBook, newShelf).then(() => {
      // reload the books after we update selected book's shelf in the database
      this.loadBooksFromDatabase()
    })
  }

  render() {
    return (
      <div className="app">
        {/* search and add a book page */}
        <Route path='/search' render={() =>
          <Search
            existingBooks={this.state.existingBooks}
            // changeShelf is a function passed to child Bookshelf
            changeShelf={this.changeShelf}
          />
        }/>
        {/* homepage */}
        <Route exact path='/' render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <Bookshelf
                  currentlyReading={this.state.currentlyReading}
                  wantToRead={this.state.wantToRead}
                  read={this.state.read}
                  // changeShelf is a function passed to child Bookshelf
                  changeShelf={this.changeShelf}
                />
              </div>
            </div>
            {/* the round button in the lower right corner, it directs to the Search page if clicked */}
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        )} />
      </div>
    )
  }
}

export default BooksApp
