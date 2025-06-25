import { DestroyRef, inject, Injectable, signal } from "@angular/core";
import { SocketService } from "./socket/socket.service";
import { EVENT_STREAMING_EVENTS } from "../constants/event.constant";
import { Observable, switchMap, tap } from "rxjs";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

@Injectable({
    providedIn: 'root'
})
export class EventStreamingService {
    private readonly _events = signal<string[]>([]);

    private readonly destroyRef = inject(DestroyRef);
    private readonly socketService = inject(SocketService);

    readonly events = this._events.asReadonly();

    constructor() {
        this.fetchInitialEvents();
    }

    private listenToNewEvents(): Observable<string> {
        return this.socketService.on<string>(EVENT_STREAMING_EVENTS.NEW_EVENT)
        .pipe(
            tap((event: string) => 
                this._events.update(events => [...events, event])
            )
        );
    }

    private fetchInitialEvents(): void {
        this.socketService.emit<undefined,string[]>(EVENT_STREAMING_EVENTS.EVENT_LIST).pipe(
            tap((events: string[]) => {
                this._events.set(events);
            }),
            switchMap(() => this.listenToNewEvents()),
            takeUntilDestroyed(this.destroyRef)
        ).subscribe();
    }
}