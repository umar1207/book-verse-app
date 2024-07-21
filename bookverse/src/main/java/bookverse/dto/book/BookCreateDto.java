package bookverse.dto.book;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class BookCreateDto {
    @NotBlank(message = "Book name cannot be blank")
    private String bookName;
    @NotBlank(message = "Book author cannot be blank")
    private String authorName;
    @NotBlank(message = "Book genre cannot be blank")
    private String genre;
    @NotNull(message = "Book copies cannot be null")
    private Long totalCopies;
    public String getBookName() {
        return bookName;
    }
    public String getAuthorName() {
        return authorName;
    }
    public String getGenre() {
        return genre;
    }
    public Long getTotalCopies() {
        return totalCopies;
    }
}
