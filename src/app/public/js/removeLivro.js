let bookTable = document.querySelector('#livros');
bookTable.addEventListener('click', (event) => {
    let handleDeleteBook = event.target;

    if (handleDeleteBook.dataset.type == 'remocao') {
        let livroId = handleDeleteBook.dataset.ref;
        fetch(`http://localhost:3000/livros/${livroId}`, { method: 'DELETE' })
            .then(resposta => {

                let tr = handleDeleteBook.closest(`#livro_${livroId}`);
                tr.remove();

            })
            .catch(err => console.log(err));

    }

});