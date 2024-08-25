import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

import { Amplify } from 'aws-amplify';
import awsConfig from './aws-exports';

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolClientId: '2826a9t5qt8vn1gcni0pbaujpr',
      userPoolId: 'us-east-1_ksY67Z4PC'
    }
  }
});

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
