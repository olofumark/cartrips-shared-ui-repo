import { InjectionToken } from "@angular/core";

// 1. Use an Interface for the data shape
export interface LibraryConfig {
    apiUrl: string;
    production: boolean;
}

// 2. The Token remains the same
// export const LIBRARY_CONFIG = new InjectionToken<LibraryConfig>('library.config');

// 3. Your provider function (simplified)
// export function provideMyLib(config: LibraryConfig) {
//     return [
//         { provide: LIBRARY_CONFIG, useValue: config }
//     ];
// }

// export const LIBRARY_CONFIG = new InjectionToken<LibraryConfig>('library.config');
