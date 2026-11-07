import { INITIAL_PRODUCTS } from '../data/products';
import { Product } from '../types/product';
import { apiBaseUrl } from './config';

const productsUrl = `${apiBaseUrl}/products`;

export async function getPublishedProducts(): Promise<Product[]> {
  try {
    const response = await fetch(productsUrl);
    if (!response.ok) throw new Error('Could not fetch products');
    const result = await response.json();
    if (!Array.isArray(result.data)) return INITIAL_PRODUCTS;
    const defaultsBySlug = new Map(INITIAL_PRODUCTS.map((product) => [product.slug, product]));
    return result.data.map((product: Product) => {
      const defaults = defaultsBySlug.get(product.slug) || defaultsBySlug.get(product.id);
      return {
        ...defaults,
        ...product,
        // Older cloud records may not have a slug. Product ids are stable and
        // can safely serve as the detail URL in that case.
        slug: product.slug || defaults?.slug || product.id,
        imageUrl: product.imageUrl || defaults?.imageUrl,
        details: product.details || defaults?.details || product.description,
        developmentStory: product.developmentStory || defaults?.developmentStory || '',
      };
    });
  } catch {
    return INITIAL_PRODUCTS;
  }
}
