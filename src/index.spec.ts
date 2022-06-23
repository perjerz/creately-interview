import { Cleaner, Room } from "./index";
import { Coordinate } from "./interface";
describe('Robot Vacuum Cleaner', () => {
    it('one cleaner with bumped and without bumped has last coordinate correctly', () => {
        const room = new Room(6,6, []);
        const cleaner = new Cleaner('Cleaner 1',1, 2, 'N', ['L', 'M', 'L', 'M', 'L', 'M', 'L', 'M', 'M']);
        const cleaner2 = new Cleaner('Cleaner 2', 3, 5, 'N', ['M', 'L', 'M']);
        room.addCleaner(cleaner);
        room.addCleaner(cleaner2);
        room.runCleaners();
        expect(cleaner.getCoordinate()).toStrictEqual<Coordinate>({x: 1, y: 3, facing: 'N'});
        expect(cleaner2.getCoordinate()).toStrictEqual<Coordinate>({ x: 2, y: 5, facing: 'W' });
    });
});