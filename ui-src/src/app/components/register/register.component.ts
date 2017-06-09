import { Component, OnInit } from '@angular/core';
import { ValidateService} from '../../services/validate.service'
import { FlashMessagesService } from 'angular2-flash-messages'

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
                        private flashMessageService: FlashMessagesService) {
  }

  ngOnInit() {
  }

  onRegisterSubmit(){

    //console.log(JSON.stringify(this));

    if( !this.validateService.validateRegister(this) ){
      this.flashMessageService.show('Registration validation failed: Please enter values for all fields.',
                        { cssClass:'alert-danger', timeout: 3000 } );
      return false;
    }

    if( !this.validateService.validateEmail(this.email) ){
      this.flashMessageService.show ('Email validation failed: Please enter a valid email.',
                        { cssClass:'alert-danger', timeout: 3000 });
      return false;
    }

  }

}
