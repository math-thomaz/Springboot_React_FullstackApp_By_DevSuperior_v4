package com.devsuperior.dsvendas.services;

import com.devsuperior.dsvendas.dto.SellerDTO;
import com.devsuperior.dsvendas.entities.Seller;
import com.devsuperior.dsvendas.repositories.ISellerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class SellerService {

    @Autowired
    private ISellerRepository repository;

    public List<SellerDTO> listAll() {
        List<Seller> result = repository.findAll();
        return result.stream().map(seller -> new SellerDTO(seller)).collect(Collectors.toList());
    }
}
