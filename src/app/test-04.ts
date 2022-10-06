/**
 * Add 2 input forms in the following component for first name and last name. Once both forms are filled out by the user, and user has clicked out of the fields, then beside it a username should be automatically generated which should be in the following format: [firstname]_[lastname]_[random integer]
 * First name and last name should be lowercased, and then a random integer between 1 and 9 should be added to the end
 * For example: if the inputs are "John" and "DOE" the generated username could be "john_doe_4" or "john_doe_2"
 */
import { Component, NgModule  } from '@angular/core';
import { RouterModule} from "@angular/router";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector : 'ng-app',
    template : `
                <div style="padding: 20%;">
                    <h2>Enter your first and last name</h2>
                    <div style="padding-top: 5px;">
                        <label for="firstName">First Name</label>
                        <input type="text" id="firstName" name="firstName" [(ngModel)]="firstName" />
                    </div>
                    <div style="padding-top: 5px;">
                        <label for="firstName">Last Name</label>
                        <input type="text" id="lastName" name="lastName" [(ngModel)]="lastName" />
                    </div>
                    <div style="color: red; padding-top: 5px;" *ngIf="error">
                        Please fill the form completely
                    </div>
                    <button (click)="createUsername()" style="padding-top: 5px;">Submit</button>
                    <div *ngIf="userName !== ''" style="padding-top: 5px;">
                        Your username is <span style="text-decoration: italics;">{{userName}}</span>
                    </div>
                </div>
                `,
    styles : []
})
export class UserNameComponent {
    firstName = '';
    lastName = '';
    userName = '';
    error = false;

    createUsername(): void {
        console.log(this.firstName, this.lastName);
        if (this.firstName === '' || this.lastName === '') {
          this.error = true;
          this.userName = '';
        } else {
          this.error = false;
          const num = Math.floor(Math.random() * 9) + 1;
          this.userName = `${this.firstName.toLowerCase()}_${this.lastName.toLowerCase()}_${num}`;
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
                component : UserNameComponent
            }
        ])
    ],
    declarations : [UserNameComponent]
})
export class UserNameModule {};