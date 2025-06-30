import { inject, provideAppInitializer } from "@angular/core";
import { ROUTER_INITIALIZER } from "@angular/router";
import { OidcSecurityService } from "angular-auth-oidc-client";
import { map, tap } from "rxjs";

export const authAppInitializer = () => {
    const oidcSecurityService = inject(OidcSecurityService);

    return oidcSecurityService.checkAuth();
}

export const authAppInitializerProvider = provideAppInitializer(authAppInitializer);