type Props = {

  isLogin: boolean;

};

const AuthHeader = ({
  isLogin,
}: Props) => {

  return (

    <div className="mb-8 text-center">

      <h1

        className="
          text-3xl
          md:text-4xl
          font-bold
          text-gray-800
        "

      >

        {
          isLogin
            ? "Welcome Back 👋"
            : "Create Account 🚀"
        }

      </h1>

      <p
        className="
          text-gray-500
          mt-2
        "
      >

        {

          isLogin

            ? "Login to manage your leads"

            : "Register and start managing leads"

        }

      </p>

    </div>

  );

};

export default AuthHeader;