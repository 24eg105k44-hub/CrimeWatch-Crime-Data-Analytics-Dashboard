package com.crimewatch.repository;

import com.crimewatch.model.CommunityTip;

import java.util.List;
import java.util.Optional;

public interface CommunityTipRepository {

    List<CommunityTip> findAll();

    Optional<CommunityTip> findById(String id);

    CommunityTip save(CommunityTip tip);

    long count();
}
