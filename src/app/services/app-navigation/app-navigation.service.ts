import { Injectable, EventEmitter } from '@angular/core';
import { MatDrawerToggleResult } from '@angular/material';
import { Router, NavigationEnd } from '@angular/router'
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';

export class NavBarStatus {
  constructor(public appDrawerStatus: MatDrawerToggleResult, public activeRoute: AppRoute) { }
}

export class AppRoute {
  constructor(public route: string, public title: string, public icon: string) { }
}

@Injectable({
  providedIn: 'root'
})
export class AppNavigationService {

  private _routes: AppRoute[] = [
    new AppRoute("", "Home", "home"),
    new AppRoute("categories", "Categories", "grain"),
    new AppRoute("expenses", "Expenses", "attach_money"),
    new AppRoute("reports", "Reports", "receipt")
  ];
  get routes(): AppRoute[] { return this._routes }

  private _activeRoute: AppRoute = null;
  get activeRoute(): AppRoute { return this._activeRoute }

  private _appDrawerStatus: MatDrawerToggleResult = "open";
  get appDrawerStatus(): MatDrawerToggleResult { return this._appDrawerStatus }

  NavBarOpenStarted: EventEmitter<void> = new EventEmitter<void>();
  NavBarOpenFinished: EventEmitter<void> = new EventEmitter<void>();
  NavBarCloseStarted: EventEmitter<void> = new EventEmitter<void>();
  NavBarCloseFinished: EventEmitter<void> = new EventEmitter<void>();
  NavBarStatusChanged = new BehaviorSubject<NavBarStatus>(
    new NavBarStatus(
      this.appDrawerStatus,
      this.activeRoute
    )
  );

  constructor(private _router: Router) {

    this._router.events.pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((_: NavigationEnd) => {
        var rawUrl = _.url.substring(1);
        this._activeRoute = this.routes.find(route => route.route == rawUrl)
        this.notify();
      })
  }

  onSideNavToggled(status: MatDrawerToggleResult): void {
    
    this._appDrawerStatus = status;
    if (status == "open")
      this.NavBarOpenFinished.emit();
    if (status == "close")
      this.NavBarCloseFinished.emit();
    this.notify();
  }

  onSideNavOpenStart(): void {
    this.NavBarOpenStarted.emit();
  }

  onSideNavCloseStart(): void {
    this.NavBarCloseStarted.emit();
  }

  private notify(): void {
    this.NavBarStatusChanged.next(new NavBarStatus(this.appDrawerStatus, this.activeRoute))
  }
}
