export type QuoteResponse = {
  id: number;
  quote: string;
  author: string;
};

export async function getMotivationalQuote(): Promise<QuoteResponse> {
  const response = await fetch('https://dummyjson.com/quotes/random');

  if (!response.ok) {
    throw new Error('Erro ao buscar frase motivacional');
  }

  const data: QuoteResponse = await response.json();
  return data;
}