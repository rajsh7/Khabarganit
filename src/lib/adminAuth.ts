// KhabarGanit Newsroom Admin Authentication
export const ADMIN_CREDENTIALS = {
  EMAIL: "newsroom@khabarganit.com",
  PASSWORD: "0411@Khabar",
};

export const ADMIN_COOKIE_NAME = "kg_admin_session";
const SESSION_DURATION_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

function getSecretKey(): string {
  return process.env.NEXTAUTH_SECRET || "khabarganit-admin-secure-auth-key-2026-production";
}

async function getHmacKey(secret: string): Promise<CryptoKey> {
  const encoder = new TextEncoder();
  return crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

// Convert ArrayBuffer to URL-safe base64
function bufferToBase64Url(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

// Convert URL-safe base64 to Uint8Array
function base64UrlToBuffer(base64url: string): Uint8Array {
  let base64 = base64url.replace(/-/g, "+").replace(/_/g, "/");
  while (base64.length % 4) {
    base64 += "=";
  }
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

// Generate signed session token for newsroom admin
export async function createAdminSessionToken(email: string = ADMIN_CREDENTIALS.EMAIL): Promise<string> {
  const encoder = new TextEncoder();
  const payload = JSON.stringify({
    email,
    role: "ADMIN",
    iat: Date.now(),
    exp: Date.now() + SESSION_DURATION_MS,
  });

  const payloadBase64 = bufferToBase64Url(encoder.encode(payload).buffer as ArrayBuffer);
  const key = await getHmacKey(getSecretKey());
  const sig = await crypto.subtle.sign("HMAC", key, encoder.encode(payloadBase64));
  const sigBase64 = bufferToBase64Url(sig);

  return `${payloadBase64}.${sigBase64}`;
}

// Verify session token
export async function verifyAdminSessionToken(
  token?: string | null
): Promise<{ valid: boolean; email?: string }> {
  if (!token || !token.includes(".")) {
    return { valid: false };
  }

  try {
    const [payloadBase64, sigBase64] = token.split(".");
    if (!payloadBase64 || !sigBase64) {
      return { valid: false };
    }

    const key = await getHmacKey(getSecretKey());
    const encoder = new TextEncoder();
    const sigBuffer = base64UrlToBuffer(sigBase64);

    const isValidSig = await crypto.subtle.verify(
      "HMAC",
      key,
      sigBuffer as unknown as ArrayBuffer,
      encoder.encode(payloadBase64)
    );

    if (!isValidSig) {
      return { valid: false };
    }

    const payloadJson = new TextDecoder().decode(base64UrlToBuffer(payloadBase64));
    const payload = JSON.parse(payloadJson);

    if (!payload.exp || payload.exp < Date.now()) {
      return { valid: false };
    }

    if (payload.email?.toLowerCase() !== ADMIN_CREDENTIALS.EMAIL.toLowerCase()) {
      return { valid: false };
    }

    return { valid: true, email: payload.email };
  } catch {
    return { valid: false };
  }
}
