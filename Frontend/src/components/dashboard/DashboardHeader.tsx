type Props = {

  onLogout: () => void;

  onExport: () => void;

};

const DashboardHeader = ({

  onLogout,

  onExport,

}: Props) => {

  return (

    <div

      className="
        flex
        flex-col
        md:flex-row
        md:items-center
        md:justify-between
        gap-4
        mb-8
      "

    >

      <div>

        <h1

          className="
            text-3xl
            md:text-4xl
            font-bold
            text-gray-800
          "

        >

          Lead Management CRM

        </h1>

        <p
          className="
            text-gray-500
            mt-1
          "
        >

          Manage your leads efficiently 🚀

        </p>

      </div>

      <div
        className="
          flex
          gap-3
          flex-wrap
        "
      >

        <button

          onClick={onExport}

          className="
            bg-green-500
            hover:bg-green-600
            transition
            text-white
            px-5
            py-2
            rounded-lg
            shadow-md
          "

        >

          Export CSV

        </button>

        <button

          onClick={onLogout}

          className="
            bg-red-500
            hover:bg-red-600
            transition
            text-white
            px-5
            py-2
            rounded-lg
            shadow-md
          "

        >

          Logout

        </button>

      </div>

    </div>

  );

};

export default DashboardHeader;