import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from '../../components/list/list.component';
import { MockDataService, ListItem } from '../../services/mock-data.service';

@Component({
  selector: 'app-smart-list',
  standalone: true,
  imports: [CommonModule, ListComponent],
  template: `
    <div class="container mx-auto p-6">
      <!-- Controls Section -->
      <div class="mb-6 bg-white rounded-lg shadow-sm border p-4">
        <div class="flex flex-wrap gap-4 items-center">
          <div class="flex items-center space-x-2">
            <label class="text-sm font-medium text-gray-700">Data Type:</label>
            <select 
              class="border border-gray-300 rounded px-3 py-1 text-sm"
              (change)="setDataType($event)"
            >
              <option value="simple">Simple Items</option>
              <option value="complex">Complex Items</option>
            </select>
          </div>

          @if (dataType() === 'complex') {
            <div class="flex items-center space-x-2">
              <label class="text-sm font-medium text-gray-700">Filter by Status:</label>
              <select 
                class="border border-gray-300 rounded px-3 py-1 text-sm"
                (change)="setStatusFilter($event)"
              >
                <option value="">All Statuses</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            <div class="flex items-center space-x-2">
              <label class="text-sm font-medium text-gray-700">Sort by:</label>
              <select 
                class="border border-gray-300 rounded px-3 py-1 text-sm"
                (change)="setSortBy($event)"
              >
                <option value="title">Title</option>
                <option value="priority">Priority</option>
                <option value="createdAt">Created Date</option>
                <option value="status">Status</option>
              </select>
            </div>
          }
        </div>
      </div>

      <!-- Simple List -->
      @if (dataType() === 'simple') {
        <app-list
          [items]="simpleItems()"
          title="Simple Items List"
          subtitle="Displaying basic string items from Mock Data Service"
          variant="card"
          itemVariant="default"
          [showActions]="true"
          (onItemClick)="handleSimpleItemClick($event)"
          [actionsTemplate]="actionsTemplate"
        >
        </app-list>
        <ng-template #actionsTemplate let-item="item">
          <button 
            class="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            (click)="handleSimpleActionClick($event, item)"
          >
            View
          </button>
        </ng-template>
      }

      <!-- Complex List -->
      @if (dataType() === 'complex') {
        <div class="w-full">
          <div class="mb-3">
            <h3 class="text-lg font-semibold text-gray-900">Complex Items List</h3>
            <p class="text-sm text-gray-600 mt-1">Displaying structured data with filtering and sorting</p>
          </div>
          
          <ul class="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden divide-y divide-gray-200">
            @if (complexItemsDisplay().length > 0) {
              @for (item of complexItemsDisplay(); track item.id) {
                <li 
                  class="px-6 py-4 hover:bg-gray-50 transition-colors cursor-pointer"
                  [attr.data-item-id]="item.id"
                  (click)="handleComplexItemClick($event, item)"
                >
                  <div class="flex items-center justify-between">
                    <div class="flex-1">
                      <div class="flex items-center space-x-3">
                        <div class="flex items-center space-x-2">
                          <span class="text-lg">{{ getStatusEmoji(item.status) }}</span>
                          <span class="text-lg">{{ getPriorityEmoji(item.priority) }}</span>
                        </div>
                        <div>
                          <h4 class="font-medium text-gray-900">{{ item.title }}</h4>
                          <p class="text-sm text-gray-600">{{ item.description }}</p>
                          <div class="flex items-center space-x-4 mt-1">
                            <span class="text-xs bg-gray-100 px-2 py-1 rounded">{{ item.category }}</span>
                            <span class="text-xs text-gray-500">{{ item.createdAt | date:'short' }}</span>
                            @if (item.tags && item.tags.length > 0) {
                              <div class="flex space-x-1">
                                @for (tag of item.tags; track tag) {
                                  <span class="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">{{ tag }}</span>
                                }
                              </div>
                            }
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="flex items-center space-x-2 ml-4">
                      <button 
                        class="px-3 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                        (click)="handleComplexActionClick($event, item.id)"
                      >
                        Details
                      </button>
                      <button 
                        class="px-3 py-1 text-sm bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors"
                        (click)="handleEditClick($event, item.id)"
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                </li>
              }
            } @else {
              <li class="px-4 py-8 text-center text-gray-500">
                <div class="flex flex-col items-center">
                  <svg class="w-8 h-8 mb-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                  </svg>
                  <p>No items to display</p>
                </div>
              </li>
            }
          </ul>
        </div>
      }

      <!-- Stats Section -->
      @if (dataType() === 'complex') {
        <div class="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div class="bg-white rounded-lg shadow-sm border p-4">
            <h3 class="text-lg font-semibold text-gray-900">{{ complexItems().length }}</h3>
            <p class="text-sm text-gray-600">Total Items</p>
          </div>
          <div class="bg-white rounded-lg shadow-sm border p-4">
            <h3 class="text-lg font-semibold text-green-600">{{ getItemsByStatus('active').length }}</h3>
            <p class="text-sm text-gray-600">Active</p>
          </div>
          <div class="bg-white rounded-lg shadow-sm border p-4">
            <h3 class="text-lg font-semibold text-yellow-600">{{ getItemsByStatus('pending').length }}</h3>
            <p class="text-sm text-gray-600">Pending</p>
          </div>
          <div class="bg-white rounded-lg shadow-sm border p-4">
            <h3 class="text-lg font-semibold text-blue-600">{{ getItemsByStatus('completed').length }}</h3>
            <p class="text-sm text-gray-600">Completed</p>
          </div>
        </div>
      }
    </div>
  `,
  styles: []
})
export class SmartListComponent implements OnInit {
  private mockDataService = inject(MockDataService);
  
  // Signals
  dataType = signal<'simple' | 'complex'>('simple');
  statusFilter = signal<string>('');
  sortBy = signal<string>('title');
  
  simpleItems = signal<string[]>([]);
  complexItems = signal<ListItem[]>([]);

  // Computed values
  complexItemsDisplay = computed(() => {
    let items = this.complexItems();
    
    // Apply status filter
    if (this.statusFilter()) {
      items = items.filter(item => item.status === this.statusFilter());
    }
    
    // Apply sorting
    items = [...items].sort((a, b) => {
      switch (this.sortBy()) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'priority':
          const priorityOrder = { urgent: 4, high: 3, medium: 2, low: 1 };
          return (priorityOrder[b.priority || 'low'] || 0) - (priorityOrder[a.priority || 'low'] || 0);
        case 'createdAt':
          return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
        case 'status':
          return (a.status || '').localeCompare(b.status || '');
        default:
          return 0;
      }
    });
    
    return items;
  });

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems(): void {
    this.simpleItems.set(this.mockDataService.getSimpleListItems());
    this.complexItems.set(this.mockDataService.getComplexListItems());
  }

  setDataType(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.dataType.set(target.value as 'simple' | 'complex');
  }

  setStatusFilter(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.statusFilter.set(target.value);
  }

  setSortBy(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.sortBy.set(target.value);
  }

  getStatusEmoji(status?: string): string {
    const statusEmoji: Record<string, string> = {
      active: '🟢',
      inactive: '🔴',
      pending: '🟡',
      completed: '✅'
    };
    return statusEmoji[status || 'inactive'] || '⚪';
  }

  getPriorityEmoji(priority?: string): string {
    const priorityEmoji: Record<string, string> = {
      urgent: '🚨',
      high: '🔴',
      medium: '🟡',
      low: '🟢'
    };
    return priorityEmoji[priority || 'low'] || '⚪';
  }

  getItemsByStatus(status: ListItem['status']): ListItem[] {
    return this.mockDataService.getItemsByStatus(status);
  }

  handleSimpleItemClick(event: { item: string; event: MouseEvent }): void {
    console.log('Simple item clicked:', event.item);
  }

  handleSimpleActionClick(event: MouseEvent, item: ListItem): void {
    event.stopPropagation();
    console.log('Simple action clicked:', item);
  }

  handleComplexItemClick(event: MouseEvent, item: ListItem): void {
    console.log('Complex item clicked:', item);
  }

  handleComplexActionClick(event: MouseEvent, itemId: string): void {
    event.stopPropagation();
    const item = this.complexItems().find(i => i.id === itemId);
    console.log('Complex action clicked for item:', item);
    // You could open a modal or navigate to detail page here
  }

  handleEditClick(event: MouseEvent, itemId: string): void {
    event.stopPropagation();
    const item = this.complexItems().find(i => i.id === itemId);
    console.log('Edit clicked for item:', item);
    // You could open an edit modal here
  }
} 