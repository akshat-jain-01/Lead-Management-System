import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { validate } from "../../middlewares/validate.middleware";
import { createLeadSchema, updateLeadSchema } from "./lead.validation";
import { createLeadController, deleteLeadController, getAllLeadsController, getLeadByIdController, updateLeadController } from "./lead.controller";
import { roleMiddleware } from "../../middlewares/role.middleware";

const router = Router();

router.post( "/", authMiddleware, validate(createLeadSchema), createLeadController);

router.get( "/", authMiddleware, getAllLeadsController );

router.get( "/:id", authMiddleware, getLeadByIdController );

router.put( "/:id", authMiddleware, validate(updateLeadSchema), updateLeadController );

router.delete( "/:id", authMiddleware, roleMiddleware("admin"), deleteLeadController );

export default router;