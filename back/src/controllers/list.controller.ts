import { Request, Response } from "express";
import { prisma } from "../server";

const createItemList = async (req: Request, res: Response) => {
    try {
        const { name } = req.body;
        const newBlogPost = await prisma.item.create({
            data: {
                name,
                isComplete: false,
            },
        });
        res.status(200).json(newBlogPost);
    } catch (e) {
        res.status(500).json({ error: e });
    }
};

const getItemsList = async (req: Request, res: Response) => {
    try {
        const blogPosts = await prisma.item.findMany();
        res.status(200).json(blogPosts);
    } catch (e) {
        res.status(500).json({ error: e });
    }
};

const updateItemList = async (req: Request, res: Response) => {
    try {
        const { id, name } = req.body;
        const updatedBlogPost = await prisma.item.update({
            where: {
                id: Number(id),
            },
            data: {
                name
            },
        });
        res.status(200).json(updatedBlogPost);
    } catch (e) {
        res.status(500).json({ error: e });
    }
};

const deleteItemList = async (req: Request, res: Response) => {
    try {
        const { id } = req.body;
        const deletedBlogPost = await prisma.item.delete({
            where: {
                id: Number(id),
            },
        });
        res.status(200).json(deletedBlogPost);
    } catch (e) {
        res.status(500).json({ error: e });
    }
};

const deleteList = async (req: Request, res: Response) => {
    try {
        const deletedBlogPosts = await prisma.item.deleteMany();
        res.status(200).json(deletedBlogPosts);
    } catch (e) {
        res.status(500).json({ error: e });
    }
};

export default {
    createItemList,
    getItemsList,
    updateItemList,
    deleteItemList,
    deleteList,
};