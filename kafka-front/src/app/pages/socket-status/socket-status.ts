import { Component, inject } from "@angular/core";
import { SocketService } from "../../services/socket/socket.service";
import { SocketStatusEnum } from "../../services/socket/types/socket-status.type";

@Component({
    selector: 'app-socket-status',
    template: `
        <div class="flex flex-col sm:flex-row sm:items-center sm:gap-4 gap-2">
            @switch (connectionStatus().status) {
                @case (SOCKET_STATUS_ENUM.CONNECTING) {
                    <p class="text-sm font-medium text-yellow-600">
                        🔄 Socket Status: Connecting
                    </p>
                }
                @case (SOCKET_STATUS_ENUM.CONNECTED) {
                    <p class="text-sm font-medium text-green-600">
                        ✅ Socket Status: Connected
                    </p>
                }
                @case (SOCKET_STATUS_ENUM.DISCONNECTED) {
                    <p class="text-sm font-medium text-gray-600">
                        ⚪ Socket Status: Disconnected
                    </p>
                }
                @case (SOCKET_STATUS_ENUM.ERROR) {
                    <p class="text-sm font-medium text-red-600">
                        ❌ Socket Status: Error
                    </p>
                }
                @default {
                    <p class="text-sm font-medium text-gray-500">
                        ❓ Socket Status: Unknown
                    </p>
                }
            }

            @if(connectionStatus().message; as message){
                <p class="text-sm text-gray-700">
                    💬 Socket Message: <span class="font-medium">{{ message }}</span>
                </p>
            }
        </div>
    `,
    standalone: true,
    host: {
        class: 'rounded-lg border border-gray-200 bg-white p-4 shadow-sm mb-3 flex justify-center items-center'
    }
})
export class SocketStatusComponent {
    private readonly socketService = inject(SocketService);

    readonly connectionStatus = this.socketService.connectionStatus

    readonly SOCKET_STATUS_ENUM = SocketStatusEnum;
}