package com.crimewatch.repository;

import com.crimewatch.model.CrimeIncident;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CrimeIncidentJpaRepository
        extends JpaRepository<CrimeIncident, String> {
}