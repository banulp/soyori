// select 박스 생성
var selectElement = document.createElement("select");
selectElement.id = "bible-select";

var defaultOption = document.createElement("option");
defaultOption.value = "";
defaultOption.text = "--암송할 문답을 선택하세요.--";
selectElement.appendChild(defaultOption);

const path = "./index.html?bible=";
var options = [
    { value: path+"total.js", text: "전체" },
    { value: path+"1.js", text: "문1답1" },
    { value: path+"2.js", text: "문2답2" },
    { value: path+"3.js", text: "문3답3" },
    { value: path+"4.js", text: "문4답4" },
    { value: path+"5.js", text: "문5답5" },
    { value: path+"6.js", text: "문6답6" },
    { value: path+"7.js", text: "문7답7" },
    { value: path+"8.js", text: "문8답8" },
    { value: path+"9.js", text: "문9답9" },
    { value: path+"10.js", text: "문10답10" },
    { value: path+"11.js", text: "문11답11" },
    { value: path+"12.js", text: "문12답12" },
    { value: path+"14.js", text: "문14답14" },
    { value: path+"19.js", text: "문19답19" },
    { value: path+"23.js", text: "문23답23" },
    { value: path+"29.js", text: "문29답29" },
    { value: path+"30.js", text: "문30답30" },
    { value: path+"33.js", text: "문33답33" },
    { value: path+"37.js", text: "문37답37" },
    { value: path+"38.js", text: "문38답38" },
];

// 옵션 추가
options.forEach(function(optionData) {
    var option = document.createElement("option");
    option.value = optionData.value;
    option.text = optionData.text;
    selectElement.appendChild(option);
});

// URL에서 현재 bible 값 추출
function getCurrentBible() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("bible");
}

// 현재 페이지 값에 맞게 select 선택되도록 설정
function updateSelectBoxSelectedValue(currentBible) {
    const fullPath = path + currentBible;
    const matchOption = Array.from(selectElement.options).find(opt => opt.value === fullPath);
    if (matchOption) {
        selectElement.value = fullPath;
    }
}

// select 박스 변경 시 이동
selectElement.onchange = function () {
    const selectedValue = selectElement.value;
    if (selectedValue) {
        window.location.href = selectedValue;
    }
};

// 예쁜 버튼 생성 함수
function createStyledButton(label, targetIndex) {
    var button = document.createElement("button");
    button.textContent = label;

    // 버튼 스타일
    button.style.backgroundColor = "#4a90e2";
    button.style.color = "white";
    button.style.border = "none";
    button.style.borderRadius = "20px";
    button.style.padding = "5px 5px";
    button.style.margin = "5px 5px";
    button.style.fontSize = "14px";
    button.style.cursor = "pointer";
    button.style.transition = "background-color 0.3s ease";

    // 호버 효과
    button.onmouseover = function () {
        if (!button.disabled) button.style.backgroundColor = "#357ABD";
    };
    button.onmouseout = function () {
        if (!button.disabled) button.style.backgroundColor = "#4a90e2";
    };

    // 유효하지 않으면 비활성화
    if (targetIndex >= 0 && targetIndex < options.length) {
        button.onclick = function () {
            window.location.href = options[targetIndex].value;
        };
    } else {
        button.disabled = true;
        button.style.backgroundColor = "#ccc";
        button.style.cursor = "default";
    }

    return button;
}

// 현재 인덱스 찾고 버튼 생성
var currentBible = getCurrentBible();
var currentIndex = options.findIndex(opt => opt.value.includes(currentBible));

var prevButton = createStyledButton("← 이전 문답", currentIndex - 1);
var nextButton = createStyledButton("다음 문답 →", currentIndex + 1);

// 선택 박스 초기화
updateSelectBoxSelectedValue(currentBible);

// wrapper div로 버튼과 select 정렬
var navWrapper = document.createElement("div");
navWrapper.style.display = "flex";
navWrapper.style.alignItems = "center";
navWrapper.style.gap = "10px";
navWrapper.style.flexWrap = "wrap";
navWrapper.style.marginTop = "10px";

navWrapper.appendChild(prevButton);
navWrapper.appendChild(selectElement);
navWrapper.appendChild(nextButton);

// 기존 요소에 삽입
document.getElementById("biblemenu").prepend(navWrapper);
