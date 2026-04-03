import { inject, Inject, Injectable, Optional } from '@angular/core';
// import { LIBRARY_CONFIG, LibraryConfig } from './library-config';

@Injectable({
  providedIn: 'root',
})
export class TheLibraryService {
   
  // private config = inject(LIBRARY_CONFIG);


  // private config: any;
  // constructor() {
  //   this.config = inject(LIBRARY_CONFIG);
  // }

  // Use @Inject decorator instead of the inject() function
    constructor() {}


  /*constructor(@Inject(LIBRARY_CONFIG) private config: LibraryConfig) {}

  getApiUrl(): string{
    return this.config.apiUrl;
  }

  getProduction(): boolean{
    return this.config.production;
  }*/

}
