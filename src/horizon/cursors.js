import Horizon from '@horizon/client';
const horizon = new Horizon({host: 'dice.coblefriends.com:8181'});
export const gamesCursor = horizon('games');
export const partyFavorCursor = horizon('weNeedList');
export const playersCursor = horizon('players');
export const boxesCursor = horizon('boxes');
export const rollsCursor = horizon('rolls');

// Access as a standard collection

const users = horizon('users');
console.log("users = " + JSON.stringify(users));

const groups = horizon('groups');
console.log("groups = " + JSON.stringify(groups));

users.order('id')
    .watch()
    .subscribe(boxList => {
            const boxes = [];
            boxList.map(b => {
                console.log("user = " + JSON.stringify(b));
                boxes.push(b);
            });
        },
        error => console.error(error)
    );

groups.order('id')
            .watch()
            .subscribe(boxList => {
                    const boxes = [];
                    boxList.map(b => {
                        console.log("group = " + b);
                        boxes.push(b);
                    });
                },
                error => console.error(error)
            );