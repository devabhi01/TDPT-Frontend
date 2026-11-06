import React, { useEffect, useState } from 'react';
import { ArrowLeft, ArrowUpRight, MoveRight, PackageOpen } from 'lucide-react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { Container } from '../components/common/Container';
import { SEO } from '../components/common/SEO';
import { ProductArtwork } from '../components/products/ProductArtwork';
import { getPublishedProducts } from '../services/products';
import { Product } from '../types/product';

export const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPublishedProducts().then(setProducts).finally(() => setLoading(false));
  }, []);

  // Older MongoDB records may predate the slug field. Accept the stable product
  // id as a fallback so existing links continue to resolve after deployment.
  const product = products.find((item) => item.slug === slug || item.id === slug);
  if (!loading && !product) return <Navigate to="/products" replace />;

  if (loading || !product) return <section className="product-detail-loading"><PackageOpen size={22}/><p>{loading ? 'Loading product details…' : 'Product unavailable.'}</p></section>;

  const paragraphs = (value: string) => value.split(/\n\s*\n/).map((paragraph) => paragraph.trim()).filter(Boolean);
  const details = product.details || product.description;
  const developmentStory = product.developmentStory || 'Our team shaped this product around the needs of its users, focusing on a clear experience and practical, reliable features.';

  return <>
    <SEO title={`${product.name} | Products`} description={product.description} canonical={`https://thedevpride.com/products/${product.slug}`} />
    <article className="product-detail-page">
      <Container size="wide">
        <Link to="/products" className="product-detail-back"><ArrowLeft size={15}/> All products</Link>
        <div className="product-detail-hero">
          <div className="product-detail-intro">
            <p className="studio-eyebrow">{product.category} · A DEV PRIDE PRODUCT</p>
            <h1>{product.name}</h1>
            <p className="product-detail-tagline">{product.tagline}</p>
            <p className="product-detail-summary">{product.description}</p>
            <div className="product-detail-actions">
              {product.websiteUrl && <a className="product-detail-visit" href={product.websiteUrl} target="_blank" rel="noreferrer">Visit product <ArrowUpRight size={16}/></a>}
              <Link className="product-detail-contact" to={`/contact?product=${encodeURIComponent(product.name)}`}>Talk to us about it <MoveRight size={15}/></Link>
            </div>
          </div>
          <ProductArtwork product={product}/>
        </div>
        <div className="product-detail-content">
          <section className="product-detail-copy">
            <p className="studio-eyebrow">01 / THE PRODUCT</p>
            <h2>Made for the work that matters.</h2>
            {paragraphs(details).map((paragraph, index) => <p key={index}>{paragraph}</p>)}
            {product.features.length > 0 && <ul className="product-detail-features">{product.features.map((feature) => <li key={feature}>{feature}</li>)}</ul>}
          </section>
          <section className="product-detail-copy product-development-story">
            <p className="studio-eyebrow">02 / HOW WE BUILT IT</p>
            <h2>Thought through, then carefully made.</h2>
            {paragraphs(developmentStory).map((paragraph, index) => <p key={index}>{paragraph}</p>)}
          </section>
        </div>
      </Container>
    </article>
  </>;
};
