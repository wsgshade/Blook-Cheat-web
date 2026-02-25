(function () {
    if (document.getElementById("simple-cheat-gui")) return;

    // --- STYLE ---
    const style = document.createElement("style");
    style.textContent = `
        #simple-cheat-gui {
            position: fixed;
            top: 20px;
            left: 20px;
            width: 200px;
            height: 260px;
            background: #1e1e1e;
            color: white;
            border-radius: 8px;
            box-shadow: 0 4px 10px rgba(0,0,0,0.4);
            font-family: Arial, sans-serif;
            z-index: 999999;
            display: flex;
            flex-direction: column;
            overflow: hidden;
        }
        #simple-cheat-header {
            background: #333;
            padding: 8px;
            cursor: move;
            font-weight: bold;
            text-align: center;
            user-select: none;
        }
        #simple-cheat-list {
            flex: 1;
            overflow-y: auto;
            padding: 8px;
        }
        #simple-cheat-list button {
            width: 100%;
            margin-bottom: 6px;
            padding: 6px;
            background: #444;
            border: none;
            border-radius: 4px;
            color: white;
            cursor: pointer;
        }
        #simple-cheat-list button:hover {
            background: #666;
        }
    `;
    document.head.appendChild(style);

    // --- GUI ---
    const gui = document.createElement("div");
    gui.id = "simple-cheat-gui";

    gui.innerHTML = `
        <div id="simple-cheat-header">Cheats</div>
        <div id="simple-cheat-list">
            <button id="cheat1">Enable Cheat 1</button>
            <button id="cheat2">Enable Cheat 2</button>
            <button id="cheat3">Enable Cheat 3</button>
            <button id="cheat4">Enable Cheat 4</button>
            <button id="cheat5">Enable Cheat 5</button>
            <button id="cheat6">Enable Cheat 6</button>
            <button id="cheat7">Enable Cheat 7</button>
            <button id="cheat8">Enable Cheat 8</button>
        </div>
    `;

    document.body.appendChild(gui);

    // --- DRAGGING ---
    let dragging = false, offsetX = 0, offsetY = 0;
    const header = document.getElementById("simple-cheat-header");

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

    // --- BUTTON ACTIONS ---
    document.getElementById("cheat1").onclick = () => alert("Cheat 1 enabled!");
    document.getElementById("cheat2").onclick = () => alert("Cheat 2 enabled!");
    document.getElementById("cheat3").onclick = () => alert("Cheat 3 enabled!");
    document.getElementById("cheat4").onclick = () => alert("Cheat 4 enabled!");
    document.getElementById("cheat5").onclick = () => alert("Cheat 5 enabled!");
    document.getElementById("cheat6").onclick = () => alert("Cheat 6 enabled!");
    document.getElementById("cheat7").onclick = () => alert("Cheat 7 enabled!");
    document.getElementById("cheat8").onclick = () => alert("Cheat 8 enabled!");
})();
