import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AuthModule, LogLevel, StsConfigHttpLoader, StsConfigLoader } from 'angular-auth-oidc-client';
import { map } from 'rxjs';

export const httpLoaderFactory = (httpClient: HttpClient) => {
    const config$ = httpClient.get<any>(`/assets/oauth-config.json`).pipe(
      map((customConfig: any) => {
        return {
          authority: customConfig.authority,
          redirectUrl: customConfig.redirect_url,
          clientId: customConfig.client_id,
          responseType: customConfig.response_type,
          scope: customConfig.scope,
          postLogoutRedirectUri: customConfig.post_logout_redirect_uri,
          startCheckSession: customConfig.start_checksession,
          silentRenew: customConfig.silent_renew,
          silentRenewUrl: customConfig.redirect_url + '/silent-renew.html',
          postLoginRoute: customConfig.startup_route,
          forbiddenRoute: customConfig.forbidden_route,
          unauthorizedRoute: customConfig.unauthorized_route,
          logLevel: LogLevel.Debug,
          maxIdTokenIatOffsetAllowedInSeconds: customConfig.max_id_token_iat_offset_allowed_in_seconds,
          historyCleanupOff: true,
          // autoUserInfo: false,
        };
      })
    );
  
    return new StsConfigHttpLoader(config$);
  };

// authority: 'https://rgk.us.auth0.com',
// postLoginRoute: '/home',
// unauthorizedRoute: '/unauthorized',
// forbiddenRoute: '/forbidden',
// redirectUrl: `${window.location.origin}/callback`,
// postLogoutRedirectUri: window.location.origin,
// clientId: 'Wt2SzaXfSN38jAEoAoffmmPhpBq2InIL',
// scope: 'openid profile', // 'openid profile offline_access ' + your scopes
// responseType: 'code',
// silentRenew: true,
// useRefreshToken: true,
// renewTimeBeforeTokenExpiresInSeconds: 30,

@NgModule({
    imports: [
        AuthModule.forRoot({
            loader: {
              provide: StsConfigLoader,
              useFactory: httpLoaderFactory,
              deps: [HttpClient],
            },
          }),
    ],
    exports: [AuthModule],
})
export class AuthConfigModule {}
