import { BACKGROUND_AVATAR } from '../constants';

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

export const randomBgAvatar = () => BACKGROUND_AVATAR[getRandomInt(BACKGROUND_AVATAR.length)];
