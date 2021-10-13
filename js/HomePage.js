
 window.addEventListener('DOMContentLoaded', (event) => {
    createInnerHtml();
    console.log("content loaded")
})

const createInnerHtml = () => {
    const headerHtml = "<tr><th></th><th>Name</th><th>Gender</th>"
        + "<th>Department</th><th>Salary</th><th>Start Date</th><th>Actions</th></tr >"

    const innerHtml = `${headerHtml}
    <tr>
        <td>
            <img src="../assets/profile-images/Ellipse -2.png" alt="" class="profile">
        </td>
        <td>Ajay </td>
        <td>Male</td>
        <td>
            <div class="dept-label">HR</div>
            <div class="dept-label">Finance</div>
        </td>
        <td>3000000</td>
        <td>1 Nov 2020</td>
        <td class="action-content">
            <img src="../assets/icons/delete-black-18dp.svg" id="1" onclick="remove(this)" alt="delete">
                <img src="../assets/icons/create-black-18dp.svg" id="2" onclick="update(this)" alt="delete">
                </td>
            </tr>`;

    document.querySelector('.table-main').innerHTML = innerHtml;
}
