export interface DLocationBase {
  id: number;
  type: string;
  name: string;
  parent: DLocationBase;
}
