/**
 * Update the following components to meet the requirements : 
 * * Bind `field` of [textfield] component to its text input
 * * Pass value of `field` from [textfield] component to [title] property of component [ng-app]
 */
import { Component, NgModule , EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from "@angular/router";
import { CommonModule } from '@angular/common';

@Component({
    selector : 'textfield',
    template : `<div> 
                    <input type="text" value="" [(ngModel)]="fieldValue" (keyup)="changeField.emit(fieldValue)" />
                </div>`
})
export class TextField {
    @Input() fieldValue = '';
    @Output() changeField = new EventEmitter();
}

@Component({
    selector : 'child-component',
    template : `<h2>Title:<h2><br/><textfield field="" (changeField)="handleChangeFieldValue($event)"></textfield>`
})
export class ChildComponent {
    @Output() changeFieldValue = new EventEmitter();
    handleChangeFieldValue(value: string): void {
        this.changeFieldValue.emit(value);
    }
}


@Component({
    selector : 'ng-app',
    template : `<div style="padding: 20%;">
                    <child-component (changeFieldValue)="assignPassedValue($event)"></child-component> <br/>
                    Title is {{title}}
                </div>`
})
export class Test02Component {

    title:string = "";
    assignPassedValue(value: string): void {
        this.title = value;
    }
}

@NgModule({
    imports : [
        CommonModule,
        FormsModule,
        RouterModule.forChild([
            {
                path : "",
                component : Test02Component
            }
        ])
    ],
    declarations : [Test02Component,ChildComponent,TextField]
})

export class Test02Module {};