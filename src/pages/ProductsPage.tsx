import React, { useEffect, useState } from 'react';
import { ArrowUpRight, CircleAlert, PackageOpen, MoveRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/common/SEO';
import { Container } from '../components/common/Container';
import { ProductArtwork } from '../components/products/ProductArtwork';
import { getPublishedProducts } from '../services/products';
import { Product } from '../types/product';

export const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => { getPublishedProducts().then(setProducts).finally(() => setLoading(false)); }, []);
  return <>
    <SEO title="Products | The Dev Pride Technology" description="Explore digital products built by The Dev Pride Technology." canonical="https://thedevpride.com/products" />
    <section className="products-page-hero"><Container size="wide"><p className="studio-eyebrow">THOUGHTFULLY MADE, READY TO USE</p><h1>Small ideas.<br/><em>Useful tools.</em></h1><div><p>Products from The Dev Pride Technology, built around real needs and made with care.</p><span>PRODUCTS BY DEV PRIDE <b>·</b> 2026</span></div></Container></section>
    <section className="products-page-list"><Container size="wide"><div className="products-page-intro"><span>OUR PRODUCTS / {String(products.length).padStart(2, '0')}</span><p>Made by our team. Managed here in the studio.</p></div>
      {loading ? <div className="products-empty"><PackageOpen/><p>Gathering the product collection…</p></div> : products.length ? <div className="products-page-grid">{products.map((product, index) => <article id={product.slug} className="products-page-card" key={product.id}><ProductArtwork product={product} index={index + 1}/><div className="products-page-card-copy"><div className="products-card-meta"><span>{product.category}</span>{product.featured && <span>STUDIO PICK</span>}</div><h2>{product.name}</h2><h3>{product.tagline}</h3><p>{product.description}</p>{product.features.length > 0 && <ul>{product.features.map((feature) => <li key={feature}>{feature}</li>)}</ul>}<div className="products-page-card-actions"><Link to={`/products/${product.slug}`} className="products-know-more">Know more <MoveRight size={15}/></Link>{product.websiteUrl ? <a href={product.websiteUrl} target="_blank" rel="noreferrer">Visit product <ArrowUpRight size={15}/></a> : <Link to={`/contact?product=${encodeURIComponent(product.name)}`}>Ask us about it <ArrowUpRight size={15}/></Link>}</div></div></article>)}</div> : <div className="products-empty"><CircleAlert/><p>There are no published products to show right now.</p></div>}
    </Container></section>
  </>;
};
