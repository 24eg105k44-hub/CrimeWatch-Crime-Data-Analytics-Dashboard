package com.crimewatch.repository;

import com.crimewatch.model.CommunityTip;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;

/**
 * Thread-safe in-memory repository for storing demonstration community tips.
 */

public class InMemoryCommunityTipRepository implements CommunityTipRepository {

    private final Map<String, CommunityTip> storage = new ConcurrentHashMap<>();
    private final AtomicInteger idCounter = new AtomicInteger(1003);

    @PostConstruct
    public void init() {
        // Pre-populate with demonstration tips consistent with CrimeWatch platform
        save(new CommunityTip(
                "TIP-1001",
                "Central District",
                "Suspicious Activity",
                "Dark sedan idling near rear commercial loading dock without lights for over an hour.",
                "Oct 17, 2026, 10:14 PM",
                "Logged for Patrol"
        ));
        save(new CommunityTip(
                "TIP-1002",
                "North Quarter",
                "Vehicle Concern",
                "Abandoned electric bicycle with damaged lock mechanism left beside transit depot entrance.",
                "Oct 18, 2026, 08:30 AM",
                "Received"
        ));
    }

    @Override
    public List<CommunityTip> findAll() {
        List<CommunityTip> list = new ArrayList<>(storage.values());
        // Sort descending by ID so latest tips appear first
        list.sort((a, b) -> b.getId().compareTo(a.getId()));
        return Collections.unmodifiableList(list);
    }

    @Override
    public Optional<CommunityTip> findById(String id) {
        if (id == null) {
            return Optional.empty();
        }
        return Optional.ofNullable(storage.get(id.trim().toUpperCase()));
    }

    @Override
    public CommunityTip save(CommunityTip tip) {
        if (tip.getId() == null || tip.getId().trim().isEmpty()) {
            String nextId;
            do {
                nextId = "TIP-" + idCounter.getAndIncrement();
            } while (storage.containsKey(nextId));
            tip.setId(nextId);
        } else {
            String formattedId = tip.getId().trim().toUpperCase();
            tip.setId(formattedId);
            if (formattedId.startsWith("TIP-")) {
                try {
                    int numericPart = Integer.parseInt(formattedId.substring(4));
                    idCounter.accumulateAndGet(numericPart + 1, Math::max);
                } catch (NumberFormatException ignored) {
                }
            }
        }
        storage.put(tip.getId(), tip);
        return tip;
    }

    @Override
    public long count() {
        return storage.size();
    }
}
