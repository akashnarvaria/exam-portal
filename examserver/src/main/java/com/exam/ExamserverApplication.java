package com.exam;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.exam.helper.UserFoundException;
import com.exam.model.Role;
import com.exam.model.User;
import com.exam.model.UserRole;
import com.exam.service.UserService;

@SpringBootApplication
public class ExamserverApplication implements CommandLineRunner{
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private BCryptPasswordEncoder bcryptPasswordEncoder;

	public static void main(String[] args) {
		SpringApplication.run(ExamserverApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		// TODO Auto-generated method stub
		System.out.println("starting code..");
		
		/*
		 * try {
		 * 
		 * User user = new User();
		 * 
		 * user.setFirstName("Akash"); user.setLastName("Narvaria");
		 * user.setUsername("akash360");
		 * user.setPassword(this.bcryptPasswordEncoder.encode("123456"));
		 * user.setEmail("akashnarvaria@gmail.com"); user.setProfile("default.png");
		 * 
		 * Role role=new Role(); role.setRoleId(44L); role.setRoleName("ADMIN");
		 * 
		 * Set<UserRole> userRoleSet=new HashSet<>(); UserRole userRole=new UserRole();
		 * userRole.setRole(role); userRole.setUser(user);
		 * 
		 * userRoleSet.add(userRole);
		 * 
		 * 
		 * User user1 = this.userService.createUser(user, userRoleSet);
		 * System.out.println(user1.getUsername()); }catch(UserFoundException e){
		 * e.printStackTrace(); }
		 */
		 		
	}

}
