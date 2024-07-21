package bookverse.repository;

import bookverse.entity.IssueRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface IssueRecordRepository extends JpaRepository<IssueRecord, Long> {
    @Query("SELECT r FROM IssueRecord r WHERE r.user.userId = :userId AND r.book.bookId = :bookId AND r.isReturned = false")
    public IssueRecord findIssueEntry(@Param("userId") Long userId, @Param("bookId") Long bookId);

    @Query("SELECT r FROM IssueRecord r WHERE r.user.userId = :userId AND r.isReturned = false")
    public IssueRecord findUserAlreadyIssuedEntry(@Param("userId") Long userId);

}
