package bookverse.dto.book;

public class BookUpdateDto {
    private String authorName;
    private String genre;
    private Long availableCopies;
    private Long totalCopies;
    private Boolean isActive;
    private String bookPhoto;
    public BookUpdateDto() {}

    public BookUpdateDto(String authorName, String genre, Long availableCopies, Long totalCopies, Boolean isActive, String bookPhoto) {
        this.authorName = authorName;
        this.genre = genre;
        this.availableCopies = availableCopies;
        this.totalCopies = totalCopies;
        this.isActive = isActive;
        this.bookPhoto = bookPhoto;
    }

    public String getAuthorName() {
        return authorName;
    }

    public String getGenre() {
        return genre;
    }

    public Long getAvailableCopies() {
        return availableCopies;
    }

    public Long getTotalCopies() {
        return totalCopies;
    }

    public Boolean getActive() {
        return isActive;
    }

    public String getBookPhoto() {
        return bookPhoto;
    }
}
