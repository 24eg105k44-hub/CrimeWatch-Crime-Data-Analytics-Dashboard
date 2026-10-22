package com.crimewatch.controller;

import com.crimewatch.dto.StatusUpdateRequest;
import com.crimewatch.model.CrimeIncident;
import com.crimewatch.service.CrimeIncidentService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/incidents")
public class CrimeIncidentController {

    private final CrimeIncidentService service;

    public CrimeIncidentController(CrimeIncidentService service) {
        this.service = service;
    }

    /**
     * 1. GET /api/incidents
     * List all crime incidents with optional query filters.
     */
    @GetMapping
    public ResponseEntity<List<CrimeIncident>> getAllIncidents(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String area,
            @RequestParam(required = false) String priority
    ) {
        List<CrimeIncident> incidents = service.getAllIncidents(search, category, status, area, priority);
        return ResponseEntity.ok(incidents);
    }

    /**
     * 2. GET /api/incidents/{id}
     * Retrieve a single incident by its ID.
     */
    @GetMapping("/{id}")
    public ResponseEntity<CrimeIncident> getIncidentById(@PathVariable String id) {
        CrimeIncident incident = service.getIncidentById(id);
        return ResponseEntity.ok(incident);
    }

    /**
     * 3. POST /api/incidents
     * Log and create a new crime incident.
     */
    @PostMapping
    public ResponseEntity<CrimeIncident> createIncident(@Valid @RequestBody CrimeIncident incident) {
        CrimeIncident created = service.createIncident(incident);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    /**
     * 4. PATCH /api/incidents/{id}/status
     * Update the investigation status of an incident.
     */
    @PatchMapping("/{id}/status")
    public ResponseEntity<CrimeIncident> updateIncidentStatus(
            @PathVariable String id,
            @Valid @RequestBody StatusUpdateRequest request
    ) {
        CrimeIncident updated = service.updateIncidentStatus(id, request.getStatus());
        return ResponseEntity.ok(updated);
    }

    /**
     * 5. DELETE /api/incidents/{id}
     * Remove an incident record from the system.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Object>> deleteIncident(@PathVariable String id) {
        service.deleteIncident(id);
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "Incident " + id + " has been successfully deleted.");
        return ResponseEntity.ok(response);
    }
}
