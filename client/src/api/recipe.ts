const BASE_URL = '/api';

export interface Recipe {
  id: number;
  name: string;
  link: string;
}

export async function findAll() {
  const response = await fetch(BASE_URL + '/recipe');
  return response.json();
}
