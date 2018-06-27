class  UserController {
    constructor(formId, tableId) {
        this.form = document.getElementById(formId);
        this.table = document.getElementById(tableId);

        this.onSubmit();
    }


    onSubmit(){
        this.form.addEventListener("submit", (event) => {
            event.preventDefault();

            let values = this.getValues();
            values.photo = '';
            this.getPhoto()
            this.addLine(values)
        });
    }

    getPhoto(){
        let fileReader = new FileReader();

        let elementes =  [...this.form.elements].filter(item => {
            if(item.name === 'photo'){
                return item;
            }
        });

    }


    getValues(){
        let user = {};
        [...this.form.elements].forEach( (field, index) => {
            console.log(field.value)
            if(field.name == "gender") {
                if (field.checked) {
                    user[field.name] = field.value;
                }
            }
            else {
                user[field.name] = field.value;
            }
        });
        return new User(user.name, user.gender,user.birth, user.country,user.email,user.password, user.photo, user.admin);
    }

    addLine(datauser){
        this.table.innerHTML = `
        <tr>
            <td><img src="${datauser.foto}" alt="User Image" class="img-circle img-sm"></td>
            <td>${datauser.name}</td>
            <td>${datauser.email}</td>
            <td>${datauser.admin}</td>
            <td>${datauser.birth}</td>
            <td>
              <button type="button" class="btn btn-primary btn-xs btn-flat">Editar</button>
              <button type="button" class="btn btn-danger btn-xs btn-flat">Excluir</button>
            </td>
        </tr>
        `;
    }
}