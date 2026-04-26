export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { pass } = req.body;
  
  // Kunin natin both passwords sa Vercel
  const publicPass = process.env.PUBLIC_PASS;
  const adminPass = process.env.ADMIN_PASS;

  // Check kung tama sa public OR sa admin
  if (pass === publicPass || pass === adminPass) {
    return res.status(200).json({ 
      ok: true, 
      role: pass === adminPass ? 'admin' : 'public' // para malaman mo kung admin nag-login
    });
  } else {
    return res.status(401).json({ ok: false, error: 'Wrong password' });
  }
}
