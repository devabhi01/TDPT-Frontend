import React from 'react';
import { BookOpen, CircleDot, PencilRuler } from 'lucide-react';
import { Product } from '../../types/product';

export const ProductArtwork: React.FC<{ product: Product; index?: number }> = ({ product, index = 1 }) => <div className={`product-artwork product-artwork-${index % 3}`} aria-label={`${product.name} product illustration`}>
  {product.imageUrl ? <img className="product-artwork-image" src={product.imageUrl} alt={`${product.name} product`} /> : <><div className="product-art-grid"/><div className="product-art-paper"><div className="product-art-paper-top"><span>DEV PRIDE / PRODUCT</span><span>0{index}</span></div><div className="product-art-brand"><span className="product-art-icon"><BookOpen size={24}/></span><strong>{product.name}</strong><small>BUILT WITH INTENTION.</small></div><div className="product-art-lines"><i/><i/><i/></div><div className="product-art-orbit"><CircleDot size={15}/></div><span className="product-art-tool"><PencilRuler size={17}/></span><div className="product-art-paper-bottom"><span>DESIGNED WITH CARE</span><span>{product.category.toUpperCase()}</span></div></div></>}
</div>;
