interface Reaccesspoint {
  address: string;
  billing_id: number;
  completed: boolean;
  connection_type: [];
  contract: any;
  contractor: string;
  created_at: Date;
  customer: string;
  defined_speed: string;
  description: string;
  government_program: {
    id: number,
    short_name: string,
    full_name: string,
    description: null
  };
  id: number;
  ip_config: any;
  max_amount: number;
  name: string;
  net_traffic_last_month: string;
  net_traffic_last_week: string;
  node: any;
  operator: any;
  quality: any;
  state: any;
  ucn: number;
  updated_at: Date;
  visible: true;
}


export interface Organization {
  address: string;
  fias: string;
  full_name: string;
  id: number;
  inn: number;
  kpp: number;
  parent: any;
  reaccesspoints: Reaccesspoint[];
}
