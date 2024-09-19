import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { InsertUpdateComponent } from '../../components/insert-update/insert-update.component';



@Injectable({
  providedIn: 'root',
})
export class CommService {
  constructor(private breakpointObserver: BreakpointObserver) { }

  public isMobile(): Observable<boolean> {
    return this.breakpointObserver
      .observe([Breakpoints.Tablet, Breakpoints.Handset])
      .pipe(map((result) => !result.matches 
      ));
  }

 
}
