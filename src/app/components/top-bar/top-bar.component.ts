import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [MatTabsModule, RouterModule],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.scss'
})
export class TopBarComponent {
  constructor(private router: Router) { }

  onTabChange(event: any) {
    if (event.index === 0) {
      this.router.navigate(['/']); // Ruta para "User List"
    } else if (event.index === 1) {
      this.router.navigate(['/create-user']); // Ruta para "Create User"
    }
  }
}
