# Mock Data Service

This service provides comprehensive mock data for list items in various formats and categories.

## Features

- **Multiple Data Types**: Tasks, Users, Products, Notifications, Files
- **Rich Metadata**: Status, Priority, Categories, Tags, Timestamps
- **Filtering Methods**: By status, priority, category
- **Random Generation**: Dynamic mock data generation
- **TypeScript Support**: Fully typed interfaces

## Usage

### Basic Usage

```typescript
import { MockDataService } from './services/mock-data.service';

export class MyComponent {
  constructor(private mockDataService: MockDataService) {}

  ngOnInit() {
    // Get simple string items
    const simpleItems = this.mockDataService.getSimpleListItems();
    
    // Get complex items with metadata
    const tasks = this.mockDataService.getTaskItems();
    const users = this.mockDataService.getUserItems();
    const products = this.mockDataService.getProductItems();
  }
}
```

### Data Types

#### Simple String Items
```typescript
const simpleItems = this.mockDataService.getSimpleListItems();
// Returns: ['First item', 'Second item', 'Third item', ...]
```

#### Complex Items (ListItem Interface)
```typescript
interface ListItem {
  id: string;
  title: string;
  description?: string;
  status?: 'active' | 'inactive' | 'pending' | 'completed';
  priority?: 'low' | 'medium' | 'high' | 'urgent';
  category?: string;
  createdAt?: Date;
  updatedAt?: Date;
  tags?: string[];
  metadata?: Record<string, any>;
}
```

### Available Data Sets

1. **Tasks** - Development and project management tasks
2. **Users** - Team members and user profiles
3. **Products** - Product catalog items
4. **Notifications** - System and user notifications
5. **Files** - File management items

### Filtering Methods

```typescript
// Filter by status
const activeItems = this.mockDataService.getItemsByStatus('active');
const pendingItems = this.mockDataService.getItemsByStatus('pending');

// Filter by priority
const highPriorityItems = this.mockDataService.getItemsByPriority('high');
const urgentItems = this.mockDataService.getItemsByPriority('urgent');

// Filter by category
const developmentItems = this.mockDataService.getItemsByCategory('Development');
```

### Random Data Generation

```typescript
// Generate 10 random items
const randomItems = this.mockDataService.generateRandomItems(10);

// Generate 25 random items
const moreRandomItems = this.mockDataService.generateRandomItems(25);
```

### Using with List Components

The mock data can be easily used with the existing list components:

```typescript
// For simple string lists
const simpleItems = this.mockDataService.getSimpleListItems();

// For complex items, convert to strings for display
const taskTitles = this.mockDataService.getTaskItems()
  .map(item => `${item.title} (${item.priority})`);
```

### JSON Data

The mock data is also available as JSON at `src/assets/mock-data.json` for external consumption or API simulation.

## Demo Component

Check out the `MockDataDemoComponent` for a complete example of how to use all the mock data features with the list components.

## Data Statistics

The service provides methods to get statistics about the data:

```typescript
const allItems = this.mockDataService.getAllItems();
const totalCount = allItems.length;
const activeCount = allItems.filter(item => item.status === 'active').length;
```

## Categories Available

- Development
- Code Review
- Maintenance
- Bug Fix
- Planning
- Engineering
- Product
- Design
- Quality Assurance
- Operations
- Electronics
- Smart Home
- Collectibles
- Sustainability
- System
- Communication
- Finance
- Welcome
- Documents
- Images
- Data
- Presentations
- Code

## Status Types

- `active` - Currently active items
- `inactive` - Disabled or inactive items
- `pending` - Items waiting for action
- `completed` - Finished items

## Priority Levels

- `low` - Low priority items
- `medium` - Medium priority items
- `high` - High priority items
- `urgent` - Critical/urgent items 