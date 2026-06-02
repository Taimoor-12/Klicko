const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

type RequestOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  body?: unknown;
  headers?: Record<string, string>;
  queryParams?: Record<string, string | number>;
};

type ErrorResponse = {
  message: string;
  details?: any;
}

type ApiResponse<T> = {
  data: T;
  status: number;
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

    if (response.status === 429) {
      throw new Error('Too many requests. Please try again later.');
    }

    if (!response.ok) {
      const error: ErrorResponse = await response.json();

      throw new Error(error.message ?? 'Something went wrong');
    }

    const data = await response.json();

    return {
      data,
      status: response.status
    };
  } catch (err) {
    if (err instanceof TypeError) {
      throw new Error("Unreachable. Please try again later.");
    }

    throw err;
  }
}

export default request;
