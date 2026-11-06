import React, { useCallback, useEffect, useState } from 'react';
import { CircleAlert, ImagePlus, LoaderCircle, Save, ShieldCheck, Trash2 } from 'lucide-react';

type Request = (path: string, init?: RequestInit) => Promise<{ data?: { logoUrl?: string }; message?: string }>;
const fileAsDataUrl = (file: File) => new Promise<string>((resolve, reject) => {
  const reader = new FileReader(); reader.onload = () => typeof reader.result === 'string' ? resolve(reader.result) : reject(new Error('Could not read that file.')); reader.onerror = () => reject(new Error('Could not read that file.')); reader.readAsDataURL(file);
});

export const AdminBrandingManager: React.FC<{ request: Request }> = ({ request }) => {
  const [logoUrl, setLogoUrl] = useState('');
  const [imageData, setImageData] = useState('');
  const [preview, setPreview] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const load = useCallback(async () => {
    try { const result = await request('/branding'); setLogoUrl(result.data?.logoUrl || ''); setPreview(result.data?.logoUrl || ''); }
    catch (error) { setMessage(error instanceof Error ? error.message : 'Could not load site branding.'); }
    finally { setLoading(false); }
  }, [request]);
  useEffect(() => { load(); }, [load]);
  const chooseLogo = async (file?: File) => {
    if (!file) return;
    setMessage('');
    if (!['image/png', 'image/jpeg', 'image/webp', 'image/gif'].includes(file.type)) { setMessage('Choose a PNG, JPG, WEBP, or GIF image.'); return; }
    if (file.size > 5 * 1024 * 1024) { setMessage('The logo must be smaller than 5 MB.'); return; }
    try { const data = await fileAsDataUrl(file); setImageData(data); setPreview(data); }
    catch (error) { setMessage(error instanceof Error ? error.message : 'Could not read that image.'); }
  };
  const save = async () => {
    if (!imageData) return;
    setSaving(true); setMessage('');
    try {
      const result = await request('/branding/logo', { method: 'PUT', body: JSON.stringify({ imageData }) });
      setLogoUrl(result.data?.logoUrl || ''); setPreview(result.data?.logoUrl || ''); setImageData(''); setMessage('Logo updated across the website.');
    } catch (error) { setMessage(error instanceof Error ? error.message : 'Could not save the logo.'); }
    finally { setSaving(false); }
  };
  const remove = async () => {
    setSaving(true); setMessage('');
    try { await request('/branding/logo', { method: 'DELETE' }); setLogoUrl(''); setPreview(''); setImageData(''); setMessage('Custom logo removed. The studio wordmark is back in use.'); }
    catch (error) { setMessage(error instanceof Error ? error.message : 'Could not remove the logo.'); }
    finally { setSaving(false); }
  };

  return <div className="admin-branding"><div className="admin-heading-row"><div><p className="admin-kicker">SITE IDENTITY</p><h1>Branding</h1><p className="admin-subtitle">Update the mark shown across the public website.</p></div></div>{message && <div className="admin-notice"><CircleAlert size={16}/>{message}</div>}
    <section className="admin-branding-card"><div className="admin-branding-card-head"><div><h2>Website logo</h2><p>Used in the site navigation, footer, and browser tab.</p></div><ShieldCheck size={20}/></div><div className="admin-branding-preview">{loading ? <LoaderCircle className="animate-spin"/> : preview ? <img src={preview} alt="Logo preview"/> : <div className="admin-branding-fallback">dp<span>.</span></div>}</div><p className="admin-branding-caption">Preview on dark backgrounds · Transparent PNG recommended</p><div className="admin-branding-controls"><label className="admin-export admin-upload-logo"><ImagePlus size={15}/> Choose logo<input type="file" accept="image/png,image/jpeg,image/webp,image/gif" onChange={(event) => chooseLogo(event.target.files?.[0])}/></label><span>PNG, JPG, WEBP or GIF · Up to 5 MB</span></div><div className="admin-branding-actions"><button className="admin-editor-save" onClick={save} disabled={!imageData || saving}>{saving ? <LoaderCircle size={15} className="animate-spin"/> : <Save size={15}/>} Save logo</button>{logoUrl && <button className="admin-branding-remove" onClick={remove} disabled={saving}><Trash2 size={14}/> Remove custom logo</button>}</div></section>
  </div>;
};
