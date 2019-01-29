import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { LoadingIndicatorService } from './services/loading-indicator/loading-indicator.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  $loading: boolean;

  constructor(
    private _cdRef: ChangeDetectorRef,
    private _loadingIndicatorService: LoadingIndicatorService) {
    this.$loading = false;
  }

  ngOnInit(): void {
    this._loadingIndicatorService
      .onLoadingChanged
      .subscribe((isLoading: boolean) => {
        this.$loading = isLoading;
        this._cdRef.detectChanges();
      });
  }
}
