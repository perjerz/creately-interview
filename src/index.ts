import { CleanerState, ERROR_MESSAGE, Facing, Instruction, Coordinate } from "./interface";

export class Room {
    private readonly width: number;
    private readonly height: number;
    private readonly cleaners: Cleaner[];
    constructor(width: number, height: number, cleaners: Cleaner[]) {
        this.width = width;
        this.height = height;
        this.cleaners = cleaners || [];
    }
    addCleaner(cleaner: Cleaner) {
        this.cleaners.push(cleaner);
    }
    runCleaners() {
        for (let cleaner of this.cleaners) {
            while(cleaner.isInstructionRemain()) {
                cleaner.runInstruction();
                if (this.isBumpedToTheWall(cleaner)) {
                    cleaner.reverseWithoutTurn();
                }
            }
        }
    }
    isBumpedToTheWall(cleaner: Cleaner) {
        if (cleaner.getX() > this.width - 1) {
            console.log(cleaner.getName() +' bumped at East');
            return true;
        } else if (cleaner.getY() > this.height - 1) {
            console.log(cleaner.getName() +' bumped at North');
            return true;
        } else if (cleaner.getX() < 0) {
            console.log(cleaner.getName()+' bumped at West');
            return true;
        } else if (cleaner.getY() < 0) {
            console.log(cleaner.getName() +' bumped at South');
            return true;
        }
        return false;
    }
}
export class Cleaner {
    private readonly name: string;
    private x: number;
    private y: number;
    private facing: Facing;
    private readonly instructions: Instruction[];
    constructor(name: string, x: number, y: number, facing: Facing, instructions: Instruction[]) {
        this.name = name;
        this.x = x;
        this.y = y;
        this.facing = facing;
        this.instructions = instructions;
    }
    isInstructionRemain() {
        return this.instructions.length > 0;
    }
    turnLeft() {
        switch (this.facing) {
            case "W": {
                this.facing = 'S';
                return this;
            }
            case "N": {
                this.facing = 'W';
                return this;
            }
            case "E": {
                this.facing = 'N';
                return this;
            }
            case "S": {
                this.facing = 'E';
                return this;
            }
            default:
                throw new Error(ERROR_MESSAGE.NOT_IMPLEMENTED_FACING + this.facing);
        }
    }
    turnRight() {
        switch (this.facing) {
            case "W": {
                this.facing = 'N';
                return this;
            }
            case "N": {
                this.facing = 'E';
                return this;
            }
            case "E": {
                this.facing = 'S';
                return this;
            }
            case "S": {
                this.facing = 'W';
                return this;
            }
            default:
                throw new Error(ERROR_MESSAGE.NOT_IMPLEMENTED_FACING + this.facing);
        }
    }
    move() {
        switch (this.facing) {
            case "W": {
                this.x--;
                return this;
            }
            case "N": {
                this.y++;
                return this;
            }
            case "E": {
                this.x++;
                return this;
            }
            case "S": {
                this.y--;
                return this;
            }
            default:
                throw new Error(ERROR_MESSAGE.NOT_IMPLEMENTED_FACING + this.facing);
        }
    }
    runInstruction() {
        const instruction = this.instructions.pop();
        switch (instruction) {
            case 'L': {
                this.turnLeft();
                break;
            } case 'R': {
                this.turnRight();
                break;
            } case 'M': {
                this.move();
                break;
            }
            default:
                throw new Error(ERROR_MESSAGE.NOT_IMPLEMENTED_INSTRUCTION + instruction)
        }
    }
    reverseWithoutTurn() {
        switch (this.facing) {
            case "N": {
                this.y--;
                break;
            } case "E": {
                this.x--;
                break;
            } case "S": {
                this.y++;
                break;
            } case "W": {
                this.x++;
                break;
            }
            default:
                throw new Error(ERROR_MESSAGE.NOT_IMPLEMENTED_FACING + this.facing)
        }
    }
    getCoordinate(): Coordinate {
        return { x: this.x,y: this.y, facing: this.facing };
    }
    getState(): CleanerState {
        return { name: this.name, ...this.getCoordinate() , instructions: this.instructions };
    }
    getName(): string {
        return this.name;
    }
    getX(): number {
        return this.x;
    }
    getY(): number {
        return this.y;
    }
}

function main() {
    const room = new Room(6,6, []);

    const cleaner = new Cleaner('Cleaner 1',1,2, 'N', ['L', 'M', 'L', 'M', 'L', 'M', 'L', 'M', 'M']);
    const cleaner2 = new Cleaner('Cleaner 2',3,5, 'N', ['M', 'L', 'M']);
    room.addCleaner(cleaner);
    room.addCleaner(cleaner2);
    room.runCleaners();

    console.log(cleaner.getState());
    console.log(cleaner2.getState());
}

main();
