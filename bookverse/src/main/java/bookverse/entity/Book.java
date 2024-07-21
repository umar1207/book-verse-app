package bookverse.entity;

import jakarta.persistence.*;

import java.util.Set;

@Entity
public class Book {
   @Id
   @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bookId;

   @Column(nullable = false, unique = true)
   private String bookName;

   @Column(nullable = false)
   private String authorName;

   @Column(nullable = false)
   private String genre;

   @Column(nullable = false)
   private Long totalCopies;

   @Column(nullable = false)
   private Long availableCopies;

   @Column(nullable = false)
   private Boolean isActive;

   @OneToMany(mappedBy = "book")
   Set<IssueRecord> issueRecords;

   public Book(){};

    public Book(String bookName, String authorName, String genre, Long totalCopies) {
        this.bookName = bookName;
        this.authorName = authorName;
        this.genre = genre;
        this.totalCopies = totalCopies;
        this.availableCopies = totalCopies; // initially total = available
        this.isActive = Boolean.TRUE;
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

    public Long getTotalCopies() {
        return totalCopies;
    }

    public void setTotalCopies(Long totalCopies) {
        this.totalCopies = totalCopies;
    }

    public Long getAvailableCopies() {
        return availableCopies;
    }

    public void setAvailableCopies(Long availableCopies) {
        this.availableCopies = availableCopies;
    }

    public Boolean getActive() {
        return isActive;
    }

    public void setActive(Boolean active) {
        isActive = active;
    }

    public Set<IssueRecord> getIssueRecords() {
        return issueRecords;
    }

    public void setIssueRecords(Set<IssueRecord> issueRecords) {
        this.issueRecords = issueRecords;
    }
}
