import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-layout-2',
  imports: [],
  templateUrl: './dashboard-layout-2.html',
  styleUrl: './dashboard-layout-2.css',
})
export class DashboardLayout2 {
  
  router = inject(Router);

  logout() {
    this.router.navigate(['/signin']);
  }
}
