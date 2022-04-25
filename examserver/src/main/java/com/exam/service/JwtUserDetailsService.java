package com.exam.service;

	import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.exam.model.User;
import com.exam.repo.UserRepository;



@Service
public class JwtUserDetailsService implements UserDetailsService {
	
	@Autowired
	private UserRepository userRepository;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		
		final User user=this.userRepository.findByUsername(username);
		
		if(user==null) {
			throw new UsernameNotFoundException("User not found !!");
		}else {
			return user;
		}
	}

}