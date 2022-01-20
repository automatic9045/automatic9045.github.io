const url = location.href;
const title = document.title;

setUrl("twitter", "https://twitter.com/share?url=" + url + "&via=atF9045&related=atF90445&text=" + title);
setUrl("facebook", "http://www.facebook.com/share.php?u=" + url);
setUrl("hatena", "http://b.hatena.ne.jp/add?mode=confirm&url=" + url + "&title=" + title);

function setUrl(snsName, snsUrl) {
	const elements = document.getElementsByClassName("footer-sns-" + snsName);
	switch (elements.length) {
		case 0:
			console.error("Cannot find the class 'footer-sns-" + snsName + "'");
			return;

		case 1:
			elements[0].href = snsUrl;
			break;

		default:
			Array.from(elements).forEach(element => {
				element.url = snsUrl;
			});
			break;
	}
}