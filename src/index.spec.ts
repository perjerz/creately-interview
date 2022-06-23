import { Cleaner, Room } from "./index";
import { Coordinate, ERROR_MESSAGE, Instruction } from "./interface";

describe('Robot Vacuum Cleaner', () => {
    it('cleaners with bumped and without bumped have last coordinate correctly', () => {
        const room = new Room(6,6, []);
        const cleaner = new Cleaner('Cleaner 1');
        const cleaner2 = new Cleaner('Cleaner 2');
        room.addCleaner(cleaner, 1, 2, 'N');
        cleaner.configureInstructions(['L', 'M', 'L', 'M', 'L', 'M', 'L', 'M', 'M']);
        room.addCleaner(cleaner2,  3, 5, 'N');
        cleaner2.configureInstructions(['M', 'L', 'M'])
        room.runCleaners();
        expect(cleaner.getCoordinate()).toStrictEqual<Coordinate>({ x: 1, y: 3, facing: 'N' });
        expect(cleaner2.getCoordinate()).toStrictEqual<Coordinate>({ x: 2, y: 5, facing: 'W' });
    });
    it('cleaner landed in 99,99, E when 100 move, turn right and 100 move, and first placed at 0,0', () => {
        const room = new Room(100,100, []);
        const cleaner = new Cleaner('Cleaner 1');
        room.addCleaner(cleaner, 0, 0, 'N');
        const goStraight100: Instruction[] = Array(100).fill('M');
        cleaner.configureInstructions([...goStraight100, 'R', ...goStraight100]);
        room.runCleaners();
        expect(cleaner.getCoordinate()).toStrictEqual<Coordinate>({ x: 99, y: 99, facing: 'E' });
    });
    it('cleaner landed in 99,99, E when 100 move, turn right and 100 move', () => {
        const room = new Room(100,100, []);
        const cleaner = new Cleaner('Cleaner 1');
        room.addCleaner(cleaner, 99, 99, 'N');
        const goStraight100: Instruction[] = Array(100).fill('M');
        cleaner.configureInstructions([...goStraight100, 'R', ...goStraight100]);
        room.runCleaners();
        expect(cleaner.getCoordinate()).toStrictEqual<Coordinate>({ x: 99, y: 99, facing: 'E' });
    });
    it('cleaner should throw error if it has not been placed', () => {
        const room = new Room(6,6, []);
        const cleaner = new Cleaner('Cleaner 1');
        try {
            cleaner.runInstruction();
            room.runCleaners();
        } catch (err: any) {
            expect(err.message).toBe(ERROR_MESSAGE.CLEANER_HAS_NOT_BEEN_PLACED_BEFORE_RUN_INSTRUCTIONS);
        }
    });
    it('cleaner should throw error if it placed outside the room', () => {
        const room = new Room(6,6, []);
        const cleaner = new Cleaner('Cleaner 1');

        try {
            room.addCleaner(cleaner, -1, 3, 'N');
        } catch (err: any) {
            expect(err.message).toBe(ERROR_MESSAGE.CLEANER_CANNOT_BE_PLACE_OUTSIDE_ROOM);
        }
        try {
            room.addCleaner(cleaner, 0, -100, 'N');
        } catch (err: any) {
            expect(err.message).toBe(ERROR_MESSAGE.CLEANER_CANNOT_BE_PLACE_OUTSIDE_ROOM);
        }
        try {
            room.addCleaner(cleaner, -100, -100, 'N');
        } catch (err: any) {
            expect(err.message).toBe(ERROR_MESSAGE.CLEANER_CANNOT_BE_PLACE_OUTSIDE_ROOM);
        }

        try {
            room.addCleaner(cleaner, 7, 0, 'N');
        } catch (err: any) {
            expect(err.message).toBe(ERROR_MESSAGE.CLEANER_CANNOT_BE_PLACE_OUTSIDE_ROOM);
        }
        try {
            room.addCleaner(cleaner, 0, 100, 'W');
        } catch (err: any) {
            expect(err.message).toBe(ERROR_MESSAGE.CLEANER_CANNOT_BE_PLACE_OUTSIDE_ROOM);
        }

    });
});