import { HttpOptions } from "@/types/http.type";

class HttpService {
  constructor() {}

  private async request(url: URL, options: HttpOptions = {}) {
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        console.error(`request Failed. request Status ${response.status}`);
      }
    } catch (err) {
      if (err instanceof TypeError) {
        console.error(
          "Request failed: invalid URL, invalid credentials, bad options, blocked by policy, or network error."
        );
      }
    }
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error();
    }

    return response;
  }
  // GET
  async get(url: URL, options: HttpOptions = {}) {
    return this.request(url, { ...options, method: "GET", cache: "default" });
  }

  // POST
  async post(url: URL, body: any, options: HttpOptions = {}) {
    return this.request(url, {
      ...options,
      method: "POST",
      headers: { "Content-Type": "application/json", ...options.headers },
      body: JSON.stringify(body),
    });
  }

  // PUT
  async put(url: URL, body: any, options: HttpOptions = {}) {
    return this.request(url, {
      ...options,
      method: "PUT",
      headers: { "Content-Type": "application/json", ...options.headers },
      body: JSON.stringify(body),
    });
  }

  // PATCH
  async patch(url: URL, body: any, options: HttpOptions = {}) {
    return this.request(url, {
      ...options,
      method: "PATCH",
      headers: { "Content-Type": "application/json", ...options.headers },
      body: JSON.stringify(body),
    });
  }

  // DELETE
  async delete(url: URL, options: HttpOptions = {}) {
    return this.request(url, { ...options, method: "DELETE" });
  }

  isValidUrl(url: URL | string | undefined): boolean {
    if (!url) return false;
    if (url instanceof URL) return true;

    try {
      new URL(url);
      return true;
    } catch (err) {
      return false;
    }
  }
}

export const http = new HttpService();
