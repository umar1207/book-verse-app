package bookverse.dto.book;

public class BookUpdateDto {
    private String authorName;
    private String genre;
    private Long availableCopies;
    private Long totalCopies;
    private Boolean isActive;

    public BookUpdateDto() {}

    public BookUpdateDto(String authorName, String genre, Long availableCopies, Long totalCopies, Boolean isActive) {
        this.authorName = authorName;
        this.genre = genre;
        this.availableCopies = availableCopies;
        this.totalCopies = totalCopies;
        this.isActive = isActive;
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
}
