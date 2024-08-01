import { environment } from "./environments/environment";

const awsConfig = {
  Auth: {
    accessKeyId: environment.accessKeyId,
    secretAccessKey: environment.secretAccessKey
  }
};

export default awsConfig;