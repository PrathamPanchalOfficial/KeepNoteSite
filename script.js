let Addbtn = document.getElementById('addBtn');

const dataUpdate = () =>{
    const dataTextarea = document.querySelectorAll('textarea');
    const notes = [];

    dataTextarea.forEach((note)=>{
        return notes.push(note.value);
    });

    localStorage.setItem('notes',JSON.stringify(notes));
}

const Newnote = (text = '') => {
    const divNote = document.createElement('div');
    divNote.classList.add('contentNote');
    const html = `
    <div class="icons">
        <button class="btnIcon" id="editIcon"><i class="fa fa-edit"></i></button>
        <button class="btnIcon" id="DeleteIcon"><i class="fa fa-trash" aria-hidden="true"></i></button>
    </div>

        <div class="insert ${text ? "" : "hidden"}"></div>
        <textarea class="${text ? "hidden" : ""}"> </textarea>`;
    divNote.insertAdjacentHTML('afterbegin', html);

    // reference 
    const editIcon = divNote.querySelector('#editIcon');
    const deleteIcon = divNote.querySelector('#DeleteIcon');
    const insertdiv = divNote.querySelector('.insert');
    const textarea = divNote.querySelector('textarea');

    // Delete the note
    deleteIcon.addEventListener('click',()=>{
        divNote.remove();
        dataUpdate();
    });

    textarea.value = text;
    insertdiv.innerHTML = text;

    // edit note
    editIcon.addEventListener('click',()=>{
        insertdiv.classList.toggle('hidden');
        textarea.classList.toggle('hidden');
    })

    textarea.addEventListener('change',(e)=>{
        const data = e.target.value;
        insertdiv.innerHTML = data;

        dataUpdate();
    });

    document.querySelector('.main').appendChild(divNote);
}

const notes = JSON.parse(localStorage.getItem('notes'));

if(notes){
    notes.forEach((note)=> Newnote(note));
}
Addbtn.addEventListener('click', () => Newnote());

