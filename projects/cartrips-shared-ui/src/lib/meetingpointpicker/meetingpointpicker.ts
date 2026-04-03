import { DecimalPipe } from '@angular/common';
import { Component, input, model, computed, signal, effect } from '@angular/core';
import { Input, Output, EventEmitter, forwardRef, OnInit } from '@angular/core';
import { GoogleMap, MapMarker } from '@angular/google-maps';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
export interface LatLng { lat: number; lng: number; }

@Component({
  selector: 'csui-meetingpointpicker',
  standalone: true,
  imports: [GoogleMap, MapMarker, DecimalPipe],
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => Meetingpointpicker), multi: true }],
  templateUrl: './meetingpointpicker.html',
  styleUrl: './meetingpointpicker.css',
})
/*export class Meetingpointpicker implements OnInit, ControlValueAccessor {

  setDisabledState?(isDisabled: boolean): void {
    throw new Error('Method not implemented.');
  }
  @Input() label = 'Pickup/Convergence Point';
  @Input() helpText = 'Click on the map or drag the pin to set the exact meeting point.';
  @Input() zoom = 14; @Input() height = '400px';
  @Input() initialCenter: LatLng = { lat: 6.5244, lng: 3.3792 };
  @Output() pickupPointChange = new EventEmitter<LatLng | null>();
  center: google.maps.LatLngLiteral = this.initialCenter;
  markerPosition: google.maps.LatLngLiteral | null = null;
  private onChange: (value: LatLng | null) => void = () => { };
  private onTouched: () => void = () => { };
  ngOnInit(): void { if (navigator.geolocation) { navigator.geolocation.getCurrentPosition(pos => { this.center = { lat: pos.coords.latitude, lng: pos.coords.longitude }; if (!this.markerPosition) this.setPosition(this.center); }, () => this.center = this.initialCenter); } }

  onMapClick(event: google.maps.MapMouseEvent) { if (event.latLng) this.setPosition({ lat: event.latLng.lat(), lng: event.latLng.lng() }); }
  onMarkerDragEnd(event: google.maps.MapMouseEvent) { if (event.latLng) this.setPosition({ lat: event.latLng.lat(), lng: event.latLng.lng() }); }
  private setPosition(pos: google.maps.LatLngLiteral) { this.markerPosition = pos; const value = { lat: pos.lat, lng: pos.lng }; this.onChange(value); this.onTouched(); this.pickupPointChange.emit(value); }
  // ControlValueAccessor
  writeValue(value: LatLng | null): void { this.markerPosition = value ? { lat: value.lat, lng: value.lng } : null; }
  registerOnChange(fn: any): void { this.onChange = fn; }
  registerOnTouched(fn: any): void { this.onTouched = fn; }

}*/


/*export class Meetingpointpicker {
  // Signal inputs (latest way – reactive and typed)
  label = input<string>('');
  helpText = input<string>("Set the meeting point where everyone 'll converge for the trip. Click on the map or drag the pin to set the exact meeting point.");
  zoom = input<number>(14); height = input<string>('400px');
  initialCenter = input<LatLng>({ lat: 6.5244, lng: 3.3792 }); // Fallback (e.g., Lagos, Nigeria) 
  // Form integration via model() – latest recommended for custom form controls 
  // Provides two-way binding, works with Reactive/Template forms + Validators.required
  pickuppoint = model<LatLng | null>(null);
  // Internal signals  
  center = signal<google.maps.LatLngLiteral>(this.initialCenter());
  
  // markerPosition = computed<google.maps.LatLngLiteral | null>(() => {
  //   const pos = this.pickupPoint(); return pos ? { lat: pos.lat, lng: pos.lng } : null;
  // });

  markerPosition = computed<google.maps.LatLngLiteral | LatLng>(() => {
    const pos = this.pickuppoint();
    return pos ? { lat: pos.lat, lng: pos.lng } : { lat: this.initialCenter().lat, lng: this.initialCenter().lng };
  });

  constructor() {
    // Effect for initial geolocation centering (runs once + on relevant changes)
    effect(() => {
      // Start with fallback
      this.center.set(this.initialCenter()); if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const userCenter = { lat: position.coords.latitude, lng: position.coords.longitude, }; this.center.set(userCenter);
          // Pre-place marker if no value yet
          if (this.pickuppoint() === null) { this.pickuppoint.set(userCenter); }
        }, () => {
          // On denial/error, stick with fallback
          console.warn('Geolocation unavailable');
        });
      }
    }, { allowSignalWrites: true });
  }

  onMapClick(event: google.maps.MapMouseEvent): void { if (event.latLng) { this.pickuppoint.set({ lat: event.latLng.lat(), lng: event.latLng.lng(), }); } }

  // onMarkerDragEnd(event: google.maps.MapMouseEvent): void {
  onMarkerDragEnd(mapEvent: any): void {
    const event = mapEvent as google.maps.MapMouseEvent;
    if (event.latLng) {
      this.pickuppoint.set({ lat: event.latLng.lat(), lng: event.latLng.lng(), });
    }
  }

}*/


export class Meetingpointpicker implements ControlValueAccessor {
  label = input<string>('');
  helpText = input<string>("Set the meeting point where everyone 'll converge for the trip.");

  zoom = input<number>(14);
  height = input<string>('400px');
  initialCenter = input<{ lat: number; lng: number }>({ lat: 6.5244, lng: 3.3792 }); // Fallback // Exposed model: string | null (e.g., "6.524400,3.379200" or null) 
  pickuppoint = model<string | null>(""); // Internal signal for map position (object) 
  private internalPosition = signal<{ lat: number; lng: number } | null>(null); // Computed marker position for template

  //  markerPosition = computed<google.maps.LatLngLiteral | null>(() => this.internalPosition()); 

  markerPosition = computed<google.maps.LatLngLiteral | LatLng>(() => {
    const pos = this.internalPosition();
    return pos ? { lat: pos.lat, lng: pos.lng } : { lat: this.initialCenter().lat, lng: this.initialCenter().lng };
  });

  // Add a simple boolean signal
  apiAvailable = signal(false);

  constructor() { // Effect for geolocation and input parsing 

    // 2. Set the value immediately in the constructor
    // this.apiAvailable.set(typeof google !== 'undefined' && !!google.maps);

    // Check immediately
    this.apiAvailable.set(typeof google !== 'undefined' && !!google.maps);

    // Optional: If it's not there yet (slow connection), check again when window loads
    if (!this.apiAvailable()) {
      window.addEventListener('load', () => {
        this.apiAvailable.set(typeof google !== 'undefined' && !!google.maps);
      });
    }


    effect(() => {

      // 3. Wrap any logic that depends on the 'google' object
      if (this.apiAvailable()) {

        const value = this.pickuppoint(); // React to form changes 
        this.internalPosition.set(value ? this.parseStringToLatLng(value) : null); // Geolocation (runs once-ish) 
        if (navigator.geolocation && !this.internalPosition()) {
          navigator.geolocation.getCurrentPosition((position) => {
            const userCenter = { lat: position.coords.latitude, lng: position.coords.longitude };
            this.center.set(userCenter); this.updatePosition(userCenter); // Pre-set if no value
          }, () => { this.center.set(this.initialCenter()); console.warn('Geolocation unavailable'); });
        }
      }

      this.onChange(this.pickuppoint());

    }, { allowSignalWrites: true });
  }


  // Callbacks for Angular Forms
  private onChange = (val: any) => { };
  private onTouched = () => { };

  // --- ControlValueAccessor Methods ---

  // 1. Called by Forms API when the form value changes (Form -> Signal)
  writeValue(value: string | null): void {
    this.pickuppoint.set(value);
  }

  // 2. Registers the callback to notify the form of changes
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  // 3. Registers the callback for "touched" state
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    // throw new Error('Method not implemented.');
  }


  // Helper for UI events
  onInput(event: Event) {
    const val = (event.target as HTMLInputElement).value;
    this.pickuppoint.set(val); // Updates signal and triggers effect -> onChange
  }


  // Center signal 
  center = signal<google.maps.LatLngLiteral>(this.initialCenter());
  onMapClick(event: google.maps.MapMouseEvent): void {
    if (event.latLng) {
      this.updatePosition({ lat: event.latLng.lat(), lng: event.latLng.lng() });
    }
  }

  //  onMarkerDragEnd(event: google.maps.MapMouseEvent): void { 
  onMarkerDragEnd(mapEvent: any): void {
    const event = mapEvent as google.maps.MapMouseEvent;
    if (event.latLng) {
      this.updatePosition({ lat: event.latLng.lat(), lng: event.latLng.lng() });
    }
  }

  private updatePosition(pos: { lat: number; lng: number }): void {
    this.internalPosition.set(pos); // Convert to string and update model/form 
    this.pickuppoint.set(this.latLngToString(pos));
  } // Helper: Convert LatLng to "lat,lng" string (6 decimals for precision) 
  private latLngToString(pos: { lat: number; lng: number }): string {
    return `${pos.lat.toFixed(6)},${pos.lng.toFixed(6)}`;
  } // Helper: Parse "lat,lng" string to LatLng (handle invalid as null) 
  private parseStringToLatLng(str: string): { lat: number; lng: number } | null {
    const parts = str.split(','); if (parts.length !== 2) return null; const lat = parseFloat(parts[0]); const lng = parseFloat(parts[1]);
    return isNaN(lat) || isNaN(lng) ? null : { lat, lng };
  }
}
