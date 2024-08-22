import { RequestHandler } from "express";
import newsletter from "../models/newsletters.model";
export const getnewsletters:RequestHandler = async (req ,res, next) =>{
    try {
        //throw Error("ufyu");
        const newsletters = await newsletter.find().exec();
    res.status(200).json(newsletters);
    }catch (error){
        next(error);
    }
};
export const getnewsletter: RequestHandler = async (req,res, next) =>{
   const newsletterId = req.params.newsletterId;
    try {
        const Newsletter = await newsletter.findById(newsletterId).exec();
   res.status(200).json(Newsletter); 
}catch (error){
        next(error);
       }
};
export const creatNewsletters: RequestHandler = async (req, res, next) =>{
   const title = req.body.title;
   const content = req.body.content;
   const newsLetterOwnerId = req.body.newsLetterOwnerId;
    try {
        const newNewsletter = await newsletter.create({
            title: title,
            content: content,
            newsLetterOwnerId : newsLetterOwnerId,

    });
     res.status(201).json(newNewsletter);
     

   } catch (error){
    next(error);
   }
};