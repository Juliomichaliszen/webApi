import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const authToken = request.cookies.get("auth_token")?.value;

  if (!authToken) {
    const loginUrl = new URL("/login", request.url);

    loginUrl.searchParams.set("from", request.nextUrl.pathname);

    console.log(
      "Usuário não autenticado. Redirecionando para:",
      loginUrl.toString()
    );
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/medico", "/consulta", "/paciente"],
};
