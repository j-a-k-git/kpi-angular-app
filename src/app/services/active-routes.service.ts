import { Injectable, OnInit } from '@angular/core';
import { MatDrawerToggleResult } from '@angular/material';
import { Router, NavigationEnd } from '@angular/router'
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';

export class NavigationStatus {
  constructor(public sideNavStatus: MatDrawerToggleResult, public currentRoute: AppRoute) { }
}

export class AppRoute {
  constructor(public route: string, public title: string, public icon: string) { }
}

@Injectable({
  providedIn: 'root'
})
export class ActiveRoutesService {

  private _routes: AppRoute[] = [
    new AppRoute("", "Home", "home"),
    new AppRoute("categories", "Categories", "grain"),
    new AppRoute("expenses", "Expenses", "attach_money"),
    new AppRoute("reports", "Reports", "receipt")
  ];

  private _activeRoute: AppRoute = null;

  public SideNavToggled = new BehaviorSubject<NavigationStatus>(null);

  constructor(private router: Router) {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(
      (_: NavigationEnd) => {
        var rawUrl = _.url.substring(1);
        this._activeRoute = this.routes.find(route => route.route == rawUrl)
      }
    )
  }

  get routes(): AppRoute[] { return this._routes }
  get active(): AppRoute { return this._activeRoute }

  toogleSideNav(value: MatDrawerToggleResult): void {
    this.SideNavToggled.next(new NavigationStatus(value, this.active))
  }
}
