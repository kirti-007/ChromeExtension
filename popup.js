const btn = document.querySelector('.pickclrbtn');
const colorGrid = document.querySelector('.clrgrid');
const colorValue = document.querySelector('.clrvalue');

btn.addEventListener('click', async () => {
    try {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

        chrome.scripting.executeScript(
            {
                target: { tabId: tab.id },
                function: pickColor,
            },
            async(injectionResults)=>{
                const[data]=injectionResults;
                if(data.result){
                    const color=data.result.sRGBHex;
                    colorGrid.style.backgroundColor=color;
                    colorValue.innerText=color;
                }
            }
        );
    } catch (error) {;
        console.error('Error querying tabs:', error);
    }
});

async function pickColor() {
    try {
        const eyeDropper = new EyeDropper();
        const result = await eyeDropper.open();
        return result;
    } catch (err) {
        console.error(err);
    }
}