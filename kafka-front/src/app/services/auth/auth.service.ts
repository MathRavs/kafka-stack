import { inject, Injectable } from "@angular/core";
import { OidcSecurityService } from "angular-auth-oidc-client";
import { filter, map, shareReplay } from "rxjs";
import { toSignal } from "@angular/core/rxjs-interop";
import { authConfig, authDomain } from "../../auth/auth.config";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private readonly oidcSecurityService = inject(OidcSecurityService);
    private readonly currentUser$ = this.oidcSecurityService.userData$.pipe(
        filter(Boolean),
        map((user) => user.userData)
    );

    readonly currentUser$$ = toSignal(this.currentUser$);

    private readonly _isAuthenticated$ = this.oidcSecurityService.isAuthenticated().pipe(
        shareReplay(1)
    );

    isAuthenticated() {
        return this._isAuthenticated$;
    }

    login() {
        this.oidcSecurityService.authorize();
    }

    logout() {
      
        const logoutUrl = `${authDomain}/logout?client_id=${authConfig.config.clientId}&logout_uri=${encodeURIComponent(authConfig.config.postLogoutRedirectUri)}`;
      
        sessionStorage.clear();
        localStorage.clear();
      
        // Force logout without bouncing through login
        window.location.href = logoutUrl;
    }
}