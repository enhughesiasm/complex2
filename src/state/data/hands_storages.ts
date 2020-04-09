import { IHandsStorage } from '../IWorldState';

const basket_color_1 = '#F5DEB3'; // '#dca';
const basket_color_2 = '#FFF8DC'; // '#a85';
const basket_bg = '#EEB887'; //'#753';

const basket = `linear-gradient(45deg, ${basket_color_1} 12%, transparent 0, transparent 88%, ${basket_color_1} 0),
linear-gradient(135deg, transparent 37%, ${basket_color_2} 0, ${basket_color_2} 63%, transparent 0),
linear-gradient(45deg, transparent 37%, ${basket_color_1} 0, ${basket_color_1} 63%, transparent 0) ${basket_bg}`;

const palletColor = '#FFE498';
const palletImage = `radial-gradient(circle farthest-side at 0% 50%,${palletColor} 23.5%,rgba(240,166,17,0) 0)21px 30px, radial-gradient(circle farthest-side at 0% 50%,#B71 24%,rgba(240,166,17,0) 0)19px 30px, linear-gradient(${palletColor} 14%,rgba(240,166,17,0) 0, rgba(240,166,17,0) 85%,${palletColor} 0)0 0, linear-gradient(150deg,${palletColor} 24%,#B71 0,#B71 26%,rgba(240,166,17,0) 0,rgba(240,166,17,0) 74%,#B71 0,#B71 76%,${palletColor} 0)0 0, linear-gradient(30deg,${palletColor} 24%,#B71 0,#B71 26%,rgba(240,166,17,0) 0,rgba(240,166,17,0) 74%,#B71 0,#B71 76%,${palletColor} 0)0 0, linear-gradient(90deg,#B71 2%,${palletColor} 0,${palletColor} 98%,#B71 0%)0 0 ${palletColor}`;

const handsStorage: Array<IHandsStorage> = [
	{
		name: 'The Floor',
		capacity: 3,
		backgroundColor: 'aliceblue',
		backgroundImage:
			'repeating-linear-gradient(120deg, rgba(255,255,255,.1), rgba(255,255,255,.1) 1px, transparent 1px, transparent 60px),		repeating-linear-gradient(60deg, rgba(255,255,255,.1), rgba(255,255,255,.1) 1px, transparent 1px, transparent 60px),		linear-gradient(60deg, rgba(0,0,0,.1) 25%, transparent 25%, transparent 75%, rgba(0,0,0,.1) 75%, rgba(0,0,0,.1)),		linear-gradient(120deg, rgba(0,0,0,.1) 25%, transparent 25%, transparent 75%, rgba(0,0,0,.1) 75%, rgba(0,0,0,.1))',
		backgroundSize: '70px 120px',
	},
	{
		name: 'A Basket',
		capacity: 10,
		backgroundColor: basket_bg,
		backgroundImage: basket,
		backgroundSize: '25px 25px',
	},
	{
		name: 'A Pallet',
		capacity: 100,
		backgroundColor: '',
		backgroundImage: palletImage,
		backgroundSize: '40px 60px',
		backgroundPosition: 'initial !important',
	},
];

export default handsStorage;
