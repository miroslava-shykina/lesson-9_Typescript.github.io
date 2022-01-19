let qSel = (selector) => document.querySelector(selector);
let getID = (id) => document.getElementById(id);
let getTeg = (teg) => document.getElementsByTagName(teg);
qSel(".editUp").style.display = "none";
let user;
let arrayUsers = [{ login: "", pass: "", email: "" }];
let edit;
let loginRegExp = /^[A-Za-z]{4,16}$/;
let passRegExp = /^[A-Za-z0-9_.-]{4,16}$/;
let emailRegExp = /^[^\s@]+@[^\s@]+\.([A-Za-z]{2,4})+$/;
getID("login").addEventListener("change", function () {
    let testLogin = loginRegExp.test(getID("login").value);
    if (testLogin) {
        this.style.border = "2px solid rgb(0 159 0)";
    }
    else {
        this.style.border = "2px solid red";
    }
});
getID("email").addEventListener("change", function () {
    let testEmail = emailRegExp.test(getID("email").value);
    if (testEmail) {
        this.style.border = "2px solid rgb(0 159 0)";
    }
    else {
        this.style.border = "2px solid red";
    }
});
getID("pass").addEventListener("change", function () {
    let testPass = passRegExp.test(getID("pass").value);
    if (testPass) {
        this.style.border = "2px solid rgb(0 159 0)";
    }
    else {
        this.style.border = "2px solid red";
    }
});
function render(arrayUsers) {
    if (getTeg("tr").length > 1) {
        let trs = getTeg("tr");
        let num2remove = trs.length - 1;
        for (let i = 0; i < num2remove; i++) {
            trs[1].remove();
        }
    }
    for (let i = 0; i < arrayUsers.length; i++) {
        let TBodyLength = qSel(".tbody").children.length;
        let tb = getTeg("tbody")[0];
        tb.insertAdjacentHTML("beforeEnd", `<tr class="tr">
        <td class="width-1 number index"id="${TBodyLength}" >${TBodyLength}</td>
        <td class="width-2 login">${arrayUsers[i].login}</td>
        <td class="width-2 password">${arrayUsers[i].pass}</td>
        <td class="width-2 email">${arrayUsers[i].email}</td>
        <td class="width-2 but-1"><input type="button" value="Edit" class="edit"></td>
        <td class="width-2 but-2"><input type="button" value="Delete" class="delete"></td>
        </tr>`);
    }
}
qSel(".eddUp").addEventListener("click", function () {
    let testLogin = loginRegExp.test(getID("login").value);
    let testPass = passRegExp.test(getID("pass").value);
    let testEmail = emailRegExp.test(getID("email").value);
    if (testLogin && testEmail && testPass == true) {
        user = {
            login: getID("login").value,
            pass: getID("pass").value,
            email: getID("email").value,
        };
        arrayUsers.push(user);
        getID("login").value = "";
        getID("pass").value = "";
        getID("email").value = "";
        render(arrayUsers);
        let trs = qSel(".tr");
        trs.remove();
    }
});
qSel(".tr-style").addEventListener("click", function () {
    if (event.target.classList.contains("delete")) {
        let index2remove = event.target.parentNode.parentNode
            .children[0].textContent;
        arrayUsers.splice(index2remove, 1);
        render(arrayUsers);
        let trs = qSel(".tr");
        trs.remove();
    }
});
qSel(".tr-style").addEventListener("click", function () {
    if (event.target.classList.contains("edit")) {
        edit = event.target.parentNode.parentNode.children;
        edit.index = edit[0].textContent;
        getID("login").value = edit[1].textContent;
        getID("pass").value = edit[2].textContent;
        getID("email").value = edit[3].textContent;
    }
    qSel(".eddUp").style.display = "none";
    qSel(".editUp").style.display = "block";
});
qSel(".editUp").addEventListener("click", () => {
    for (let i = 0; i < arrayUsers.length; i++) {
        if (edit.index == i) {
            arrayUsers[i].login = getID("login").value;
            arrayUsers[i].pass = getID("pass").value;
            arrayUsers[i].email = getID("email").value;
            break;
        }
    }
    render(arrayUsers);
    let trs = qSel(".tr");
    trs.remove();
    getID("login").value = "";
    getID("pass").value = "";
    getID("email").value = "";
    qSel(".eddUp").style.display = "block";
    qSel(".editUp").style.display = "none";
});
