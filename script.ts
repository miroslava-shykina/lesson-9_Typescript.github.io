let qSel = (selector) => document.querySelector(selector);
let getID = (id) => document.getElementById(id);
let getTeg = (teg) => document.getElementsByTagName(teg);
qSel(".editUp").style.display = "none";

let user: {
  login: string;
  pass: string;
  email: string;
};

let arrayUsers: typeof user[] = [{ login: "", pass: "", email: "" }];
let edit: any;

//verification RegExp
let loginRegExp: RegExp = /^[A-Za-z]{4,16}$/;
let passRegExp: RegExp = /^[A-Za-z0-9_.-]{4,16}$/;
let emailRegExp: RegExp = /^[^\s@]+@[^\s@]+\.([A-Za-z]{2,4})+$/;

//avent for changes inputs after verification RegExp
getID("login").addEventListener("change", function (): void {
  let testLogin: boolean = loginRegExp.test(
    (getID("login") as HTMLInputElement).value
  );
  if (testLogin) {
    this.style.border = "2px solid rgb(0 159 0)";
  } else {
    this.style.border = "2px solid red";
  }
});

//avent for changes inputs after verification RegExp
getID("email").addEventListener("change", function (): void {
  let testEmail: boolean = emailRegExp.test(
    (getID("email") as HTMLInputElement).value
  );
  if (testEmail) {
    this.style.border = "2px solid rgb(0 159 0)";
  } else {
    this.style.border = "2px solid red";
  }
});

//avent for changes inputs after verification RegExp
getID("pass").addEventListener("change", function (): void {
  let testPass: boolean = passRegExp.test(
    (getID("pass") as HTMLInputElement).value
  );
  if (testPass) {
    this.style.border = "2px solid rgb(0 159 0)";
  } else {
    this.style.border = "2px solid red";
  }
});


// function render
function render(arrayUsers): void {
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
    tb.insertAdjacentHTML(
      "beforeEnd",
      `<tr class="tr">
        <td class="width-1 number index"id="${TBodyLength}" >${TBodyLength}</td>
        <td class="width-2 login">${arrayUsers[i].login}</td>
        <td class="width-2 password">${arrayUsers[i].pass}</td>
        <td class="width-2 email">${arrayUsers[i].email}</td>
        <td class="width-2 but-1"><input type="button" value="Edit" class="edit"></td>
        <td class="width-2 but-2"><input type="button" value="Delete" class="delete"></td>
        </tr>`
    );
  }
}


//avent for adding new user
qSel(".eddUp").addEventListener("click", function (): void {
  let testLogin: boolean = loginRegExp.test(
    (getID("login") as HTMLInputElement).value
  );
  let testPass: boolean = passRegExp.test(
    (getID("pass") as HTMLInputElement).value
  );
  let testEmail: boolean = emailRegExp.test(
    (getID("email") as HTMLInputElement).value
  );
  if (testLogin && testEmail && testPass == true) {
    user = {
      login: (getID("login") as HTMLInputElement).value,
      pass: (getID("pass") as HTMLInputElement).value,
      email: (getID("email") as HTMLInputElement).value,
    };

    arrayUsers.push(user);

    (getID("login") as HTMLInputElement).value = "";
    (getID("pass") as HTMLInputElement).value = "";
    (getID("email") as HTMLInputElement).value = "";

    render(arrayUsers);
    let trs = qSel(".tr");
    trs.remove();
  }
});


//avent for delete user
qSel(".tr-style").addEventListener("click", function (): void {
  if ((event.target as Element).classList.contains("delete")) {
    let index2remove: any = (event.target as Element).parentNode.parentNode
      .children[0].textContent;
    arrayUsers.splice(index2remove, 1);

    render(arrayUsers);
    let trs = qSel(".tr");
    trs.remove();
  }
});


//add user for changes
qSel(".tr-style").addEventListener("click", function (): void {
  if ((event.target as Element).classList.contains("edit")) {
    edit = (event.target as Element).parentNode.parentNode.children;
    edit.index = edit[0].textContent;
    (getID("login") as HTMLInputElement).value = edit[1].textContent;
    (getID("pass") as HTMLInputElement).value = edit[2].textContent;
    (getID("email") as HTMLInputElement).value = edit[3].textContent;
  }
  qSel(".eddUp").style.display = "none";
  qSel(".editUp").style.display = "block";
});


//avent add user after changes
qSel(".editUp").addEventListener("click", (): void => {
  for (let i: number = 0; i < arrayUsers.length; i++) {
    if (edit.index == i) {
      arrayUsers[i].login = (getID("login") as HTMLInputElement).value;
      arrayUsers[i].pass = (getID("pass") as HTMLInputElement).value;
      arrayUsers[i].email = (getID("email") as HTMLInputElement).value;
      break;
    }
  }
  render(arrayUsers);
  let trs = qSel(".tr");
  trs.remove();

  (getID("login") as HTMLInputElement).value = "";
  (getID("pass") as HTMLInputElement).value = "";
  (getID("email") as HTMLInputElement).value = "";

  qSel(".eddUp").style.display = "block";
  qSel(".editUp").style.display = "none";
});
