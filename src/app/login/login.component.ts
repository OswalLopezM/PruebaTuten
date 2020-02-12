import { Component, OnInit } from '@angular/core';
import { LoginService } from './../services/login.service';
import { AlertService } from './../services/alert.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;


  constructor(private loginService: LoginService,
    private router: Router, 
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private alertService: AlertService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.loginService.logout();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
  }

  get f() { return this.loginForm.controls; }
  

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }

    this.loading = true;
    this.loginService.login(this.f.email.value, this.f.password.value)
        .pipe(first())
        .subscribe(
            data => {
              this.router.navigate([this.returnUrl]);
            },
            err => {
              this.alertService.error(err);
              this.loading = false;
            });
  }

  navigate() {
    this.router.navigateByUrl('/home');
  }

}
