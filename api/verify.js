export default async function handler(req, res) {
  const { passkey, deviceId } = req.body;
  const KVDB_URL = "https://kvdb.io/EHv2rsn95n9QK7XfAktEWK"; // Bucket mo yan

  if (!passkey || !deviceId) {
    return res.status(400).json({ error: "Missing passkey or deviceId" });
  }

  try {
    // 1. Check kung may naka-lock na device sa passkey na to
    const getRes = await fetch(`${KVDB_URL}/${passkey}`);
    const lockedDevice = await getRes.text();

    // 2. Wala pang naka-lock = i-lock natin sa device nya ngayon
    if (!lockedDevice || lockedDevice === "null") {
      await fetch(`${KVDB_URL}/${passkey}`, {
        method: "POST",
        body: deviceId
      });
      return res.status(200).json({ success: true, message: "Device locked" });
    }

    // 3. May naka-lock na = check kung same device
    if (lockedDevice === deviceId) {
      return res.status(200).json({ success: true, message: "Device verified" });
    } else {
      return res.status(403).json({ error: "This passkey is already used on another device" });
    }

  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
}
