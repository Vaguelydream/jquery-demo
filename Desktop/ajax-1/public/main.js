getJs.onclick = () => {
  const request = new XMLHttpRequest()
  request.open('GET', '/two.js')
  request.onload = () => {
    const script = document.createElement('script') //创建script标签
    script.innerHTML = request.response //填写script内容
    document.body.appendChild(script) //插入到body里
  }
  request.onerror = () => {}
  request.send()
}
getCss.onclick = () => {
  const request = new XMLHttpRequest()
  request.open('GET', '/style.css')
  request.onload = () => {
    const style = document.createElement('style') //在页面里创建style标签
    style.innerHTML = request.response //把获取到的style内容放进刚才创建的style标签
    document.head.appendChild(style) //把style插入到head里
  }
  request.onerror = () => {}
  request.send()
}
getHtml.onclick = () => {
  const request = new XMLHttpRequest()
  request.open('GET', '/three.html')
  request.onreadystatechange = () => {
    if (request.readyState === 4) {
      if (request.status >= 200 && request.status < 300) {
        const div = document.createElement('div') //创建一个div
        div.innerHTML = request.response //把获取到的内容放进刚才创建的div里
        document.body.appendChild(div) //插入到body里
      } else {
        alert('失败')
      }
    }
  }
  request.onerror = () => {}
  request.send()
}
getXML.onclick = () => {
  const request = new XMLHttpRequest()
  request.open('GET', '/four.xml')
  request.onreadystatechange = () => {
    if (request.readyState === 4) {
      if (request.status >= 200 && request.status < 300) {
        const dom = request.responseXML
        //dom对象由于可以用于HTML和XML两种文档，所以这里用dom表示
        const text = dom.getElementsByTagName('warning')[0].textContent
        //获取到warning标签内的内容（因为是伪数组，所以要加0）
        console.log(text.trim())
        //加.trim()取消空格和回车，只保留内容
      }
    }
  }
  request.send()
}
getJSON.onclick = () => {
  const request = new XMLHttpRequest()
  request.open('GET', '/five.json')
  request.onreadystatechange = () => {
    if (request.readyState === 4) {
      if (request.status >= 200 && request.status < 300) {
        const object = JSON.parse(request.response)
        //把json的内容装入object中。   JSON.parse把获取到的json数据类型转换成合适的js类型，这里转换为了对象，但是不代表只能转换成对象
        myName.textContent = object.name
      }
    }
  }
  request.send()
}

//请求下一页

let n = 1
getNext.onclick = () => {
  const request = new XMLHttpRequest()
  request.open('GET', `/db/page${n + 1}`)
  request.onreadystatechange = () => {
    if (request.readyState === 4 && request.status === 200) {
      const array = JSON.parse(request.response)
      array.forEach(item => {
        const li = document.createElement('li')
        li.textContent = item.id
        xxx.appendChild(li)
      })
      n += 1
    }
  }
  request.send()
}


