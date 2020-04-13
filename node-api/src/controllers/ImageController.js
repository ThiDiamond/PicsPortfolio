const mongoose = require('mongoose');
const requireDir = require('require-dir');
requireDir('../models');
const Image = mongoose.model('Image');

module.exports = {
    
    async index(req, res){
        const images = await Image.find();
        let response = {};
        images.map((image) => {
            if(!response[image.galleryName])
                response[image.galleryName] = [image];
        
            else
                response[image.galleryName] = [].concat(...response[image.galleryName], ...[image]);
        });
        
        return res.json(response);
    },
    
    async show(req, res){
        const id = req.params.id;
        
        const image = await Image.findOne({id});

        if(!image)
            return res.status(400).send({error: 'No image found'});

        
        return res.json(image);
    },
/*
    async store(req, res){
        const gallery = await Gallery.create(req.body);
        
        return res.json(gallery);
    },
    
    async update(req, res){
        const gallery = await Gallery.findByIdAndUpdate(req.params.id,req.body,{new: true, useFindAndModify: false});
        
        return res.json(gallery);
    },
*/  
    async store (req, res) {

        const { originalname: name, size, key, location: url = "" } = req.file;
        
        
        const image = await Image.create({
            name,size,key,url,
            galleryName: req.body.galleryName,
            description: 'OIII',
        });
        return res.json(image); 
        
      },

    async delete(req, res){
        
        const image = await Image.findById(req.params.id);

        await image.remove();

        return res.status(200).send();
    }

}