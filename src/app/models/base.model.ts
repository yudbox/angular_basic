import { DeserializeModel } from 'src/app/models/deserealize.model';

export class BaseModel implements DeserializeModel {
  id?: string;
  selected?: boolean;
  deserialize?<T>(input: any): T {
    return { ...this, ...input };
  }
}
