import { Component } from '@angular/core';
import { SmartListComponent } from './pages/smart-list/smart-list.component';
import { EventListComponent } from './pages/event-list/event-list.component';
import { SocketStatusComponent } from "./pages/socket-status/socket-status";

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  imports: [SmartListComponent, EventListComponent, SocketStatusComponent],
  standalone: true
})
export class App {
  protected title = 'Kafka Front - Smart List Demo';
}
