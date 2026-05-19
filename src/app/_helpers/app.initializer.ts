import { catchError, of } from 'rxjs';
import { Router } from '@angular/router';
import { AccountService } from '@app/_services';

export function appInitializer(accountService: AccountService) {
    return () => {
        // ✅ Skip refresh token on reset-password and verify-email pages
        const isResetPassword = window.location.href.includes('reset-password');
        const isVerifyEmail = window.location.href.includes('verify-email');

        if (isResetPassword || isVerifyEmail) {
            return of();  // skip refreshToken entirely on these pages
        }

        return accountService.refreshToken()
            .pipe(
                catchError(() => of())
            );
    };
}