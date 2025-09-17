package com.example.backend.repository;
import com.example.backend.model.User;
import org.springframework.data.repository.CrudRepository;
import java.util.List;

public interface UserRepository extends CrudRepository<User, String> {

    User findByAuthorizedEin(String authorizedEin);
}
