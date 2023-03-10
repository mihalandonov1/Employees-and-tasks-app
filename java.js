import data from "./employees.json" assert { type: "json" };

const tableBody = document.querySelector(".table-body");

//////////////////// MODAL ///////////////

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".modal-cancel-btn");
const btnOpenModal = document.querySelector(".add-new-employee-btn");

const openModal = function (e) {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function (e) {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnCloseModal.addEventListener("click", function () {
  closeModal();
});
btnOpenModal.addEventListener("click", function () {
  openModal();
});

overlay.addEventListener("click", function () {
  closeModal();
});

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

//////////////////////////////////////////////
export function deleteEmployee() {
  data.employees.forEach(() => {
    tableBody.addEventListener("click", function (e) {
      if (!e.target.classList.contains(".employee-delete-table-btn")) {
        return;
      }
      const btn = e.target;
      btn.closest("tr").remove();
    });
  });
}

export function editEmployee() {
  tableBody.addEventListener("click", function (e) {
    if (!e.target.classList.contains(".employee-edit-table-btn")) {
      console.log(e.target);
      return;
    }
    const btn = e.target;
    console.log(btn);
  });
}

editEmployee();

function displayEmployeeTable() {
  fetch("./employees.json")
    .then((x) => {
      console.log(x);
      if (x.ok == true) {
        return x.json();
      } else {
        return x.statusText;
      }
    })
    .then((y) => {
      console.log("Data Loaded successfully");

      let myTable = document.querySelector(".table-body");
      for (let i = 0; i < data.employees.length; i++) {
        var myTr = `
        <tr class="table-row" id="${i + 1}">
        <td class="employee-id" id="${i + 1}">${y.employees[i].id}</td>
        <td class="employee-name" id="${i + 1}">${y.employees[i].name}</td>
        <td class="employee-email" id="${i + 1}">${y.employees[i].email}</td>
        <td class="employee-phone" id="${i + 1}">0${y.employees[i].phone}</td>
        <td class="employee-birth" id="${i + 1}">${y.employees[i].birth}</td>
        <td class="employee-salary" id="${i + 1}">${y.employees[i].salary}</td>
        <td class="table-buttons">
                <button class="employee-edit-table-btn" id="${
                  i + 1
                }">Edit</button>
                <button id="btn" class="employee-delete-table-btn">Delete</button>
              </td>
        </tr>`;
        myTable.innerHTML += myTr;
      }
    })
    .catch((error_mag) => {
      console.log(error_mag);
    });
}
displayEmployeeTable();
