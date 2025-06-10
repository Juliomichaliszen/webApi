"use client";

import Image from "next/image";
import { useState } from "react";
import UnderlineLink from "@/components/UnderlineLink";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

const logo = "/logo.svg";
const eye = "/eye.svg";
const eyeOff = "/eye-off.svg";
const loading = "loading.svg";

function Login() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [rememberMe, setRememberMe] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:5235/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || `Falha ao fazer login. Verifique suas credenciais.`
        );
      }

      const { token } = data;

      if (token) {
        if (rememberMe) {
          Cookies.set("auth_token", token, {
            expires: 7,
            sameSite: "strict",
          });
        } else {
          Cookies.set("auth_token", token, {
            sameSite: "strict",
          });
        }

        router.push("/consulta");
      } else {
        throw new Error("Token não recebido do servidor.");
      }

      toast.success(`Login realizado com sucesso !`);
      router.push("/consulta");
    } catch (error: any) {
      console.error("Erro no login:", error);
      toast.error("Erro no Login");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col  items-center justify-center h-screen bg-white relative bg-[url('/bg-login.svg')] bg-contain bg-no-repeat bg-[left_0rem_top_6rem]">
      <div className="bg-[var(--cinza200)] w-[425px] h-[487px] max-h[487px] default-shadow flex flex-col px-[20px] pt-[40px] rounded-2xl">
        <div className="flex flex-col  items-center justify-center gap-[15px] mb-[50px]">
          <Image width={145} height={30} src={logo} alt="doutor" />
          <h2 className="text-[40px]">
            Faça seu <strong> Login</strong>
          </h2>
          <p className="text-[14px] leading-[100%]">
            Para continuar para a área logada, é preciso realizar o Login
          </p>
        </div>

        <form className="flex flex-col w-full " onSubmit={handleSubmit}>
          <div className="text-sm mb-[20px]">
            {/* Campo de email */}
            <input
              className="w-full border border-[var(--cinza100)] text-[#8c8c8c] h-[40px] rounded-md bg-[var(--branco1)] outline-none py-[12px] px-[8px] mb-[20px]"
              type="text"
              placeholder="Username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <div className="w-full flex h-[40px] border text-[#8c8c8c] border-[var(--cinza100)] rounded-md bg-[var(--branco1)] pr-[11px]  ">
              <input
                className="w-full  outline-none py-[12px] px-[8px]  duration-500"
                placeholder="Senha"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Image
                onClick={() => setShowPassword(!showPassword)}
                className="cursor-pointer"
                alt="botão para exibir ou não a senha"
                src={showPassword ? eyeOff : eye}
                height={20}
                width={20}
              />
            </div>
          </div>

          <div className="flex justify-between mb-[60px]">
            <div className="flex items-center gap-[5px]">
              <input
                className="appearance-none bg-white w-[10px] h-[10px] border 
                  transition-all duration-500 border-[var(--cinza100)] rounded-none checked:before:content-['✔']
                  checked:before:flex checked:before:justify-center checked:before:items-center checked:before:h-full checked:before:w-full checked:before:text-xs
                  cursor-pointer
                  "
                type="checkbox"
                name="remember"
                id="remember"
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label
                className="text-xs font-light leading-[100%]"
                htmlFor="remember"
              >
                Lembrar-me
              </label>
            </div>
            <UnderlineLink text="Esqueceu a senha ?" to="#" />
          </div>

          <button
            disabled={isLoading}
            className="outline-none bg-[var(--azul100)] h-[40px] max-h-[40px] bt-shadow rounded-full cursor-pointer text-sm flex items-center justify-center"
          >
            {isLoading ? (
              <Image
                width={5}
                height={5}
                src={loading}
                alt="Carregando"
                className="w-6 h-6 animate-spin"
              />
            ) : (
              "Entrar"
            )}
          </button>
        </form>
      </div>

      <div className=" mx-auto absolute bottom-0 flex flex-col items-center mb-4 gap-4">
        <div className="flex flex-col">
          <div className="flex gap-2">
            <UnderlineLink text="Termos de Serviço" to="#" />
            <p>|</p>
            <UnderlineLink text="Política de Privacidade" to="#" />
          </div>
          <p>
            Dr.Fast {new Date().getFullYear()}. Todos os direitos reservados
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
