import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component,ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { LandingComponent } from './pages/landing/landing.component';
import { HeaderComponent } from './core/header/header.component';

@Component({
    selector : 'app-root',
    template : '<router-outlet></router-outlet>'
})
export class AppComponent {}


@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule,
    RouterModule.forRoot([
        {
            path : "test-one",
            loadChildren : ()=>import("./test-01").then(module=>module.Test01Module)
        },
        {
            path : "test-two",
            loadChildren : ()=>import("./test-02").then(module=>module.Test02Module)
        },
        {
            path : "test-three",
            loadChildren : ()=>import("./test-03").then(module=>module.Test03Module)
        },
        {
            path : "test-four",
            loadChildren : ()=>import("./test-04").then(module=>module.UserNameModule)
        },
        {
            path : "test-five",
            loadChildren : ()=>import("./test-05").then(module=>module.MainModule)
        },
        {
            path : "test-six",
            loadChildren : ()=>import("./test-06").then(module=>module.ReviewModule)
        },
        {
            path : "",
            pathMatch : "full",
            component: LandingComponent
        }
    ])
  ],
  bootstrap: [AppComponent],
  providers : [ { provide : ErrorHandler , useClass : ErrorHandler } ],
  exports: [
    HeaderComponent
  ],
})
export class AppModule { }
