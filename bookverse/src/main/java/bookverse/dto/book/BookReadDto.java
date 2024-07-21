package bookverse.dto.book;

public class BookReadDto {
    private Long bookId;
    private String bookName;
    private String authorName;
    private String genre;
    private Long availableCopies;
    private Long totalCopies;
    private Boolean isActive;

    public BookReadDto(){};

    public BookReadDto(Long bookId, String bookName, String authorName, String genre, Long availableCopies, Long totalCopies, Boolean isActive) {
        this.bookId = bookId;
        this.bookName = bookName;
        this.authorName = authorName;
        this.genre = genre;
        this.availableCopies = availableCopies;
        this.totalCopies = totalCopies;
        this.isActive = isActive;
    }

    public Long getBookId() {
        return bookId;
    }

    public void setBookId(Long bookId) {
        this.bookId = bookId;
    }

    public String getBookName() {
        return bookName;
    }

    public void setBookName(String bookName) {
        this.bookName = bookName;
    }

    public String getAuthorName() {
        return authorName;
    }

    public void setAuthorName(String authorName) {
        this.authorName = authorName;
    }

    public String getGenre() {
        return genre;
    }

    public void setGenre(String genre) {
        this.genre = genre;
    }

    public Long getAvailableCopies() {
        return availableCopies;
    }

    public void setAvailableCopies(Long availableCopies) {
        this.availableCopies = availableCopies;
    }

    public Long getTotalCopies() {
        return totalCopies;
    }

    public void setTotalCopies(Long totalCopies) {
        this.totalCopies = totalCopies;
    }

    public Boolean getActive() {
        return isActive;
    }

    public void setActive(Boolean active) {
        isActive = active;
    }
}
