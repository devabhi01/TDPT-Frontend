import React, { useEffect, useState } from 'react';
import { ArrowUpRight, MoveRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Product } from '../../types/product';
import { getPublishedProducts } from '../../services/products';
import { ProductArtwork } from './ProductArtwork';

export const ProductsSpotlight: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => { getPublishedProducts().then(setProducts); }, []);
  const product = products.find((item) => item.featured) || products[0];
  if (!product) return null;
  return <section className="studio-products"><div className="studio-section-index">03 <span>MADE BY DEV PRIDE</span></div><div className="studio-products-layout"><ProductArtwork product={product}/><div className="studio-products-copy"><p className="studio-eyebrow">OUR PRODUCTS · {product.category}</p><h2>Purposeful tools.<br/>Made with <em>care.</em></h2><p className="studio-products-name">{product.name}</p><p>{product.tagline}</p><p>{product.description}</p><div className="studio-products-links"><Link to={`/products/${product.slug}`} className="studio-underlined">Know more about {product.name} <ArrowUpRight size={15}/></Link><Link to="/products" className="studio-all-products">All products <MoveRight size={15}/></Link></div></div></div></section>;
};
