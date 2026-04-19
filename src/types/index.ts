// Types pour async - AUCUN ANY

export interface User {
  id: number;
  name: string;
  email: string;
  username: string;
}

export interface FormData {
  name: string;
  email: string;
  message: string;
}

export interface FileUploadResponse {
  success: boolean;
  filename: string;
  size: number;
  uploadedAt: string;
}

export interface ProcessingResult {
  processed: number;
  total: number;
  duration: number;
  results: string[];
}

export type AsyncStatus = 'idle' | 'pending' | 'success' | 'error';