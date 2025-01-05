export interface RequestOptions {
    method?: string;
    headers?: HeadersInit;
    body?: any;
  }
  
  const BASE_URL = "http://localhost:8000/"; 
  
  export const apiRequest = async <T>(
    endpoint: string,
    options: RequestOptions = {}
  ): Promise<T> => {
    const { method = "POST", headers = {}, body } = options;
  
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: body ? JSON.stringify(body) : undefined,
      credentials: 'include',
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "API request failed");
    }
  
    return response.json();
  };