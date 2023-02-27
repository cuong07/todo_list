const item_studentcode = document.querySelector("input[name=studentcode]")
const item_name = document.querySelector("input[name=name]")
const item_date = document.querySelector("input[name=date]")
const item_address = document.querySelector("input[name=address]")
const item_score1 = document.querySelector("input[name=score1]")
const item_score2 = document.querySelector("input[name=score2]")
const item_score3 = document.querySelector("input[name=score3]")
const input = document.getElementsByTagName("input")
const student_item = document.querySelector(".table-student")
const reset_btn = document.querySelector(".btn-reset")

////modal
const modalDeleteBtn = document.querySelector(".modal-submit")
const modalCancelBtn = document.querySelector(".modal-cancel")
const modal = document.querySelector(".content_modal-full")

//search
const inputSearch = document.querySelector("input[name=search]")
const btnSearch = document.querySelector(".search-btn button")
console.log(btnSearch);

let listStudents = []
const logindex = (listStudents) => {
    for (let i in listStudents) {
        console.log(i);
    }
}

const getData = () => {
    if (validate()) {
        let student = {
            id: item_studentcode.value,
            name: item_name.value,
            date: item_date.value,
            address: item_address.value,
            score1: Number(item_score1.value),
            score2: Number(item_score2.value),
            score3: Number(item_score3.value)
        }

        let index = listStudents.findIndex(item => {
            return item.id == student.id
        });

        if (index >= 0) {
            listStudents.splice(index, 1, student)
        } else {
            listStudents.push(student)
        }
    }
    render(listStudents)
    clearStudent()
}

const render = (listStudents) => {
    if (listStudents.length === 0) {
        return `<p>No Data</p>`
    }
    let htmls = listStudents.map((student, index) => {
        modalDeleteBtn.onclick = () => {
            deleteStudent(index)
            modal.classList.remove("active")
        }
        let score = ((student.score1 + student.score2 + student.score3) / 3)
        let mediumScore = Math.round(score * 100) / 100
        return `
            <tr class = "student-item-${index}" key = ${index}>
                <td>${student.id}</td>
                <td>${student.name}</td>
                <td>${student.date}</td>
                <td>${student.address}</td>
                <td>${student.score1}</td>
                <td>${student.score2}</td>
                <td>${student.score3}</td>
                <td>${mediumScore}</td>
                <td>
                    <button class="deleteBtn" onclick = "handleModal()">Delete</button>
                    <button class="updateBtn" onclick = "updateStudent(${index})" >Update</button>
                </td>
            </tr>
        `
    })
    student_item.innerHTML = htmls.join("")
}

const deleteStudent = (indexOfArr) => {
    listStudents.forEach((e, indexOfObj) => {
        if (indexOfObj === indexOfArr) {
            listStudents.splice(indexOfArr, 1)
        }
    })
    render(listStudents)
}

const updateStudent = (indexOfArr) => {
    listStudents.forEach((e, indexOfObj) => {
        if (indexOfObj === indexOfArr) {
            item_studentcode.value = listStudents[indexOfObj].id
            item_name.value = listStudents[indexOfObj].name
            item_date.value = listStudents[indexOfObj].date
            item_address.value = listStudents[indexOfObj].address
            item_score1.value = listStudents[indexOfObj].score1
            item_score2.value = listStudents[indexOfObj].score2
            item_score3.value = listStudents[indexOfObj].score3
        }
    })
    render(listStudents)
}

const clearStudent = () => {
    for (let i = 0; i < input.length; i++) {
        const element = input[i];
        element.value = ""
    }
}

const handleModal = () => {
    modal.classList.toggle("active");
}

modalCancelBtn.onclick = () => {
    modal.classList.remove("active")
}

reset_btn.onclick = () => {
    clearStudent()
}

const validate = () => {
    let isCheck = true
    if (item_name.value === "") {
        document.getElementById("mess").innerText = "Khong dc bo trong"
        isCheck = false;
    } else {
        document.getElementById("mess").innerText = ""
        isCheck = true;
    }
    return isCheck;
}


btnSearch.onclick = () => {
    const searchName = inputSearch.value;
    const result = listStudents.filter(user => {
        return user.name.toLowerCase() === searchName;
    })
    render(result)
}