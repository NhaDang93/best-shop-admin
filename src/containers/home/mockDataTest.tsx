import { IProduct } from '@/types';
import dayjs from 'dayjs';

const ImageSrc =
  'https://media.formula1.com/image/upload/t_16by9Centre/f_auto/q_auto/v1686320014/fom-website/2023/Miscellaneous/GettyImages-1277486058.jpg.transform/4col/image.jpg';
export const listProduct: IProduct[] = [
  {
    name: 'Podcast Block 1',
    code: 'New',
    id: 'Pr1',
    price: ' 6000',
    createAt: dayjs(new Date()).format('YYYY-MM-DD'),
    src: ImageSrc,
    description: `THE FIRST WIN1: David Tremayne remembers the magical day in Montreal when Lewis Hamilton became a Grand Prix winner`,
  },
  {
    name: 'Podcast Block 2',
    code: 'New',
    id: 'Pr2',
    price: ' 6000',
    createAt: dayjs(new Date()).day(-1).format('YYYY-MM-DD'),
    src: ImageSrc,
    description: `THE FIRST WIN2: David Tremayne remembers the magical day in Montreal when Lewis Hamilton became a Grand Prix winner`,
  },
  {
    name: 'Podcast Block 3',
    code: 'Old',
    id: 'Pr3',
    price: ' 6000',
    createAt: dayjs(new Date()).day(-2).format('YYYY-MM-DD'),
    src: ImageSrc,
    description:
      'THE FIRST WIN3: David Tremayne remembers the magical day in Montreal when Lewis Hamilton became a Grand Prix winner',
  },
  {
    name: 'Podcast Block 4',
    code: 'Old',
    id: 'Pr4',
    price: ' 6000',
    createAt: dayjs(new Date()).day(-3).format('YYYY-MM-DD'),
    src: ImageSrc,
    description:
      'THE FIRST WIN4: David Tremayne remembers the magical day in Montreal when Lewis Hamilton became a Grand Prix winner',
  },
  {
    name: 'Podcast Block 5',
    code: 'Old',
    id: 'Pr5',
    price: ' 6000',
    createAt: dayjs(new Date()).day(-4).format('YYYY-MM-DD'),
    src: ImageSrc,
    description: 'Description Podcast Block',
  },
  {
    name: 'Podcast Block 6',
    code: 'Old',
    id: 'Pr6',
    price: ' 6000',
    createAt: dayjs(new Date()).day(-5).format('YYYY-MM-DD'),
    src: ImageSrc,
    description:
      'THE FIRST WIN5: David Tremayne remembers the magical day in Montreal when Lewis Hamilton became a Grand Prix winner',
  },
  {
    name: 'Podcast Block 7',
    code: 'Pr7',
    id: 'Pr7',
    price: ' 6000',
    createAt: dayjs(new Date()).day(1).format('YYYY-MM-DD'),
    src: ImageSrc,
    description:
      'THE FIRST WIN6: David Tremayne remembers the magical day in Montreal when Lewis Hamilton became a Grand Prix winner',
  },
  {
    name: 'Podcast Block 8',
    code: 'New',
    id: 'Pr8',
    price: ' 6000',
    createAt: dayjs(new Date()).day(2).format('YYYY-MM-DD'),
    src: ImageSrc,
    description:
      'THE FIRST WIN7: David Tremayne remembers the magical day in Montreal when Lewis Hamilton became a Grand Prix winner',
  },
  {
    name: 'Podcast Block 9',
    code: 'New',
    id: 'Pr9',
    price: ' 6000',
    createAt: dayjs().day(-1).format('YYYY-MM-DD'),
    src: ImageSrc,
    description:
      'THE FIRST WIN8: David Tremayne remembers the magical day in Montreal when Lewis Hamilton became a Grand Prix winner',
  },
];
