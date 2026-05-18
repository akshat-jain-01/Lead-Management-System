import { ApiError } from "../../utils/ApiError";
import { Lead } from "./lead.model";
import { CreateLeadInput, ILead, LeadQuery } from "./lead.types";

export const createLead = async ( body: CreateLeadInput, userId: string ) => {

  return await Lead.create({
    ...body,
    createdBy: userId,
  });

};


// export const getAllLeads = async ( userId: string, role: string ) => {

//   if (role === "admin") {

//     return await Lead.find()
//       .populate(
//         "createdBy",
//         "name email role"
//       );
//   }

//   return await Lead.find({
//     createdBy: userId,
//   }).populate(
//     "createdBy",
//     "name email role"
//   );
// }



export const getAllLeads = async ( userId: string, role: string, query: LeadQuery) => {

  const { status, source, search, page = "1", limit = "10" } = query;

  const filters: any = {};

  console.log("ROLE:", role);

  console.log("USER ID:", userId);

  console.log(filters);
  // RBAC FILTER

  if (role !== "admin") {

    filters.createdBy = userId;

  }

  // STATUS FILTER

  if (status) {

    filters.status = status;

  }

  // SOURCE FILTER

  if (source) {

    filters.source = source;

  }

  // SEARCH

  if (search) {

    filters.$or = [

      {
        name: {
          $regex: search,
          $options: "i",
        },
      },

      {
        email: {
          $regex: search,
          $options: "i",
        },
      },

    ];

  }

  const currentPage = Number(page);

  const pageLimit = Number(limit);

  const skip =
    (currentPage - 1) * pageLimit;

  const leads = await Lead.find(filters)

    .populate(
      "createdBy",
      "name email role"
    )

    .skip(skip)

    .limit(pageLimit)

    .sort({
      createdAt: -1,
    });

  const total =
    await Lead.countDocuments(filters);

  return {
    leads,
    total,
    page: currentPage,
    pages: Math.ceil(
      total / pageLimit
    ),
  };
}



export const getLeadById = async (

  leadId: string,

  userId: string,

  role: string

) => {

  const lead = await Lead.findById( leadId )
  .populate(
    "createdBy",
    "name email role"
  );

  if (!lead) {

    throw new ApiError( "Lead not found", 404 );

  }

  // SALES USER OWNERSHIP CHECK

  if ( role !== "admin" && lead.createdBy._id.toString() !== userId ) {
    throw new ApiError( "Access denied", 403 );
  }

  return lead;
}


export const updateLead = async ( leadId: string, body: Partial<CreateLeadInput>, userId: string, role: string ) => {

  const lead = await Lead.findById(leadId);

  if (!lead) {

    throw new ApiError( "Lead not found", 404 );

  }

  // OWNERSHIP CHECK

  if ( role !== "admin" && lead.createdBy.toString() !== userId ) {

    throw new ApiError( "Access denied", 403 );
  }

  return await Lead.findByIdAndUpdate( leadId, body, { new: true });

}


export const deleteLead = async ( leadId: string ) => {

  const lead = await Lead.findById(leadId);

  if (!lead) {

    throw new ApiError( "Lead not found", 404 );

  }

  await lead.deleteOne();

};