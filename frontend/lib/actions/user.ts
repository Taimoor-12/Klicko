"use server";

import { cookies } from "next/headers";
import { authApi, User } from "../api";
import { ApiResponse } from "../api/client";

export async function register({
  email,
  password,
  name,
}: {
  email: string;
  password: string;
  name?: string;
}) {
  const res = await authApi.register({ email, password, name });

  await setCookieForFrontend(res);

  return {
    data: res.data,
    status: res.status
  };
}

export async function login({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const res = await authApi.login({ email, password });

  await setCookieForFrontend(res);

  return {
    data: res.data,
    status: res.status
  };
}

export async function logout() {
  const res = await authApi.logout()

  const cookieStore = await cookies();
  cookieStore.delete('authToken');

  return {
    data: res.data,
    status: res.status
  }
}

async function setCookieForFrontend(res: ApiResponse<User>) {
  const setCookieHeader = res.headers.get("set-cookie");
  const tokenMatch = setCookieHeader?.match(/authToken=([^;]+)/);
  const token = tokenMatch?.[1];

  const oneDay = 24 * 60 * 60 * 1000;

  if (token) {
    const cookieStore = await cookies();
    cookieStore.set("authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: oneDay,
    });
  }
}
