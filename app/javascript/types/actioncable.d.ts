declare module "@rails/actioncable" {
  export interface Subscription {
    unsubscribe(): void;
    perform(action: string, data?: object): void;
    send(data: object): void;
  }

  export interface Subscriptions {
    create(
      channelOrOptions: string | { channel: string; [key: string]: unknown },
      mixin?: {
        connected?: () => void;
        disconnected?: () => void;
        received?: (data: unknown) => void;
        rejected?: () => void;
      }
    ): Subscription;
  }

  export interface Consumer {
    subscriptions: Subscriptions;
    connect(): void;
    disconnect(): void;
  }

  export function createConsumer(url?: string): Consumer;
}
