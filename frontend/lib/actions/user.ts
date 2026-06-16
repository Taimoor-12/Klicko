"use server";

import { cookies } from "next/headers";
import { authApi, User } from "../api";
import { ApiResponse} from "../api/client";

export async function register({
  email,
  password,
  name,
}: {
  email: string;
  password: string;
  name?: string;
}, longUrl?: string) {
  const res = await authApi.register({ email, password, name });

  if (isError(res)) {
    return {
      error: res.error!.message,
    };
  }

  await setCookieForFrontend(res);

  return {
    data: res.data,
    status: res.status,
  };
}

export async function login({
  email,
  password
}: {
  email: string;
  password: string;
}) {
  const res = await authApi.login({ email, password });

  if (isError(res)) {
    return {
      error: res.error!.message,
    };
  }

  await setCookieForFrontend(res);

  return {
    data: res.data,
    status: res.status,
  };
}

export async function logout() {
  const res = await authApi.logout();

  if (isError(res)) {
    return {
      error: res.error!.message,
    };
  }

  const cookieStore = await cookies();
  cookieStore.delete("authToken");

  return {
    data: res.data,
    status: res.status,
  };
}

function isError(res: ApiResponse<User | { message: string }>): boolean {
  return "error" in res;
}

async function setCookieForFrontend(res: ApiResponse<User>) {
  const setCookieHeader = res.headers?.get("set-cookie");
  if (!setCookieHeader) return;

  const tokenMatch = setCookieHeader?.match(/authToken=([^;]+)/);
  const token = tokenMatch?.[1];

  if (!token) return;

  const cookieStore = await cookies();

  const oneDayInSeconds = 24 * 60 * 60;
  cookieStore.set("authToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: oneDayInSeconds,
  });
}
