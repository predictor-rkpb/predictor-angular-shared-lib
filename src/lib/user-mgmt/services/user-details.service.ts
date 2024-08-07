import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakConfig, KeycloakTokenParsed } from 'keycloak-js';

@Injectable({
  providedIn: 'root'
})
export class UserDetailsService {
  tokenParsed: KeycloakTokenParsed | undefined;
  group: string | undefined

  constructor(private keycloak: KeycloakService) { 
  }

  async init(config: KeycloakConfig) {
    await this.keycloak.init({
      config: config,
      initOptions: {
        onLoad: 'login-required',
        checkLoginIframe: false,
      }
    })
  }

  async getUserGroup() : Promise<string | undefined> {
    if (this.group) return this.group
    else return await this._loadUserGroupFromToken()
  }

  isLoggedIn() : boolean {
    return this.keycloak.isLoggedIn()
  }

  getUserPicture() : string | undefined
  {
    return this.tokenParsed ? this.tokenParsed['picture'] : ''
  }

  async _loadUserGroupFromToken() : Promise<string | undefined> {
    if (!this.tokenParsed && this.keycloak.isLoggedIn()) {
      this.tokenParsed = this.keycloak.getKeycloakInstance().tokenParsed;
      this.group = this.tokenParsed ? (this.tokenParsed['groups'] ? this.tokenParsed['groups'][0] : null) : null
      this.group = this.group?.substring(1, this.group.length)
    }

    return this.group
  }
}
