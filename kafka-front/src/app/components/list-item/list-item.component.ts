import { Component, input, output, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-item',
  standalone: true,
  template: `
    <li
      (click)="onClick.emit($event)"
      class="
        px-4 py-3 border-b border-gray-200 last:border-b-0
        hover:bg-gray-50 transition-colors duration-150
        cursor-pointer
        {{ itemClasses() }}
      "
    >
      <div class="flex items-center justify-between">
        <div class="flex-1">
          <ng-content></ng-content>
        </div>
        @if (showActions()) {
          <div class="flex items-center space-x-2 ml-4">
            <ng-content select="[slot=actions]"></ng-content>
          </div>
        }
      </div>
    </li>
  `,
  styles: []
})
export class ListItemComponent {
  variant = input<'default' | 'compact' | 'spacious'>('default');
  showActions = input(false);
  disabled = input(false);
  onClick = output<MouseEvent>();

  itemClasses = computed(() => {
    const baseClasses = 'list-none';
    
    const variantClasses = {
      default: 'px-4 py-3',
      compact: 'px-3 py-2',
      spacious: 'px-6 py-4'
    };

    const disabledClasses = this.disabled() ? 'opacity-50 cursor-not-allowed' : '';

    return `${baseClasses} ${variantClasses[this.variant()]} ${disabledClasses}`;
  });
} 