import httpClient from '@/core/api/client';

export interface DashboardSummary {
  totalVentas: number;
  ventasHoy: number;
  clientesActivos: number;
  stockBajo: number;
  totalProductos?: number;
}

export interface Producto {
  id: number;
  codigo: string;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  activo: boolean;
}

export interface Cliente {
  id: number;
  identificacion: string;
  nombres: string;
  apellidos: string;
  email: string;
  telefono: string;
  direccion: string;
  activo: boolean;
}

export interface Venta {
  id: number;
  clienteId: number;
  fecha: string;
  total: number;
  iva: number;
  estado: string; // Ej: 'Completada', 'Anulada'
  cliente?: Cliente;
}

export const adminApi = {
  // --- Dashboard ---
  getDashboardSummary: async (): Promise<DashboardSummary> => {
    try {
      const response = await httpClient.get('/Dashboard/summary');
      return response.data;
    } catch (e: any) {
      console.error('Error en getDashboardSummary:', e.response?.data);
      throw e;
    }
  },

  // --- Productos ---
  getProductos: async (): Promise<Producto[]> => {
    try {
      const response = await httpClient.get('/Products');
      return response.data;
    } catch (e: any) {
      console.error('Error en getProductos:', e.response?.data);
      throw e;
    }
  },

  // --- Clientes ---
  getClientes: async (): Promise<Cliente[]> => {
    try {
      const response = await httpClient.get('/Clients');
      return response.data;
    } catch (e: any) {
      console.error('Error en getClientes:', e.response?.data);
      throw e;
    }
  },

  // --- Ventas ---
  getVentas: async (): Promise<Venta[]> => {
    try {
      const response = await httpClient.get('/Sales');
      return response.data;
    } catch (e: any) {
      console.error('Error en getVentas:', e.response?.data);
      throw e;
    }
  },
  
  // --- Exportación y Carga Masiva ---
  exportSalesToExcel: async (): Promise<Blob> => {
    const response = await httpClient.get('/Sales/export-excel', {
      responseType: 'blob',
    });
    return response.data;
  },

  downloadProductsTemplate: async (): Promise<Blob> => {
    const response = await httpClient.get('/Products/template-excel', {
      responseType: 'blob',
    });
    return response.data;
  },

  importProductsExcel: async (file: File): Promise<any> => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await httpClient.post('/Products/import-excel', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }
};
