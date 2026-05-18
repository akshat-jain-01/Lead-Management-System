type Props = {

  isLogin: boolean;

  setIsLogin: any;

};

const AuthToggle = ({

  isLogin,

  setIsLogin,

}: Props) => {

  return (

    <p
      className="
        text-center
        mt-6
        text-gray-600
      "
    >

      {

        isLogin

          ? "Don't have an account?"

          : "Already have an account?"

      }

      <button

        type="button"

        onClick={() =>
          setIsLogin(!isLogin)
        }

        className="
          text-blue-500
          hover:text-blue-600
          transition
          ml-2
          font-semibold
        "

      >

        {

          isLogin
            ? "Register"
            : "Login"

        }

      </button>

    </p>

  );

};

export default AuthToggle;