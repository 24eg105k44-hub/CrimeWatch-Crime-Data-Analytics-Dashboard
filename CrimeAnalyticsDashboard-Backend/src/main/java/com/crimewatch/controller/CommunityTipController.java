package com.crimewatch.controller;

import com.crimewatch.model.CommunityTip;
import com.crimewatch.service.CommunityTipService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST controller for receiving and listing anonymous community tips.
 * Local demonstration only (academic project).
 */
@RestController
@RequestMapping("/api/tips")
public class CommunityTipController {

    private final CommunityTipService service;

    public CommunityTipController(CommunityTipService service) {
        this.service = service;
    }

    /**
     * POST /api/tips
     * Accept and store an anonymous community safety tip.
     */
    @PostMapping
    public ResponseEntity<CommunityTip> submitTip(@Valid @RequestBody CommunityTip tip) {
        CommunityTip saved = service.submitTip(tip);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    /**
     * GET /api/tips
     * Retrieve all submitted tips for local demonstration and inspection.
     */
    @GetMapping
    public ResponseEntity<List<CommunityTip>> getAllTips() {
        List<CommunityTip> tips = service.getAllTips();
        return ResponseEntity.ok(tips);
    }
}
