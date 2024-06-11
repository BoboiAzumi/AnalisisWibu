import { MaxLinearFunction, MembershipFunction, MinLinearFunction, TriangleFunction } from "./MembershipFunction";

export class Membership{
    name: string;
    membership: { [key: string] : MembershipFunction } = {};
    weight:  { [key: string] : number } = {};
    x: number;

    constructor(name: string){
        this.name = name;
    }

    setMembershipFunction(name: string, type: string, point: number[]){
        if(type == "MinLinearFunction"){
            this.membership[name] = new MinLinearFunction(point[0], point[1]);
        }
        else if(type == "MaxLinearFunction"){
            this.membership[name] = new MaxLinearFunction(point[0], point[1])
        }
        else if(type == "TriangleFunction"){
            this.membership[name] = new TriangleFunction(point[0], point[1], point[2])
        }
        else{
            throw new Error("Unknown membership function type : "+type)
        }
    }

    setX(x: number){
        this.x = x;
    }

    getWeight(){
        return {
            name: this.name,
            weight: this.weight
        }
    }

    calculate(){
        Object.keys(this.membership).forEach((key: string) => {
            this.weight[key] = this.membership[key].calculate(this.x);
        })
    }

    process(x: number){
        this.setX(x)
        this.calculate()
        return this.getWeight()
    }

    getCrisp(){
        let keyWeight = "";
        let maxWeight = 0;
        Object.keys(this.membership).forEach((key: string) => {
            if(this.weight[key] > maxWeight){
                keyWeight = key
                maxWeight = this.weight[key]
            }
        })

        return {
            crisp: keyWeight,
            weight: maxWeight
        }
    }
}