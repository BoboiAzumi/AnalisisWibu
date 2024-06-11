export class MembershipFunction{
    point: number[]

    constructor(){
        this.point = [];
    }

    calculate(x: number): number{
        return 0;
    }
}

export class MinLinearFunction extends MembershipFunction{
    constructor(minPoint: number, maxPoint: number){
        super();
        this.point[0] = minPoint,
        this.point[1] = maxPoint
    }

    calculate(x: number): number{
        if(x <= this.point[0]){
            return 1;
        }
        else if(x >= this.point[1]){
            return 0;
        }
        else{
            return ((this.point[1] - x) / (this.point[1] - this.point[0]))
        }
    }
}

export class MaxLinearFunction extends MembershipFunction{
    constructor(minPoint: number, maxPoint: number){
        super();
        this.point[0] = minPoint,
        this.point[1] = maxPoint
    }

    calculate(x: number): number{
        if(x <= this.point[0]){
            return 0;
        }
        else if(x >= this.point[1]){
            return 1;
        }
        else{
            return ((x - this.point[0]) / (this.point[1] - this.point[0]))
        }
    }
}

export class TriangleFunction extends MembershipFunction{
    constructor(minPoint: number, middlePoint: number, maxPoint: number){
        super();
        this.point[0] = minPoint,
        this.point[1] = middlePoint,
        this.point[2] = maxPoint
    }

    calculate(x: number): number{
        if(x > this.point[0] && x <= this.point[1]){
            return ((x - this.point[0]) / (this.point[1] - this.point[0]))
        }
        else if(x > this.point[1] && x < this.point[2]){
            return ((this.point[2] - x) / (this.point[2] - this.point[1]))
        }
        else{
            return 0
        }
    }
}