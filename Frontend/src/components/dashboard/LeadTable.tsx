import type { Lead } from "../../types/lead.types";

type Props = {

  leads: Lead[];

  loading: boolean;

  onUpdate: (
    lead: Lead
  ) => void;

  onDelete: (
    id: string
  ) => void;

};

const LeadsTable = ({

  leads,

  loading,

  onUpdate,

  onDelete,

}: Props) => {

  if (loading) {

    return (

      <div
        className="
          text-center
          py-10
          text-lg
          text-gray-500
        "
      >

        Loading leads...

      </div>

    );

  }

  return (

    <div

      className="
        bg-white
        rounded-2xl
        shadow-lg
        overflow-x-auto
      "

    >

      <table className="w-full">

        <thead>

          <tr
            className="
              bg-black
              text-white
            "
          >

            <th className="p-4 text-left">
              Name
            </th>

            <th className="p-4 text-left">
              Email
            </th>

            <th className="p-4 text-left">
              Status
            </th>

            <th className="p-4 text-left">
              Source
            </th>

            <th className="p-4 text-left">
              Actions
            </th>

          </tr>

        </thead>

        <tbody>

          {

            leads.length > 0 ? (

              leads.map((lead) => (

                <tr

                  key={lead._id}

                  className="
                    border-b
                    hover:bg-gray-50
                    transition
                  "

                >

                  <td className="p-4">
                    {lead.name}
                  </td>

                  <td className="p-4">
                    {lead.email}
                  </td>

                  <td className="p-4">

                    <span

                      className="
                        bg-blue-100
                        text-blue-700
                        px-3
                        py-1
                        rounded-full
                        text-sm
                      "

                    >

                      {lead.status}

                    </span>

                  </td>

                  <td className="p-4">
                    {lead.source}
                  </td>

                  <td
                    className="
                      p-4
                      flex
                      gap-2
                      flex-wrap
                    "
                  >

                    <button

                      onClick={() =>
                        onUpdate(lead)
                      }

                      className="
                        bg-blue-500
                        hover:bg-blue-600
                        transition
                        text-white
                        px-4
                        py-2
                        rounded-lg
                      "

                    >

                      Update

                    </button>

                    <button

                      onClick={() =>
                        onDelete(
                          lead._id
                        )
                      }

                      className="
                        bg-red-500
                        hover:bg-red-600
                        transition
                        text-white
                        px-4
                        py-2
                        rounded-lg
                      "

                    >

                      Delete

                    </button>

                  </td>

                </tr>

              ))

            ) : (

              <tr>

                <td

                  colSpan={5}

                  className="
                    text-center
                    p-10
                  "

                >

                  <div
                    className="
                      text-gray-500
                    "
                  >

                    <p
                      className="
                        text-xl
                        font-semibold
                      "
                    >

                      No leads found

                    </p>

                    <p className="mt-2">

                      Create your first lead 🚀

                    </p>

                  </div>

                </td>

              </tr>

            )

          }

        </tbody>

      </table>

    </div>

  );

};

export default LeadsTable;