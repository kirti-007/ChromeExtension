const btn = document.querySelector(".pickclrbtn");
btn.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({active : true, currentWindow : true});
    chrome.scripting.executeScript({
        target : {
            tabId : tab.id
        },
        function : pickColor,
    });
});

function pickColor(){
    console.log("pickColor")
}