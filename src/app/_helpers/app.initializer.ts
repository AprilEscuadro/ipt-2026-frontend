import { catchError, of } from 'rxjs';
import { Router } from '@angular/router';
import { AccountService } from '@app/_services';

export function appInitializer(accountService: AccountService) {
return () => {
        const isResetPassword = window.location.href.includes('reset-password');
        const isVerifyEmail = window.location.href.includes('verify-email');

        if (isResetPassword || isVerifyEmail) {
            return of(null);
        }

        return accountService.refreshToken()
            .pipe(catchError(() => of(null)));
    };
}