/**
 * Fix the following issues in the component :
 * * ExpressionChangedAfterItHasBeenCheckedError
 * * Spot the memory leak
 * 
 */
import { Component, NgModule, Injectable, Input, AfterViewInit, ChangeDetectorRef  } from '@angular/core';
import { RouterModule, Router} from "@angular/router";
import { CommonModule } from '@angular/common';
import { BehaviorSubject } from 'rxjs';


@Injectable()
export class TestService {
    test:BehaviorSubject<string>;

    constructor() {
        this.test  = new BehaviorSubject("angular test #5");
    }

    SetTest(test:string) {
        this.test.next(test);
    }

    ngOnDestroy() {
        this.test.unsubscribe(); // unsubscribe from behaviorSubject to preent memory leak
    }
}

@Component({
    selector : 'ng-app',
    template : `
                <h2>Current test is:</h2>
                {{test}}
                <br/>
                <child [skip-current]="true"></child>
                `,
    styles : []
})
export class MainComponent implements AfterViewInit {
    test:string = null;

    constructor(private _srv:TestService, private cdRef: ChangeDetectorRef) {

    }

    ngOnInit() {
         // added the ngAfterViewInit lifecycle and change detection to force angular to detect changes and include the changes in the digest cycle
       
    }

    ngAfterViewInit() {
        this._srv.test.subscribe(test=>{
            this.test = test;
        });
        this.cdRef.detectChanges();
    }
}

@Component({
    selector : 'child',
    template : `Sample Child component<br/> <button (click)="Next()">next test</button>`
    
})
export class TextChildComponent {
    
    @Input('skip-current') skip = false;

    constructor(private _srv:TestService, private _router:Router ) {

    }

    Next() {
        this._router.navigate(["test-six"]);
    }

    ngAfterViewInit() {
        if(this.skip) this._srv.SetTest("angular test #6");
    }

}

@NgModule({
    imports : [
        CommonModule,
        RouterModule.forChild([
            {
                path : "",
                component : MainComponent
            }
        ])
    ],
    declarations : [MainComponent,TextChildComponent],
    providers : [TestService]
})
export class MainModule {};