import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth-service.service';
import {Router} from "@angular/router"


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  constructor(
    public router : Router,
    public authService: AuthService
  ) { }

  ngOnInit() { }

}
