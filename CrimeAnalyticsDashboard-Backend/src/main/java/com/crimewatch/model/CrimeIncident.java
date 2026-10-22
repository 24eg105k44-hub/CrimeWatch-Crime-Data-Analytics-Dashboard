package com.crimewatch.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

@Entity
@Table(name = "crime_incidents")
public class CrimeIncident {

    @Id
@Column(length = 20)
private String id;

    @NotBlank(message = "Crime type is required")
    @Column(nullable = false)
private String type;

    @NotBlank(message = "Category is required")
   @Column(nullable = false)
private String category;

    @NotBlank(message = "Area / District is required")
    @Column(nullable = false)
private String area;

    @NotBlank(message = "Location address is required")
    @Column(nullable = false)
private String address;

    private String date;

    private String time;

    @Pattern(regexp = "^(Under review|Investigating|Resolved)$",
             message = "Status must be 'Under review', 'Investigating', or 'Resolved'")
    private String status = "Under review";

    @Pattern(regexp = "^(High|Medium|Low)$",
             message = "Priority level must be 'High', 'Medium', or 'Low'")
    private String level = "Medium";

    private String officer;

    @NotBlank(message = "Incident description is required")
    @Column(columnDefinition = "TEXT", nullable = false)
private String description;

    private String evidence;

    public CrimeIncident() {
    }

    public CrimeIncident(String id, String type, String category, String area, String address,
                         String date, String time, String status, String level,
                         String officer, String description, String evidence) {
        this.id = id;
        this.type = type;
        this.category = category;
        this.area = area;
        this.address = address;
        this.date = date;
        this.time = time;
        this.status = status;
        this.level = level;
        this.officer = officer;
        this.description = description;
        this.evidence = evidence;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getArea() {
        return area;
    }

    public void setArea(String area) {
        this.area = area;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getLevel() {
        return level;
    }

    public void setLevel(String level) {
        this.level = level;
    }

    public String getOfficer() {
        return officer;
    }

    public void setOfficer(String officer) {
        this.officer = officer;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getEvidence() {
        return evidence;
    }

    public void setEvidence(String evidence) {
        this.evidence = evidence;
    }

    @Override
    public String toString() {
        return "CrimeIncident{" +
                "id='" + id + '\'' +
                ", type='" + type + '\'' +
                ", category='" + category + '\'' +
                ", area='" + area + '\'' +
                ", status='" + status + '\'' +
                ", level='" + level + '\'' +
                '}';
    }
}
