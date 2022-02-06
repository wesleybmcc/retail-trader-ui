import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation-menu',
  templateUrl: './navigation-menu.component.html',
  styleUrls: ['./navigation-menu.component.css']
})
export class NavigationMenuComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  changeRoute(route: string) {
    this.router.navigate([route]);
  }
}
