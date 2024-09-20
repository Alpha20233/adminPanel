import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IndexDBService } from './shared/services/indexDB/index-db.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'adminPanel';

  constructor(private readonly indexDB: IndexDBService) {

  }

  ngOnInit(): void {
    this.addAdmin();
  }

  addAdmin() {
    const userDetail = JSON.parse(localStorage.getItem('userDetail') || '{}');
    const admin = {
      id: 1,
      cName: 'admin',
      cEmail: 'admin@gmail.com',
      cPass: 'admin@123',
      bCheck: true,
      cRole: 'admin'
    }
    if (userDetail.cRole) {
      return;
    } else {
      this.indexDB.addAdmin(admin);
    }
  }
}
