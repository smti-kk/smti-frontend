import {OperatorServiceItem} from '@api/dto/OperatorServiceItem';

export interface Operator {
  id?: number;
  icon?: string;
  name?: 'Билайн' | 'Мегафон' | 'Теле2' | 'МТС' | 'РТРС' | 'СибТТК' | 'Искра' | 'Ростелеком' | 'Неизвестный оператор';
  services?: OperatorServiceItem[];
  contacts?: string;
  juristicName?: string;
  iconFile?: any;
  inn?: string;
  kpp?: string;
}
