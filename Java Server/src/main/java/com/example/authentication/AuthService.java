package com.example.authentication;

import java.io.UnsupportedEncodingException;
import java.util.Base64;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;



@RestController
@CrossOrigin(origins = "*", allowCredentials = "true", allowedHeaders = "*")
public class AuthService {

	@GetMapping("/api/")
	public String helloWorld() {
		return "Hello World";
	}
	
	@GetMapping("api/authenticate")
	public String authenticate() throws UnsupportedEncodingException{
		String client_id = "612a767295fa48b5adfe8504e8802210"; // Your client id
		String client_secret = "b2dfa571dba54590b1a0b648f10d4ca7"; // Your secret
		String key = Base64.getEncoder().encodeToString((client_id+":"+client_secret).getBytes("utf-8"));
		String url = "https://accounts.spotify.com/api/token";

		RestTemplate restTemplate = new RestTemplate();

		HttpHeaders headers = new HttpHeaders();

		headers.add("Authorization", "Basic "+key);
		headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
		
		MultiValueMap<String, String> map = new LinkedMultiValueMap<String, String>();
		map.add("grant_type", "client_credentials");
		final HttpEntity<MultiValueMap<String, String>> entity = new HttpEntity<MultiValueMap<String, String>>(map, headers);
		

		restTemplate.getMessageConverters().add(new MappingJackson2HttpMessageConverter());
		

		ResponseEntity<String> token = restTemplate.exchange(url, HttpMethod.POST, entity, String.class );
		
				
		return token.getBody();
	}
}