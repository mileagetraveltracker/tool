export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { passkey } = req.body;
  const correctPass = process.env.PASSKEY;
  
  // TRACKING CODE - KUKUHA NG INFO NG USER
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'Unknown';
  const userAgent = req.headers['user-agent'] || 'Unknown';
  const time = new Date().toLocaleString('en-PH', { 
    timeZone: 'Asia/Manila',
    year: 'numeric',
    month: '2-digit', 
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
  
  const success = passkey === correctPass;
  
  // LOG SA VERCEL - ITO MAKIKITA MO SA LOGS
  console.log(`[MILEAGE LOGIN] ${time} | IP: ${ip} | SUCCESS: ${success} | Device: ${userAgent}`);
  // END TRACKING CODE

  if (success) {
    res.status(200).json({ success: true });
  } else {
    res.status(401).json({ success: false });
  }
}
