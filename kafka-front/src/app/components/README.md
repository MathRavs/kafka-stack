# UI Components

This folder contains reusable UI components built with Angular 20 and Tailwind CSS.

## Components

### Button Component (`app-button`)

A versatile button component with multiple variants and sizes using Angular 20 signals and computed values.

**Usage:**
```html
<app-button variant="primary" size="md" (onClick)="handleClick($event)">
  Click me
</app-button>
```

**Props:**
- `variant`: 'primary' | 'secondary' | 'outline' | 'ghost' (default: 'primary')
- `size`: 'sm' | 'md' | 'lg' (default: 'md')
- `type`: 'button' | 'submit' | 'reset' (default: 'button')
- `disabled`: boolean (default: false)
- `onClick`: OutputSignal<MouseEvent>

### List Item Component (`app-list-item`)

A list item component with hover effects and action slots using Angular 20 control flow and computed signals.

**Usage:**
```html
<app-list-item variant="default" (onClick)="handleItemClick($event)">
  List item content
  <div slot="actions">
    <button>Edit</button>
    <button>Delete</button>
  </div>
</app-list-item>
```

**Props:**
- `variant`: 'default' | 'compact' | 'spacious' (default: 'default')
- `showActions`: boolean (default: false)
- `disabled`: boolean (default: false)
- `onClick`: OutputSignal<MouseEvent>

### List Component (`app-list`)

A list component that accepts an array of strings and renders them as list items using Angular 20 modern control flow and computed signals.

**Usage:**
```html
<app-list 
  [items]="['Item 1', 'Item 2', 'Item 3']"
  title="My List"
  subtitle="Optional subtitle"
  variant="card"
  (onItemClick)="handleItemClick($event)">
</app-list>
```

**Props:**
- `items`: string[] (default: [])
- `title`: string (optional)
- `subtitle`: string (optional)
- `variant`: 'default' | 'bordered' | 'card' (default: 'default')
- `itemVariant`: 'default' | 'compact' | 'spacious' (default: 'default')
- `showActions`: boolean (default: false)
- `disabled`: boolean (default: false)
- `emptyMessage`: string (optional, default: 'No items to display')
- `onItemClick`: OutputSignal<{ item: string; event: MouseEvent }>

## Angular 20 Features Used

### Signal-based Inputs and Outputs
```typescript
// Modern Angular 20 syntax
variant = input<'primary' | 'secondary'>('primary');
onClick = output<MouseEvent>();

// Usage in template
{{ variant() }}  // Access signal value
(onClick)="handleClick($event)"  // Listen to output
```

### Computed Signals for Dynamic Classes
```typescript
// Computed signal for dynamic CSS classes
buttonClasses = computed(() => {
  const baseClasses = 'inline-flex items-center justify-center';
  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700'
  };
  
  return `${baseClasses} ${variantClasses[this.variant()]}`;
});

// Usage in template
{{ buttonClasses() }}
```

### Modern Control Flow
```html
<!-- @if instead of *ngIf -->
@if (showActions()) {
  <div>Actions</div>
}

<!-- @for instead of *ngFor -->
@for (item of items(); track trackByFn($index, item)) {
  <div>{{ item }}</div>
}

<!-- @else for conditional rendering -->
@if (hasItems()) {
  <div>Items</div>
} @else {
  <div>No items</div>
}
```

## Importing Components

```typescript
import { ButtonComponent, ListItemComponent, ListComponent } from './components';
```

## Features

- **Angular 20**: Uses latest Angular 20 features including signals, computed values, and modern control flow
- **Tailwind CSS**: All components use Tailwind classes for styling
- **Standalone Components**: Modern Angular standalone component architecture
- **TypeScript**: Full type safety with proper interfaces
- **Accessibility**: Proper focus states and ARIA attributes
- **Responsive Design**: Works well on all screen sizes
- **Customizable**: Multiple variants and configuration options
- **Performance**: Signal-based reactivity and computed values for optimal performance
- **Reactive**: Automatic updates when input signals change 