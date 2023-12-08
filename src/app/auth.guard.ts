import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthServiceService } from './auth-service.service';

export const authGuard: CanActivateFn = (route, state): any => {
    const routs=inject(Router)
    const service=inject(AuthServiceService)
   const data=sessionStorage.getItem('present');
   if(data=='true'){
    return true;
   }
   else{
    routs.navigate(['/login'])
   }
};
