package bookverse.dto.issuerecord;

import java.time.LocalDate;

public class IssueRecordReadDto {
    private Long issueId;
    private Long userId;
    private String userName;
    private Long bookId;
    private String bookName;
    private LocalDate issueDate;
    private LocalDate returnDate;
    private Boolean isReturned;

    public IssueRecordReadDto() {}

    public IssueRecordReadDto(Long issueId, Long userId, String userName, Long bookId, String bookName, LocalDate issueDate, LocalDate returnDate, Boolean isReturned) {
        this.issueId = issueId;
        this.userId = userId;
        this.bookId = bookId;
        this.userName = userName;
        this.bookName = bookName;
        this.issueDate = issueDate;
        this.returnDate = returnDate;
        this.isReturned = isReturned;
    }

    public Long getIssueId() {
        return issueId;
    }

    public void setIssueId(Long issueId) {
        this.issueId = issueId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getBookId() {
        return bookId;
    }

    public void setBookId(Long bookId) {
        this.bookId = bookId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getBookName() {
        return bookName;
    }

    public void setBookName(String bookName) {
        this.bookName = bookName;
    }

    public LocalDate getIssueDate() {
        return issueDate;
    }

    public void setIssueDate(LocalDate issueDate) {
        this.issueDate = issueDate;
    }

    public LocalDate getReturnDate() {
        return returnDate;
    }

    public void setReturnDate(LocalDate returnDate) {
        this.returnDate = returnDate;
    }

    public Boolean getReturned() {
        return isReturned;
    }

    public void setReturned(Boolean returned) {
        isReturned = returned;
    }
}
