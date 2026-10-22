package com.crimewatch.repository;

import com.crimewatch.model.CrimeIncident;

import java.util.List;
import java.util.Optional;

public interface CrimeIncidentRepository {

    List<CrimeIncident> findAll();

    Optional<CrimeIncident> findById(String id);

    CrimeIncident save(CrimeIncident incident);

    boolean deleteById(String id);

    boolean existsById(String id);
}
