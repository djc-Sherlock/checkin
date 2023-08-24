const { default: axios } = require('axios');
const notify = require('./sendNotify'); // 这里是 node（青龙属于node环境）通知相关的
const Notify = 1; //0为关闭通知，1为打开通知,默认为1
const bondList = [];

// 第一个函数：获取今天日期，并使用axios请求接口，筛选出符合条件的数据
async function getBondList() {
	try {
		const today = new Date().toISOString().split('T')[0]; // 获取今天日期

		const response = await axios.get('https://www.jisilu.cn/data/cbnew/pre_list/'); // 发起请求
		const data = response.data;

		data.rows.forEach(async row => {
			if (row.cell.apply_date == today) {
				bondList.push(row.cell.bond_nm); // 将符合条件的bond_nm加入到bondList数组中
			}
		});
		return bondList;
	} catch (error) {
		console.log(error);
		return [];
	}
}
async function printBondList(bondList) {
	if (bondList.length > 0) {
		console.log('总共有 ' + bondList.length + ' 只新债\n\n'); // 打印符合条件的数据数量
		console.log('新债是: ' + bondList.join(', ') + '\n\n'); // 打印符合条件的数据内容
		msg = '🔔今日可申购 ' + bondList.length + ' 只新债\n\n' + '🔔' + bondList.join(', ');
		await SendMsg(msg);
	} else {
		console.log('今日无可转债需要申购');
	}
}
async function SendMsg(message) {
	if (!message) return;

	if (Notify > 0) {
		var notify = require('./sendNotify');
		notify.sendNotify('新债申购提醒', message);
	} else {
		return console.log('不发送消息提醒');
	}
}
getBondList()
	.then(bondList => printBondList(bondList))
	.catch(error => console.log(error));
