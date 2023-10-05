export interface HttpAuthHeader {
  setAuthHeaders(headers: { [key: string]: string | null }): HttpAuthHeader;
}
