import { HttpClientModule } from '@angular/common/http';
import { importProvidersFrom, InjectionToken, ValueProvider } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';

export type Environment = 'dev' | 'staging' | 'prod';

export interface AppConfig {
  version: string;
  apiUrl: string;
  environment: Environment;
}

export const APP_CONFIG = new InjectionToken<AppConfig>('app.config');

export const getAppConfigProvider = (value: AppConfig): ValueProvider => ({
  provide: APP_CONFIG,
  useValue: value
});

bootstrapApplication(AppComponent, {
  providers: [
    getAppConfigProvider(environment),
    importProvidersFrom(HttpClientModule)
  ]
})