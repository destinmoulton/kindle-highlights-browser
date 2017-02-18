export default class AuthorType {
    constructor(firstName, lastName){

        this.firstName = firstName;
        this.lastName = lastName;
    }

    hasFirstName(){
        return this.firstName !== "";
    }

    hasLastName(){
        return this.lastName !== "";
    }

    getFullName(){
        let fullName = "";
        if(this.hasFirstName()){
            fullName = this.firstName;

            if(this.hasLastName()){
                fullName += " " + this.lastName;
            }
        } else {
            fullName = this.lastName;
        }
        return fullName;        
    }
}