import { inject } from "@angular/core";
import { GuardResult, MaybeAsync, Router } from "@angular/router";
import { AuthService } from "../services/auth/auth.service";
import { map } from "rxjs";
import { COMMON_ROUTES } from "../../constants/routes/common";

export const isUnauthenticatedGuard = (): MaybeAsync<GuardResult> => {
    const authService = inject(AuthService);
    const router = inject(Router);
    
    return authService.isAuthenticated().pipe(
        map((isAuthenticated) => {
            if (!isAuthenticated) {
                return true;
            }

            return router.createUrlTree([`/${COMMON_ROUTES.home}`]);
        })
    );
}