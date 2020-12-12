import Horizon from '@horizon/client';
const horizon = new Horizon({host: 'localhost:8181'});
export const gamesCursor = horizon('games');
export const partyFavorCursor = horizon('weNeedList');
export const playersCursor = horizon('players');
export const boxesCursor = horizon('boxes');
export const rollsCursor = horizon('rolls');
