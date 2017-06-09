import { Injectable } from '@angular/core';

@Injectable()
export class ValidateService {

  constructor() { }

  isEmptyStr(str){

   if(str == undefined || str == ""){
    return true;
   }
   return false;

  }

  validateRegister(user){

    if( this.isEmptyStr(user.name) || this.isEmptyStr(user.email) ||
      this.isEmptyStr(user.username) || this.isEmptyStr(user.password) ){
      return false;
    }

    return true;

  }

 validateEmail(email){

  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);

 }

}
