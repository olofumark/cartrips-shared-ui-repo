import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  // Centralized state
  private _isLoading = signal(false);

  // Read-only access for components
  readonly isLoadingData = this._isLoading.asReadonly();

  show() { this._isLoading.set(true); }
  hide() { this._isLoading.set(false); }
}
