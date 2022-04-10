import { BaseModel } from './base.model';

export class PostsModel extends BaseModel {
  title: string;
  content: string;
  id?: string;
}
