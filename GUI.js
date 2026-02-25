(function () {
  if (document.getElementById("my-adv-gui")) return;

  var LS_KEY = "my-adv-gui-state";

  function loadState() {
    try { return JSON.parse(localStorage.getItem(LS_KEY)) || {}; }
    catch (e) { return {}; }
  }

  function saveState(st) {
    try { localStorage.setItem(LS_KEY, JSON.stringify(st)); }
    catch (e) {}
  }

  var st = loadState();

  /* -------------------- STYLE -------------------- */
  var style = document.createElement("style");
  style.textContent =
    "#my-adv-gui{" +
    "position:fixed;" +
    "top:" + (st.top || "40px") + ";" +
    "left:" + (st.left || "40px") + ";" +
    "width:" + (st.width || "260px") + ";" +
    "height:" + (st.height || "260px") + ";" +
    "background:#222;" +
    "color:#fff;" +
    "font-family:Arial,sans-serif;" +
    "z-index:999999;" +
    "padding:0;" +
    "border-radius:8px;" +
    "box-shadow:0 4px 10px rgba(0,0,0,0.4);" +
    "display:flex;" +
    "flex-direction:column;" +
    "box-sizing:border-box;" +
    "overflow:hidden;" +
    "}" +
    "#my-adv-gui-header{" +
    "background:#333;" +
    "padding:6px 8px;" +
    "cursor:move;" +
    "display:flex;" +
    "align-items:center;" +
    "justify-content:space-between;" +
    "font-size:13px;" +
    "border-radius:8px 8px 0 0;" +
    "user-select:none;" +
    "}" +
    "#my-adv-gui-title{font-weight:bold;}" +
    "#my-adv-gui-buttons{display:flex;gap:4px;}" +
    "#my-adv-gui-buttons button{" +
    "background:#444;border:none;color:#fff;font-size:11px;padding:2px 6px;border-radius:4px;cursor:pointer;" +
    "}" +
    "#my-adv-gui-buttons button:hover{background:#666;}" +
    "#my-adv-gui-content{" +
    "flex:1;padding:8px;overflow:auto;display:" + (st.collapsed ? "none" : "block") + ";" +
    "}" +
    "#my-adv-gui-tabs{display:flex;gap:4px;margin-bottom:6px;}" +
    "#my-adv-gui-tabs button{" +
    "flex:1;background:#444;border:none;color:#fff;font-size:11px;padding:4px;border-radius:4px;cursor:pointer;" +
    "}" +
    "#my-adv-gui-tabs button.active{background:#777;}" +
    "#my-adv-gui-resize{" +
    "position:absolute;right:2px;bottom:2px;width:12px;height:12px;cursor:se-resize;" +
    "background:linear-gradient(135deg,transparent 0,transparent 50%,#777 50%,#777 100%);" +
    "border-radius:3px;" +
    "}" +
    "#my-adv-gui textarea{" +
    "width:100%;height:80px;background:#111;color:#0f0;border:1px solid #555;border-radius:4px;" +
    "font-size:11px;font-family:Consolas,monospace;box-sizing:border-box;padding:4px;" +
    "}" +
    "#my-adv-gui .section{margin-bottom:8px;font-size:12px;}" +
    "#my-adv-gui input[type=range]{width:100%;}" +
    "#my-adv-gui label{font-size:12px;display:flex;align-items:center;gap:4px;}" +
    "#my-adv-gui button.action{" +
    "width:100%;margin-top:4px;background:#555;border:none;color:#fff;padding:4px;border-radius:4px;cursor:pointer;font-size:12px;" +
    "}" +
    "#my-adv-gui button.action:hover{background:#777;}";
  document.head.appendChild(style);

  /* -------------------- DOM -------------------- */
  var gui = document.createElement("div");
  gui.id = "my-adv-gui";
  gui.innerHTML =
    '<div id="my-adv-gui-header">' +
      '<span id="my-adv-gui-title">Page Control Panel</span>' +
      '<div id="my-adv-gui-buttons">' +
        '<button id="my-adv-gui-collapse">' + (st.collapsed ? "+" : "_") + '</button>' +
        '<button id="my-adv-gui-close">X</button>' +
      '</div>' +
    '</div>' +
    '<div id="my-adv-gui-content">' +
      '<div id="my-adv-gui-tabs">' +
        '<button data-tab="tab-main" class="active">Main</button>' +
        '<button data-tab="tab-scripts">Scripts</button>' +
        '<button data-tab="tab-controls">Controls</button>' +
      '</div>' +

      '<div id="tab-main" class="tab-panel">' +
        '<div class="section"><strong>Info:</strong><br>Draggable, resizable, collapsible.<br>State saved per site.</div>' +
        '<button class="action" id="my-adv-gui-log-url">Log current URL</button>' +
        '<button class="action" id="my-adv-gui-log-selection">Log selection</button>' +
      '</div>' +

      '<div id="tab-scripts" class="tab-panel" style="display:none;">' +
        '<div class="section"><strong>Run JS on this page:</strong></div>' +
        '<textarea id="my-adv-gui-code">// Example: alert(document.title);</textarea>' +
        '<button class="action" id="my-adv-gui-run">Run Script</button>' +
      '</div>' +

      '<div id="tab-controls" class="tab-panel" style="display:none;">' +
        '<div class="section">' +
          '<label>Opacity: <span id="my-adv-gui-opacity-val">1.0</span></label>' +
          '<input type="range" id="my-adv-gui-opacity" min="0.2" max="1" step="0.05" value="1">' +
        '</div>' +
        '<div class="section"><label><input type="checkbox" id="my-adv-gui-stick"> Stick to top-right</label></div>' +
        '<button class="action" id="my-adv-gui-reset">Reset position/size</button>' +
      '</div>' +
    '</div>' +
    '<div id="my-adv-gui-resize"></div>';

  document.body.appendChild(gui);

  /* -------------------- ELEMENTS -------------------- */
  var header = document.getElementById("my-adv-gui-header");
  var collapseBtn = document.getElementById("my-adv-gui-collapse");
  var closeBtn = document.getElementById("my-adv-gui-close");
  var content = document.getElementById("my-adv-gui-content");
  var resizeHandle = document.getElementById("my-adv-gui-resize");

  var logUrlBtn = document.getElementById("my-adv-gui-log-url");
  var logSelBtn = document.getElementById("my-adv-gui-log-selection");
  var runBtn = document.getElementById("my-adv-gui-run");
  var codeBox = document.getElementById("my-adv-gui-code");

  var opacitySlider = document.getElementById("my-adv-gui-opacity");
  var opacityVal = document.getElementById("my-adv-gui-opacity-val");
  var stickChk = document.getElementById("my-adv-gui-stick");
  var resetBtn = document.getElementById("my-adv-gui-reset");

  /* -------------------- DRAGGING -------------------- */
  var isDrag = false, dragX = 0, dragY = 0;

  header.addEventListener("mousedown", function (e) {
    if (e.target === collapseBtn || e.target === closeBtn) return;
    isDrag = true;
    var r = gui.getBoundingClientRect();
    dragX = e.clientX - r.left;
    dragY = e.clientY - r.top;
    e.preventDefault();
  });

  document.addEventListener("mouseup", function () {
    if (isDrag || isResize) {
      isDrag = false;
      isResize = false;
      saveCurrentState();
    }
  });

  document.addEventListener("mousemove", function (e) {
    if (isDrag) {
      gui.style.left = (e.clientX - dragX) + "px";
      gui.style.top = (e.clientY - dragY) + "px";
    } else if (isResize) {
      var r = gui.getBoundingClientRect();
      gui.style.width = Math.max(200, e.clientX - r.left) + "px";
      gui.style.height = Math.max(160, e.clientY - r.top) + "px";
    }
  });

  /* -------------------- RESIZE -------------------- */
  var isResize = false;
  resizeHandle.addEventListener("mousedown", function (e) {
    isResize = true;
    e.preventDefault();
  });

  /* -------------------- COLLAPSE / CLOSE -------------------- */
  collapseBtn.addEventListener("click", function () {
    var visible = content.style.display !== "none";
    content.style.display = visible ? "none" : "block";
    collapseBtn.textContent = visible ? "+" : "_";
    st.collapsed = !visible;
    saveState(st);
  });

  closeBtn.addEventListener("click", function () {
    gui.remove();
    saveState(st);
  });

  /* -------------------- TABS -------------------- */
  var tabButtons = gui.querySelectorAll("#my-adv-gui-tabs button");
  var panels = {
    "tab-main": document.getElementById("tab-main"),
    "tab-scripts": document.getElementById("tab-scripts"),
    "tab-controls": document.getElementById("tab-controls")
  };

  tabButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      tabButtons.forEach(function (b) { b.classList.remove("active"); });
      btn.classList.add("active");
      var target = btn.getAttribute("data-tab");
      for (var k in panels) {
        panels[k].style.display = (k === target ? "block" : "none");
      }
    });
  });

  /* -------------------- BUTTON ACTIONS -------------------- */
  logUrlBtn.addEventListener("click", function () {
    console.log("URL:", location.href);
    alert("Logged URL to console");
  });

  logSelBtn.addEventListener("click", function () {
    var t = window.getSelection ? String(window.getSelection()) : "";
    console.log("Selection:", t);
    alert("Logged selection to console");
  });

  runBtn.addEventListener("click", function () {
    try { new Function(codeBox.value)(); }
    catch (e) { alert("Error: " + e); }
  });

  /* -------------------- OPACITY / STICK / RESET -------------------- */
  if (st.opacity) {
    opacitySlider.value = st.opacity;
    gui.style.opacity = st.opacity;
    opacityVal.textContent = st.opacity;
  }

  opacitySlider.addEventListener("input", function () {
    gui.style.opacity = opacitySlider.value;
    opacityVal.textContent = opacitySlider.value;
    st.opacity = opacitySlider.value;
    saveState(st);
  });

  if (st.stick) {
    stickChk.checked = true;
    stickToTopRight();
  }

  stickChk.addEventListener("change", function () {
    st.stick = stickChk.checked;
    saveState(st);
    if (stickChk.checked) stickToTopRight();
  });

  resetBtn.addEventListener("click", function () {
    st = {};
    saveState(st);
    gui.style.top = "40px";
    gui.style.left = "40px";
    gui.style.width = "260px";
    gui.style.height = "260px";
    gui.style.opacity = "1";
    opacitySlider.value = "1";
    opacityVal.textContent = "1.0";
    stickChk.checked = false;
  });

  window.addEventListener("resize", function () {
    if (st.stick) stickToTopRight();
  });

  function stickToTopRight() {
    gui.style.top = "20px";
    gui.style.left = (window.innerWidth - gui.offsetWidth - 20) + "px";
    saveCurrentState();
  }

  function saveCurrentState() {
    var r = gui.getBoundingClientRect();
    st.left = r.left + "px";
    st.top = r.top + "px";
    st.width = r.width + "px";
    st.height = r.height + "px";
    saveState(st);
  }
})();
