import { useState }
from "react";

import { useNavigate }
from "react-router-dom";

import toast
from "react-hot-toast";

import { api }
from "../api/api";

import AuthHeader
from "../components/auth/authHeader";

import AuthForm
from "../components/auth/authForm";

import AuthToggle
from "../components/auth/authToggle";

const Auth = () => {

  const navigate =
    useNavigate();

  const [isLogin, setIsLogin] =
    useState(true);

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [role, setRole] =
    useState("sales");

  const [loading, setLoading] =
    useState(false);

  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    try {

      setLoading(true);

      // LOGIN

      if (isLogin) {

        const response =
          await api.post(
            "/auth/login",
            {
              email,
              password,
            }
          );

        const token =
          response.data.data.token;

        localStorage.setItem(
          "token",
          token
        );

        toast.success(
          "Login successful"
        );

        navigate("/");

      }

      // REGISTER

      else {

        await api.post(
          "/auth/register",
          {
            name,
            email,
            password,
            role,
          }
        );

        toast.success(
          "Registration successful"
        );

        setIsLogin(true);

      }

    }

    catch (error: any) {

      toast.error(

        error.response?.data?.message
        || "Something went wrong"

      );

    }

    finally {

      setLoading(false);

    }

  };

  return (

    <div

      className="
        min-h-screen
        bg-gradient-to-br
        from-gray-100
        to-gray-300
        flex
        items-center
        justify-center
        p-4
      "

    >

      <div className="w-full max-w-md">

        <AuthHeader
          isLogin={isLogin}
        />

        <AuthForm

          isLogin={isLogin}

          name={name}

          email={email}

          password={password}

          role={role}

          loading={loading}

          setName={setName}

          setEmail={setEmail}

          setPassword={setPassword}

          setRole={setRole}

          handleSubmit={handleSubmit}

        />

        <AuthToggle

          isLogin={isLogin}

          setIsLogin={setIsLogin}

        />

      </div>

    </div>

  );

};

export default Auth;