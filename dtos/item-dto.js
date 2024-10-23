export default class UserDTO{    
    id;
    ean;
    brand;
    name;
    info;
    type;
    under_type;
    material;
    price;
    gender;
    color;
    img;

    constructor(model){
        this.id  = model.id
        this.ean = model.ean
        this.brand = model.brand
        this.name = model.name
        this.info = model.info
        this.type = model.type
        this.under_type = model.under_type
        this.material = model.material
        this.price = model.price
        this.gender = model.gender
        this.color = model.color
        this.img = model.img

    }
}
