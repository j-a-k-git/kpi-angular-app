import { Component, ViewChild, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { AppNavigationService } from '../services/app-navigation/app-navigation.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  @ViewChild(MatSidenav)
  private _sidenavComponent: MatSidenav;

  public $appDrawerOpened: boolean
  public $routes: any[];

  constructor(private _appNavService: AppNavigationService) {
    this.$routes = _appNavService.routes;
    this.$appDrawerOpened = _appNavService.appDrawerStatus == "open";
  }

  ngOnInit(): void {
    this._sidenavComponent.openedChange.subscribe((x: boolean) => {
      this._appNavService.onSideNavToggled(x ? "open" : "close");
    })

    this._sidenavComponent.closedStart.subscribe(() => {
      this._appNavService.onSideNavCloseStart();
    })

    this._sidenavComponent.openedStart.subscribe(() => {
      this._appNavService.onSideNavOpenStart();
    })
  }

  toggleSideNav() {
    this.$appDrawerOpened = !this.$appDrawerOpened;
  }

}
