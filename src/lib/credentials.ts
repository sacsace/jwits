import { promises as fs } from "fs";
import path from "path";
import { randomBytes, scryptSync, timingSafeEqual } from "crypto";

type AdminCredentials = {
  username: string;
  passwordHash: string;
  salt: string;
  updatedAt: string;
};

const dataDir = path.join(process.cwd(), "data");
const credFile = path.join(dataDir, "admin.json");

function hashPassword(password: string, salt: string) {
  return scryptSync(password, salt, 64).toString("hex");
}

function createHash(password: string) {
  const salt = randomBytes(16).toString("hex");
  return { salt, passwordHash: hashPassword(password, salt) };
}

function verifyHash(password: string, salt: string, passwordHash: string) {
  const hashed = Buffer.from(hashPassword(password, salt), "hex");
  const expected = Buffer.from(passwordHash, "hex");
  if (hashed.length !== expected.length) return false;
  return timingSafeEqual(hashed, expected);
}

async function readCredentials(): Promise<AdminCredentials | null> {
  try {
    const raw = await fs.readFile(credFile, "utf-8");
    return JSON.parse(raw) as AdminCredentials;
  } catch {
    return null;
  }
}

async function writeCredentials(data: AdminCredentials) {
  await fs.mkdir(dataDir, { recursive: true });
  await fs.writeFile(credFile, JSON.stringify(data, null, 2), "utf-8");
}

export function getDefaultUsername() {
  return process.env.ADMIN_USERNAME || "admin";
}

export function getDefaultPassword() {
  return process.env.ADMIN_PASSWORD || "jwits2026!";
}

export async function validateCredentials(
  username: string,
  password: string
): Promise<boolean> {
  const saved = await readCredentials();
  if (saved) {
    if (username !== saved.username) return false;
    return verifyHash(password, saved.salt, saved.passwordHash);
  }

  return username === getDefaultUsername() && password === getDefaultPassword();
}

export async function changeAdminPassword(input: {
  currentPassword: string;
  newPassword: string;
}): Promise<{ ok: true } | { ok: false; error: string }> {
  const { currentPassword, newPassword } = input;

  if (!newPassword || newPassword.length < 8) {
    return { ok: false, error: "새 비밀번호는 8자 이상이어야 합니다." };
  }

  if (newPassword === currentPassword) {
    return { ok: false, error: "현재 비밀번호와 다른 비밀번호를 입력하세요." };
  }

  const saved = await readCredentials();
  const username = saved?.username || getDefaultUsername();

  const currentOk = saved
    ? verifyHash(currentPassword, saved.salt, saved.passwordHash)
    : currentPassword === getDefaultPassword();

  if (!currentOk) {
    return { ok: false, error: "현재 비밀번호가 올바르지 않습니다." };
  }

  const { salt, passwordHash } = createHash(newPassword);
  await writeCredentials({
    username,
    salt,
    passwordHash,
    updatedAt: new Date().toISOString(),
  });

  return { ok: true };
}
