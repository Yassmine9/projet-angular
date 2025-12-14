import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { RouterModule } from '@angular/router';
importProvidersFrom
import { HttpClientModule} from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
bootstrapApplication(App, {
  providers: [
    provideRouter(routes),
    importProvidersFrom( HttpClientModule)
  ]
});