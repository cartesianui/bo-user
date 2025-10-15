import { Component, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { BaseComponent } from '@cartesianui/common';

@Component({
    selector: `app-user`,
    template: `<router-outlet></router-outlet>`,
    imports: [CommonModule, RouterOutlet],
    standalone: true
})
export class EntryComponent extends BaseComponent {
  constructor(injector: Injector) {
    super(injector);
    console.log('📦 User feature initialized');
  }
}

