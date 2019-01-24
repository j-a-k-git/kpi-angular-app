import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { ActiveRoutesService } from '../services/active-routes.service';
import { from } from 'rxjs';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent {

  @ViewChild(MatSidenav)
  private $sidenavComponent: MatSidenav;

  $routes: any[];
  constructor(public activeRouteService: ActiveRoutesService) {
    this.$routes = activeRouteService.routes;
  }

  toggleSideNav() {
    return from(this.$sidenavComponent.toggle()).subscribe(x => this.activeRouteService.toogleSideNav(x));
  }

}
