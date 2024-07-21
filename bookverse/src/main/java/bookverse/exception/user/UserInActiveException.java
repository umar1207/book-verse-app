package bookverse.exception.user;

public class UserInActiveException extends RuntimeException {
    public UserInActiveException(String message){
        super(message);
    }
}
