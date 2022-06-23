import { CleanerState, ERROR_MESSAGE, Facing, Instruction, Coordinate } from "./interface";

// Room may know cleaner to check bumping
export class Room {
    private readonly width: number;
    private readonly height: number;
    private readonly cleaners: Cleaner[];
    constructor(width: number, height: number, cleaners: Cleaner[]) {
        this.width = width;
        this.height = height;
        this.cleaners = cleaners || [];
    }
    // Lazy x,y, facing initialization here instead of cleaner constructor because placing cleaner need room boundary belongs to room class
    // In the future, it may be possible to place
    addCleaner(cleaner: Cleaner, x: number, y: number, facing: Facing) {
        if (x < 0 || y < 0 || x > this.width - 1 || y > this.height - 1) {
            throw new Error(ERROR_MESSAGE.CLEANER_CANNOT_BE_PLACE_OUTSIDE_ROOM);
        }
        cleaner.place(x, y, facing)
        this.cleaners.push(cleaner);
    }
    runCleaners() {
        for (let cleaner of this.cleaners) {
            while(cleaner.isInstructionRemain()) {
                cleaner.runInstruction();
                if (this.isBumpedToTheWall(cleaner)) {
                    cleaner.reverseWithoutTurn(); // Room can reverse cleaner because room push cleaner back
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

// Robot Vacuum Cleaner should not know room
export class Cleaner {
    private readonly name: string;
    private x: number;
    private y: number;
    private facing!: Facing; // Already handle run time error
    private instructions: Instruction[];
    // Cleaner cannot initialize x,y, facing state completely since the position boundary is defined by room width and height
    constructor(name: string) {
        this.name = name;
        this.x = NaN;
        this.y = NaN;
        this.instructions = [];
    }
    // Use place in room to set x,y,facing, there is no placed boundary condition cleaner since it belongs to room not cleaner
    place(x: number, y: number, facing: Facing) {
        this.x = x;
        this.y = y;
        this.facing = facing;
    }
    isInstructionRemain() {
        return this.instructions.length > 0;
    }
    private turnLeft() {
        switch (this.facing) {
            case "W": {
                this.facing = 'S';
                break;
            }
            case "N": {
                this.facing = 'W';
                break;
            }
            case "E": {
                this.facing = 'N';
                break;
            }
            case "S": {
                this.facing = 'E';
                break;
            }
            default:
                throw new Error(ERROR_MESSAGE.NOT_IMPLEMENTED_FACING + this.facing);
        }
    }
    private turnRight() {
        switch (this.facing) {
            case "W": {
                this.facing = 'N';
                break;
            }
            case "N": {
                this.facing = 'E';
                break;
            }
            case "E": {
                this.facing = 'S';
                break;
            }
            case "S": {
                this.facing = 'W';
                break;
            }
            default:
                throw new Error(ERROR_MESSAGE.NOT_IMPLEMENTED_FACING + this.facing);
        }
    }
    private move() {
        switch (this.facing) {
            case "W": {
                this.x--;
                break;
            }
            case "N": {
                this.y++;
                break;
            }
            case "E": {
                this.x++;
                break;
            }
            case "S": {
                this.y--;
                break;
            }
            default:
                throw new Error(ERROR_MESSAGE.NOT_IMPLEMENTED_FACING + this.facing);
        }
    }
    isPlaced() {
        return !(isNaN(this.x) || isNaN(this.y) || !this.facing);

    }
    runInstruction() {
        if (!this.isPlaced()) {
            throw new Error(ERROR_MESSAGE.CLEANER_HAS_NOT_BEEN_PLACED_BEFORE_RUN_INSTRUCTIONS);
        }
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
    configureInstructions(instructions: Instruction[]) {
        this.instructions = instructions;
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

// function main() {
//     const room = new Room(6,6, []);
//
//     const cleaner = new Cleaner('Cleaner 1');
//     const cleaner2 = new Cleaner('Cleaner 2');
//     room.addCleaner(cleaner, 1, 2, 'N');
//     cleaner.configureInstructions(['L', 'M', 'L', 'M', 'L', 'M', 'L', 'M', 'M']);
//     room.addCleaner(cleaner2,  3, 5, 'N');
//     cleaner.configureInstructions(['M', 'L', 'M']);
//     room.runCleaners();
//     console.log(cleaner.getState());
//     console.log(cleaner2.getState());
// }
//
// main();
