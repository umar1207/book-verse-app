package bookverse.repository;

import bookverse.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {
    @Query("SELECT b from Book b WHERE b.bookName LIKE :bookName% or b.authorName LIKE %:authorName% or genre LIKE :genre%")
    List<Book> searchBook(@Param("bookName") String bookName,
                          @Param("authorName") String authorName,
                          @Param("genre") String genre);

    @Query("SELECT b FROM Book b WHERE b.bookName = :bookName")
    Book findByBookName(String bookName);

    @Query("SELECT COUNT(*) FROM IssueRecord r WHERE r.book.bookId = :bookId AND r.isReturned = false")
    Long numberOfBooksIssued(@Param("bookId") Long bookId);
}
