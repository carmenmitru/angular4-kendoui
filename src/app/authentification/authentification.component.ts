import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.css'],
  providers: [AngularFireAuth]
})
export class AuthentificationComponent implements OnInit {

  constructor(public afAuth: AngularFireAuth,private router: Router) { }

  ngOnInit() {
  }
  signWithGoogle(){
    this.router.navigate(['home']);
    // this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then((data) => {
     
    // })
  }
  logout() {
    this.afAuth.auth.signOut();
  }
}
