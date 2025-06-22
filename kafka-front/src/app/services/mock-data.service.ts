import { Injectable } from '@angular/core';

export interface ListItem {
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

const simpleItems = [
    'First item',
    'Second item',
    'Third item',
    'Fourth item',
    'Fifth item',
    'Sixth item',
    'Seventh item',
    'Eighth item',
    'Ninth item',
    'Tenth item'
];

const complexItems: ListItem[] = [
  {
    id: '1',
    title: 'Kafka Cluster Setup',
    description: 'Configure and deploy Apache Kafka cluster with 3 brokers',
    status: 'completed',
    priority: 'high',
    category: 'Infrastructure',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-20'),
    tags: ['kafka', 'cluster', 'deployment'],
    metadata: { brokerCount: 3, replicationFactor: 3 }
  },
  {
    id: '2',
    title: 'Topic Management',
    description: 'Create and configure topics for data streaming',
    status: 'active',
    priority: 'medium',
    category: 'Configuration',
    createdAt: new Date('2024-01-16'),
    updatedAt: new Date('2024-01-18'),
    tags: ['topics', 'streaming', 'configuration'],
    metadata: { topicCount: 5, partitions: 3 }
  },
  {
    id: '3',
    title: 'Consumer Group Setup',
    description: 'Implement consumer groups for load balancing',
    status: 'pending',
    priority: 'high',
    category: 'Development',
    createdAt: new Date('2024-01-17'),
    updatedAt: new Date('2024-01-17'),
    tags: ['consumers', 'load-balancing', 'groups'],
    metadata: { consumerCount: 2, groupId: 'data-processors' }
  },
  {
    id: '4',
    title: 'Monitoring Dashboard',
    description: 'Set up Grafana dashboard for Kafka metrics',
    status: 'active',
    priority: 'low',
    category: 'Monitoring',
    createdAt: new Date('2024-01-18'),
    updatedAt: new Date('2024-01-19'),
    tags: ['monitoring', 'grafana', 'metrics'],
    metadata: { dashboardId: 'kafka-metrics', refreshRate: '30s' }
  },
  {
    id: '5',
    title: 'Security Configuration',
    description: 'Implement SASL/SSL authentication and authorization',
    status: 'inactive',
    priority: 'urgent',
    category: 'Security',
    createdAt: new Date('2024-01-19'),
    updatedAt: new Date('2024-01-19'),
    tags: ['security', 'authentication', 'ssl'],
    metadata: { saslMechanism: 'PLAIN', sslEnabled: true }
  }
];

@Injectable({
  providedIn: 'root'
})
export class MockDataService {

  // Simple string items for basic list
  getSimpleListItems(): string[] {
    return simpleItems;
  }

  // Complex ListItem objects for advanced list
  getComplexListItems(): ListItem[] {
    return complexItems;
  }

  // Get items by status
  getItemsByStatus(status: ListItem['status']): ListItem[] {
    return complexItems.filter(item => item.status === status);
  }

  // Get items by priority
  getItemsByPriority(priority: ListItem['priority']): ListItem[] {
    return complexItems.filter(item => item.priority === priority);
  }

  // Get items by category
  getItemsByCategory(category: string): ListItem[] {
    return complexItems.filter(item => item.category === category);
  }
} 