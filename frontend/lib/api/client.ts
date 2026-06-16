const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

if (!BASE_URL) {
  throw new Error("NEXT_PUBLIC_API_URL is missing");
}

type RequestOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  body?: unknown;
  headers?: Record<string, string>;
  queryParams?: Record<string, string | number>;
};

export type ApiError = {
  message: string;
  details?: any;
}

export type ApiResponse<T> = {
  data?: T;
  error?: ApiError;
  status?: number;
  headers?: Headers;
}

async function request<T>(endpoint: string, options: RequestOptions = {}): Promise<ApiResponse<T>> {
  try {
    const { 
      method = 'GET', 
      body,
      headers = {},
      queryParams = {}
    } = options;

    const searchParams = new URLSearchParams();

    Object.entries(queryParams).forEach(([key, value]) => {
      searchParams.append(key, String(value));
    })

    const url = `${BASE_URL}${endpoint}${
      searchParams.toString() ? `?${searchParams.toString()}` : ""
    }`;

    const response = await fetch(url, {
      method,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        ...headers
      },
      body: body ? JSON.stringify(body) : undefined
    });

    const json = await response.json().catch(() => null);

    if (response.status === 429) {
      return {
        error: { message: 'Too many requests. Please try again later.' } ,
        status: response.status
      }
    }

    if (!response.ok) {
      return {
        error: { message: json?.message || 'Something went wrong' },
        status: response.status
      }
    }

    return {
      data: json,
      status: response.status,
      headers: response.headers
    };
  } catch {
    return {
      error: { message: 'Network error. Please try again later.' },
    };
  }
}

export default request;
