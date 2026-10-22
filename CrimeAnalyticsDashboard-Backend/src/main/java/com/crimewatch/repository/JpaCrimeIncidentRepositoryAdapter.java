
package com.crimewatch.repository;

import com.crimewatch.model.CrimeIncident;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicInteger;

@Repository
public class JpaCrimeIncidentRepositoryAdapter
        implements CrimeIncidentRepository {

    private final CrimeIncidentJpaRepository jpaRepository;
    private final AtomicInteger idCounter = new AtomicInteger(2482);

    public JpaCrimeIncidentRepositoryAdapter(
            CrimeIncidentJpaRepository jpaRepository) {
        this.jpaRepository = jpaRepository;
    }

    @Override
    public List<CrimeIncident> findAll() {
        List<CrimeIncident> incidents = jpaRepository.findAll();
        incidents.sort((a, b) -> b.getId().compareTo(a.getId()));
        return incidents;
    }

    @Override
    public Optional<CrimeIncident> findById(String id) {
        if (id == null) {
            return Optional.empty();
        }
        return jpaRepository.findById(id.trim().toUpperCase());
    }

    @Override
    public CrimeIncident save(CrimeIncident incident) {
        if (incident.getId() == null
                || incident.getId().trim().isEmpty()) {
            String nextId;
            do {
                nextId = "CR-" + idCounter.getAndIncrement();
            } while (jpaRepository.existsById(nextId));
            incident.setId(nextId);
        } else {
            incident.setId(incident.getId().trim().toUpperCase());
        }

        return jpaRepository.save(incident);
    }

    @Override
    public boolean deleteById(String id) {
        if (id == null) {
            return false;
        }

        String formattedId = id.trim().toUpperCase();

        if (!jpaRepository.existsById(formattedId)) {
            return false;
        }

        jpaRepository.deleteById(formattedId);
        return true;
    }

    @Override
    public boolean existsById(String id) {
        return id != null
                && jpaRepository.existsById(id.trim().toUpperCase());
    }
}
