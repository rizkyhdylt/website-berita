const { formidable } = require('formidable')
const cloudinary = require('cloudinary').v2
const newsModel = require('../models/newsModel')
const authModels = require('../models/authModels')
const galleryModel = require('../models/galleryModel')
const {mongo : {ObjectId}} = require('mongoose')
const moment = require('moment')

class newsController {
    add_news = async (req, res) => {
        const {id, name} = req.userInfo
        const form = formidable({})
        cloudinary.config({
            cloud_name: process.env.cloud_name,
            api_key: process.env.api_key,
            api_secret: process.env.api_secret,
            secure: true,
        })
        try{
            console.log(req.body);
            const [fields, files] = await form.parse(req)
            const {url} = await cloudinary.uploader.upload(files.image[0].filepath, {
                folder: 'news_images'
            })
            const { title, description, category } = fields;
            const news = await newsModel.create({
                writerId: id,
                title: title[0].trim(),
                slug: title[0].trim().split(' ').join('-'),
                category: category[0],
                description: description[0],
                date : moment().format('LL'),
                WriterName: name,
                image: url
            })
            return res.status(201).json({message: 'news add success',news})
        }catch(error){
            return res.status(500).json({message: 'Internet server error'})
        }
    }

    update_news = async(req,res) =>{
      const { news_id } = req.params
      const form = formidable({})
      cloudinary.config({
            cloud_name: process.env.cloud_name,
            api_key: process.env.api_key,
            api_secret: process.env.api_secret,
            secure: true,
        })

        try {
            const [fields, files] = await form.parse(req)
            const { title, description, category } = fields;
            let url = fields.old_image[0]

            if(Object.keys(files).length > 0 ){
                const spliteImage = url.split('/')
                const imagesFile = spliteImage[spliteImage.length -1].split('/')[0]
                await cloudinary.uploader.destroy(imagesFile);
                const data = await cloudinary.uploader.upload(files.new_image[0].filepath, {folder: 'news_images'})
                url = data.url
            }

            const news =  await newsModel.findByIdAndUpdate(news_id, {
                title: title[0].trim(),
                slug: title[0].trim().split(' ').join('-'),
                category: category[0],
                description: description[0],
                image: url
            },{new : true})

            return res.status(201).json({message: 'news add success',news})
        } catch (error) {
            console.log(error)
            return res.status(500).json({message: 'Internet server error'})
        }

    }

    update_news_update = async(req,res)=>{
        const { role } = req.userInfo
        const { news_id } = req.params
        const { status } = req.body

        if(role === 'admin'){
            const news = await newsModel.findByIdAndUpdate(news_id, { status }, { new: true})
            return res.status(200).json({message: 'news status update success', news})
        }else{
            return res.status(401).json({message: 'You cannot access this api'})
        }
    }


    get_images = async(req,res) => {
        const {id} = req.userInfo

        try{
            const images = await galleryModel.find({ writerId: new ObjectId(id) }).sort({createdAt: -1 })
            return res.status(201).json({ images })
        }catch(error){
            return res.status(500).json({ message: 'Internet server error'})
        }
    }

    add_images = async ( req, res )=>{

        const form = formidable({})
        const { id } = req.userInfo

        cloudinary.config({
            cloud_name: process.env.cloud_name,
            api_key: process.env.api_key,
            api_secret: process.env.api_secret,
            secure: true
        })

        try {
            console.log("📩 Request diterima di API /api/images/add")
            const [_, files] = await form.parse(req)
            let allImages = []
            const { images } = files
            
            for(let i = 0; i < images.length; i++){
                const {url} = await cloudinary.uploader.upload(images[i].filepath, {
                folder: 'news_images'})
                allImages.push({ writerId : id , url })
            }
           
            const image = await galleryModel.insertMany(allImages)
            
            return res.status(201).json({ images : image,message: "images upload success"  })
        } catch (error) {
            console.log(error.message)
            return res.status(500).json({ message: 'Internet server error'})
        }
    }

    get_dashboard_news = async(req,res) =>{
        const { id, role } = req.userInfo
        try {
            if(role === 'admin'){
                const news = await newsModel.find({}).sort({ createdAt : -1})
                return res.status(200).json({ news })
            } else {
                const news = await newsModel.find({ writerId: new ObjectId(id) }).sort({ createdAt : -1})
                return res.status(200).json({ news })
            }
        } catch (error) {
            console.log(error.message)
            return res.status(500).json({ message: 'Internet server error'})
        }
    }
    get_dashboard_single_news = async(req, res) => {
        const {news_id} = req.params
        try {
            const news = await newsModel.findById(news_id)
            return res.status(200).json({ news })
        } catch (error) {
            console.log(error.message)
            return res.status(500).json({ message: ' Internet Server Error' })
        }
    }

    //website
    get_all_news = async(req,res)=>{
        try {
            const category_news = await newsModel.aggregate([
                {
                    $sort: { createdAt: -1 }
                },
                {
                    $match:{
                        status: 'active'
                    }
                },
                {
                    $group: {
                        _id : "$category",
                        news : {
                            $push: {
                                _id: '$_id',
                                title: '$title',
                                slug: '$slug',
                                WriterName: '$WriterName',
                                image : '$image',
                                description : '$description',
                                date: '$date',
                                category: '$category'
                            }
                        }
                    }
                },
                {
                    $project: {
                        _id: 0,
                        category: '$_id',
                        news: {
                            $slice: ['$news', 6]
                        }
                    }
                }
            ])

            const news = {}
            for(let i = 0; i<category_news.length; i++){
                news[category_news[i].category] = category_news[i].news
            }
            // console.log(news)
            return res.status(200).json({ news })
        } catch (error) {
            console.log(error.message)
            return res.status(500).json({ message: ' Internet Server Error' })
        }
    }

    get_category_news = async (req, res) => {
        const { category } = req.params

        try {
            const news = await newsModel.find({
                $and:[
                    {
                        category: {
                            $eq: category
                        }
                    },
                    {
                        status: {
                            $eq: 'active'
                        }
                    }
                ]
            })
            return res.status(200).json({ news })
        } catch (error) {
            console.log(error.message)
            return res.status(500).json({ message: ' Internet Server Error' })
        }
    }

    news_search = async (req, res) => {
        const { value } = req.query
        try {
            const news = await newsModel.find({
                status: 'active',
                $text: {
                    $search: value
                }
            })
            return res.status(200).json({ news })
        } catch (error) {
            console.log(error.message)
            return res.status(500).json({ message: ' Internet Server Error' })
        }
    }

    get_news = async (req, res) =>{
        const {slug} = req.params
        
        try {
            const news = await newsModel.findOne({ slug })


        if (!news) {
            return res.status(404).json({ message: "News not found" });
        }
            
            return res.status(200).json({ news })
        } catch (error) {
            onsole.log(error.message)
            return res.status(500).json({ message: ' Internet Server Error' })
        }
    }

    get_categories = async(req,res)=> {
        try {
            const categories = await newsModel.aggregate([
                {
                    $group:{
                        _id: '$category',
                        count: { $sum: 1 }
                    }
                },
                {
                    $project: {
                        _id: 0,
                        category: "$_id",
                        count : 1
                    }
                }
            ])
            
            return res.status(200).json({ categories })
        } catch (error) {
            console.log(error.message)
            return res.status(500).json({ message: ' Internet Server Error' })
        }
    }

}


module.exports = new newsController()