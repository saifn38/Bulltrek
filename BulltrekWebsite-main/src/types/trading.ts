export interface Direction {
  id: number;
  direction: string;
}

export interface Quantity {
  id: number;
  quantity: number;
}

export interface Asset {
  id: number;
  symbol: string;
}

export interface Indicator {
  id: number;
  name: string;
}

export interface IndicatorAction {
  id: number;
  action: string;
}

export interface IndicatorValue {
  id: number;
  value: number;
}