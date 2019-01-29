import { Injectable, EventEmitter } from '@angular/core';
import { HttpRequest } from '@angular/common/http';

@Injectable()
export class LoadingIndicatorService {

  onLoadingChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

  /**
   * Stores all currently active requests
   */
  private _requests: HttpRequest<any>[] = [];

  /**
   * Adds request to the storage and notifies observers
   */
  onStarted(req: HttpRequest<any>): void {
    this._requests.push(req);
    this.notify();
  }

  /**
   * Removes request from the storage and notifies observers
   */
  onFinished(req: HttpRequest<any>): void {
    const index = this._requests.indexOf(req);
    if (index !== -1) {
      this._requests.splice(index, 1);
    }
    this.notify();
  }

  /**
   * Notifies observers about whether there are any requests on fly
   */
  private notify(): void {
    this.onLoadingChanged.emit(this._requests.length !== 0);
  }

}
