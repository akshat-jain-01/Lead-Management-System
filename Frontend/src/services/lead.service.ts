import { api } from "../api/api";

// GET LEADS

export const getLeads = (params: any) => {
  return api.get("/leads", {
    params,
  });
};

// CREATE LEAD

export const createLead = (data: any) => {
  return api.post("/leads", data);
};

// UPDATE LEAD

export const updateLead = (
  id: string,

  data: any,
) => {
  return api.put(
    `/leads/${id}`,

    data,
  );
};

// DELETE LEAD

export const deleteLead = (id: string) => {
  return api.delete(`/leads/${id}`);
};
