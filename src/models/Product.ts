import { Schema, model, models } from 'mongoose';

const ProductSchema = new Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    image: { type: String, default: '' },
    type: {
        type: String,
        enum: ['pc', 'laptop', 'parts', 'accessory', 'console'],
        required: true,
    },
    specs: { type: Schema.Types.Mixed },
    category: { type: String, required: true }
});

const ProductModel = models.Product || model('Product', ProductSchema);

export default ProductModel;