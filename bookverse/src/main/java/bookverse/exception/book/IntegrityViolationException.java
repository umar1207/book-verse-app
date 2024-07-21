package bookverse.exception.book;

// exception occurs when book available and total count are being updated such that they effect integrity of db
public class IntegrityViolationException extends RuntimeException {
    public IntegrityViolationException(String message) {
        super(message);
    }
}
