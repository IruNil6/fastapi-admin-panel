'use client'

import Image from "next/image"
import Form from "next/form"
import { useState } from "react"
import { api } from "@/api";
import { AxiosError } from "axios";

async function sendFormToServer(formData: FormData) {
  api.post("/auth/login", formData)
    .then((response) => {
      console.log(response);
    })
    .catch((exception: AxiosError) => {
      if(exception.code === "ERR_BAD_REQUEST" || exception.status === 401){
        console.log("Exception unauth")
      }
    })
}

export default function Login() {
  const [visible, setVisible] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center font-[family-name:var(--font-roboto-sans)] w-screen h-screen">
      <Form
        action={(e) => sendFormToServer(e)}
        className="flex flex-col items-center justify-between gap-1 w-[50%] h-[50%]">
        <h1 className="font-bold text-5xl">
          Login to Admin Panel
        </h1>
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
              placeholder="Login" />
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
                placeholder="Password" />

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
          className=""
          type="submit"
        >
          Login
        </button>
      </Form>
    </div>
  )
}