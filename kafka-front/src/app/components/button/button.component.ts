import { Component, input, output, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button',
  standalone: true,
  template: `
    <button
      [type]="type()"
      [disabled]="disabled()"
      (click)="onClick.emit($event)"
      class="
        px-4 py-2 rounded-md font-medium transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-offset-2
        disabled:opacity-50 disabled:cursor-not-allowed
        {{ buttonClasses() }}
      "
    >
      <ng-content></ng-content>
    </button>
  `,
  styles: []
})
export class ButtonComponent {
  variant = input<'primary' | 'secondary' | 'outline' | 'ghost'>('primary');
  size = input<'sm' | 'md' | 'lg'>('md');
  type = input<'button' | 'submit' | 'reset'>('button');
  disabled = input(false);
  onClick = output<MouseEvent>();

  buttonClasses = computed(() => {
    const baseClasses = 'inline-flex items-center justify-center';
    
    const sizeClasses = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg'
    };

    const variantClasses = {
      primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
      secondary: 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500',
      outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-500',
      ghost: 'text-gray-700 hover:bg-gray-100 focus:ring-gray-500'
    };

    return `${baseClasses} ${sizeClasses[this.size()]} ${variantClasses[this.variant()]}`;
  });
} 