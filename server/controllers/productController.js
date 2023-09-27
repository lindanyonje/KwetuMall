import fs from 'fs';
import productModel from '../models/productModel.js';

export const getProducts = async (req, res) => {
  try {
    const products = await productModel.find();

    res.send({
      message: 'Fetched products',
      data: products,
    });
  } catch (error) {
    res.send({
      message: 'Error occured',
      data: error.message,
    });
  }
};
export const getProduct = async (req, res) => {
  try {
    const product = await productModel.findOne({ _id: req.params.id });
    res.send({
      message: 'Fetched product',
      data: product,
    });
  } catch (error) {
    res.send({
      message: 'Error occured',
      data: error.message,
    });
  }
};
export const createProduct = async (req, res) => {
  try {
    //req.body: gets text fields
    //req.files: gets the files/images

    //Renaming the image
    let image = req.files.image[0];
    console.log(image);
    let extension = image.mimetype.split('/')[1];
    let newImageName = image.filename + '.' + extension;
    fs.rename(`./uploads/${image.filename}`, `./uploads/${newImageName}`, () =>
      console.log('renamed image successfully!')
    );

    //Saving the product on the db
    const product = new productModel({
      name: req.body.name,
      buyingPrice: req.body.buyingPrice,
      sellingPrice: req.body.sellingPrice,
      stock: req.body.stock,
      image: newImageName,
      description: req.body.description,
      categories: JSON.parse(req.body.categories),
    });
    const newProduct = await product.save();
    res.send({
      message: 'Created product',
      data: newProduct,
    });
  } catch (error) {
    res.send({
      message: 'Error occured',
      data: error.message,
    });
  }
};
export const updateProduct = async (req, res) => {
  console.log(req.body)
  try {
    const product = await productModel.findOne({_id: req.params.id});
    product.name = req.body.name;
    product.buyingPrice = req.body.buyingPrice;
    product.sellingPrice = req.body.sellingPrice;
    product.stock = req.body.stock;
    product.categories = JSON.parse(req.body.categories);
    console.log(req.body.categories)
    product.description = req.body.description;
    //1. Check if there is a new image
    if(req.files.image){
      //2. If there is an image:
     //   a. delete the previous image
     fs.unlink(`./uploads/${product.image}`, (err)=>{
      if(err){
        console.log(err)
      }else{
        console.log('Image deleted')
      }

     })
     //   b. rename the new image
     let image = req.files.image[0];
     let extension = (image.mimetype).split('/')[1];
     let newImageName = image.filename+ '.' + extension;
     fs.rename(`./uploads/${image.filename}`, `./uploads/${newImageName}`,()=>{
      console.log('Successfully renamed image')
     })
    //   c. save changes to db
    product.image = newImageName;
    const newProduct = await product.save();
    res.send({
      message: 'Updated product',
      data: newProduct
    })
    }else{
       //3. If there isn't a new image, save other changes to db
       const newProduct = await product.save();
       res.send({
        message: 'Updated product',
        data: newProduct
      })
    }
  } catch (error) {
    res.send({
      message: 'Error occured!',
      data: error.message,
    });
  }
};
export const deleteProduct = async (req, res) => {
  try {
    //1. Find the product to be deleted
    const product = await productModel.deleteOne({ _id: req.params.id });
    //2. Delete the image of the product
    fs.unlink(`./uploads/${product.image}`, (err)=>{
      if(err){
        console.log(err)
      }else{
        console.log('Deleted image')
      }
    });
    //3. Delete the product from
    await productModel.deleteOne({ _id: req.params.id });
    res.send({
      message: 'Deleted product!',
    });
  } catch (error) {
    res.send({
      message: 'error occured!',
      data: error.message,
    });
  }
};
