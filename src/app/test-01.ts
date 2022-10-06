/**
 * In the following component, update the code so that when the value of the [loan-amount] is changed:
 * * If it's blank or 0, the values of [monthly_payment] and [late_payment] becomes "N/A",
 * * If it has a value, the value of [monthly_payment] becomes 2% of [loan-ammount] and the value of [late_payment] becomes 5% of [monthly_payment].
 * * Both [monthly_payment] and [late_payment] should print in the template in currency format : $1,234
 */

import { Component, Input, NgModule  } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from "@angular/router";
import { CurrencyPipe } from '@angular/common';
import { CommonModule } from '@angular/common';  

@Component({
    selector : 'ng-app',
    providers: [ CurrencyPipe ],
    template : `<div style="padding: 20%;">
                    <h2>Loan Details</h2>
                    <div>
                        <label for="amount" style="padding-bottom: 10px;">Please enter your loan amount: </label><br/>
                        <input type="text" name="amount" id="amount" style="width: 200px;" [(ngModel)]="loan_amount"
                            (keyup)="calculatePayment()" class="form-control"/>
                        <div style="padding-top: 10px;">
                            <!-- test blocks uses of currency pipe hence this hack  -->
                            <b> Monthly Payment: </b>
                            <span *ngIf="monthly_payment !== -1">{{currency.transform(monthly_payment)}}</span>
                            <span *ngIf="monthly_payment === -1">NA</span>
                        </div>
                        <div>
                            <b>Late Payment Fee: </b>
                            <span *ngIf="late_payment !== -1">{{currency.transform(late_payment)}} </span>
                            <span *ngIf="late_payment === -1">NA</span>
                        </div>
                    </div>
                </div>`
})
export class Test01Component {
    constructor(public currency: CurrencyPipe) {}
    loan_amount:number = 1000;
    monthly_payment:number = 200;
    late_payment = 10;

    calculatePayment(): void {
        if (this.loan_amount && this.loan_amount > 0) {
          this.monthly_payment = 0.02 * this.loan_amount;
          this.late_payment = 0.05 * this.monthly_payment;
        } else {
          this.monthly_payment = -1;
          this.late_payment = -1;
        }
    }
}

@NgModule({
    imports : [
        FormsModule,
        CommonModule,
        RouterModule.forChild([
            {
                path : "",
                component : Test01Component
            }
        ])
    ],
    declarations : [Test01Component]
})
export class Test01Module {}