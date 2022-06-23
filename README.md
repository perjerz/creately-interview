# Coding Task: Robot Vacuum Cleaners with Creately Engineer

## To Install
```
npm install
```

## To Run App
```
npm run build
npm run start
```

## To Test
```
npm run test
```

## Description
A series of robotic vacuum cleaners are to be placed in a rectangular room. This room must be navigated by the vacuum cleaners so that they can clean the room.

A vacuum cleaner’s position and location is represented by a combination of x and y coordinates and a letter representing one of the four cardinal compass points (North, South, East and West). The room is divided up into a grid to simplify navigation. An example position might be (0, 0, N), which means the vacuum cleaner is in the bottom left corner and facing North.

In order to control a vacuum cleaner, the controller sends a simple string of letters. The possible letters are ‘L’, ‘R’ and ‘M’. ‘L’ and ‘R’ make the vacuum cleaner spin 90 degrees left or right respectively, without moving from its current spot. ‘M’ means move forward one grid point and maintain the same heading.

Assume that the square directly North from (x, y) is (x, y+1).

Rules:

The room needs to be initialized with its size, the lower-left coordinates are assumed to be 0,0.

Each vacuum cleaner needs to be initialized with its position coordinate and initial direction.

Once initialized, a vacuum cleaner can be given a series of instructions. (L, R, and M)

If a vacuum cleaner is given an instruction that would take it through a wall, it would hit the wall and not move. It can still continue processing the rest of the instructions normally.

For the sake of simplicity, let's assume that only one vacuum cleaner is placed in a given room at a time so they do not collide with each other..

Output:

It should be possible to get the final coordinates and heading for each vacuum cleaner.

Example 1 :

Room Size: 6 x 6

Vacuum Cleaner initial state: (1, 2, N)

Instructions: [L, M, L, M, L, M, L, M, M]

Final state: (1, 3, N)

Example 2 :

Room Size: 6 x 6

Vacuum Cleaner initial state: (3, 5, N)

Instructions: [M, L, M]

Final state: (2, 5, W)

Note: The first ‘M’ had no effect as the vacuum cleaner bumped into the wall.

Notes:

Simply implement the requirements above and prove that a vacuum cleaner works as per the logic above. You may prove your results by writing unit tests (preferred) or by printing the values your program outputs for given example inputs.

Creating any form of user interface is out of scope.

In the short time available, we are more concerned about quality than completeness.