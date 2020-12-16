import NoteModel from "@/store/models/notes.model";

interface Pagination {
  total?: number;
  lastPage?: number;
  currentPage: number;
  perPage: number;
  from: number;
  to: number;
}

export interface CredentialsResponse {
  user: UserModel;
  accessToken: string;
  expiresIn: number;
}

export interface PayloadCredentials {
  [key: string]: string;
}

export interface NotesResponse {
  notes: Array<NoteModel>;
}

export interface WithPagination<T> {
  [key: string]: T;
  pagination: IPagination;
}