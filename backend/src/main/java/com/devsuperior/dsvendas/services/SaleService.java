package com.devsuperior.dsvendas.services;

import com.devsuperior.dsvendas.dto.SaleDTO;
import com.devsuperior.dsvendas.entities.Sale;
import com.devsuperior.dsvendas.repositories.ISaleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class SaleService {

    @Autowired
    private ISaleRepository repository;

    @Transactional(readOnly = true)
    public Page<SaleDTO> listAll(Pageable pageable) {
        Page<Sale> result = repository.findAll(pageable);
        return result.map(sale -> new SaleDTO(sale));
    }
}
