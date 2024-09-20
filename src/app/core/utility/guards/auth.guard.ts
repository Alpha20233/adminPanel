
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';


export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  let userDetail = JSON.parse(localStorage.getItem('userDetail') || '{}');
  if(userDetail?.cRole == 'admin'){
    return true;
  }else{
    return router.createUrlTree(['/dashboard/userMsg']);;
  }
};
