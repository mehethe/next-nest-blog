import { ActionResponse } from '@/types/action-response';
import { getServerAuth } from './auth-handler';

type Headers = {
  'Content-Type'?: string; // Default to application/json when sending data
  Authorization?: string; // Bearer token for protected routes
};

type RequestData = Record<string, any>; // Dynamic object for request data

type FuncProps = {
  auth?: boolean; // Indicates if the request requires authorization
  endpoint: string; // API endpoint
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'; // HTTP methods
  data?: RequestData; // Data to send in the request body
};

const BASE_URL = process.env.BACKEND;

const headers: Headers = {};

//try-catch not required since it will be invoked inside actionAcyncHandler
export default async function sendRequest<T = any>({
  auth = false,
  endpoint,
  method = 'GET',
  data,
}: FuncProps): Promise<ActionResponse<T>> {
  // Add default headers if data is present
  if (data) {
    headers['Content-Type'] = 'application/json';
  }

  // Add authorization header if the request is protected
  if (auth) {
    const { token } = await getServerAuth();
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    } else {
      throw new Error('Authorization token is missing!');
    }
  }

  // Create request options
  const options: RequestInit = {
    method,
    headers,
    ...(data && { body: JSON.stringify(data) }),
  };

  // Make the HTTP request
  const res = await fetch(`${BASE_URL}${endpoint}`, options);

  const resData = await res.json();

  // Check for HTTP errors
  if (!res.ok || !resData.success) {
    const errMsg = resData?.message || 'Something went wrong!';
    console.log('http request error', errMsg);
    throw new Error(errMsg);
  }

  return resData;
}
