import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KeycloakAngularModule } from 'keycloak-angular';
import { AuthGuard } from './guards/auth.guard';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    KeycloakAngularModule
  ],
  providers: [AuthGuard]
})
export class UserMgmtModule { }
