import React, { useCallback, useEffect, useState } from 'react';
import { ArrowUpRight, CircleAlert, Edit3, ImagePlus, LoaderCircle, PackagePlus, Plus, Save, Trash2, X } from 'lucide-react';
import { Product } from '../types/product';
import { INITIAL_PRODUCTS } from '../data/products';

type Request = (path: string, init?: RequestInit) => Promise<{ data?: Product[] | Product; message?: string }>;
type ProductForm = Pick<Product, 'name' | 'tagline' | 'description' | 'category' | 'websiteUrl' | 'status' | 'featured'> & { details: string; developmentStory: string; featuresText: string };
const blankForm: ProductForm = { name: '', tagline: '', description: '', details: '', developmentStory: '', category: 'Education technology', websiteUrl: '', status: 'draft', featured: false, featuresText: '' };
const fileAsDataUrl = (file: File) => new Promise<string>((resolve, reject) => { const reader = new FileReader(); reader.onload = () => typeof reader.result === 'string' ? resolve(reader.result) : reject(new Error('Could not read image.')); reader.onerror = () => reject(new Error('Could not read image.')); reader.readAsDataURL(file); });

export const AdminProductsManager: React.FC<{ request: Request }> = ({ request }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [editorOpen, setEditorOpen] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [form, setForm] = useState<ProductForm>(blankForm);
  const [imageData, setImageData] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [removeImage, setRemoveImage] = useState(false);
  const refresh = useCallback(async () => {
    try { const result = await request('/products'); setProducts(Array.isArray(result.data) ? result.data : []); }
    catch (err) { setError(err instanceof Error ? err.message : 'Could not load products.'); }
    finally { setLoading(false); }
  }, [request]);
  useEffect(() => { refresh(); }, [refresh]);
  const startNew = () => { setEditing(null); setForm(blankForm); setImageData(''); setImagePreview(''); setRemoveImage(false); setError(''); setEditorOpen(true); };
  const startEdit = (product: Product) => {
    const defaults = INITIAL_PRODUCTS.find((item) => item.slug === product.slug);
    setEditing(product);
    setForm({ name: product.name, tagline: product.tagline, description: product.description, details: product.details || defaults?.details || product.description, developmentStory: product.developmentStory || defaults?.developmentStory || '', category: product.category, websiteUrl: product.websiteUrl || '', status: product.status, featured: product.featured, featuresText: product.features.join('\n') });
    setImageData(''); setImagePreview(product.imageUrl || ''); setRemoveImage(false);
    setError(''); setEditorOpen(true);
  };
  const chooseImage = async (file?: File) => {
    if (!file) return;
    if (!['image/png', 'image/jpeg', 'image/webp', 'image/gif'].includes(file.type)) { setError('Choose a PNG, JPG, WEBP, or GIF image.'); return; }
    if (file.size > 5 * 1024 * 1024) { setError('Product images must be smaller than 5 MB.'); return; }
    try { const data = await fileAsDataUrl(file); setImageData(data); setImagePreview(data); setRemoveImage(false); setError(''); }
    catch (err) { setError(err instanceof Error ? err.message : 'Could not read image.'); }
  };
  const save = async (event: React.FormEvent) => {
    event.preventDefault(); setSaving(true); setError('');
    const { featuresText, ...fields } = form;
    const body = { ...fields, features: featuresText.split('\n').map((feature) => feature.trim()).filter(Boolean), ...(imageData ? { imageData } : {}), ...(removeImage ? { removeImage: true } : {}) };
    try {
      await request(editing ? `/products/${encodeURIComponent(editing.id)}` : '/products', { method: editing ? 'PATCH' : 'POST', body: JSON.stringify(body) });
      setEditorOpen(false); await refresh();
    } catch (err) { setError(err instanceof Error ? err.message : 'Could not save product.'); }
    finally { setSaving(false); }
  };
  const remove = async (product: Product) => {
    if (!window.confirm(`Delete ${product.name}? This cannot be undone.`)) return;
    try { await request(`/products/${encodeURIComponent(product.id)}`, { method: 'DELETE' }); await refresh(); }
    catch (err) { setError(err instanceof Error ? err.message : 'Could not delete product.'); }
  };

  return <div className="admin-products"><div className="admin-heading-row"><div><p className="admin-kicker">STUDIO CATALOGUE</p><h1>Products</h1><p className="admin-subtitle">Manage the products shown on your website.</p></div><button className="admin-export admin-add-product" onClick={startNew}><Plus size={15}/> Add product</button></div>
    {error && <div className="admin-notice"><CircleAlert size={16}/>{error}<button onClick={() => setError('')} aria-label="Dismiss"><X size={15}/></button></div>}
    {loading ? <div className="admin-products-empty"><LoaderCircle className="animate-spin"/> Loading products</div> : products.length ? <div className="admin-products-list">{products.map((product, index) => <article key={product.id} className="admin-product-card"><div className={`admin-product-tile tile-${index % 3}`}>{product.imageUrl && <img src={product.imageUrl} alt=""/>}<span>DP / PRODUCT {String(index + 1).padStart(2, '0')}</span>{!product.imageUrl && <PackagePlus size={36}/>}<strong>{product.name}</strong></div><div className="admin-product-card-copy"><div className="admin-product-meta"><span>{product.category}</span><span className={`admin-status-pill ${product.status}`}>{product.status}</span>{product.featured && <span className="admin-featured-tag">FEATURED</span>}</div><h2>{product.name}</h2><h3>{product.tagline}</h3><p>{product.description}</p><small>{product.features.length} listed features{product.websiteUrl ? ` · ${product.websiteUrl}` : ' · No product link set'}{product.imageUrl ? ' · Image added' : ''}</small><div className="admin-product-actions"><button onClick={() => startEdit(product)}><Edit3 size={14}/> Edit product</button><button className="admin-product-delete" onClick={() => remove(product)}><Trash2 size={14}/> Delete</button>{product.status === 'published' && <a href={`/products#${product.slug}`} target="_blank" rel="noreferrer">View live <ArrowUpRight size={14}/></a>}</div></div></article>)}</div> : <div className="admin-products-empty"><PackagePlus/><strong>No products yet</strong><span>Add a product to introduce it on the website.</span></div>}
    {editorOpen && <div className="admin-product-modal-overlay" onMouseDown={(event) => { if (event.target === event.currentTarget) setEditorOpen(false); }}><form className="admin-product-editor" onSubmit={save}><div className="admin-product-editor-head"><div><p className="admin-kicker">{editing ? 'EDIT PRODUCT' : 'NEW PRODUCT'}</p><h2>{editing ? 'Refine the details.' : 'Add to the catalogue.'}</h2></div><button type="button" onClick={() => setEditorOpen(false)} aria-label="Close"><X size={19}/></button></div><label>Product name<input maxLength={100} required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Product name"/></label><label>Short tagline<input maxLength={180} required value={form.tagline} onChange={(e) => setForm({ ...form, tagline: e.target.value })} placeholder="A clear, memorable line"/></label><label>Short description<textarea maxLength={1500} required rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="A concise introduction shown on product cards"/></label><label>Product details<textarea maxLength={5000} required rows={5} value={form.details} onChange={(e) => setForm({ ...form, details: e.target.value })} placeholder="Explain what the product does, who it helps, and its key value."/></label><label>How we developed it<textarea maxLength={8000} required rows={6} value={form.developmentStory} onChange={(e) => setForm({ ...form, developmentStory: e.target.value })} placeholder="Describe the problem, design choices, development process, and what makes the product work well."/></label><div className="admin-editor-two"><label>Category<input maxLength={80} required value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} placeholder="Education technology"/></label><label>Product link<input type="url" value={form.websiteUrl} onChange={(e) => setForm({ ...form, websiteUrl: e.target.value })} placeholder="https://"/></label></div><div className="admin-product-image-field"><span>Product image</span>{imagePreview && <div className="admin-product-image-preview"><img src={imagePreview} alt="Product preview"/></div>}<div className="admin-product-image-actions"><label className="admin-export"><ImagePlus size={15}/>{imagePreview ? 'Replace image' : 'Choose image'}<input type="file" accept="image/png,image/jpeg,image/webp,image/gif" onChange={(e) => chooseImage(e.target.files?.[0])}/></label>{imagePreview && <button type="button" className="admin-branding-remove" onClick={() => { setImageData(''); setImagePreview(''); setRemoveImage(Boolean(editing?.imageUrl)); }}><Trash2 size={14}/> Remove image</button>}</div><small>Recommended: 1600 × 900 px (16:9). Use at least 1200 × 675 px for sharp results. The website displays images in a 16:9 frame. PNG, JPG, WEBP, or GIF · Up to 5 MB.</small></div><label>Features <small>(one per line)</small><textarea rows={3} value={form.featuresText} onChange={(e) => setForm({ ...form, featuresText: e.target.value })} placeholder={'Live lessons\nCourse materials\nProgress tracking'}/></label><div className="admin-editor-options"><label className="admin-publish-choice">Visibility<select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as ProductForm['status'] })}><option value="draft">Draft · hidden from website</option><option value="published">Published · visible on website</option></select></label><label className="admin-feature-choice"><input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })}/> Feature on homepage</label></div>{error && <p className="admin-error"><CircleAlert size={15}/>{error}</p>}<div className="admin-editor-footer"><button type="button" onClick={() => setEditorOpen(false)}>Cancel</button><button className="admin-editor-save" disabled={saving}>{saving ? <LoaderCircle size={15} className="animate-spin"/> : <Save size={15}/>} {editing ? 'Save changes' : 'Add product'}</button></div></form></div>}
  </div>;
};
