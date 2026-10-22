package com.crimewatch.service;

import com.crimewatch.model.CommunityTip;
import com.crimewatch.repository.CommunityTipRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Locale;

/**
 * Service managing community anonymous tips logic.
 */
@Service
public class CommunityTipService {

    private final CommunityTipRepository repository;

    public CommunityTipService(CommunityTipRepository repository) {
        this.repository = repository;
    }

    public List<CommunityTip> getAllTips() {
        return repository.findAll();
    }

    public CommunityTip submitTip(CommunityTip tip) {
        LocalDateTime now = LocalDateTime.now();

        if (tip.getSubmittedAt() == null || tip.getSubmittedAt().trim().isEmpty()) {
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MMM dd, yyyy, hh:mm a", Locale.ENGLISH);
            tip.setSubmittedAt(now.format(formatter));
        }

        if (tip.getStatus() == null || tip.getStatus().trim().isEmpty()) {
            tip.setStatus("Received");
        }

        return repository.save(tip);
    }
}
