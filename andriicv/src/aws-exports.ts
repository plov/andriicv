import { environment } from "./environments/environment";

type AuthConfig = {

  region: string;
  userPoolId: string;
  userPoolWebClientId: string;
  mandatorySignIn: boolean;
  authenticationFlowType: string;
};

const awsConfig:{ Auth: AuthConfig } = {
  Auth: {
    //accessKeyId: environment.accessKeyId,
   // secretAccessKey: environment.secretAccessKey,
    region: environment.region,
    userPoolId: environment.userPoolId,
    userPoolWebClientId: environment.userPoolWebClientId,
    mandatorySignIn: true,
    authenticationFlowType: 'USER_PASSWORD_AUTH'
  }
};

export default awsConfig;