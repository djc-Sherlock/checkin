const axios = require('axios');
const notify = require('./sendNotify'); // 这里是 node（青龙属于node环境）通知相关的
const Notify = 1; //0为关闭通知，1为打开通知,默认为1
const bondList = [];
function checkTodayBond() {
	try {
		// 获取今天的日期
		const today = new Date().toISOString().split('T')[0];
		// 请求接口
		axios
			.get('https://www.jisilu.cn/data/cbnew/pre_list/')
			.then(response => {
				// 遍历数据
				response.data.rows.forEach(row => {
					const applyDate = row.cell.apply_date;
					// 检查apply_date是否与今天相同
					if (applyDate === '2023-08-23') {
						bondList.push(row.cell.bond_nm);
					}
				});
				console.log('总共有 ' + bondList.length + ' 条数据'); // 打印符合条件的数据数量
				console.log('新债是: ' + bondList.join(', ')); // 打印符合条件的数据内容
				msg = `今日可申购{bondList.length}只新债\n\n` + '分别是' + bondList.join(', ');
				return msg;
			})
			.catch(error => {
				console.error('请求接口时发生错误：', error);
			});
	} catch (error) {
		console.error('发生错误:', error);
		return 0; // 返回默认值
	}
}
function SendMsg(message) {
	if (!message) return;

	if (Notify > 0) {
		var notify = require('./sendNotify');
		notify.sendNotify('新债申购提醒', message);
	} else {
		return console.log('不发送消息提醒');
	}
}
SendMsg(checkTodayBond());
