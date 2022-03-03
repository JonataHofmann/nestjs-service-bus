import { ModuleMetadata, Provider, Type } from "@nestjs/common";
import {
  MessageHandlers,
  ServiceBusClientOptions,
  SubscribeOptions,
} from "@azure/service-bus";

export interface SbClientOptions {
  connectionString: string;
  options?: ServiceBusClientOptions;
}
export interface SbSubscriptionOptions {
  handlers: MessageHandlers;
  options?: SubscribeOptions;
}

export interface SbOptions {
  client: SbClientOptions;
  subscription?: SbSubscriptionOptions;
}

export type SbProvider = SbOptions;

export type SbProviderOptions = SbProvider & {
  name: string | symbol;
};

export type SbModuleOptions = Array<SbProviderOptions>;

export interface SbModuleOptionsFactory {
  createClientOptions(): Promise<SbProvider> | SbProvider;
}

export interface SbProviderAsyncOptions
  extends Pick<ModuleMetadata, "imports"> {
  useExisting?: Type<SbModuleOptionsFactory>;
  useClass?: Type<SbModuleOptionsFactory>;
  useFactory?: (...args: any[]) => Promise<SbProvider> | SbProvider;
  inject?: any[];
  extraProviders?: Provider[];
  name: string | symbol;
}

export type SbModuleAsyncOptions = Array<SbProviderAsyncOptions>;
