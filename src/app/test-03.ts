/**
 * Update the following components to meet the requirements : 
 * 
 * * Bind [email] property to input[name="email"]
 * * Bind [password] property to input[name="password"]
 * 
 * Without using angular forms, validate both fields so that :
 * * email is in correct format ( ex: ends with @a.com)
 * * password contains at least one special character, one upper case character, one lower case character, one number and a minium of 8 characters in length
 * * The fields should be validated when trying to submit the form
 * * Prevent the form from doing an actual form submit and instead, after validation pass, turn on the [logged_in] flag
 * 
 * You can add error messages below each field that shows if the field is not valid
 */
import { Component, NgModule  } from '@angular/core';
import { RouterModule } from "@angular/router";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector : 'ng-app',
    template : `<form (ngSubmit)="handleFormSubmit($event)" style="padding: 20%;">
                    <h2>Login</h2>
                    <br/>
                    <div> 
                        <input type="email" value="" id="email" [(ngModel)]="email" name="email" />
                    </div>
                    <div *ngIf="emailErrorMsg !== ''" style="padding-top: 5px;">
                        {{emailErrorMsg}}
                    </div>
                    <br/>
                    <div style="padding-top: 5px;"> 
                        <input type="password" value="" id="password" [(ngModel)]="password" name="password" />
                    </div>
                    <div *ngIf="passwordErrorMsg !== ''" style="padding-top: 5px;">
                        {{passwordErrorMsg}}
                    </div>
                    <div style="padding-top: 10px;">
                        <button type="submit">Submit</button>
                    </div>
                   
                    <br/><br/>
                    <div *ngIf="logged_in">Logged In!</div>
                </form>`
})
export class Test03Component {

    email:string = "";
    password:string = "";
    emailErrorMsg = '';
    passwordErrorMsg = "";
    logged_in = false;
    emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;

    handleFormSubmit(event: any): void {
        event.preventDefault();
        const isEmailValid = this.emailRegex.test(this.email.toLowerCase());
        const isPasswordValid = this.passwordRegex.test(this.password);
        if (!isEmailValid && !isPasswordValid) {
          this.emailErrorMsg = `${this.email} not in correct format`;
          this.logged_in = false;
          this.passwordErrorMsg = `password should be 8 characters long, have atleast 1 uppercase character, lowercase character, number and special character`;
        } else if (!isEmailValid) {
          this.emailErrorMsg = `${this.email} not in correct format`;
          this.passwordErrorMsg = '';
          this.logged_in = false;
        } else if (!isPasswordValid) {
          this.passwordErrorMsg = `password should be 8 characters long, have atleast 1 uppercase character, lowercase character, number and special character`;
          this.emailErrorMsg = '';
          this.logged_in = false;
        } else {
          this.passwordErrorMsg = '';
          this.emailErrorMsg = '';
          this.logged_in = true;
        }
      }
}

@NgModule({
    imports : [
        CommonModule,
        FormsModule,
        RouterModule.forChild([
            {
                path : "",
                component : Test03Component
            }
        ])
    ],
    declarations : [Test03Component]
})
export class Test03Module {};