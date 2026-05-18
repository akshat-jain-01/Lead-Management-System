type Props = {

  isLogin: boolean;

  name: string;

  email: string;

  password: string;

  role: string;

  loading: boolean;

  setName: any;

  setEmail: any;

  setPassword: any;

  setRole: any;

  handleSubmit: (
    e: React.FormEvent
  ) => void;

};

const AuthForm = ({

  isLogin,

  name,

  email,

  password,

  role,

  loading,

  setName,

  setEmail,

  setPassword,

  setRole,

  handleSubmit,

}: Props) => {

  return (

    <form

      onSubmit={handleSubmit}

      className="
        bg-white
        p-8
        rounded-2xl
        shadow-xl
        w-full
        max-w-md
      "

    >

      {/* NAME */}

      {

        !isLogin && (

          <input

            type="text"

            placeholder="Enter your name"

            value={name}

            onChange={(e) =>
              setName(e.target.value)
            }

            className="
              w-full
              border
              p-3
              rounded-lg
              mb-4
              focus:outline-none
              focus:ring-2
              focus:ring-black
            "

            required

          />

        )

      }

      {/* EMAIL */}

      <input

        type="email"

        placeholder="Enter your email"

        value={email}

        onChange={(e) =>
          setEmail(e.target.value)
        }

        className="
          w-full
          border
          p-3
          rounded-lg
          mb-4
          focus:outline-none
          focus:ring-2
          focus:ring-black
        "

        required

      />

      {/* PASSWORD */}

      <input

        type="password"

        placeholder="Enter your password"

        value={password}

        onChange={(e) =>
          setPassword(e.target.value)
        }

        className="
          w-full
          border
          p-3
          rounded-lg
          mb-4
          focus:outline-none
          focus:ring-2
          focus:ring-black
        "

        required

      />

      {/* ROLE */}

      {

        !isLogin && (

          <select

            value={role}

            onChange={(e) =>
              setRole(e.target.value)
            }

            className="
              w-full
              border
              p-3
              rounded-lg
              mb-4
            "

          >

            <option value="sales">
              Sales
            </option>

            <option value="admin">
              Admin
            </option>

          </select>

        )

      }

      {/* SUBMIT BUTTON */}

      <button

        type="submit"

        disabled={loading}

        className="
          w-full
          bg-black
          hover:bg-gray-800
          transition
          text-white
          p-3
          rounded-lg
          font-semibold
        "

      >

        {

          loading

            ? "Please wait..."

            : isLogin
            ? "Login"
            : "Register"

        }

      </button>

    </form>

  );

};

export default AuthForm;