export interface Project {
  title: string;
  slug: string;
  folder: string;
  category: string;
  location?: string;
  year?: string;
}

export interface CloudinaryImage {
  public_id: string;
  secure_url: string;
  width: number;
  height: number;
  format: string;
}

export interface CloudinaryResource {
  public_id: string;
  secure_url: string;
  width: number;
  height: number;
  format: string;
}

export interface CloudinarySearchResponse {
  resources: CloudinaryResource[];
  total_count: number;
}

export interface ContactFormState {
  success: boolean;
  errors?: Record<string, string>;
  message?: string;
}
