package bookverse.service.book;

import bookverse.dto.book.BookCreateDto;
import bookverse.dto.book.BookReadDto;
import bookverse.dto.book.BookUpdateDto;
import bookverse.dto.issuerecord.IssueRecordReadDto;
import bookverse.entity.Book;
import bookverse.entity.IssueRecord;
import bookverse.entity.User;
import bookverse.exception.book.BookInActiveException;
import bookverse.exception.book.BookNotAvailableException;
import bookverse.exception.book.IntegrityViolationException;
import bookverse.exception.general.EntityAlreadyExistsException;
import bookverse.exception.general.EntityNotFoundException;
import bookverse.exception.general.EntityReferencedException;
import bookverse.exception.user.UserInActiveException;
import bookverse.repository.BookRepository;
import bookverse.repository.IssueRecordRepository;
import bookverse.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class BookServiceImpl implements BookService {
    @Autowired
    BookRepository bookRepository;
    @Autowired
    IssueRecordRepository issueRecordRepository;
    @Autowired
    UserRepository userRepository;
    @Override
    public void createBook(BookCreateDto bookCreateDto) {
        Book checkBook = bookRepository.findByBookName(bookCreateDto.getBookName());
        if(checkBook != null) {
            throw new EntityAlreadyExistsException("Book already exists with name = " + bookCreateDto.getBookName());
        }
        Book book = new Book(bookCreateDto.getBookName(), bookCreateDto.getAuthorName(), bookCreateDto.getGenre(), bookCreateDto.getTotalCopies());
        bookRepository.save(book);
    }

    @Override
    public List<BookReadDto> getAllBooks() {
        List<BookReadDto> allBooks = new ArrayList<>();
        List<Book> books = bookRepository.findAll();
        for(Book book: books){
            BookReadDto bookReadDto = new BookReadDto(book.getBookId(), book.getBookName(), book.getAuthorName(), book.getGenre(), book.getAvailableCopies(), book.getTotalCopies(), book.getActive());
            allBooks.add(bookReadDto);
        }
        return allBooks;
    }

    @Override
    public List<BookReadDto> searchBooks(String bookName, String authorName, String genre) {
        List<Book> books = bookRepository.searchBook(bookName, authorName, genre);
        List<BookReadDto> searchedBooks = new ArrayList<>();
        for(Book book: books){
            BookReadDto bookReadDto = new BookReadDto(book.getBookId(), book.getBookName(), book.getAuthorName(), book.getGenre(), book.getAvailableCopies(), book.getTotalCopies(), book.getActive());
            searchedBooks.add(bookReadDto);
        }
        return searchedBooks;
    }

    @Override
    public void deleteBook(Long bookId) {
        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new EntityNotFoundException("No book found with id = " + bookId));

        if(book.getAvailableCopies() != book.getTotalCopies()){
            throw new EntityReferencedException("Book is issued by someone and cannot be deleted");
        }

        book.setActive(Boolean.FALSE);
        bookRepository.save(book);
    }

    @Override
    public void updateBook(Long bookId, BookUpdateDto bookUpdateDto) {
        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new EntityNotFoundException("Book does not exist"));

        String authorName = bookUpdateDto.getAuthorName();
        String genre = bookUpdateDto.getGenre();
        Long availableCopies = bookUpdateDto.getAvailableCopies();
        Long totalCopies = bookUpdateDto.getTotalCopies();
        Boolean isActive = bookUpdateDto.getActive();

        if(authorName != null){
            book.setAuthorName(authorName);
        }

        if(genre != null){
            book.setGenre(genre);
        }

        if(availableCopies != null && totalCopies != null){
            if((availableCopies + bookRepository.numberOfBooksIssued(bookId)) > totalCopies) throw new IntegrityViolationException("Cannot process since total copies cannot be less than available copies");
            book.setAvailableCopies(availableCopies);
            book.setTotalCopies(totalCopies);
        } else if (totalCopies != null) {
            if(totalCopies < (book.getAvailableCopies() + bookRepository.numberOfBooksIssued(bookId))) throw new IntegrityViolationException("ERROR: You are setting Total copies < Available copies");
            book.setTotalCopies(totalCopies);
        } else if(availableCopies != null) {
            if(book.getTotalCopies() != (availableCopies + bookRepository.numberOfBooksIssued(bookId))) throw new IntegrityViolationException("ERROR: You are setting Available copies > Total copies");
            book.setAvailableCopies(availableCopies);
        }

        if(isActive != null){
            if(isActive) book.setActive(Boolean.TRUE);
            else deleteBook(bookId);
        }

        bookRepository.save(book);
    }

    @Override
    public void issueBook(Long userId, Long bookId) {
        // validate user
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User does not exist with id = " + userId));

        // check user hasn't already issued a book
        IssueRecord matchFound = issueRecordRepository.findUserAlreadyIssuedEntry(userId);
        if(matchFound != null){
            throw new EntityAlreadyExistsException("User has already issued a book");
        }

        // validate book
        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new EntityNotFoundException("Book does not exist with id = " + bookId));

        // check if book and user are active

        Boolean userActive = user.getActive();
        if(!userActive) throw new UserInActiveException("User is not active");

        Boolean bookActive = book.getActive();
        if(!bookActive) throw new BookInActiveException("Book is not active");

        Long availableCopies = book.getAvailableCopies();
        if(availableCopies == 0) throw new BookNotAvailableException("No more copies of book are available");

        IssueRecord issueRecord = new IssueRecord(user,book);
        book.setAvailableCopies(availableCopies-1);
        issueRecordRepository.save(issueRecord);
    }

    @Override
    public void returnBook(Long userId, Long bookId) {
        IssueRecord issueRecord = issueRecordRepository.findIssueEntry(userId,bookId);
        if(issueRecord == null) throw new EntityNotFoundException("User has not issued the book");
        issueRecord.setReturned(Boolean.TRUE);
        issueRecord.setReturnDate(LocalDate.now());

        Book book = issueRecord.getBook();
        book.setAvailableCopies(book.getAvailableCopies()+1);

        bookRepository.save(book);
        issueRecordRepository.save(issueRecord);
    }

    @Override
    public List<IssueRecordReadDto> getAllRecords() {
        List<IssueRecord> issueRecords = issueRecordRepository.findAll();
        List<IssueRecordReadDto> records = new ArrayList<>();
        for(IssueRecord issueRecord: issueRecords){
            IssueRecordReadDto issueRecordReadDto = new IssueRecordReadDto(issueRecord.getIssueId(), issueRecord.getUser().getUserId(), issueRecord.getBook().getBookId(), issueRecord.getIssueDate(), issueRecord.getReturnDate(), issueRecord.getReturned());
            records.add(issueRecordReadDto);
        }
        return records;
    }
}
