package com.crimewatch.model;

import jakarta.validation.constraints.NotBlank;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table; 

/**
 * Domain model representing an anonymous community safety tip.
 * Note: For local academic project demonstration only.
 */
@Entity
@Table(name = "community_tips")
public class CommunityTip {

    @Id
@Column(length = 20)
private String id;

    @NotBlank(message = "Sector / District is required")
    private String area;

    @NotBlank(message = "Concern category is required")
    private String category;

    @NotBlank(message = "Tip observations / description cannot be blank")
    private String observations;

    private String submittedAt;

    private String status = "Received";

    public CommunityTip() {
    }

    public CommunityTip(String id, String area, String category, String observations, String submittedAt, String status) {
        this.id = id;
        this.area = area;
        this.category = category;
        this.observations = observations;
        this.submittedAt = submittedAt;
        this.status = status != null ? status : "Received";
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getArea() {
        return area;
    }

    public void setArea(String area) {
        this.area = area;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getObservations() {
        return observations;
    }

    public void setObservations(String observations) {
        this.observations = observations;
    }

    /**
     * Alias for description so both {"observations": "..."} and {"description": "..."} payloads work seamlessly.
     */
    public String getDescription() {
        return observations;
    }

    public void setDescription(String description) {
        if (this.observations == null || this.observations.trim().isEmpty()) {
            this.observations = description;
        }
    }

    public String getSubmittedAt() {
        return submittedAt;
    }

    public void setSubmittedAt(String submittedAt) {
        this.submittedAt = submittedAt;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return "CommunityTip{" +
                "id='" + id + '\'' +
                ", area='" + area + '\'' +
                ", category='" + category + '\'' +
                ", submittedAt='" + submittedAt + '\'' +
                ", status='" + status + '\'' +
                '}';
    }
}
