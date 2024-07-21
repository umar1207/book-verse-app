package bookverse.exception.book;

public class BookInActiveException extends RuntimeException {
    public BookInActiveException(String message){
        super(message);
    }
}
