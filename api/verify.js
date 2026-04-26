import { Redis } from '@upstash/redis';

const redis = Redis.fromEnv();

export default async function handler(req, res) {
  const { k, t } = req.query;

  if (!k ||!t || t.length < 10) {
    return res.status(400).send('<h2>Invalid Link</h2><p>Contact support.</p>');
  }

  const ua = req.headers['user-agent'] || '';
  const ip = req.headers['x-forwarded-for']?.split(',')[0] || 'unknown';
  const deviceId = `${ip}-${ua}`.slice(0, 100);

  const usedBy = await redis.get(k);

  if (usedBy && usedBy!== deviceId) {
    return res.status(403).send(`
      <h2>Link Already Activated</h2>
      <p>This access link was already used on another device.</p>
      <p>Each license is valid for 1 device only.</p>
    `);
  }

  if (!usedBy) {
    await redis.set(k, deviceId);
  }

  res.redirect(302, `https://mileage.artisandev.cloud/?ref=${k}`);
}
