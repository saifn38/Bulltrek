import apiClient from '@/api/apiClient';
import type { AxiosResponse } from 'axios';

// Types
export interface TradeDirection {
  id: number;
  direction: string; // "BUY" | "SELL" | "HOLD"
}

// API Endpoints
export const directionApi = {
  
  getAll: (): Promise<AxiosResponse<TradeDirection[]>> => 
    apiClient.get('/api/v1/directions'),

  
  create: (direction: string): Promise<AxiosResponse<TradeDirection>> =>
    apiClient.post('/api/v1/directions', { direction }),

 
  getById: (id: number): Promise<AxiosResponse<TradeDirection>> =>
    apiClient.get(`/api/v1/directions/${id}`),


  update: (id: number, direction: string): Promise<AxiosResponse<TradeDirection>> =>
    apiClient.put(`/api/v1/directions/${id}`, { direction }),

  
  delete: (id: number): Promise<AxiosResponse<void>> =>
    apiClient.delete(`/api/v1/directions/${id}`)
};

//Quantities
export interface TradeQuantity {
    id: number;
    quantity: number; // e.g., 100 (shares), 0.5 (crypto)
  }
  
  export const quantityApi = {
    getAll: (): Promise<AxiosResponse<TradeQuantity[]>> => 
      apiClient.get('/api/v1/quantities'),
  
    create: (quantity: number): Promise<AxiosResponse<TradeQuantity>> =>
      apiClient.post('/api/v1/quantities', { quantity }),
  
    getById: (id: number): Promise<AxiosResponse<TradeQuantity>> =>
      apiClient.get(`/api/v1/quantities/${id}`),
  
    update: (id: number, quantity: number): Promise<AxiosResponse<TradeQuantity>> =>
      apiClient.put(`/api/v1/quantities/${id}`, { quantity }),
  
    delete: (id: number): Promise<AxiosResponse<void>> =>
      apiClient.delete(`/api/v1/quantities/${id}`)
  };


export interface TradeAsset {
  id: number;
  symbol: string; // e.g., "BTC/USD", "INFY"
  asset_class?: string; // e.g., "crypto", "equity"
}

export const assetApi = {
  getAll: (): Promise<AxiosResponse<TradeAsset[]>> => 
    apiClient.get('/api/v1/assets'),

  create: (symbol: string): Promise<AxiosResponse<TradeAsset>> =>
    apiClient.post('/api/v1/assets', { symbol }),

  getById: (id: number): Promise<AxiosResponse<TradeAsset>> =>
    apiClient.get(`/api/v1/assets/${id}`),

  update: (id: number, symbol: string): Promise<AxiosResponse<TradeAsset>> =>
    apiClient.put(`/api/v1/assets/${id}`, { symbol }),

  delete: (id: number): Promise<AxiosResponse<void>> =>
    apiClient.delete(`/api/v1/assets/${id}`)
};


// Indicators
export interface TradeIndicator {
    id: number;
    name: string; // e.g., "RSI", "MACD"
    description?: string;
    default_config?: Record<string, any>; // Optional configuration
  }
  
  export const indicatorApi = {
    getAll: (): Promise<AxiosResponse<TradeIndicator[]>> => 
      apiClient.get('/api/v1/indicators'),
  
    create: (name: string): Promise<AxiosResponse<TradeIndicator>> =>
      apiClient.post('/api/v1/indicators', { name }),
  
    getById: (id: number): Promise<AxiosResponse<TradeIndicator>> =>
      apiClient.get(`/api/v1/indicators/${id}`),
  
    update: (id: number, name: string): Promise<AxiosResponse<TradeIndicator>> =>
      apiClient.put(`/api/v1/indicators/${id}`, { name }),
  
    delete: (id: number): Promise<AxiosResponse<void>> =>
      apiClient.delete(`/api/v1/indicators/${id}`)
  };


  // Indicator Actions
  export interface IndicatorAction {
    id: number;
    action: string; // e.g., "BUY", "SELL", "HOLD"
    description?: string;
  }
  
  export const indicatorActionApi = {
    getAll: (): Promise<AxiosResponse<IndicatorAction[]>> => 
      apiClient.get('/api/v1/indicator-actions'),
  
    create: (action: string): Promise<AxiosResponse<IndicatorAction>> =>
      apiClient.post('/api/v1/indicator-actions', { action }),
  
    getById: (id: number): Promise<AxiosResponse<IndicatorAction>> =>
      apiClient.get(`/api/v1/indicator-actions/${id}`),
  
    update: (id: number, action: string): Promise<AxiosResponse<IndicatorAction>> =>
      apiClient.put(`/api/v1/indicator-actions/${id}`, { action }),
  
    delete: (id: number): Promise<AxiosResponse<void>> =>
      apiClient.delete(`/api/v1/indicator-actions/${id}`)
  };

  // Values

export interface IndicatorValue {
  id: number;
  value: number;  // e.g., 70 (for RSI), 0.5 (for MACD)
  description?: string;
}

export const valueApi = {
  getAll: (): Promise<AxiosResponse<IndicatorValue[]>> => 
    apiClient.get('/api/v1/values'),

  create: (value: number): Promise<AxiosResponse<IndicatorValue>> =>
    apiClient.post('/api/v1/values', { value }),

  getById: (id: number): Promise<AxiosResponse<IndicatorValue>> =>
    apiClient.get(`/api/v1/values/${id}`),

  update: (id: number, value: number): Promise<AxiosResponse<IndicatorValue>> =>
    apiClient.put(`/api/v1/values/${id}`, { value }),

  delete: (id: number): Promise<AxiosResponse<void>> =>
    apiClient.delete(`/api/v1/values/${id}`)
};

// Trade Mapping

export interface TradeMapping {
  id: number;
  direction_id: number;       // Reference to Directions API (BUY/SELL)
  quantity_id: number;        // Reference to Quantities API
  asset_id: number;           // Reference to Assets API
  indicator_id: number;       // Reference to Indicators API
  indicator_action_id: number; // Reference to IndicatorActions API
  value_id: number;           // Reference to Values API
  created_at?: string;
}

export const tradeMappingApi = {
  getAll: (): Promise<AxiosResponse<TradeMapping[]>> => 
    apiClient.get('/api/v1/trades'),

  create: (mapping: Omit<TradeMapping, 'id'|'created_at'>): Promise<AxiosResponse<TradeMapping>> =>
    apiClient.post('/api/v1/trades', mapping),

  getById: (id: number): Promise<AxiosResponse<TradeMapping>> =>
    apiClient.get(`/api/v1/trades/${id}`),

  update: (id: number, mapping: Partial<TradeMapping>): Promise<AxiosResponse<TradeMapping>> =>
    apiClient.put(`/api/v1/trades/${id}`, mapping),

  delete: (id: number): Promise<AxiosResponse<void>> =>
    apiClient.delete(`/api/v1/trades/${id}`)
};