import { Component } from '@angular/core';
import { SmartListComponent } from './pages/smart-list/smart-list.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  imports: [SmartListComponent],
  standalone: true
})
export class App {
  protected title = 'Kafka Front - Smart List Demo';
}
