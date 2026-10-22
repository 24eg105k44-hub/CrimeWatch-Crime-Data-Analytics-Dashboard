package com.crimewatch.repository;

import com.crimewatch.model.CommunityTip;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommunityTipJpaRepository
        extends JpaRepository<CommunityTip, String> {
}