type Props = {

  search: string;

  status: string;

  source: string;

  setSearch: any;

  setStatus: any;

  setSource: any;

  setPage: any;

};

const LeadFilters = ({

  search,

  status,

  source,

  setSearch,

  setStatus,

  setSource,

  setPage,

}: Props) => {

  return (

    <div

      className="
        bg-white
        rounded-2xl
        shadow-lg
        p-5
        mb-8
        grid
        grid-cols-1
        md:grid-cols-3
        gap-4
      "

    >

      {/* SEARCH */}

      <input

        type="text"

        placeholder="Search leads..."

        value={search}

        onChange={(e) => {

          setSearch(e.target.value);

          setPage(1);

        }}

        className="
          border
          rounded-lg
          p-3
          focus:outline-none
          focus:ring-2
          focus:ring-black
        "

      />

      {/* STATUS FILTER */}

      <select

        value={status}

        onChange={(e) => {

          setStatus(e.target.value);

          setPage(1);

        }}

        className="
          border
          rounded-lg
          p-3
        "

      >

        <option value="">
          All Status
        </option>

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

      {/* SOURCE FILTER */}

      <select

        value={source}

        onChange={(e) => {

          setSource(e.target.value);

          setPage(1);

        }}

        className="
          border
          rounded-lg
          p-3
        "

      >

        <option value="">
          All Sources
        </option>

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

    </div>

  );

};

export default LeadFilters;