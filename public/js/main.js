const deleteIcons = document.querySelectorAll('.fa-trash')

Array.from(deleteIcons).forEach((element) => {
    element.addEventListener('click', deleteBook)
})

async function deleteBook() {
    const bName = this.parentNode.childNodes[1].innerText.replace(/\s$/, '')
    const bAuthor = this.parentNode.childNodes[3].innerText.replace(/\s$/, '')
    try {
        const response = await fetch('deleteBook', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'bookN': bName,
                'authorN': bAuthor
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    } catch(err) {
        console.log(err)
    }
}