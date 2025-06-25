import { Component, signal } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'app-collapsible-menu',
  templateUrl: './collapsible-menu.html',
  host: {
    class: 'w-full mx-auto'
  },
  imports: [NgTemplateOutlet]
})
export class CollapsibleMenuComponent {
  isOpen = signal(false);

  toggleMenu(): void {
    this.isOpen.update((open) => !open);
  }
}
