import express from "express";
import ListController from "../controllers/list.controller";

const router = express.Router();

router.post("/create", ListController.createItemList);
router.get("/getAll", ListController.getItemsList);
router.put("/update/:id", ListController.updateItemList);
router.delete("/delete/:id", ListController.deleteItemList);
router.delete("/deleteAll", ListController.deleteList);

export default router;