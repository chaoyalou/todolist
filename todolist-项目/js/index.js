
/* =========================== 读取本地存储的数据 =========================== */
const date = localStorage.getItem('toDo')
const arr = date ? JSON.parse(date) : []

/* =========================== render 函数 =========================== */
const todolist = document.querySelector('.box ol')
const title = document.querySelector('[name=title]')
const checkBox = todolist.querySelector('[type=checkbox]')
function render() {
    const newArr = arr.map(function (item, i) {
        const ck = item.done ? 'checked' : ''
        const line = item.done ? `completed` : ``
        return `
            <li class="${line}">
            <input type="checkbox" data-name="${i}" ${ck}/>
            <p>${item.content}</p>
            <a href="javascript:;" data-id="${i}"></a>
          </li>`
    })
    todolist.innerHTML = newArr.join('')
}
render()
/*  =========================== add功能 ===========================  */

title.addEventListener('keyup', function (e) {
    const obj = {}
    if (e.key === 'Enter') {
        //非空判断
        if (title.value.trim() === '') return alert('Required, cannot be empty!!!')
        obj.content = title.value
        obj.done = false //默认添加时候肯定还没有干这件事，默认false
        arr.unshift(obj) //倒着显示
        localStorage.setItem('toDo', JSON.stringify(arr))
        render()
        title.value = ''
    }
})

/* ======================= 事件委托实现切换功能 ======================= */
todolist.addEventListener('click', function (e) {

    /*======================= toggle功能 ======================= */
    const li = document.querySelectorAll('li')
    if (e.target.tagName === 'INPUT') {
        // const complet = todolist.querySelector('completed')
        arr[e.target.dataset.name].done = e.target.checked
        if (e.target.checked) {
            li[e.target.dataset.name].classList.add('completed')
        } else {
            li[e.target.dataset.name].classList.remove('completed')
        }
        localStorage.setItem('toDo', JSON.stringify(arr))
    }
    /* ======================= remove功能 ======================= */
    if (e.target.tagName === 'A') {
        arr.splice(e.target.dataset.id, 1)
        localStorage.setItem('toDo', JSON.stringify(arr))
        render()
    }
})
