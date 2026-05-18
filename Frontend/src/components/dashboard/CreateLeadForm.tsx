import { useState } from "react";

type Props = {

  onCreate: (data: any) => void;

};

const CreateLeadForm = ({
  onCreate,
}: Props) => {

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [status, setStatus] =
    useState("New");

  const [source, setSource] =
    useState("Website");

  const handleSubmit = (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    onCreate({

      name,

      email,

      status,

      source,

    });

    // RESET FORM

    setName("");
    setEmail("");
    setStatus("New");
    setSource("Website");

  };

  return (

    <form

      onSubmit={handleSubmit}

      className="
        bg-white
        rounded-2xl
        shadow-lg
        p-5
        mb-8
        grid
        grid-cols-1
        md:grid-cols-2
        lg:grid-cols-5
        gap-4
      "

    >

      <input

        type="text"

        placeholder="Lead Name"

        value={name}

        onChange={(e) =>
          setName(e.target.value)
        }

        className="
          border
          rounded-lg
          p-3
          focus:outline-none
          focus:ring-2
          focus:ring-black
        "

        required

      />

      <input

        type="email"

        placeholder="Lead Email"

        value={email}

        onChange={(e) =>
          setEmail(e.target.value)
        }

        className="
          border
          rounded-lg
          p-3
          focus:outline-none
          focus:ring-2
          focus:ring-black
        "

        required

      />

      <select

        value={status}

        onChange={(e) =>
          setStatus(e.target.value)
        }

        className="
          border
          rounded-lg
          p-3
        "

      >

        <option value="New">
          New
        </option>

        <option value="Contacted">
          Contacted
        </option>

        <option value="Qualified">
          Qualified
        </option>

        <option value="Lost">
          Lost
        </option>

      </select>

      <select

        value={source}

        onChange={(e) =>
          setSource(e.target.value)
        }

        className="
          border
          rounded-lg
          p-3
        "

      >

        <option value="Website">
          Website
        </option>

        <option value="Instagram">
          Instagram
        </option>

        <option value="Referral">
          Referral
        </option>

      </select>

      <button

        type="submit"

        className="
          bg-black
          hover:bg-gray-800
          transition
          text-white
          rounded-lg
          p-3
          font-semibold
        "

      >

        Create Lead

      </button>

    </form>

  );

};

export default CreateLeadForm;