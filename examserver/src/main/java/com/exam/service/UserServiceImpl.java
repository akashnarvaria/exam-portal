package com.exam.service;

import java.util.Iterator;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.exam.helper.UserFoundException;
import com.exam.helper.UserNotFoundException;
import com.exam.model.User;
import com.exam.model.UserRole;
import com.exam.repo.RoleRepository;
import com.exam.repo.UserRepository;

@Service
public class UserServiceImpl implements UserService{
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private RoleRepository roleRepository;

	@Override
	public User createUser(User user, Set<UserRole> userRoles) throws Exception {
		
		User local=this.userRepository.findByUsername(user.getUsername());
		
		if(local!=null) {
			System.out.println("User is already present !!");
			throw new UserFoundException("User is already present !!");
		}else {
			for (UserRole ur : userRoles) {
				roleRepository.save(ur.getRole());
			}
			
			user.getUserRoles().addAll(userRoles);
			local = this.userRepository.save(user);
		}
		
		return local;
	}

	@Override
	public User getUser(String username) {
		
		return this.userRepository.findByUsername(username);
	}

	@Override
	public void deleteUser(Long userId) {
		// TODO Auto-generated method stub
		this.userRepository.deleteById(userId);
	}

}
