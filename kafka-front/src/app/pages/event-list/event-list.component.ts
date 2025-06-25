import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { EventStreamingService } from '../../services/event-streaming.service';
import { SmartListComponent } from "../smart-list/smart-list.component";
import { ListComponent } from "../../components/list/list.component";

@Component({
  selector: 'app-event-list',
  template: `
    <app-list [items]="events()"></app-list>
  `,
  styleUrl: './event-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ListComponent],
  standalone: true
})
export class EventListComponent { 
  private readonly eventStreamingService = inject(EventStreamingService);
  readonly events = this.eventStreamingService.events;
}
