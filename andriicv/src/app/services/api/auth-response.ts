export interface Viewer {
    id: number;
    name: string;
    email: string;
    pin: string;
    created: string;
    expiration: number;
    visit: string;
    type: string;
  }
  
  export interface AuthResponse {
    statusCode: number;
    headers: {
      'Content-Type': string;
      'Access-Control-Allow-Origin': string;
      'Access-Control-Allow-Methods': string;
      'Access-Control-Allow-Headers': string;
      'Access-Control-Allow-Credentials': string;
    };
    body: string;
  }
