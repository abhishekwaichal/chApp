import { Component, OnInit } from '@angular/core';
import { ValidateService} from '../../services/validate.service';
import { AuthService} from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name: String;
  username: String;
  email: String;
  password: String;

  constructor(private validateService: ValidateService,
              private flashMessageService: FlashMessagesService,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
  }

  onRegisterSubmit(){

    // const variable is required to hold incoming object
    const user = {
      name: this.name,
      username: this.username,
      password: this.password,
      email: this.email
    };

    // Validate for empty fields
    if( !this.validateService.validateRegister(user) ){
      this.flashMessageService.show('Registration validation failed: Please enter values for all fields.',
                        { cssClass:'alert-danger', timeout: 3000 } );
      return false;
    }

    // Validate email correctness
    if( !this.validateService.validateEmail(user.email) ){
      this.flashMessageService.show ('Email validation failed: Please enter a valid email.',
                        { cssClass:'alert-danger', timeout: 3000 });
      return false;
    }

    //Auth
    this.authService.registerUser(user).subscribe( data => {

      if(data.success){
        this.flashMessageService.show ('You are now registered, and you can login if you wish.',
                          { cssClass:'alert-success', timeout: 3000 });
        this.router.navigate(['/login']);
      }else{
        this.flashMessageService.show ('User Registration failed.',
                          { cssClass:'alert-danger', timeout: 3000 });
        this.router.navigate(['/register']);
      }

    });

  }

}
