export interface Operator {
  id: number;
  icon: string;
  name: 'Билайн' | 'Мегафон' | 'Теле2' | 'МТС' | 'РТРС' | 'СибТТК' | 'Искра' | 'Ростелеком' | 'Неизвестный оператор';
  services: string;
}
