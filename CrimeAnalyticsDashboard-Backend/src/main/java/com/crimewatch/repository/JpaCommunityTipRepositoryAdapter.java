
package com.crimewatch.repository;

import com.crimewatch.model.CommunityTip;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicInteger;

@Repository
public class JpaCommunityTipRepositoryAdapter
        implements CommunityTipRepository {

    private final CommunityTipJpaRepository jpaRepository;
    private final AtomicInteger idCounter = new AtomicInteger(1003);

    public JpaCommunityTipRepositoryAdapter(
            CommunityTipJpaRepository jpaRepository) {
        this.jpaRepository = jpaRepository;
    }

    @Override
    public List<CommunityTip> findAll() {
        List<CommunityTip> tips = jpaRepository.findAll();
        tips.sort((a, b) -> b.getId().compareTo(a.getId()));
        return tips;
    }

    @Override
    public Optional<CommunityTip> findById(String id) {
        if (id == null) {
            return Optional.empty();
        }
        return jpaRepository.findById(id.trim().toUpperCase());
    }

    @Override
    public CommunityTip save(CommunityTip tip) {
        if (tip.getId() == null || tip.getId().trim().isEmpty()) {
            String nextId;
            do {
                nextId = "TIP-" + idCounter.getAndIncrement();
            } while (jpaRepository.existsById(nextId));
            tip.setId(nextId);
        } else {
            tip.setId(tip.getId().trim().toUpperCase());
        }

        return jpaRepository.save(tip);
    }

    @Override
    public long count() {
        return jpaRepository.count();
    }
}
