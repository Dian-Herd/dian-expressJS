const Product = require('./model');
const {Op} = require('sequelize');
const path = require('path');
const fs = require('fs');

const index = async (req, res)=>{
    const {search} = req.query;
    try{
        await Product.sync();
        let result = {};
        if(search){
            result = await Product.findAll({
                where : {
                    name : {
                        [Op.like] : `%${search}%`
                    }                 
                }
            })
        } else {
            result = await Product.findAll();
        }
        res.send(result);
    } catch(e){
        res.send(e);
    }
}

const view = async (req, res)=>{
    const id = req.params.id;
    try{
        await Product.sync();
        const result = await Product.findAll({
            where: {
                id : id
            }
        });
        res.send(result);
    } catch(e){
        res.send(e);
    }
}

const store = async (req, res)=>{
    const {users_id, name, price, stock, status} = req.body;
    const image = req.file;
    if(image){
        const target = path.join(__dirname, '../../uploads', image.originalname);
        fs.renameSync(image.path, target);
        try{
            await Product.sync();
            const result = await Product.create({users_id, name, price, stock, status, image_url : `http://localhost/3000/public/${image.originalname}`});
            res.send(result);
        } catch(e){
            res.send(e);
        }
    }
}

const update = async (req, res)=>{
    const id = req.params.id;
    const {users_id, name, price, stock, status} = req.body;
    const image = req.file;
    let result = {};
    try{
        await Product.sync();
        if(image){
            const target = path.join(__dirname, '../../uploads', image.originalname);
            fs.renameSync(image.path, target);
            result = await Product.update({users_id, name, price, stock, status, image_url : `http://localhost/3000/public/${image.originalname}`},{
                where : {
                    id : id
                }
            });
        } else {
            result = await Product.update({users_id, name, price, stock, status},{
                where : {
                    id : id
                }
            })
        }
        if(result == 1){
            res.send({
                status : 'success',
                response : result,
                message : `Data product id = ${id} updated`
            });
        } else {
            res.send({
                status : 'failed',
                response : result,
                message : `Data product id = ${id} doesn't exist`
            });
        }
    } catch(e){
        res.send(e);
    }
}

const destroy = async (req, res)=>{
    const id = req.params.id;
    try{
        await Product.sync();
        const result = await Product.destroy({
            where : {
                id : id
            }
        });
        if(result == 1){
            res.send({
                statuts : 'success',
                response : result,
                message : `Delete data id = ${id} success`
            })
        } else {
            res.send({
                statuts : 'failed',
                response : result,
                message : `Data id = ${id} doesn't exist`
            })
        }
    } catch(e){
        res.send(e);
    }
}

module.exports = {
    index,
    view,
    store,
    update,
    destroy
}
