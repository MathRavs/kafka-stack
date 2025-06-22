import { Component, input, output, computed, TemplateRef } from '@angular/core';
import { ListItemComponent } from '../list-item/list-item.component';
import { NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [ListItemComponent, NgTemplateOutlet],
  template: `
    <div class="w-full">
      @if (title()) {
        <div class="mb-3">
          <h3 class="text-lg font-semibold text-gray-900">{{ title() }}</h3>
          @if (subtitle()) {
            <p class="text-sm text-gray-600 mt-1">{{ subtitle() }}</p>
          }
        </div>
      }
      
      <ul class="
        bg-white border border-gray-200 rounded-lg shadow-sm
        overflow-hidden
        {{ listClasses() }}
      ">
        @if (items() && items().length > 0) {
          @for (item of items(); track trackByFn($index, item)) {
            <app-list-item
              [variant]="itemVariant()"
              [showActions]="showActions()"
              [disabled]="disabled()"
              (onClick)="onItemClick.emit({ item, event: $event })"
            >
              {{ item }}
              <ng-container slot="actions">
                @if(actionsTemplate()){
                  <ng-container *ngTemplateOutlet="actionsTemplate(); context: { item }"></ng-container>
                }
              </ng-container>
            </app-list-item>
          }
        } @else {
          <li class="px-4 py-8 text-center text-gray-500">
            <div class="flex flex-col items-center">
              <svg class="w-8 h-8 mb-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
              <p>{{ emptyMessage() || 'No items to display' }}</p>
            </div>
          </li>
        }
      </ul>
    </div>
  `,
  styles: []
})
export class ListComponent {
  actionsTemplate = input<TemplateRef<any> | null>(null);
  items = input<string[]>([]);
  title = input<string | undefined>(undefined);
  subtitle = input<string | undefined>(undefined);
  variant = input<'default' | 'bordered' | 'card'>('default');
  itemVariant = input<'default' | 'compact' | 'spacious'>('default');
  showActions = input(false);
  disabled = input(false);
  emptyMessage = input<string | undefined>(undefined);
  onItemClick = output<{ item: string; event: MouseEvent }>();

  trackByFn(index: number, item: string): string {
    return item;
  }

  listClasses = computed(() => {
    const baseClasses = 'divide-y divide-gray-200';
    
    const variantClasses = {
      default: 'bg-white',
      bordered: 'bg-white border border-gray-200',
      card: 'bg-white border border-gray-200 rounded-lg shadow-sm'
    };

    return `${baseClasses} ${variantClasses[this.variant()]}`;
  });
} 