export default class UserDTO{
    id;
    email;
    first_name;
    last_name;
    position;
    isActivated;

    constructor(model){
        this.id = model.id
        this.email = model.email
        this.first_name = model.first_name
        this.last_name = model.last_name
        this.position = model.position
        this.isActivated = model.isactivated
    }
}
