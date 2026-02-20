package com.bubble_breath.admin_service.common;

import com.bubble_breath.admin_service.enums.Deleted;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.util.Date;

@MappedSuperclass
@Data
@EntityListeners(AuditingEntityListener.class)
public class BaseEntity {

    @CreatedBy
    @Column(name = "created_by", length = 50, nullable = false, updatable = false)
    private String createdBy;

    @Column(name = "created_date_time", nullable = false, updatable = false)
    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdDateTime;

    @LastModifiedBy
    @Column(name = "modified_by", length = 50, nullable = false)
    private String modifiedBy;

    @Column(name = "modified_date_time", nullable = false)
    @UpdateTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    private Date modifiedDateTime;

    @Column(name = "is_deleted", nullable = false)
    private Deleted isDeleted = Deleted.NO;

}
