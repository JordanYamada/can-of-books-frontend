import axios from 'axios';
import React from 'react';
import BookFormModal from './BookFormModal';
import Button from 'react-bootstrap/Button';
import Carousel from 'react-bootstrap/Carousel';
let SERVER = process.env.REACT_APP_SERVER;

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      showModal: false,
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

  // handler to make a book object from user input
  handleSubmit = (e) => {
    e.preventDefault();
    let book = {
      title: e.target.title.value,
      description: e.target.description.value,
      status: e.target.status.value,
    }
    this.postBook(book);
  }

  // handler to create a book in the books database from user input
  // then update state with the updated books array
  postBook = async (book) => {
    try{
      let url =  `${SERVER}/books`;
      console.log(url);
      let createdBook = await axios.post(url,book);
      console.log('Posted Book: ',createdBook.data);
      // use spread operator to make a deep copy of books in state, and concatenate the createdBook to the end
      this.setState({
        books: [...this.state.books, createdBook.data],
      });
    } catch (e){
      console.log('This is a problem... ',e.response)
    }
  }

  // method to delete a book from the database using its '_id' property
  deleteBook = async (id) => {
    try
    {
      let url = `${SERVER}/books/${id}`;
      await axios.delete(url);

      // use `filter` to make an `updatedBooks` array sans the book we just deleted
      let updatedBooks = this.state.books.filter( book => book._id !== id);

      // set the updatedBooks array to state
      this.setState({
        books: updatedBooks,
      });
    }
    catch(e)
    {
      console.log('could not delete this book: ', e.response.data);
    }
  }

  componentDidMount() {
    this.getBooks();
  }



  render() {

    let books = this.state.books.map(book => {
      // console.log('books in state in render:', this.state.books);
      // return <p key={book._id}>{book.title}</p>

      return <Carousel.Item key={book._id}>
        <img
          className="d-block w-100 img-fluid"
          src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
          alt="book"
        />
        <Carousel.Caption>
          <h3>{book.title}</h3>
          <p>{book.description}.</p>
          <p>{book.status}</p>
        </Carousel.Caption>
        <Button 
          variant="dark" 
          onClick={() => this.deleteBook(book._id)}
        >
          Delete Book
        </Button>
      </Carousel.Item>

    });
    console.log(books);
    return (
      <>
      <Button variant="dark" onClick={this.handleModal}>Add Books</Button>

      <BookFormModal
            show={this.state.showModal}
            onHide={this.handleModal}
            handleSubmit={this.handleSubmit}
          />
        <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>

        {this.state.books.length ? (
          <Carousel>{books}</Carousel>
        ) : (
          <h3>No Books Found :(</h3>
        )}
      </>
    )
  }
}

export default BestBooks;
