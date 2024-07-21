package bookverse.service.book;

import bookverse.dto.book.BookCreateDto;
import bookverse.dto.book.BookReadDto;
import bookverse.dto.book.BookUpdateDto;
import bookverse.dto.issuerecord.IssueRecordReadDto;

import java.util.List;

public interface BookService {
    public void createBook(BookCreateDto bookCreateDto);
    public List<BookReadDto> getAllBooks();
    public List<BookReadDto> searchBooks(String bookName, String authorName, String genre);
    public void updateBook(Long bookId, BookUpdateDto bookUpdateDto);
    public void deleteBook(Long bookId);
    public void issueBook(Long userId, Long bookId);
    public void returnBook(Long userId, Long bookId);
    public List<IssueRecordReadDto> getAllRecords();

}
