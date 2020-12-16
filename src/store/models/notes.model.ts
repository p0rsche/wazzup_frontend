
export default class NoteModel {
  id: number;
  text: string;
  created_at: string;
  updated_at: string;


  constructor() {
    this.id = 0;
    this.text = '';
    // eslint-disable-next-line @typescript-eslint/camelcase
    this.created_at = '';
    // eslint-disable-next-line @typescript-eslint/camelcase
    this.updated_at = '';
  }
}