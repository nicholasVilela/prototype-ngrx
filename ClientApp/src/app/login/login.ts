import { Component } from '@angular/core';
import firebase from 'firebase'

@Component({
  selector: 'login',
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
    firebaseConfig = {
        apiKey: "AIzaSyBzKYVYbQaqPh2snNXDoUXU4b70VkfPFs4",
        authDomain: "prototype-ngrx.firebaseapp.com",
        databaseURL: "https://prototype-ngrx.firebaseio.com",
        projectId: "prototype-ngrx",
        storageBucket: "",
        messagingSenderId: "938007788501",
        appId: "1:938007788501:web:13ab8988ba70e921bbdb5c"
      };

    app = firebase.initializeApp(firebaseConfig);
}
