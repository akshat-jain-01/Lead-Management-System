import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";

import { createLead, deleteLead, getAllLeads, getLeadById, updateLead } from "./lead.service";

export const createLeadController = asyncHandler(
    async ( req: Request, res: Response ) => {

      const lead = await createLead(req.body, req.user!._id.toString() );

      res.status(201).json({
        success: true,
        message: "Lead created successfully",
        data: lead,
      });
    });


// export const getAllLeadsController =
//   asyncHandler(

//     async ( req: Request, res: Response ) => {

//       const leads = await getAllLeads( req.user!._id.toString(), req.user!.role );

//       res.status(200).json({
//         success: true,
//         count: leads.length,
//         data: leads,
//       });

//     }

//   );


export const getAllLeadsController = asyncHandler( async ( req: Request, res: Response ) => {

      const result = await getAllLeads( req.user!._id.toString(), req.user!.role, req.query );

      res.status(200).json({
        success: true,

        total: result.total,

        page: result.page,

        pages: result.pages,

        data: result.leads,
      });

    }

  )


  export const getLeadByIdController = asyncHandler( async ( req: Request, res: Response ) => {

      const lead = await getLeadById( req.params.id as string, req.user!._id.toString(), req.user!.role );

      res.status(200).json({
        success: true,
        data: lead,
      });

    })


export const updateLeadController = asyncHandler( async ( req: Request, res: Response ) => {

      const lead = await updateLead( req.params.id as string, req.body, req.user!._id.toString(), req.user!.role );

      res.status(200).json({
        success: true,
        message: "Lead updated successfully",
        data: lead,
      });
 });


 export const deleteLeadController = asyncHandler( async ( req: Request, res: Response ) => {

      await deleteLead( req.params.id as string );

      res.status(200).json({
        success: true,
        message:
          "Lead deleted successfully",
      });

    }

  );