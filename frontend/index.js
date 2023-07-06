const calcTime = (timeStamp) => {
  //한국시간을 세계시간으로 연산해서 저장
  const curTime = new Date().getTime() - 9 * 60 * 60 * 1000;

  //흐른시간
  const elapsedTime = new Date(curTime - timeStamp);

  const hour = elapsedTime.getHours();
  const minute = elapsedTime.getMinutes();
  const second = elapsedTime.getSeconds();

  if (hour > 0) return `${hour}시간 전`;
  else if (minute > 0) return `${minute}분 전`;
  else if (second > 0) return `${second}초 전`;
  //undefined뜨는 에러 처리. 초가 0일 때
  else return '방금전';
};

//데이터를 화면에 render해주는 함수
const renderData = (data) => {
  const main = document.querySelector('main');

  data.reverse().forEach(async (obj) => {
    const div = document.createElement('div');
    div.className = 'item-list';

    const imageDiv = document.createElement('div');
    imageDiv.className = 'item-list__img';

    const img = document.createElement('img');
    const res = await fetch(`/images/${obj.id}`);
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    img.src = url;

    const InfoDiv = document.createElement('div');
    InfoDiv.className = 'item-list__info';

    const InfoTitleDiv = document.createElement('div');
    InfoTitleDiv.className = 'item-list__info-title';
    InfoTitleDiv.innerText = obj.title;

    const InfoMetaDiv = document.createElement('div');
    InfoMetaDiv.className = 'item-list__info-meta';
    InfoMetaDiv.innerText = obj.place + calcTime(obj.insertAt);

    const InfoPriceDiv = document.createElement('div');
    InfoPriceDiv.className = 'item-list__info-price';
    InfoPriceDiv.innerText = obj.price;

    imageDiv.appendChild(img);
    InfoDiv.appendChild(InfoTitleDiv);
    InfoDiv.appendChild(InfoMetaDiv);
    InfoDiv.appendChild(InfoPriceDiv);

    div.appendChild(imageDiv);
    div.appendChild(InfoDiv);

    main.appendChild(div);
  });
};

//서버로부터 데이터를 받아오는 함수
const fetchList = async () => {
  const res = await fetch('/items');
  const data = await res.json();
  console.log('json 형태로 변환', data);
  //서버로부터 받아온 데이터를 render해주는 함수에 담아 실행시킨다.
  renderData(data);
};

fetchList();
