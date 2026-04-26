export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { passkey } = req.body;
  
  if (!passkey) {
    return res.status(400).json({ error: 'Passkey is required' });
  }

  const MASTER_PASS = "MILEAGE-OCT26";
  
  if (passkey === MASTER_PASS) {
    return res.status(200).json({ message: 'Access granted' });
  } else {
    return res.status(403).json({ error: 'Expired or wrong passkey. Message admin for new pass.' });
  }
}
