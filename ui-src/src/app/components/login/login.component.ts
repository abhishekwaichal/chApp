import { Component, OnInit } from '@angular/core';
import { ValidateService} from '../../services/validate.service';
import { AuthService} from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: String;
  password: String;

  constructor(private validateService: ValidateService,
              private flashMessageService: FlashMessagesService,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit(){
  }

  onLoginSubmit(){

    const user = {
      username: this.username,
      password: this.password
    };

    //login
    this.authService.authenticateUser(user).subscribe( data => {

      if(data.success){
      this.authService.storeUserData(data.msg, data.name);
      this.flashMessageService.show ('LOGGED IN',
                        { cssClass:'alert-success', timeout: 3000 });
      this.router.navigate(['/dashboard']);
    }else{
      this.flashMessageService.show ('Sign In Failed: Wrong username and/or password!',
                        { cssClass:'alert-danger', timeout: 3000 });
      //this.router.navigate(['/login']);
    }

    });
  }

}
