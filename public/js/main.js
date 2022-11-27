const deleteIcons = document.querySelectorAll('.fa-trash')
const likeIcons = document.querySelectorAll('.fa-thumbs-up')

Array.from(deleteIcons).forEach((element) => {
    element.addEventListener('click', deleteBook)
})

Array.from(likeIcons).forEach((element) => {
    element.addEventListener('click', addLike)
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

async function addLike() {
    const bName = this.parentNode.childNodes[1].innerText.replace(/\s$/, '')
    const bAuthor = this.parentNode.childNodes[3].innerText.replace(/\s$/, '')
    const bLikes = Number(this.parentNode.childNodes[5].innerText)
    try {
        const response = await fetch('addLike', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'bookN': bName,
                'authorN': bAuthor,
                'likesN' : bLikes
            })
            
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    } catch(err) {
        console.log(err)
    }
}