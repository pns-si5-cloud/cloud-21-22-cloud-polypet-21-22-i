import { Injectable, NgZone } from '@angular/core';
import { Router } from "@angular/router";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { User } from '../shared/services/user';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  userData: any; // Save logged in user data

  constructor(
    public afs: AngularFirestore,   // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone // NgZone service to remove outside scope warning
  ) {
    /* Saving user data in localstorage when
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe(async user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        var tokenUser = await firebase.auth().currentUser?.getIdToken()
        if(tokenUser){
          localStorage.setItem('token', tokenUser);
        }
      } else {
        localStorage.removeItem('user');
      }
    })
  }

  // Sign in with email/password
  SignIn(email:any, password:any) {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then((result:any) => {
        this.ngZone.run(() => {
          this.router.navigate(['dashboard']);
        });
        this.SetUserData(result.user);

      }).catch((error:any) => {
        window.alert(error.message)
      })
  }

  // Sign up with email/password
  SignUp(email:any, password:any) {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((result:any) => {
        this.ngZone.run(() => {
          this.router.navigate(['dashboard']);
        });
        this.SetUserData(result.user);

      }).catch((error:any) => {
        window.alert(error.message)
      })
  }

    /* Setting up user data when sign in with username/password,
  sign up with username/password and sign in with social auth
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetUserData(user: { uid: any; email: any; displayName: any; photoURL: any; emailVerified: any; }) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
    }
    return userRef.set(userData, {
      merge: true
    })
  }

  // Reset Forggot password
  ForgotPassword(passwordResetEmail:any) {
    return this.afAuth.sendPasswordResetEmail(passwordResetEmail)
    .then(() => {
      window.alert('Password reset email sent, check your inbox.');
    }).catch((error:any) => {
      window.alert(error)
    })
  }


  // Sign in with Google
  GoogleAuth() {
    return this.AuthLogin(new firebase.auth.GoogleAuthProvider());
  }

  // Auth logic to run auth providers
  AuthLogin(provider:any) {
    return this.afAuth.signInWithPopup(provider)
    .then((result:any) => {
      console.log(result)
       this.ngZone.run(() => {
          this.router.navigate(['dashboard']);
        })
      this.SetUserData(result.user);

    }).catch((error:any) => {
      window.alert(error)
    })
  }


  // Sign out
  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['sign-in']);
    })
  }


    get isLoggedIn(): boolean {
      let userStore:null|string = localStorage.getItem('user')
      if(userStore){
        const userParse = JSON.parse(userStore);
        return (userParse !== null);
      }
      return false;
    }

    getToken():string|null{
      firebase.auth().currentUser?.getIdToken()
      return localStorage.getItem("token")
    }

}
