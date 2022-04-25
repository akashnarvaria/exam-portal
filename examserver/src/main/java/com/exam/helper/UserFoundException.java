package com.exam.helper;

public class UserFoundException extends Exception {

	public UserFoundException() {
		super("User already present with this username !! try another one");
	}

	public UserFoundException(String message) {
		super(message);
		// TODO Auto-generated constructor stub
	}

	public UserFoundException(Throwable cause) {
		super(cause);
		// TODO Auto-generated constructor stub
	}

	public UserFoundException(String message, Throwable cause) {
		super(message, cause);
		// TODO Auto-generated constructor stub
	}

	public UserFoundException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
		super(message, cause, enableSuppression, writableStackTrace);
		// TODO Auto-generated constructor stub
	}

}
