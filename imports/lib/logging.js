

export function logData(message, data) {
	let strData = "";
	if (data) {
		strData = JSON.stringify(data, null, 4);
	}
	if (Meteor.isClient) {
		console.log("%c"+message+" →\n%c"+strData, "color:blue; font-weight:bold","");
	} else if (Meteor.isServer) {
		console.log(message+" →\n"+strData);
	}
}
