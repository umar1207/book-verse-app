package bookverse.exception.book;

// when no more copies of the book are available
public class BookNotAvailableException extends RuntimeException {
    public BookNotAvailableException(String message) {
        super(message);
    }
}
