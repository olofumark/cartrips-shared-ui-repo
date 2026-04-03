import { Provider } from "@angular/core";
import { LIBRARY_CONFIG, LibraryConfig } from "./library-config";

export function provideMyLib(config: LibraryConfig): Provider[] {
    return [
        { provide: LIBRARY_CONFIG, useValue: config }
    ];
}
