insertContent('home')
function insertContent(id, payload) {
    const placeholder = document.getElementById('content-placeholder');
    if (placeholder) {
        switch (id) {
            case 'home':
                placeholder.innerHTML = `
                <section class="home align-all-center">
                    <div class="align-all-center column">
                        <h1 class="large-title">LUU</h1>
                        <p>FIND YOUR PERFECT MATCH</p>
                    </div>
                    <button onclick="insertContent('loading')" class="lighting-circle-button">SCAN</button>
                    <img alt="LUU LOGO" src="./imgs/luu-indigo.png" />
                    <div id="dialog-holder"></div>
                </section>
                `;
                setTimeout(() => {
                    displayDialog(1)
                }, 3000)
                break;
            case 'chat':
                placeholder.innerHTML = `
                    <section id="chat">
                        <div class="appbar">
                            <i class="fa fa-chevron-left"></i>
                            <img src="../imgs/lu.jpeg"/>
                            <div>
                                <p class="p-medium bold">Thomas Zihindula</p>
                                <p class="primary-color">• Online</p>
                            </div>
                            <div class="actions">
                                <i class="fa fa-video"></i>
                                <i class="fa fa-phone"></i>
                            </div>
                        </div>
                        <div class="body">
                            <div class="no-message">
                            <p class="bold">No message here yet...</p>
                            <p>Send a message or tap the greeting bellow</p>
                            <img id="gif" src="https://i.pinimg.com/originals/24/c3/67/24c36745086e8b943fbeb94e32e356c4.gif" alt="LUU"/>
                            </div>
                        </div>
                        <div class="istyping">
                            <img src="../imgs/lu.jpeg"/>
                            <p class="small"><i>Thomas Zihindula ${"is"} typing...</i></p>
                        </div>
                        <div class="bottombar">
                            <i class="fa fa-plus"></i>
                            <div class="input-with-icon">
                                <input type="text" placeholder="Type here">
                                <i class="fa fa-microphone"></i>
                          </div>
                        </div>
                    </section>
                `;
                break;
            case 'loading':
                placeholder.innerHTML = `
                    <section class="loading align-all-center">
                            <div class="loading-container">
                            <div class="loading-particle"></div>
                            <div class="loading-particle"></div>
                            <div class="loading-particle"></div>
                            <div class="loading-particle"></div>
                            <div class="loading-particle"></div>
                            <div class="loading-particle"></div>
                            <div class="loading-particle"></div>
                            <div class="loading-particle"></div>
                        </div>
                        <img alt="LUU LOGO" src="./imgs/luu-indigo.png" />
                    </section>
                    `;
                setTimeout(() => {
                    fetch("https://randomuser.me/api/?gender=male&results=10").then(raw => raw.json()).then((res) => {
                        insertContent('display-users', { users: res.results })
                    })
                }, 2500)

                break;
            case 'display-users':
                const users = payload?.users ?? [];
                placeholder.innerHTML = `
                    <section class="display-users">
                        <div class="curtain">
                            ${[...users].map((e, i) => {
                    return `<div class="single-user" style="top: ${5 + (e.dob.age / 2.5) + i}rem; ${i % 2 ? 'left' : 'right'}: ${3 + i + (i + 2)}rem; margin-top: ${i + 1}px;">
                                <img
                                src="${e.picture.large}"
                                alt="LUU-user"
                                />
                                <p>${e.name.first} ${e.name.last}</p>
                            </div>`
                }).toString().replaceAll(",", "")}
                        </div>
                    </section>
                  `;
                break;

            default:
                placeholder.innerHTML = ""
                break;
        }
    }
}

function displayDialog(state) {
    const dialog = document.getElementById("dialog-holder")
    dialog.style.display = "block";
    dialog.innerHTML = !state ? '' : `
    <div class="start-conversation">
    <div class="notification">
        <div class="top">
            <img src="../imgs/lu.jpeg"/>
            <div>
                <p class="bold">Accept message request ${"from"} Thomas Zihindula ?</p>
                <p class="small">If you accept, they will also able ${"to"} ${"call"} you ${"and"} see info such ${"as"} your activity ${"status"} ${"and"} ${"when"} you've ${"read"} messages</p>
            </div>
        </div>
        <div class="actions">
            <button onclick="insertContent('chat')">Accept</button>
            <button class="disabled" onclick="displayDialog(0)">Reject</button>
        </div>
    </div>
</div>
    `
}