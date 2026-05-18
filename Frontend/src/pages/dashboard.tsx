import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import DashboardHeader from "../components/dashboard/DashboardHeader";

import CreateLeadForm from "../components/dashboard/CreateLeadForm";

import LeadFilters from "../components/dashboard/LeadFilters";

import LeadsTable from "../components/dashboard/LeadTable";

import {
  getLeads,
  createLead,
  updateLead,
  deleteLead,
} from "../services/lead.service";

import type { Lead } from "../types/lead.types";

const Dashboard = () => {
  const navigate = useNavigate();

  const [leads, setLeads] = useState<Lead[]>([]);

  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");

  const [status, setStatus] = useState("");

  const [source, setSource] = useState("");

  // PAGINATION

  const [page, setPage] = useState(1);

  const [totalPages, setTotalPages] = useState(1);

  // FETCH LEADS

  const fetchAllLeads = async () => {
    try {
      setLoading(true);

      const response = await getLeads({
        page,

        limit: 5,

        search,

        status,

        source,
      });

      setLeads(response.data.data);

      setTotalPages(response.data.pagination.pages);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to fetch leads");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllLeads();
  }, [page, search, status, source]);

  // RESET PAGE ON FILTER CHANGE

  useEffect(() => {
    setPage(1);
  }, [search, status, source]);

  // LOGOUT

  const handleLogout = () => {
    localStorage.removeItem("token");

    toast.success("Logged out successfully");

    navigate("/auth");
  };

  // CREATE LEAD

  const handleCreateLead = async (data: any) => {
    try {
      await createLead(data);

      toast.success("Lead created successfully");

      fetchAllLeads();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to create lead");
    }
  };

  // UPDATE LEAD

  const handleUpdateLead = async (lead: Lead) => {
    const newName = prompt("Enter lead name", lead.name);

    const newEmail = prompt("Enter lead email", lead.email);

    const newStatus = prompt("Enter status", lead.status);

    const newSource = prompt("Enter source", lead.source);

    if (!newName || !newEmail || !newStatus || !newSource) {
      return;
    }

    try {
      await updateLead(
        lead._id,

        {
          name: newName,
          email: newEmail,
          status: newStatus,
          source: newSource,
        },
      );

      toast.success("Lead updated successfully");

      fetchAllLeads();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to update lead");
    }
  };

  // DELETE LEAD

  const handleDeleteLead = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this lead?",
    );

    if (!confirmDelete) return;

    try {
      await deleteLead(id);

      toast.success("Lead deleted successfully");

      fetchAllLeads();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to delete lead");
    }
  };

  const handleExportCSV = () => {
    const headers = [["Name", "Email", "Status", "Source"]];

    const rows = leads.map((lead) => [
      lead.name,

      lead.email,

      lead.status,

      lead.source,
    ]);

    const csvContent = [...headers, ...rows]

      .map((e) => e.join(","))

      .join("\n");

    const blob = new Blob(
      [csvContent],

      {
        type: "text/csv;charset=utf-8;",
      },
    );

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;

    link.setAttribute("download", "leads.csv");

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
  };

  return (
    <div
      className="
        min-h-screen
        bg-gray-100
        p-4
        md:p-8
      "
    >
      <DashboardHeader onLogout={handleLogout} onExport={handleExportCSV} />

      <CreateLeadForm onCreate={handleCreateLead} />

      <LeadFilters
        search={search}
        status={status}
        source={source}
        setSearch={setSearch}
        setStatus={setStatus}
        setSource={setSource}
      />

      <LeadsTable
        leads={leads}
        loading={loading}
        onUpdate={handleUpdateLead}
        onDelete={handleDeleteLead}
      />

      {/* PAGINATION */}

      <div
        className="
          flex
          justify-center
          items-center
          gap-3
          mt-8
          flex-wrap
        "
      >
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="
            bg-black
            text-white
            px-4
            py-2
            rounded-lg
            disabled:opacity-50
          "
        >
          Prev
        </button>

        <span
          className="
            font-semibold
            text-lg
          "
        >
          Page {page} of {totalPages}
        </span>

        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          className="
            bg-black
            text-white
            px-4
            py-2
            rounded-lg
            disabled:opacity-50
          "
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
