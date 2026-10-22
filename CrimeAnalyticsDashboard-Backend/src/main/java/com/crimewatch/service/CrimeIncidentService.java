package com.crimewatch.service;

import com.crimewatch.exception.ResourceNotFoundException;
import com.crimewatch.model.CrimeIncident;
import com.crimewatch.repository.CrimeIncidentRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Locale;
import java.util.stream.Collectors;

@Service
public class CrimeIncidentService {

    private final CrimeIncidentRepository repository;

    public CrimeIncidentService(CrimeIncidentRepository repository) {
        this.repository = repository;
    }

    public List<CrimeIncident> getAllIncidents(String search, String category, String status, String area, String priority) {
        List<CrimeIncident> all = repository.findAll();

        return all.stream()
                .filter(c -> {
                    if (search != null && !search.trim().isEmpty()) {
                        String query = search.trim().toLowerCase();
                        String combined = String.join(" ",
                                c.getId() != null ? c.getId() : "",
                                c.getType() != null ? c.getType() : "",
                                c.getCategory() != null ? c.getCategory() : "",
                                c.getArea() != null ? c.getArea() : "",
                                c.getAddress() != null ? c.getAddress() : "",
                                c.getOfficer() != null ? c.getOfficer() : "",
                                c.getDescription() != null ? c.getDescription() : "",
                                c.getStatus() != null ? c.getStatus() : ""
                        ).toLowerCase();
                        if (!combined.contains(query)) {
                            return false;
                        }
                    }

                    if (category != null && !category.trim().isEmpty() && !category.equalsIgnoreCase("All categories")) {
                        if (c.getCategory() == null || !c.getCategory().equalsIgnoreCase(category.trim())) {
                            return false;
                        }
                    }

                    if (status != null && !status.trim().isEmpty() && !status.equalsIgnoreCase("All statuses")) {
                        if (c.getStatus() == null || !c.getStatus().equalsIgnoreCase(status.trim())) {
                            return false;
                        }
                    }

                    if (area != null && !area.trim().isEmpty() && !area.equalsIgnoreCase("All areas")) {
                        if (c.getArea() == null || !c.getArea().equalsIgnoreCase(area.trim())) {
                            return false;
                        }
                    }

                    if (priority != null && !priority.trim().isEmpty() && !priority.equalsIgnoreCase("All priorities")) {
                        if (c.getLevel() == null || !c.getLevel().equalsIgnoreCase(priority.trim())) {
                            return false;
                        }
                    }

                    return true;
                })
                .collect(Collectors.toList());
    }

    public CrimeIncident getIncidentById(String id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Incident not found with ID: " + id));
    }

    public CrimeIncident createIncident(CrimeIncident incident) {
        LocalDateTime now = LocalDateTime.now();

        if (incident.getDate() == null || incident.getDate().trim().isEmpty()) {
            DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("MMM dd, yyyy", Locale.ENGLISH);
            incident.setDate(now.format(dateFormatter));
        }

        if (incident.getTime() == null || incident.getTime().trim().isEmpty()) {
            DateTimeFormatter timeFormatter = DateTimeFormatter.ofPattern("hh:mm a", Locale.ENGLISH);
            incident.setTime(now.format(timeFormatter));
        }

        if (incident.getStatus() == null || incident.getStatus().trim().isEmpty()) {
            incident.setStatus("Under review");
        }

        if (incident.getLevel() == null || incident.getLevel().trim().isEmpty()) {
            incident.setLevel("Medium");
        }

        if (incident.getOfficer() == null || incident.getOfficer().trim().isEmpty()) {
            incident.setOfficer("Dispatch Duty Desk");
        }

        return repository.save(incident);
    }

    public CrimeIncident updateIncidentStatus(String id, String status) {
        CrimeIncident existing = getIncidentById(id);
        existing.setStatus(status);
        return repository.save(existing);
    }

    public void deleteIncident(String id) {
        if (!repository.existsById(id)) {
            throw new ResourceNotFoundException("Cannot delete incident. No record found with ID: " + id);
        }
        repository.deleteById(id);
    }
}
