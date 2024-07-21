package bookverse.controller;

import bookverse.dto.book.BookCreateDto;
import bookverse.dto.book.BookReadDto;
import bookverse.dto.book.BookUpdateDto;
import bookverse.dto.issuerecord.IssueRecordReadDto;
import bookverse.service.book.BookService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/book")
public class BookController {
    @Autowired
    BookService bookService;
    @PostMapping
    public ResponseEntity<?> createBook(@Valid @RequestBody BookCreateDto bookCreateDto){
        bookService.createBook(bookCreateDto);
        return ResponseEntity.ok("book created");
    }
    @GetMapping
    public ResponseEntity<?> getAllBooks(){
        List<BookReadDto> books = bookService.getAllBooks();
        return ResponseEntity.ok(books);
    }
    @GetMapping("/search")
    public ResponseEntity<?> searchBooks(@RequestParam(required = false) String bookName,
                                         @RequestParam(required = false) String authorName,
                                         @RequestParam(required = false) String genre){
        List<BookReadDto> books = bookService.searchBooks(bookName,authorName, genre);
        return ResponseEntity.ok(books);
    }
    @DeleteMapping("/{bookId}")
    public ResponseEntity<?> deleteBook(@PathVariable Long bookId){
        bookService.deleteBook(bookId);
        return ResponseEntity.ok("Book deleted with id = " + bookId);
    }

    @PutMapping("/update/{bookId}")
    public ResponseEntity<?> updateBook(@PathVariable Long bookId, @RequestBody BookUpdateDto bookUpdateDto){
        bookService.updateBook(bookId, bookUpdateDto);
        return ResponseEntity.ok("Book Updated Successfully");
    }

    @PostMapping("/issue/{userId}/{bookId}")
    public ResponseEntity<?> issueBook(@PathVariable Long userId, @PathVariable Long bookId){
        bookService.issueBook(userId, bookId);
        return ResponseEntity.ok("Book Issued Successfully");
    }

    @PutMapping("/return/{userId}/{bookId}")
    public ResponseEntity<?> returnBook(@PathVariable Long userId, @PathVariable Long bookId){
        bookService.returnBook(userId, bookId);
        return ResponseEntity.ok("Book Returned Successfully");
    }

    @GetMapping("/records")
    public ResponseEntity<?> records(){
        List<IssueRecordReadDto> records = bookService.getAllRecords();
        return ResponseEntity.ok(records);
    }

}
