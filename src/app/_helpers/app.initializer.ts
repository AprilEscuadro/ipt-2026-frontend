import { catchError, of } from 'rxjs';
import { Router } from '@angular/router';
import { AccountService } from '@app/_services';

export function appInitializer(accountService: AccountService) {
    return () => new Promise<void>(resolve => {
        const isResetPassword = window.location.href.includes('reset-password');
        const isVerifyEmail = window.location.href.includes('verify-email');

        if (isResetPassword || isVerifyEmail) {
            resolve();
            return;
        }

        accountService.refreshToken()
            .pipe(catchError(() => of(null)))
            .subscribe(() => resolve());
    });
}
