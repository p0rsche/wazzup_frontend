import axios from "./api";
import { SERVER_URL } from "../helpers/constants";
import Pagination from "@/store/models/pagination.model";
import { NotesResponse, WithPagination } from "@/helpers/types";

const notesUrl = `${SERVER_URL}/api/notes`;

class UserService {
  getAllNotes(params: Partial<Pagination> | URLSearchParams): Promise<WithPagination<NotesResponse>> {
    return axios.get(notesUrl, { params });
  }

  getNoteById(id: number | string) {
    const url = `${notesUrl}/${id}`;
    return axios.get(url);
  }

  deleteNote(id: number | string) {
    const url = `${notesUrl}/${id}`;
    return axios.delete(url);
  }

  createNote(text: string) {
    return axios.post(notesUrl, { text });
  }

  editNote({ id, text }: { [key: string]: string }) {
    const url = `${notesUrl}/${id}`;
    return axios.patch(url, { text });
  }

  shareNote(id: number | string) {
    const url = `${notesUrl}/${id}/share`;
    return axios.post(url);
  }

  deleteSharedNote(id: number | string) {
    const url = `${notesUrl}/${id}/share`;
    return axios.delete(url);
  }
}

export default new UserService();
