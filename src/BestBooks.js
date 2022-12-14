import axios from 'axios';
import React from 'react';
import BookFormModal from './BookFormModal';
import BookUpdateFormModal from './BookUpdateFormModal';
import Button from 'react-bootstrap/Button';
import Carousel from 'react-bootstrap/Carousel';
let SERVER = process.env.REACT_APP_SERVER;



class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      showModal: false,
      showUpdateModal: false,
      book: {}
    }
  }


  getBooks = async () => {
    try {
      // Get book data from backend      
      let results = await axios.get(`${SERVER}/books`);
      // console.log(results.data)
      // Set book results array to state
      this.setState({
        books: results.data,
      });
    } catch (e) {
      console.log('Mayday, Mayday ', e.response.data);
    }
  }


  // This eventlistener toggles `showModal` in state to open and close the modal form
  handleModal = () => {
    this.setState({
      showModal: !this.state.showModal,
    })
  }

  handleUpdateModal = (book) => {
    this.setState({
      showUpdateModal:true,
      book: book
    })
  }
  
  hideUpdateForm = () => {
    this.setState({
      showUpdateModal: false
    })
  }

  // handler to make a book object from user input
  handleSubmit = (e) => {
    e.preventDefault();
    let book = {
      title: e.target.title.value,
      description: e.target.description.value,
      status: e.target.status.value,
    }
    this.postBook(book);
    this.handleModal();
  }

  // handler to create a book in the books database from user input
  // then update state with the updated books array
  postBook = async (book) => {
    try {
      let url = `${SERVER}/books`;
      // console.log('postBook url: ', url);

      let createdBook = await axios.post(url, book);
      console.log('Posted Book: ', createdBook.data);

      // use spread operator to make a deep copy of books in state, and concatenate the createdBook to the end
      this.setState({
        books: [...this.state.books, createdBook.data],
      });
    } catch (e) {
      console.log('This is a problem... ', e.response)
    }
  }

  // method to delete a book from the database using its '_id' property
  deleteBook = async (id) => {
    try {
      let url = `${SERVER}/books/${id}`;
      await axios.delete(url);
      console.log(url);
      // use `filter` to make an `updatedBooks` array sans the book we just deleted
      let updatedBooks = this.state.books.filter(book => book._id !== id);
      console.log(updatedBooks);
      // set the updatedBooks array to state
      this.setState({
        books: updatedBooks,
      });
    }
    catch (e) {
      console.log('could not delete this book: ', e.response.data);
    }
  }

  /* class 13 notes: Update

    updateBook = updatedBook =>
    {
      try
      {
        // make url using the `_id` property of the `updatedBook` argument
        let url = `${SERVER}/books/${updatedBook._id}`;

        // get the updatedBook from the database
        let updatedBookFromDB = await axios.put(url, updatedBook);

        // update state, so that it can rerender with updated books info

        let let updatedBookArray = this.state.books.map( existingBook => 
        {
          // if the `._id` matches the book we want to update:
          // replace that element with the updatedBookFromDB book object

          return existingBook._id === updatedBook._id
          ? updatedBookFromDB.data
          : existingBook;
        });

        this.setState({
          books: updatedBookArray updatedBookArray,
        })
      }
      catch(e)
      {
        console.log('Problem updating book...: ', e.message);
      }
    }

    handleUpdate = e =>
    {
      e.preventDefault();

      let bookToUpdate = 
      {
        title: e.target.title.value || this.props.boo k.title,
        description: e.target.description.value || this.props.book.description,
        status: e.target.status.value || this.props.book.status,

        // pass in _id and __v of book
        _id: this.props.book._id,

        // two underscores
        __v: this.props.book.__v
      }

      // log to see the book we are to update
      console.log('bookToUpdate: ', bookToUpdate);
    }

    // call `updateBook()` to do backend stuff
*/

updateBook = async updatedBook =>
    {
      try
      {
        // make url using the `_id` property of the `updatedBook` argument
        let url = `${SERVER}/books/${updatedBook._id}`;

        // get the updatedBook from the database
        let updatedBookFromDB = await axios.put(url, updatedBook);

        // update state, so that it can rerender with updated books info

        let updatedBookArray = this.state.books.map( existingBook => 
        {
          // if the `._id` matches the book we want to update:
          // replace that element with the updatedBookFromDB book object

          return existingBook._id === updatedBook._id
          ? updatedBookFromDB.data
          : existingBook;
        });

        this.setState({
          books: updatedBookArray,
          showUpdateModal: false
        })
      }
      catch(e)
      {
        console.log('Problem updating book...: ', e.message);
      }
    }
    handleUpdate = e =>
    {
      e.preventDefault();

      let bookToUpdate = 
      {
        title: e.target.title.value || this.state.book.title,
        description: e.target.description.value || this.state.book.description,
        status: e.target.status.value || this.state.book.status,

        // pass in _id and __v of book
        _id: this.state.book._id,

        // two underscores
        __v: this.state.book.__v
      }
    

      // log to see the book we are to update
      console.log('bookToUpdate: ', bookToUpdate);
      this.updateBook(bookToUpdate);
    }
  // only runs these methods after the component mounts
  componentDidMount() {
    this.getBooks();
  }

  render() {

    let booksCarouselItems = this.state.books.map(book => {
      // console.log('books in state in render:', this.state.books);
      // return <p key={book._id}>{book.title}</p>

      // render a <Carousel.Item> for each book in the books array
      return (
        <Carousel.Item key={book._id}>
          <img
            className="d-block w-100 img-fluid"
            src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
            alt={book.description}
          />

          <Carousel.Caption >
            <h3>{book.title}</h3>
            <p>{book.description}</p>
            <p>{book.status}</p>

            {/* update button */}
            <Button
              variant="dark"
              onClick={() => 
                
                this.handleUpdateModal(book)}
            >
              Update Book
            </Button>

            {/* delete button */}
            <Button
              variant="dark"
              onClick={() => this.deleteBook(book._id)}

            >
              Delete Book
            </Button>
          
          </Carousel.Caption>



        </Carousel.Item>
      )
    });

    // log to see what's inside the booksCarouselItems array
    // console.log(booksCarouselItems);
    return (
      <>
        <Button
          variant="dark"
          onClick={this.handleModal}
        >
          Add Books
        </Button>

        <BookFormModal
          show={this.state.showModal}
          onHide={this.handleModal}
          handleSubmit={this.handleSubmit}
        />
        <BookUpdateFormModal
          show={this.state.showUpdateModal}
          onHide={this.hideUpdateForm}
          handleUpdate={this.handleUpdate}
          book={this.state.book}

        />

        <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>

        {/* ternary to display either a <Carousel> (if there are books) or an error message */}
        {this.state.books.length
          ?
          (
            <Carousel>{booksCarouselItems}</Carousel>
          )
          :
          (
            <h3>No Books Found :(</h3>
          )}
      </>
    )
  }
}

export default BestBooks;
