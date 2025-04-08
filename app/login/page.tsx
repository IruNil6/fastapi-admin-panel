'use client'

import Image from "next/image"
import Form from "next/form"
import { useState } from "react"
import { api } from "@/api";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  async function handleSubmit(formData: FormData) {
    const rawUsername = formData.get("username") as string;
    const rawPassword = formData.get("password") as string;
    setUsername(rawUsername === "" ? "" : rawUsername);
    setPassword(rawPassword === "" ? "" : rawPassword);
    if (rawUsername === "" || rawPassword === "") {
      setErrorVisible("Please fill in all fields")
      return
    }

    api.post("/auth/login", formData)
      .then((response) => {
        console.log(response);

        const token = response.data.token;
        localStorage.setItem("token", token);
        router.push("/panel");
      })
      .catch((exception: AxiosError) => {
        switch (exception.status) {
          case 400:
            setErrorVisible("Bad request")
            break;
          case 401:
            setErrorVisible("Invalid username or password")
            break;
          case 404:
            setErrorVisible("User not found")
            break;
          case 500:
            setErrorVisible("Internal server error")
            break;
          default:
            setErrorVisible("Server not responding")
        }
      })
  }

  function setErrorVisible(message: string) {
    setError(message);
    setTimeout(() => {
      setError("");
    }, 5000);
  }

  return (
    <div className="flex flex-col items-center justify-center font-[family-name:var(--font-roboto-sans)] w-screen h-screen">
      <Image
        className="dark:invert w-48 h-48"
        src={"images/svg/next.svg"}
        alt="logo-icon"
        width={50}
        height={50}
        onClick={() => setVisible(!visible)}
      />
      <Form
        action={(e) => handleSubmit(e)}
        className="flex flex-col relative items-center justify-between gap-1 w-[50%] h-[50%]">
        <h1 className="font-bold text-5xl">
          Login to Admin Panel
        </h1>
        <p className={`${error === "" ? "invisible" : "flex"} absolute text-center text-2xl top-17`}>
          {error && <span className="text-red-500">{error}</span>}
        </p>
        <div className="flex flex-col items-center justify-between gap-8">
          <div className="flex flex-col items-center justify-between gap-4">
            <label
              className="flex items-start w-[100%] pl-3 text-2xl"
              htmlFor="username">
              Login
            </label>
            <input
              className="border border-solid rounded-2xl p-4 w-100"
              type="text"
              id="username"
              name="username"
              placeholder="Login"
              defaultValue={username} />
          </div>
          <div className="flex flex-col items-center justify-between gap-4">
            <label
              className="flex items-start w-[100%] pl-3 text-2xl"
              htmlFor="password">
              Password
            </label>
            <div className="flex items-center relative">
              <input
                className="border border-solid rounded-2xl p-4 w-100"
                type={visible ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Password"
                defaultValue={password} />

              <Image
                className="dark:invert absolute right-5 hover:cursor-pointer w-8 h-8"
                src={visible ? "images/svg/invisible.svg" : "/images/svg/visible.svg"}
                alt="visibility-icon"
                width={25}
                height={25}
                onClick={() => setVisible(!visible)}
              />
            </div>
          </div>
        </div>
        <button
          className="border border-solid rounded-2xl p-4 w-100 bg-[#1E1E1E] text-white font-bold text-2xl hover:bg-[#1E1EFF] hover:opacity-80 cursor-pointer transition-all duration-500"
          type="submit"
        >
          Login
        </button>
      </Form>
    </div>
  )
}