import { Component, inject } from "@angular/core";
import { CollapsibleMenuComponent } from "../../components/collapsible-menu/collapsible-menu";
import { EventListComponent } from "../event-list/event-list.component";
import { SocketStatusComponent } from "../socket-status/socket-status";
import { SmartListComponent } from "../smart-list/smart-list.component";
import { AuthService } from "../../services/auth/auth.service";
import { toSignal } from "@angular/core/rxjs-interop";

@Component({
    selector: 'app-home',
    templateUrl: './home.html',
    imports: [CollapsibleMenuComponent, EventListComponent, SocketStatusComponent, SmartListComponent]
})
export class HomePage {
    title = 'Home';

    private readonly authService = inject(AuthService);
    readonly currentUser$$ = this.authService.currentUser$$;

    disconnect(){
        this.authService.logout();
    }

}