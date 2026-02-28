import axios from 'axios';
import type { Note, NoteTag } from '../types/note';

const api = axios.create({
  baseURL: 'https://notehub-public.goit.study/api',
});

api.interceptors.request.use((config) => {
  const token = import.meta.env.VITE_NOTEHUB_TOKEN as string | undefined;
  if (!token) throw new Error('Missing VITE_NOTEHUB_TOKEN in .env');

  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export interface FetchNotesParams {
  page: number;
  perPage: number;
  search?: string;
}

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

interface CreateNoteBody {
  title: string;
  content: string;
  tag: NoteTag;
}

export async function fetchNotes(params: FetchNotesParams): Promise<FetchNotesResponse> {
  const response = await api.get<FetchNotesResponse>('/notes', {
    params: {
      page: params.page,
      perPage: params.perPage,
      search: params.search?.trim() || undefined,
    },
  });

  return response.data;
}

export async function createNote(body: CreateNoteBody): Promise<Note> {
  const response = await api.post<Note>('/notes', body);
  return response.data;
}

export async function deleteNote(noteId: string): Promise<Note> {
  const response = await api.delete<Note>(`/notes/${noteId}`);
  return response.data;
}
