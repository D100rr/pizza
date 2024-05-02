let product = {
    plainBurger: {
        name: 'Пицца Вегетарианская',
        price: 39900,
        kcall: 800,
        amount: 0,
        img: 'img/pizza-1.webp ',
        descr: '  Встречайте простой ГАМБУРГЕР. Он не сочный и не сытный за то дешевый',
        get Summ() {
            return this.price * this.amount
        },
        get Kcall() {
            return this.kcall * this.amount
        }
    },
    freshBurger: {
        name: ' Пицца  Мясной ',
        price: 99900,
        kcall: 2000,
        amount: 0,
        img: 'img/pizza-3.png',
        descr: '  Встречайте Фрешмена FAS FOOD`а. Он набрал в себя всё самое старое.',
        get Summ() {
            return this.price * this.amount
        },
        get Kcall() {
            return this.kcall * this.amount
        }
    },
    freshCombo: {
        name: 'Пицца Пепперони',
        price: 70000,
        kcall: 1000,
        amount: 0,
        img: 'img/pizza-4.webp',
        descr: ' FRESH и Картошка фри. Тот же самый FRESH и Фри объяденились.',
        get Summ() {
            return this.price * this.amount
        },
        get Kcall() {
            return this.kcall * this.amount
        }
    }
}

let extraProduct = {
    doubleMayonnaise: {
        name: 'Соус для Пиццы',
        price: 10000,
        kcall: 200
    },
    cheese: {
        name: 'Сыр',
        price: 15000,
        kcall: 500
    },
    lettuce: {
        name: ' Салфетки',
        price: 2000,
        kcall: 0
    }
   
}

let str = ''

function createBurger() {
    const main = document.querySelector('.main')
    for (let key in product) {
        let { name, price, img, descr } = product[key]

        str += `
      <section class="main__product" id="${key}">
      <div class="main__product-preview">
          <div class="main__product-info">
              <img src="${img}" alt="" class="main__product-img">
              <h2 class="main__product-title">${name}
                  <span class="main__product-many"> ${price} сум</span>
              </h2>
          </div>
          <p class="main__product-descr">
            ${descr}
          </p>
      </div>
      <div class="main__product-extra">
          <div class="main__product-number">

              <!-- Прибавка к колличесву -->

              <a class="main__product-btn fa-reg minus" data-symbol="-"></a>
              <!-- Кнопка минус -->

              <output class="main__product-num">0</output>
              <!-- Колличество -->

              <a class="main__product-btn fa-reg plus" data-symbol="+"></a>
              <!-- Кнопка минус -->

          </div>
          <div class="main__product-price"><span>0</span> сум</div> <!-- Общая цена -->
      </div>
      <div class="main__product-extraProduct">
      `
        for (let newKey in extraProduct) {
            str += `
        <label class="main__product-label">
        <!-- Дополнительный товар -->
        <input type="checkbox" class="main__product-checkbox" data-extra="${newKey}">
        <span class="main__product-check"></span>
        ${extraProduct[newKey].name}
        </label>
        `
        }

        str += `
        
        </div>
        <div class="main__product-kcall"><span>0</span> калорий</div> <!-- Сумма колорий -->
    </section>
        `
    }

    main.innerHTML = str
    burgers()
}

setTimeout(() => createBurger(), 1000)

function burgers() {

    let btnPlusOrMinus = document.querySelectorAll('.main__product-btn'),
        checkExtraProduct = document.querySelectorAll('.main__product-checkbox'),
        addCart = document.querySelector('.addCart'),
        receipt = document.querySelector('.receipt'),
        receiptWindow = document.querySelector('.receipt__window'),
        receiptWindowOut = document.querySelector('.receipt__window-out'),
        receiptWindowBtn = document.querySelector('.receipt__window-btn')


    btnPlusOrMinus.forEach(btn => {
        btn.addEventListener('click', function () {
            plusOrMinusHandler(this)
        })
    })

    function plusOrMinusHandler(el) {
        // .closest() - ishet blejayshego roditelya po ukazonomu selektoru

        const parentId = el.closest('.main__product').getAttribute('id')
        let out = el.closest('.main__product').querySelector('.main__product-num')
        let price = el.closest('.main__product').querySelector('.main__product-price span')
        let kcall = el.closest('.main__product').querySelector('.main__product-kcall span')

        if (el.getAttribute('data-symbol') === '+') {
            product[parentId].amount++
        } else if (el.getAttribute('data-symbol') === '-' && product[parentId].amount > 0) {
            product[parentId].amount--
        }

        out.innerHTML = product[parentId].amount
        price.innerHTML = product[parentId].Summ
        kcall.innerHTML = product[parentId].Kcall
    }

    checkExtraProduct.forEach(el => {
        el.addEventListener('click', function () {
            addExtraProduct(this)
        })
    })


    function addExtraProduct(el) {
        const parent = el.closest('.main__product')
        const parentId = parent.getAttribute('id')

        product[parentId][el.getAttribute('data-extra')] = el.checked

        let price = parent.querySelector('.main__product-price span'),
            kcall = parent.querySelector('.main__product-kcall span'),
            elDateExtra = el.getAttribute('data-extra')



        if (product[parentId][elDateExtra]) {
            product[parentId].price += extraProduct[elDateExtra].price,
                product[parentId].kcall += extraProduct[elDateExtra].kcall
        } else {
            product[parentId].price -= extraProduct[elDateExtra].price,
                product[parentId].kcall -= extraProduct[elDateExtra].kcall
        }

        price.innerHTML = product[parentId].Summ
        kcall.innerHTML = product[parentId].Kcall
    }

    let addedProducts = []
    let totalPrice = 0
    let totalKacll = 0
    let totalName = ''
    let totalBurgers = 0

    addCart.addEventListener('click', () => {
        for (let key in product) {
            let productObj = product[key]

            if (productObj.amount > 0) {
                addedProducts.push(productObj)

                for (let newKey in productObj) {
                    if (productObj[newKey] === true) {
                        productObj.name += ` \n ${extraProduct[newKey].name} `
                    }
                }
            }

            productObj.kcall = productObj.Kcall
            productObj.price = productObj.Summ
        }

        for (let i = 0; i < addedProducts.length; i++) {
            let el = addedProducts[i]
            totalPrice += el.price
            totalKacll += el.kcall
            totalName += `\n ${el.name} \n`
            totalBurgers += el.amount
        }

        receiptWindowOut.innerHTML = `Вы заказали \n ${totalName} \n Колорийность ${totalKacll} \n Общая стоимость ${totalPrice} сум \n 
   Общее количество Пиццы ${totalBurgers}`

        receipt.style.display = ` flex`
        setTimeout(() => receipt.style.opacity = 1, 100)
        setTimeout(() => receiptWindow.style.top = 0, 100)

        let outNum = document.querySelectorAll('.main__product-num'),
            outPrice = document.querySelectorAll('.main__product-price span'),
            outKcall = document.querySelectorAll('.main__product-kcall span')

        for (let i = 0; i < outNum.length; i++) {
            outNum[i].innerHTML = 0
            outPrice[i].innerHTML = 0
            outKcall[i].innerHTML = 0
        }

        receiptWindowBtn.addEventListener('click', () => window.location.reload())
    })
}


const lvlNumber = document.querySelector('.header__timer-extra')

let i = 0

function timer() {
    if (i < 99) {
        lvlNumber.innerHTML = i++
        setTimeout(() => timer(), 20)
    } else {
        lvlNumber.innerHTML = 100
    }
}

timer()