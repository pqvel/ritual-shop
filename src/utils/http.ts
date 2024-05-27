class HttpClient {
  private async request<T>(
    url: string,
    method: string,
    body?: any
  ): Promise<T> {
    try {
      const headers: HeadersInit = {};

      if (body && !(body instanceof FormData)) {
        headers["Content-Type"] = "application/json";
        body = JSON.stringify(body);
      }

      const response = await fetch(url, {
        method,
        headers,
        body,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `HTTP error! status: ${response.status}, message: ${errorText}`
        );
      }

      return response.json();
    } catch (error) {
      console.error(`Error in request to ${method} ${url}:`, error);
      throw error;
    }
  }

  public get<T>(url: string): Promise<T> {
    return this.request<T>(url, "GET");
  }

  public post<T>(url: string, body: any): Promise<T> {
    return this.request<T>(url, "POST", body);
  }

  public delete<T>(url: string): Promise<T> {
    return this.request<T>(url, "DELETE");
  }

  public put<T>(url: string, body: any): Promise<T> {
    return this.request<T>(url, "PUT", body);
  }

  public patch<T>(url: string, body: any): Promise<T> {
    return this.request<T>(url, "PATCH", body);
  }
}

export const httpClient = new HttpClient();
