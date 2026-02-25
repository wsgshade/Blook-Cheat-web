(function () {
    if (document.getElementById("cheat-gui")) return;

    /* ---------- STYLE ---------- */
    const style = document.createElement("style");
    style.textContent = `
        #cheat-toggle {
            position: fixed;
            top: 20px;
            left: 20px;
            background: #111;
            color: #fff;
            padding: 8px 12px;
            border-radius: 6px;
            cursor: pointer;
            z-index: 999999;
            font-family: Arial, sans-serif;
            box-shadow: 0 3px 8px rgba(0,0,0,0.4);
        }
        #cheat-gui {
            position: fixed;
            top: 60px;
            left: 20px;
            width: 240px;
            height: 340px;
            background: #1e1e1e;
            color: white;
            border-radius: 8px;
            box-shadow: 0 4px 10px rgba(0,0,0,0.4);
            font-family: Arial, sans-serif;
            z-index: 999999;
            display: none;
            flex-direction: column;
            overflow: hidden;
        }
        #cheat-header {
            background: #333;
            padding: 8px;
            cursor: move;
            font-weight: bold;
            text-align: center;
            user-select: none;
        }
        #cheat-list {
            flex: 1;
            overflow-y: auto;
            padding: 8px;
        }
        .cheat-section-title {
            margin: 10px 0 5px;
            font-size: 14px;
            font-weight: bold;
            color: #ccc;
        }
        #cheat-list button {
            width: 100%;
            margin-bottom: 6px;
            padding: 6px;
            background: #444;
            border: none;
            border-radius: 4px;
            color: white;
            cursor: pointer;
        }
        #cheat-list button:hover {
            background: #666;
        }
    `;
    document.head.appendChild(style);

    /* ---------- TOGGLE BUTTON ---------- */
    const toggle = document.createElement("div");
    toggle.id = "cheat-toggle";
    toggle.textContent = "Open Cheats";
    document.body.appendChild(toggle);

    /* ---------- GUI ---------- */
    const gui = document.createElement("div");
    gui.id = "cheat-gui";

    gui.innerHTML = `
        <div id="cheat-header">Game Mode Cheats</div>
        <div id="cheat-list">

            <div class="cheat-section-title">Global Cheats</div>
            <button id="global1">Example: Auto Answer</button>
            <button id="global2">Example: Highlight Correct</button>

            <div class="cheat-section-title">Gold Quest</div>
            <button id="gold1">Give Self Gold</button>
            <button id="gold2">Take Gold (self only)</button>

            <div class="cheat-section-title">Battle Royale</div>
            <button id="br1">Instant Answer</button>
            <button id="br2">Speed Boost</button>

            <div class="cheat-section-title">Factory</div>
            <button id="factory1">Max Out Production</button>
            <button id="factory2">Auto Collect</button>

            <div class="cheat-section-title">Tower Defense</div>
            <button id="td1">Max Cash</button>
            <button id="td2">Instant Cooldown</button>

        </div>
    `;
    document.body.appendChild(gui);

    /* ---------- OPEN / CLOSE ---------- */
    toggle.onclick = () => {
        const open = gui.style.display === "flex";
        gui.style.display = open ? "none" : "flex";
        toggle.textContent = open ? "Open Cheats" : "Close Cheats";
    };

    /* ---------- DRAGGING ---------- */
    let dragging = false, offsetX = 0, offsetY = 0;
    const header = document.getElementById("cheat-header");

    header.addEventListener("mousedown", e => {
        dragging = true;
        offsetX = e.clientX - gui.offsetLeft;
        offsetY = e.clientY - gui.offsetTop;
    });

    document.addEventListener("mouseup", () => dragging = false);

    document.addEventListener("mousemove", e => {
        if (!dragging) return;
        gui.style.left = (e.clientX - offsetX) + "px";
        gui.style.top = (e.clientY - offsetY) + "px";
    });

    
    const cheats = {
        global1: () => console.log("Auto Answer placeholder"),
        global2: () => console.log("Highlight Correct placeholder"),

        gold1: () => console.log("Set Gold"),
        gold2: () => console.log("javascript:(()=>%7Bconst d=async()=>%7Bvar e=document.createElement("iframe"),e=(document.body.append(e),window.prompt=e.contentWindow.prompt.bind(window),e.remove(),Number(parseInt(prompt("How much gold would you like?")))),t=Object.values(function e(t=document.querySelector("body>div"))%7Breturn Object.values(t)%5B1%5D?.children?.%5B0%5D?._owner.stateNode?t:e(t.querySelector(":scope>div"))%7D())%5B1%5D.children%5B0%5D._owner%5B"stateNode"%5D;t.setState(%7Bgold:e,gold2:e%7D),t.props.liveGameController.setVal(%7Bpath:"c/".concat(t.props.client.name),val:%7Bb:t.props.client.blook,g:e%7D%7D)%7D;let i=new Image;i.src="https://raw.githubusercontent.com/Coding4hours/Blooket-Cheats/main/autoupdate/timestamps/gold/setGold.png?"+Date.now(),i.crossOrigin="Anonymous",i.onload=function()%7Bvar e=document.createElement("canvas").getContext("2d");e.drawImage(i,0,0,this.width,this.height);let t=e.getImageData(0,0,this.width,this.height)%5B"data"%5D,o="",n;for(let e=0;e<t.length;e+=4)%7Bvar r=String.fromCharCode(256*t%5Be+1%5D+t%5Be+2%5D);if(o+=r,"/"==r&&"*"==n)break;n=r%7Dvar e=document.querySelector("iframe"),%5B,a,c%5D=o.match(/LastUpdated: (.+?); ErrorMessage: "(.+?)"/);(parseInt(a)<=1693429947473%7C%7Ce.contentWindow.confirm(c))&&d()%7D,i.onerror=i.onabort=()=>(i.src=null,d())%7D)();"),

        br1: () => console.log("Instant Answer placeholder"),
        br2: () => console.log("Speed Boost placeholder"),

        factory1: () => console.log("Max Production placeholder"),
        factory2: () => console.log("Auto Collect placeholder"),

        td1: () => console.log("Max Cash placeholder"),
        td2: () => console.log("Instant Cooldown placeholder"),
    };

    Object.keys(cheats).forEach(id => {
        const btn = document.getElementById(id);
        if (btn) btn.onclick = cheats[id];
    });
})();


